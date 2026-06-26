import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";
import { z } from "zod";

// Apps Script — evidență lead-uri în Google Sheet de VÂNZĂRI (merge fără secrete). NEATINS.
const SHEET_WEBHOOK =
  "https://script.google.com/macros/s/AKfycbxROX9iECetr2fGFQ1JEFX4u9xCRTuDkrPQtScmHrdGxIIcNY321uyuC-lvA1D9RoFlrQ/exec";

// Sheet INTERN separat (sursă lead) prin Apps Script — doar proprietar/marketing, NU vânzări.
const INTERNAL_SHEET_WEBHOOK = process.env.INTERNAL_SHEET_WEBHOOK;

// Adresele unde merg lead-urile. Adaugă aici și bogdan@atmyhome.ro dacă vrei (după verificare domeniu).
const LEAD_TO = ["raduvoda25@gmail.com", "bogdan@atmyhome.ro", "octavian@atmyhome.ro"];
// "from" pe domeniul verificat în Resend.
const LEAD_FROM = "Radu Vodă 25 <noreply@raduvoda25.ro>";

// Logica pentru coloana Sursă (ordinea contează — vezi documentul de atribuire).
function deriveSursa(d: {
  fbclid?: string;
  gclid?: string;
  utm_source?: string;
  referrer?: string;
}): string {
  if (d.fbclid || (d.utm_source || "").toLowerCase() === "facebook") return "Facebook";
  if (d.gclid) return "Google Ads";
  const ref = (d.referrer || "").toLowerCase();
  if (ref.includes("google")) return "Google organic";
  if (ref) return "Referral";
  return "Direct";
}

// Funcție server (rulează DOAR server-side pe Vercel). Secretele din process.env.
// Face: 1) Sheet vânzări (neatins), 2) Sheet intern cu sursa, 3) email Resend, 4) Meta CAPI cu EMQ ridicat.
export const submitLead = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      nume: z.string().min(1),
      telefon: z.string().min(1),
      email: z.string().optional(),
      tip: z.string().optional(),
      // Atribuire (aditiv) — toate opționale, fără câmpuri noi în formular.
      utm_source: z.string().optional(),
      utm_medium: z.string().optional(),
      utm_campaign: z.string().optional(),
      utm_content: z.string().optional(),
      utm_term: z.string().optional(),
      fbclid: z.string().optional(),
      gclid: z.string().optional(),
      referrer: z.string().optional(),
      fbp: z.string().optional(),
      fbc: z.string().optional(),
    }),
  )
  .handler(async ({ data }) => {
    const eventId = globalThis.crypto?.randomUUID?.() ?? String(Date.now());

    // IP + user-agent din request (pe Vercel: primul IP din x-forwarded-for). Best-effort.
    let clientIp: string | undefined;
    let userAgent: string | undefined;
    try {
      const xff = getRequestHeader("x-forwarded-for");
      if (xff) clientIp = String(xff).split(",")[0].trim();
      userAgent = getRequestHeader("user-agent") || undefined;
    } catch {
      /* fără headers — nu blocăm lead-ul */
    }

    const sursa = deriveSursa(data);

    // 1) Evidență în Google Sheet de VÂNZĂRI (best-effort). NEATINS — fără coloană de sursă.
    try {
      await fetch(SHEET_WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
          nume: data.nume,
          telefon: data.telefon,
          email: data.email,
          tip: data.tip,
          sursa: "RaduVodă25",
        }),
      });
    } catch {
      /* nu blocăm lead-ul dacă Sheet-ul pică */
    }

    // 2) Sheet INTERN separat — sursa lead-ului (doar proprietar/marketing). Best-effort.
    if (INTERNAL_SHEET_WEBHOOK) {
      try {
        await fetch(INTERNAL_SHEET_WEBHOOK, {
          method: "POST",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify({
            timestamp: new Date().toISOString(),
            nume: data.nume,
            telefon: data.telefon,
            tip: data.tip || "",
            event_id: eventId,
            utm_source: data.utm_source || "",
            utm_medium: data.utm_medium || "",
            utm_campaign: data.utm_campaign || "",
            utm_content: data.utm_content || "", // numele reclamei
            utm_term: data.utm_term || "", // numele adset-ului
            fbclid: data.fbclid || "",
            gclid: data.gclid || "",
            referrer: data.referrer || "",
            Sursa: sursa,
          }),
        });
      } catch {
        /* sheet-ul intern nu blochează lead-ul */
      }
    }

    // 3) Email prin Resend (doar dacă secretul e setat în Vercel).
    if (process.env.RESEND_API_KEY) {
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: LEAD_FROM,
            to: LEAD_TO,
            subject: `Lead nou Radu Vodă 25 (${data.tip || "nespecificat"})`,
            text:
              `Nume: ${data.nume}\n` +
              `Telefon: ${data.telefon}\n` +
              `Email: ${data.email || "-"}\n` +
              `Interes: ${data.tip || "-"}`,
          }),
        });
      } catch {
        /* emailul nu trebuie să blocheze lead-ul */
      }
    }

    // 4) Meta Conversions API (server-side). Doar dacă tokenul e setat în Vercel.
    //    EMQ ridicat: ph + fn + ln (HASHUITE SHA-256) + fbp + fbc + IP + user-agent (RAW).
    //    event_id = eventId → dedup cu Pixel-ul din browser. NU schimbăm event_id.
    if (process.env.META_CAPI_TOKEN) {
      try {
        const { createHash } = await import("node:crypto");
        const sha256 = (v: string) =>
          createHash("sha256").update(v.trim().toLowerCase()).digest("hex");

        // Normalizare telefon RO: doar cifre; 0xxxx → 40xxxx (E.164 fără +).
        let phone = String(data.telefon).replace(/[^0-9]/g, "");
        if (phone.startsWith("0")) phone = "40" + phone.slice(1);

        // Nume → prenume (fn) + nume (ln), split la primul spațiu.
        const numeParts = String(data.nume).trim().split(/\s+/);
        const fn = numeParts.shift() || "";
        const ln = numeParts.join(" ");

        // fbc: cookie _fbc; dacă lipsește dar avem fbclid → fb.1.<timestamp_ms>.<fbclid>.
        let fbc = data.fbc;
        if (!fbc && data.fbclid) fbc = `fb.1.${Date.now()}.${data.fbclid}`;

        const user_data: Record<string, unknown> = {
          ph: phone ? [sha256(phone)] : undefined,
          em: data.email ? [sha256(String(data.email))] : undefined,
          fn: fn ? [sha256(fn)] : undefined,
          ln: ln ? [sha256(ln)] : undefined,
          fbp: data.fbp || undefined, // RAW, ne-hashuit
          fbc: fbc || undefined, // RAW, ne-hashuit
          client_ip_address: clientIp || undefined, // RAW
          client_user_agent: userAgent || undefined, // RAW
        };

        await fetch(
          "https://graph.facebook.com/v21.0/914745824719025/events?access_token=" +
            process.env.META_CAPI_TOKEN,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              data: [
                {
                  event_name: "Lead",
                  event_time: Math.floor(Date.now() / 1000),
                  action_source: "website",
                  event_id: eventId,
                  event_source_url: "https://raduvoda25.ro/multumim",
                  user_data,
                  custom_data: { content_category: data.tip || "" },
                },
              ],
            }),
          },
        );
      } catch {
        /* CAPI nu trebuie să blocheze lead-ul */
      }
    }

    return { ok: true, eventId };
  });
