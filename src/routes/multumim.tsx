import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/multumim")({
  component: ThankYou,
});

function ThankYou() {
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

        <Link
          to="/"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Înapoi acasă
        </Link>
      </div>
    </div>
  );
}
