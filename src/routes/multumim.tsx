import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";

const PHONE_DISPLAY = "+40 751 116 116";
const PHONE_TEL = "+40751116116";

export const Route = createFileRoute("/multumim")({
  component: ThankYou,
});

function ThankYou() {
  // Semnal de conversie (Partea C) — rulează la încărcarea reală a paginii.
  // Citește eid + tip din URL și le trimite în dataLayer (GTM).
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const w = window as unknown as { dataLayer?: unknown[] };
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push({
      event: "lead_submit",
      lead_type: p.get("tip") || "",
      event_id: p.get("eid") || "",
    });
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-5 py-12">
      <div className="w-full max-w-lg text-center">
        {/* checkmark */}
        <div className="mx-auto mb-7 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
          <svg
            className="h-10 w-10 text-primary"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>

        <h1 className="text-3xl font-semibold leading-tight text-foreground md:text-4xl">
          Mulțumim! Am primit cererea ta.
        </h1>
        <p className="mt-4 text-muted-foreground">
          Un reprezentant Radu Vodă 25 te va contacta în curând cu prețurile,
          planurile și disponibilitatea. Dacă ai întrebări sau vrei detalii
          imediat, ne poți suna direct.
        </p>

        {/* IMPORTANT */}
        <div className="mt-7 rounded-2xl border border-primary/40 bg-primary/5 p-5 text-left">
          <p className="text-xs font-bold uppercase tracking-widest text-primary">
            Important
          </p>
          <p className="mt-2 text-sm leading-relaxed text-foreground">
            Din cauza cererii mari, locurile pentru vizionări sunt limitate.
            După ce stabilim împreună o întâlnire, te rugăm să o onorezi sau să
            anunți cu cel puțin 24 de ore înainte, ca să putem oferi locul
            altcuiva.
          </p>
        </div>

        {/* call */}
        <a
          href={`tel:${PHONE_TEL}`}
          data-phone-cta
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
          </svg>
          Sună acum: {PHONE_DISPLAY}
        </a>

        <div className="mt-5">
          <Link
            to="/"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            ← Înapoi acasă
          </Link>
        </div>
      </div>
    </div>
  );
}
