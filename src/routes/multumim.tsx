import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

// ─────────────────────────────────────────────────────────────
// Link-ul către care redirecționăm după pagina de mulțumire.
// Înlocuiește cu link-ul tău.
const REDIRECT_URL = "https://REPLACE_ME";
// Secunde până la redirect automat.
const REDIRECT_DELAY = 4;
// ─────────────────────────────────────────────────────────────

export const Route = createFileRoute("/multumim")({
  component: ThankYou,
});

function ThankYou() {
  const [count, setCount] = useState(REDIRECT_DELAY);

  useEffect(() => {
    if (!REDIRECT_URL || REDIRECT_URL.includes("REPLACE_ME")) return;
    const tick = setInterval(() => setCount((c) => (c > 0 ? c - 1 : 0)), 1000);
    const go = setTimeout(() => {
      window.location.href = REDIRECT_URL;
    }, REDIRECT_DELAY * 1000);
    return () => {
      clearInterval(tick);
      clearTimeout(go);
    };
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-5">
      <div className="w-full max-w-md text-center">
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
          Mulțumim!
        </h1>
        <p className="mt-3 text-muted-foreground">
          Am primit datele tale. Te contactăm în cel mai scurt timp.
        </p>

        <a
          href={REDIRECT_URL}
          className="mt-8 inline-flex items-center justify-center rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Continuă →
        </a>

        {!REDIRECT_URL.includes("REPLACE_ME") && (
          <p className="mt-4 text-xs text-muted-foreground">
            Redirecționare automată în {count}s…
          </p>
        )}
      </div>
    </div>
  );
}
