import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

// Apps Script — evidență lead-uri în Google Sheet (merge fără secrete).
const SHEET_WEBHOOK =
  "https://script.google.com/macros/s/AKfycbxROX9iECetr2fGFQ1JEFX4u9xCRTuDkrPQtScmHrdGxIIcNY321uyuC-lvA1D9RoFlrQ/exec";

// Adresele unde merg lead-urile. [DE COMPLETAT] adaugă bogdan@atmyhome.ro etc DUPĂ ce verifici domeniul în Resend.
const LEAD_TO = ["claudiadiaconu76@gmail.com"];
// "from": cât timp domeniul nu e verificat în Resend, folosim adresa de test (merge doar către emailul contului).
// [DE COMPLETAT] după verificarea domeniului: "Radu Vodă 25 <noreply@raduvoda25.ro>".
const LEAD_FROM = "Radu Vodă 25 <onboarding@resend.dev>";

// Funcție server (rulează DOAR server-side pe Vercel). Secretele din process.env.
// Face: 1) evidență în Sheet, 2) email prin Resend, 3) întoarce eventId (pt deduplicare CAPI).
export const submitLead = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      nume: z.string().min(1),
      telefon: z.string().min(1),
      email: z.string().optional(),
      tip: z.string().optional(),
    }),
  )
  .handler(async ({ data }) => {
    const eventId = globalThis.crypto?.randomUUID?.() ?? String(Date.now());

    // 1) Evidență în Google Sheet (best-effort).
    try {
      await fetch(SHEET_WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({ ...data, sursa: "RaduVodă25" }),
      });
    } catch {
      /* nu blocăm lead-ul dacă Sheet-ul pică */
    }

    // 2) Email prin Resend (doar dacă secretul e setat în Vercel).
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

    // 3) Meta Conversions API (server-side). Doar dacă tokenul e setat în Vercel.
    //    Telefon/email se trimit HASHUITE (SHA-256). event_id = eventId → dedup cu Pixel-ul din browser.
    if (process.env.META_CAPI_TOKEN) {
      try {
        const { createHash } = await import("node:crypto");
        const sha256 = (v: string) =>
          createHash("sha256").update(v).digest("hex");

        // Normalizare telefon RO: doar cifre; 0xxxx → 40xxxx (E.164 fără +).
        let phone = String(data.telefon).replace(/[^0-9]/g, "");
        if (phone.startsWith("0")) phone = "40" + phone.slice(1);

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
                  user_data: {
                    ph: phone ? [sha256(phone)] : undefined,
                    em: data.email
                      ? [sha256(String(data.email).trim().toLowerCase())]
                      : undefined,
                  },
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
