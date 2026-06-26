// Captură atribuire sursă lead — STRICT ADITIV, nu atinge fluxul de vânzări.
// La aterizare salvează UTM + fbclid + gclid + referrer în localStorage (cheia rv_attrib).
// CAPCANA: UTM-urile sunt doar pe primul URL; le persistăm imediat, altfel se pierd până la submit.
// Persistență: primul touch plătit câștigă; suprascriem DOAR când vine un nou parametru de campanie/click.
// (așa returnările directe păstrează sursa originală). Durată ~90 zile.

const KEY = "rv_attrib";
const MAX_AGE_MS = 90 * 24 * 60 * 60 * 1000; // 90 zile

export type Attribution = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  fbclid?: string;
  gclid?: string;
  referrer?: string;
  ts?: number; // momentul capturii
};

const CAMPAIGN_KEYS = [
  "utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "fbclid", "gclid",
] as const;

function readFromUrl(): Attribution {
  if (typeof window === "undefined") return {};
  const p = new URLSearchParams(window.location.search);
  const out: Attribution = {};
  for (const k of CAMPAIGN_KEYS) {
    const v = p.get(k);
    if (v) (out as Record<string, string>)[k] = v;
  }
  const ref = document.referrer || "";
  // ignoră referrer-ul propriu (navigare internă)
  if (ref && !ref.includes(window.location.host)) out.referrer = ref;
  return out;
}

function hasCampaignSignal(a: Attribution): boolean {
  return CAMPAIGN_KEYS.some((k) => (a as Record<string, string>)[k]);
}

// Apelat o singură dată, la prima încărcare a paginii.
export function captureAttribution(): void {
  if (typeof window === "undefined") return;
  try {
    const fresh = readFromUrl();
    const stored = getAttribution();
    const storedFresh =
      stored && stored.ts && Date.now() - stored.ts < MAX_AGE_MS ? stored : null;

    // Suprascriem doar dacă URL-ul curent aduce semnal de campanie/click nou.
    if (hasCampaignSignal(fresh)) {
      localStorage.setItem(KEY, JSON.stringify({ ...fresh, ts: Date.now() }));
      return;
    }
    // Fără semnal nou: păstrăm ce era (dacă e încă valid). Dacă nu există nimic,
    // salvăm cel puțin referrer-ul pentru organic/referral.
    if (!storedFresh) {
      localStorage.setItem(KEY, JSON.stringify({ ...fresh, ts: Date.now() }));
    }
  } catch {
    /* localStorage poate fi blocat — nu blocăm pagina */
  }
}

export function getAttribution(): Attribution | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Attribution) : null;
  } catch {
    return null;
  }
}

// Citește un cookie first-party (pt _fbp / _fbc setate de Pixel).
export function getCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const m = document.cookie.match(new RegExp("(?:^|; )" + name + "=([^;]*)"));
  return m ? decodeURIComponent(m[1]) : undefined;
}

// Tot ce trimitem la submit, pe lângă câmpurile formularului.
export function getLeadMeta() {
  const a = getAttribution() || {};
  return {
    utm_source: a.utm_source,
    utm_medium: a.utm_medium,
    utm_campaign: a.utm_campaign,
    utm_content: a.utm_content,
    utm_term: a.utm_term,
    fbclid: a.fbclid,
    gclid: a.gclid,
    referrer: a.referrer,
    fbp: getCookie("_fbp"),
    fbc: getCookie("_fbc"),
  };
}
