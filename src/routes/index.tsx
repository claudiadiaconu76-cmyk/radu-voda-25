import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import {
  ShieldCheck, Car, Building2, Sparkles,
  Phone, Mail, FileText, Check, X, ChevronDown,
  KeyRound, Landmark, CalendarClock, BadgeCheck, Wallet, HardHat,
  Layers, Zap, TrendingUp, BedDouble, Eye,
} from "lucide-react";

const PHONE_DISPLAY = "+40 751 116 116";
const PHONE_TEL = "+40751116116";
const EMAIL = "bogdan@atmyhome.ro";
const PROGRAM = "Luni–Vineri, 09:00–17:00";

const PLAN_PDF = (cod: string) =>
  `https://www.atmyhome.ro/assets/radu-voda/planuri/${cod}.pdf`;

// Endpoint formular — lasă gol pentru demo, pune URL Formspree pentru producție
const LEAD_ENDPOINT = "";

const brandLogos = [
  { name: "Geberit",        src: "/images/brands/geberit.png",        w: "max-w-[140px]" },
  { name: "Ideal Standard", src: "/images/brands/ideal-standard.png", w: "max-w-[140px]" },
  { name: "Rockwool",       src: "/images/brands/rockwool.png",       w: "max-w-[140px]" },
  { name: "Knauf",          src: "/images/brands/knauf.png",          w: "max-w-[140px]" },
  { name: "Alumil",         src: "/images/brands/alumil.png",         w: "max-w-[140px]" },
  { name: "Equitone",       src: "/images/brands/equitone.png",       w: "max-w-[180px]" },
  { name: "Porcelanosa",    src: "/images/brands/porcelanosa.png",    w: "max-w-[180px]" },
  { name: "Legrand",        src: "/images/brands/legrand.png",        w: "max-w-[140px]" },
];

const logo        = { url: "/images/logo-transparent.png" };
const hero        = { url: "/images/IMG_3068.jpg" };
const extDay      = { url: "/images/IMG_3069.jpg" };
const extLife     = { url: "/images/IMG_3070.jpg" };
const extDay2     = { url: "/images/IMG_3072.jpg" };
const extNight2   = { url: "/images/IMG_3073.jpg" };
const intBathLux  = { url: "/images/IMG_3057.jpg" };
const intBathBlack = { url: "/images/IMG_3058.jpg" };
const intBathWarm = { url: "/images/IMG_3059.jpg" };
const intShower   = { url: "/images/IMG_3062.jpg" };
const darkLiving  = { url: "/images/IMG_3064.jpg" };
const darkKitchen = { url: "/images/IMG_3065.jpg" };

type Unit = {
  cod: string; etaj: number; cam: 2 | 3;
  mp: number; tip: "Balcon" | "Terasă"; ext: number;
  pret: number; discount?: number;
};

const UNITS: Unit[] = [
  { cod: "A1",  etaj: 1, cam: 3, mp: 95.12,  tip: "Balcon", ext: 4.0,   pret: 339920 },
  { cod: "A2",  etaj: 1, cam: 2, mp: 63.94,  tip: "Balcon", ext: 7.27,  pret: 236513, discount: 224686 },
  { cod: "A3",  etaj: 1, cam: 3, mp: 96.15,  tip: "Balcon", ext: 10.87, pret: 355548, discount: 337769 },
  { cod: "A4",  etaj: 1, cam: 3, mp: 106.02, tip: "Balcon", ext: 10.51, pret: 389463 },
  { cod: "A5",  etaj: 1, cam: 2, mp: 74.69,  tip: "Balcon", ext: 3.01,  pret: 266683 },
  { cod: "A6",  etaj: 1, cam: 3, mp: 82.02,  tip: "Balcon", ext: 2.68,  pret: 291760 },
  { cod: "A7",  etaj: 2, cam: 3, mp: 95.12,  tip: "Balcon", ext: 4.11,  pret: 340113 },
  { cod: "A8",  etaj: 2, cam: 2, mp: 63.94,  tip: "Balcon", ext: 7.41,  pret: 236758 },
  { cod: "A9",  etaj: 2, cam: 3, mp: 96.15,  tip: "Balcon", ext: 15.7,  pret: 364000 },
  { cod: "A10", etaj: 2, cam: 3, mp: 106.02, tip: "Balcon", ext: 10.86, pret: 390075 },
  { cod: "A11", etaj: 2, cam: 2, mp: 74.69,  tip: "Balcon", ext: 3.85,  pret: 268153 },
  { cod: "A12", etaj: 2, cam: 3, mp: 82.02,  tip: "Balcon", ext: 5.16,  pret: 296100 },
  { cod: "A13", etaj: 3, cam: 3, mp: 86.92,  tip: "Balcon", ext: 10.77, pret: 323068 },
  { cod: "A14", etaj: 3, cam: 2, mp: 63.94,  tip: "Balcon", ext: 7.27,  pret: 236513 },
  { cod: "A15", etaj: 3, cam: 3, mp: 85.38,  tip: "Terasă", ext: 23.46, pret: 339885 },
  { cod: "A16", etaj: 3, cam: 3, mp: 90.62,  tip: "Terasă", ext: 44.3,  pret: 394695 },
  { cod: "A17", etaj: 3, cam: 3, mp: 109.74, tip: "Balcon", ext: 16.14, pret: 412335 },
  { cod: "A18", etaj: 4, cam: 3, mp: 86.92,  tip: "Balcon", ext: 10.77, pret: 323068 },
  { cod: "A19", etaj: 4, cam: 2, mp: 63.94,  tip: "Balcon", ext: 7.27,  pret: 236513 },
  { cod: "A20", etaj: 4, cam: 3, mp: 85.21,  tip: "Balcon", ext: 11.33, pret: 318063 },
  { cod: "A21", etaj: 4, cam: 3, mp: 90.45,  tip: "Terasă", ext: 24.67, pret: 359748 },
  { cod: "A22", etaj: 4, cam: 3, mp: 94.22,  tip: "Terasă", ext: 28.63, pret: 379873 },
  { cod: "A23", etaj: 5, cam: 2, mp: 88.7,   tip: "Terasă", ext: 71.27, pret: 435173 },
  { cod: "A24", etaj: 5, cam: 2, mp: 67.69,  tip: "Balcon", ext: 14.57, pret: 262413 },
  { cod: "A25", etaj: 5, cam: 3, mp: 86.6,   tip: "Terasă", ext: 30.09, pret: 355758 },
  { cod: "A26", etaj: 5, cam: 3, mp: 88.59,  tip: "Balcon", ext: 16.85, pret: 339553 },
];

const fmt = (n: number) => n.toLocaleString("de-DE");

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Radu Vodă 25 · Apartamente boutique lângă Piața Unirii" },
      { name: "description", content: "26 de apartamente boutique în centrul Bucureștiului, la 650 m de Piața Unirii. Prețuri de la 236.513€ + TVA 19%. Finalizare 2027." },
      { name: "author", content: "Radu Vodă 25" },
      { property: "og:title", content: "Radu Vodă 25 · Apartamente boutique lângă Piața Unirii" },
      { property: "og:description", content: "26 de apartamente boutique la 650 m de Piața Unirii. De la 236.513€ + TVA 19%. Finalizare 2027." },
      { property: "og:image", content: "/images/IMG_3068.jpg" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Radu Vodă 25 · Apartamente boutique lângă Piața Unirii" },
      { name: "twitter:description", content: "26 de apartamente boutique la 650 m de Piața Unirii. De la 236.513€ + TVA 19%. Finalizare 2027." },
      { name: "twitter:image", content: "/images/IMG_3068.jpg" },
    ],
    links: [
      { rel: "icon", href: "/images/logo.png" },
    ],
  }),
  component: Index,
});

function Accent({ children }: { children: ReactNode }) {
  return <span className="text-primary">{children}</span>;
}

function SectionHead({ kicker, title, sub }: { kicker: string; title: ReactNode; sub?: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <div className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-accent-foreground">
        {kicker}
      </div>
      <h2 className="mt-4 text-3xl font-semibold leading-tight md:text-4xl">{title}</h2>
      {sub && <p className="mt-3 text-muted-foreground">{sub}</p>}
    </div>
  );
}

const apartmentDetails = {
  "2cam": {
    title: "Apartament 2 camere",
    subtitle: "63–75 mp utili, balcon până la 14,5 mp",
    price: "de la 236.513€",
    suffix: "+ TVA 19%",
    rows: [
      { l: "Suprafață utilă", v: "63–75 mp" },
      { l: "Balcon", v: "până la 14,57 mp" },
      { l: "Compartimentare", v: "Hol, living, bucătărie, dormitor, baie" },
      { l: "Etaje disponibile", v: "1–5" },
      { l: "Preț", v: "de la 236.513€ + TVA 19%" },
      { l: "Plan de plată", v: "5% rezervare + 25% în 30 zile, restul etapizat" },
    ],
    note: "Ideal pentru cupluri sau pentru o investiție cu randament în centrul Bucureștiului.",
  },
  "3cam": {
    title: "Apartament 3 camere",
    subtitle: "82–110 mp utili, balcon sau terasă până la 44 mp",
    price: "de la 291.760€",
    suffix: "+ TVA 19%",
    rows: [
      { l: "Suprafață utilă", v: "82–110 mp" },
      { l: "Balcon sau terasă", v: "până la 44,30 mp (etaj 3)" },
      { l: "Compartimentare", v: "Hol, living, bucătărie, 2 dormitoare, 2 băi" },
      { l: "Etaje disponibile", v: "1–5" },
      { l: "Preț", v: "de la 291.760€ + TVA 19%" },
      { l: "Plan de plată", v: "5% rezervare + 25% în 30 zile, restul etapizat" },
    ],
    note: "Cel mai solicitat tip de unitate. Potrivit pentru familii care vor centrul fără compromisuri.",
  },
  "etaj5": {
    title: "Apartamente etaj 5 · terase generoase",
    subtitle: "Ultimul etaj, terasă de până la 71 mp, vedere panoramică",
    price: "de la 262.413€",
    suffix: "+ TVA 19%",
    rows: [
      { l: "Unități la etaj 5", v: "4 apartamente" },
      { l: "Terasă maximă", v: "71,27 mp (unitatea A23)" },
      { l: "Suprafață utilă", v: "67–89 mp" },
      { l: "Interval de preț", v: "262.413€ – 435.173€ + TVA 19%" },
      { l: "Vedere", v: "Panoramică, spații exterioare private" },
    ],
    note: "Unitatea A23 are cea mai mare terasă din proiect — 71 mp de spațiu exterior privat.",
  },
} as const;

type ModalKey = keyof typeof apartmentDetails;

const FAQ = [
  {
    q: "Prețul include TVA? Cât plătesc final?",
    a: "Prețurile afișate sunt fără TVA. Cota aplicabilă este 19% — prețul final cu TVA ți-l comunicăm pentru unitatea aleasă la primul contact.",
  },
  {
    q: "Pot cumpăra cu credit ipotecar?",
    a: "Da, proiectul poate fi achiziționat prin credit ipotecar. Contactează-ne și îți comunicăm lista băncilor partenere și condițiile pentru achiziția off-plan.",
  },
  {
    q: "Ce se întâmplă dacă livrarea întârzie?",
    a: "Antecontractul notarial stabilește termenul de predare și penalitățile de întârziere, ca să fii protejat contractual. Detaliile exacte se discută la semnare.",
  },
  {
    q: "Ce protejează avansul meu?",
    a: "Plățile sunt corelate cu stadiul real al construcției — nu plătești pentru ce nu s-a construit. Mecanismul exact de protecție a avansului se confirmă la semnarea antecontractului.",
  },
  {
    q: "Apartamentul se predă la cheie sau semifinisat?",
    a: "Predare la cheie, la finalizarea construcției în 2027. Finisajele premium incluse sunt descrise în specificațiile tehnice disponibile la cerere.",
  },
  {
    q: "Locul de parcare e inclus sau separat?",
    a: "Imobilul are 44 de locuri (40 subterane + 4 exterioare), cu stații de încărcare EV. Locul de parcare se achiziționează separat — contactează-ne pentru preț.",
  },
  {
    q: "Pot personaliza finisajele?",
    a: "În funcție de stadiul construcției, există posibilitatea unor personalizări. Discută opțiunile cu un consultant.",
  },
  {
    q: "Când se face intabularea?",
    a: "Intabularea se realizează după finalizarea și recepția construcției în 2027. Procedura completă se discută cu consultantul la semnarea actelor.",
  },
  {
    q: "În ce stadiu e construcția acum?",
    a: "Contactează-ne pentru stadiul actual și poze recente de pe șantier. Putem organiza o vizită pe șantier oricând.",
  },
  {
    q: "Cât de zgomotos e în centru?",
    a: "Tâmplăria premium din aluminiu cu geam termoizolant și izolația cu vată bazaltică reduc semnificativ zgomotul stradal. Pereții de 50 cm asigură liniște în interior.",
  },
  {
    q: "Cine administrează blocul și cât e întreținerea?",
    a: "Detaliile privind administrarea și costul estimat de întreținere se comunică la semnarea contractului. Contactează-ne pentru informații.",
  },
  {
    q: "Pot vedea un apartament-model?",
    a: "Lasă-ne datele de contact și revenim cu opțiunile disponibile pentru vizionări sau tur virtual.",
  },
];

function Index() {
  const [modal, setModal] = useState<ModalKey | null>(null);
  const [faqOpen, setFaqOpen] = useState<number | null>(0);
  const [barHidden, setBarHidden] = useState(false);
  const [fCam, setFCam] = useState<0 | 2 | 3>(0);
  const [fEtaj, setFEtaj] = useState<number>(0);
  const [fTerasa, setFTerasa] = useState(false);
  const [sortAsc, setSortAsc] = useState(true);

  const filtered = useMemo(() => {
    let list = UNITS.filter(
      (u) =>
        (fCam === 0 || u.cam === fCam) &&
        (fEtaj === 0 || u.etaj === fEtaj) &&
        (!fTerasa || u.tip === "Terasă")
    );
    list = [...list].sort((a, b) => (sortAsc ? a.pret - b.pret : b.pret - a.pret));
    return list;
  }, [fCam, fEtaj, fTerasa, sortAsc]);

  useEffect(() => {
    const anchors = Array.from(document.querySelectorAll<HTMLElement>(".cta-anchor"));
    if (!anchors.length || typeof IntersectionObserver === "undefined") return;
    const visible = new Set<Element>();
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) =>
          e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)
        );
        setBarHidden(visible.size > 0);
      },
      { threshold: 0.2 }
    );
    anchors.forEach((a) => obs.observe(a));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground antialiased pb-16 md:pb-0">

      {/* HEADER */}
      <header className="w-full border-b border-border/60 bg-background">
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-center px-5">
          <a href="#top">
            <img src={logo.url} alt="Radu Vodă 25" className="h-20 w-auto md:h-24" />
          </a>
        </div>
      </header>

      {/* HERO */}
      <section id="top" className="relative overflow-hidden">
        <img
          src={hero.url}
          alt="Fațada Radu Vodă 25, București"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: "center 40%" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/85" />
        <span className="absolute left-4 top-4 z-10 rounded bg-black/40 px-2.5 py-1 text-[11px] text-white/75">
          Randare cu titlu de prezentare
        </span>
        <div className="relative mx-auto max-w-3xl px-5 py-14 text-center md:py-20">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white">
            Imobil boutique · Sector 4 · 26 apartamente
          </span>
          <h1 className="mx-auto mt-5 max-w-2xl text-[2rem] font-semibold leading-[1.12] text-white md:text-5xl">
            Locuiește în inima Bucureștiului, într-un imobil de doar{" "}
            <span className="text-primary">26 de unități</span>.
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/85 md:text-lg">
            La Piața Unirii nu cumperi doar un apartament. Cumperi o locație care își păstrează valoarea în timp.
          </p>

          {/* Stats */}
          <div className="mx-auto mt-7 grid max-w-xl grid-cols-2 gap-3 md:grid-cols-4">
            {[
              { n: "236.513€", l: "preț de la (+ TVA 19%)" },
              { n: "650 m",    l: "până la Piața Unirii" },
              { n: "26",       l: "apartamente" },
              { n: "2027",     l: "finalizare" },
            ].map((s) => (
              <div key={s.l} className="rounded-xl bg-white/10 px-3 py-2 backdrop-blur-sm">
                <div className="text-base font-bold text-primary">{s.n}</div>
                <div className="text-xs text-white/70">{s.l}</div>
              </div>
            ))}
          </div>

          {/* Reducere badge */}
          <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-bold text-primary-foreground shadow-lg">
            <Sparkles className="h-4 w-4" /> Disponibilități limitate într-un proiect boutique cu 26 de apartamente
          </div>

          {/* Formular hero */}
          <div className="cta-anchor mx-auto mt-7 max-w-md">
            <LeadForm variant="hero" />
          </div>

          <a
            href={`tel:${PHONE_TEL}`}
            className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-bold text-neutral-900 shadow-lg hover:bg-white/90 transition-colors"
          >
            <Phone className="h-4 w-4 text-primary" /> Sună acum: {PHONE_DISPLAY}
          </a>
          <p className="mt-4 text-[12px] text-white/65">
            Răspuns în maxim 24h
          </p>
        </div>
      </section>

      {/* BRANDURI */}
      <section className="py-12 overflow-hidden">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-8">
          Materiale și echipamente{" "}
          <span className="text-primary text-lg font-black mx-2">+</span>{" "}
          Branduri internaționale
        </p>
        <div className="overflow-hidden">
          <div className="marquee-track">
            {[...brandLogos, ...brandLogos].map((b, i) => (
              <div
                key={i}
                className="mx-5 shrink-0 flex items-center justify-center rounded-2xl px-7 py-5"
                style={{ background: "rgba(255,255,255,0.95)" }}
              >
                <img src={b.src} alt={b.name} className={`h-12 w-auto ${b.w} object-contain`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LOCAȚIE */}
      <section id="proiect" className="bg-card py-12 md:py-20">
        <div className="mx-auto max-w-6xl px-5">
          <SectionHead
            kicker="Locație"
            title={<>În inima Bucureștiului, la <Accent>câteva minute pe jos</Accent> de tot.</>}
            sub="Pe Strada Radu Vodă 25, în Sectorul 4. În fața casei ai liniștea Mănăstirii Radu Vodă, iar la 5 minute pe jos ai Tribunalul, Curtea de Apel, Biblioteca Națională, metroul și Centrul Vechi. Câștigi timpul pe care alții îl pierd zilnic în trafic."
          />
          <div className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-5 sm:grid-cols-3">
            {[
              { n: "650 m",   l: "Piața Unirii / Centrul Vechi" },
              { n: "600 m",   l: "Biblioteca Națională" },
              { n: "950 m",   l: "Tribunalul București" },
              { n: "1.500 m", l: "Parcul Carol" },
              { n: "1.900 m", l: "Bucharest Mall" },
              { n: "2.200 m", l: "Palatul Parlamentului" },
            ].map((d) => (
              <div key={d.l} className="rounded-2xl bg-background p-5 text-center">
                <div className="text-2xl font-bold text-primary">{d.n}</div>
                <div className="mt-1 text-sm text-muted-foreground">{d.l}</div>
              </div>
            ))}
          </div>
          <div className="mx-auto mt-8 max-w-4xl overflow-hidden rounded-3xl shadow-lg">
            <iframe
              title="Locație Radu Vodă 25, București"
              src="https://maps.google.com/maps?q=Strada+Radu+Vod%C4%83+nr.+25%2C+Sector+4%2C+Bucure%C8%99ti%2C+Romania&z=18&output=embed"
              className="aspect-[16/9] w-full border-0"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* PENTRU CINE E / NU E */}
      <section className="py-12 md:py-20">
        <div className="mx-auto max-w-5xl px-5">
          <SectionHead
            kicker="Pentru cine"
            title={<>Radu Vodă 25 <Accent>nu e pentru oricine</Accent>. Și e în regulă.</>}
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-primary/30 bg-accent/40 p-7">
              <div className="flex items-center justify-center gap-2 text-primary">
                <Check className="h-5 w-5" />
                <span className="font-semibold">E pentru tine dacă…</span>
              </div>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                {[
                  "Vrei să locuiești fix în centrul Bucureștiului, nu la 40 de minute de el.",
                  "Pui preț pe exclusivitate — un imobil de doar 26 de familii, nu un bloc-furnicar.",
                  "Cauți și o investiție: centrul consolidat își ține valoarea în timp.",
                  "Vrei finisaje premium și branduri internaționale, nu varianta minimă.",
                ].map((t) => (
                  <li key={t} className="flex gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border border-border bg-card p-7">
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <X className="h-5 w-5" />
                <span className="font-semibold">Probabil nu e pentru tine dacă…</span>
              </div>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                {[
                  "Cauți cel mai mic preț pe metru pătrat din oraș.",
                  "Vrei un complex mare, cu sute de apartamente și facilități de ansamblu.",
                  "Ai nevoie să te muți imediat — finalizarea e în 2027.",
                  "Preferi o zonă nouă, în dezvoltare, în locul centrului istoric.",
                ].map((t) => (
                  <li key={t} className="flex gap-2">
                    <X className="mt-0.5 h-4 w-4 shrink-0 opacity-60" />{t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* AVANTAJE */}
      <section className="bg-card py-12 md:py-20">
        <div className="mx-auto max-w-6xl px-5">
          <SectionHead
            kicker="De ce Radu Vodă 25"
            title={<>Construit pentru <Accent>confortul de zi cu zi</Accent>.</>}
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { Icon: Layers,     t: "Pereți exteriori de până la 60 cm", d: "Zidărie dublă, rar întâlnită la construcții noi. Înseamnă liniște totală în casă și facturi mici la energie." },
              { Icon: ShieldCheck,t: "Tâmplărie de aluminiu premium",   d: "Aluminiu de cea mai înaltă calitate, nu PVC. Nu se deformează, izolează fonic superior și rezistă zeci de ani." },
              { Icon: Building2,  t: "Fațadă ventilată Porcelanosa",    d: "Plăci ceramice de la Porcelanosa: aspect impecabil și costuri minime de întreținere pe termen lung." },
              { Icon: Zap,        t: "Eficiență energetică ridicată",   d: "Vara păstrezi răcoarea, iarna căldura, cu un consum minim de energie pe tot parcursul anului." },
              { Icon: Car,        t: "Parcare subterană",                d: "44 de locuri (40 subterane, 4 exterioare), cu stații de încărcare pentru mașini electrice." },
              { Icon: Sparkles,   t: "Branduri internaționale",         d: "Geberit, Rockwool, Knauf, Alumil, Legrand, Porcelanosa, Equitone, Ideal Standard și altele." },
            ].map((b) => (
              <div key={b.t} className="rounded-3xl border border-border bg-background p-7 text-center transition-shadow hover:shadow-md">
                <b.Icon className="mx-auto h-9 w-9 text-primary" strokeWidth={1.5} />
                <h3 className="mt-4 text-lg font-semibold">{b.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b.d}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
            {[
              { im: intBathWarm,  alt: "Baie cu marmură albă (randare)" },
              { im: darkKitchen,  alt: "Bucătărie cu finisaj premium (randare)" },
              { im: intBathBlack, alt: "Baie cu armături negre (randare)" },
              { im: intShower,    alt: "Duș cu iluminat indirect (randare)" },
            ].map((item, i) => (
              <div key={i} className="overflow-hidden rounded-2xl">
                <img
                  src={item.im.url}
                  alt={item.alt}
                  className="aspect-square w-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
            ))}
          </div>
          <p className="mt-3 text-center text-xs text-muted-foreground">
            Imaginile interioare sunt randări cu titlu de prezentare.
          </p>
        </div>
      </section>

      {/* APARTAMENTE */}
      <section id="apartamente" className="bg-card py-12 md:py-20">
        <div className="mx-auto max-w-6xl px-5">
          <SectionHead
            kicker="Apartamente"
            title={<>26 de unități. <Accent>O selecție atent gândită.</Accent></>}
            sub="2 subsoluri, parter (6,02 m), mezanin, 5 etaje. Finisaje premium. Predare la cheie în 2027. Toate prețurile sunt fără TVA 19%."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <ApartCard
              img={darkLiving.url}
              alt="Apartament 2 camere (randare)"
              title="2 camere"
              sub="63–75 mp utili, balcon până la 14,5 mp"
              price="de la 236.513€"
              priceReduced="de la 224.686€"
              suffix="+ TVA 19%"
              extra="Preț special -5% pe unitatea A2"
              tag={null}
              onDetails={() => setModal("2cam")}
            />
            <ApartCard
              img={darkKitchen.url}
              alt="Apartament 3 camere (randare)"
              title="3 camere"
              sub="82–110 mp utili, balcon sau terasă până la 44 mp"
              price="de la 291.760€"
              priceReduced="de la 337.769€ (A3)"
              suffix="+ TVA 19%"
              extra="Preț special -5% pe unitatea A3"
              tag="Cel mai solicitat"
              onDetails={() => setModal("3cam")}
            />
            <ApartCard
              img={intBathLux.url}
              alt="Apartament etaj 5 (randare)"
              title="Etaj 5 · terase generoase"
              sub="Ultimul etaj, terasă de până la 71 mp"
              price="de la 262.413€"
              suffix="+ TVA 19%"
              extra="4 unități · până la 435.173€ + TVA 19%"
              tag="Terase de până la 71 mp"
              onDetails={() => setModal("etaj5")}
            />
          </div>
          <div className="mt-8 flex justify-center">
            <a
              href="#disponibilitate"
              className="rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Vezi toate cele 26 de unități și prețurile
            </a>
          </div>
        </div>
      </section>

      {/* DISPONIBILITATE */}
      <section id="disponibilitate" className="py-12 md:py-20">
        <div className="mx-auto max-w-5xl px-5">
          <SectionHead
            kicker="Disponibilitate"
            title={<>Toate cele <Accent>26 de unități</Accent>.</>}
            sub="Filtrează după număr de camere, etaj sau terasă. Prețuri fără TVA 19%."
          />
          {/* Filtre */}
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <Chip active={fCam === 0} onClick={() => setFCam(0)}>Toate</Chip>
            <Chip active={fCam === 2} onClick={() => setFCam(2)}>2 camere</Chip>
            <Chip active={fCam === 3} onClick={() => setFCam(3)}>3 camere</Chip>
            {[1,2,3,4,5].map((e) => (
              <Chip key={e} active={fEtaj === e} onClick={() => setFEtaj(fEtaj === e ? 0 : e)}>
                Etaj {e}
              </Chip>
            ))}
            <Chip active={fTerasa} onClick={() => setFTerasa(!fTerasa)}>Cu terasă</Chip>
            <Chip active={!sortAsc} onClick={() => setSortAsc(!sortAsc)}>
              Preț {sortAsc ? "↑" : "↓"}
            </Chip>
          </div>

          <div className="mt-6 divide-y divide-border rounded-3xl border border-border bg-card overflow-hidden">
            {filtered.map((u) => (
              <div key={u.cod} className="px-6 py-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <span className="font-bold text-primary mr-2">{u.cod}</span>
                    <span className="text-sm font-medium">{u.cam} camere</span>
                    {u.discount && (
                      <span className="ml-2 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-bold text-primary">-5%</span>
                    )}
                  </div>
                  <div className="text-right">
                    {u.discount ? (
                      <div>
                        <span className="text-xs text-muted-foreground line-through mr-2">{fmt(u.pret)} €</span>
                        <span className="text-lg font-bold text-primary">{fmt(u.discount)} €</span>
                        <span className="text-xs text-muted-foreground ml-1">+ TVA 19%</span>
                      </div>
                    ) : (
                      <div>
                        <span className="text-lg font-bold text-primary">{fmt(u.pret)} €</span>
                        <span className="text-xs text-muted-foreground ml-1">+ TVA 19%</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-1 text-sm text-muted-foreground">
                  Etaj {u.etaj} · {u.mp.toLocaleString("de-DE")} mp · {u.tip} {u.ext.toLocaleString("de-DE")} mp
                </div>
                <div className="mt-2 flex gap-4">
                  <a href={PLAN_PDF(u.cod)} target="_blank" rel="noreferrer" className="text-sm text-muted-foreground hover:underline">
                    Plan PDF
                  </a>
                  <a href="#contact" className="text-sm font-semibold text-primary hover:underline">
                    Solicită →
                  </a>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-4 text-center text-xs text-muted-foreground">
            Planul PDF al fiecărui apartament se deschide direct. Planurile pe etaje sunt disponibile la cerere.
          </p>
          <div className="mt-6 flex justify-center">
            <a
              href="#contact"
              className="rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Primește planurile PDF + lista completă de prețuri
            </a>
          </div>
        </div>
      </section>

      {/* SPAȚII COMERCIALE */}
      <section className="bg-card py-12 md:py-20">
        <div className="mx-auto max-w-6xl px-5">
          <SectionHead
            kicker="Pentru investitori"
            title="3 spații comerciale la parter și mezanin."
            sub="Vitrine cu vizibilitate excelentă în zonă consolidată, cu trafic pietonal constant. Prețuri la cerere."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              { c: "SC1", t: "Retail · vitrină stradală", rows: [["Nivel", "Parter"], ["Suprafață", "259,67 mp"], ["Terasă", "92,71 mp"], ["Înălțime", "6,02 m"]] },
              { c: "SC2", t: "Showroom",                  rows: [["Nivel", "Parter"], ["Suprafață", "70,04 mp"],  ["Terasă", "28,45 mp"], ["Înălțime", "6,02 m"]] },
              { c: "SC3", t: "Retail mezanin",            rows: [["Nivel", "Mezanin"],["Suprafață", "201,41 mp"], ["Terasă", "—"],         ["Înălțime", "2,52 m"]] },
            ].map((s) => (
              <div key={s.c} className="rounded-3xl border border-border bg-background p-7 text-center">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-xl font-bold text-primary">{s.c}</span>
                  <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">Disponibil</span>
                </div>
                <h3 className="mt-2 text-lg font-semibold">{s.t}</h3>
                <div className="mt-4 divide-y divide-border text-left">
                  {s.rows.map((r) => (
                    <div key={r[0]} className="flex justify-between py-2 text-sm">
                      <span className="text-muted-foreground">{r[0]}</span>
                      <span className="font-medium">{r[1]}</span>
                    </div>
                  ))}
                </div>
                <a
                  href="#contact"
                  className="mt-5 block rounded-full bg-primary py-2.5 text-sm font-semibold text-primary-foreground"
                >
                  Cere detalii {s.c}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PLAN DE PLATĂ */}
      <section className="py-12 md:py-20">
        <div className="mx-auto max-w-5xl px-5">
          <SectionHead
            kicker="Plan de plată"
            title={<>De ce să cumperi <Accent>înainte de finalizare</Accent>?</>}
            sub="Achiziția în faza de dezvoltare îți dă cea mai bună selecție de unități și îți distribuie investiția pe etape, corelată cu stadiul construcției."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Rezervare cu 5%",
                sub: "Apoi 25% în 30 de zile",
                desc: "Rezervi cu 5%, apoi 25% în 30 de zile (30% avans total). Blochezi unitatea și prețul actual.",
              },
              {
                step: "02",
                title: "Pe parcurs",
                sub: "Tranșe etapizate",
                desc: "Tranșele sunt corelate cu stadiul real al lucrărilor (structură, finisaje). Nu plătești pentru ce nu s-a construit.",
              },
              {
                step: "03",
                title: "Finalizare 2027",
                sub: "Ultima tranșă la recepție",
                desc: "Ultima plată după recepție. Intri direct în apartament, la cheie, finisat complet.",
              },
            ].map((s) => (
              <div key={s.step} className="rounded-2xl bg-card p-6 text-center">
                <div className="text-3xl font-bold text-primary">{s.step}</div>
                <div className="mt-2 font-semibold">{s.title}</div>
                <div className="mt-1 inline-block rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">{s.sub}</div>
                <div className="mt-3 text-sm text-muted-foreground">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INVESTIȚIE */}
      <section className="py-12 md:py-20">
        <div className="mx-auto max-w-6xl px-5">
          <SectionHead
            kicker="Investiție"
            title={<>O proprietate care își <Accent>păstrează valoarea</Accent>.</>}
            sub="Într-o zonă consolidată, unde terenul este epuizat și nu se mai construiește nimic nou, valoarea e protejată de lipsa de alternative."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { Icon: TrendingUp, t: "Randament estimativ ~6% pe an",   d: "Bazat pe cererea zilnică reală în zona centrală, mai sigur decât un procent teoretic mare promis la periferie." },
              { Icon: BedDouble,  t: "Grad de ocupare peste 80%",       d: "Cerere de închiriere constantă tot anul, în regim clasic sau hotelier (Airbnb), datorită locației centrale." },
              { Icon: KeyRound,   t: "Două strategii de randament",     d: "Chirie clasică pe termen lung sau regim hotelier, profitând de poziția din inima orașului." },
              { Icon: Sparkles,   t: "Preț de pre-lansare",            d: "Blochezi acum un preț sub valoarea estimată la finalizare. Câștigi încă din faza de execuție." },
              { Icon: ShieldCheck,t: "Valoare protejată",               d: "Centru istoric consolidat: cererea nu scade, iar lipsa terenului ține prețurile sus pe termen lung." },
              { Icon: Landmark,   t: "Activ real, nu cash",             d: "În perioade de incertitudine, capitalul mutat într-o proprietate centrală e mai sigur decât banii ținuți cash." },
            ].map((b) => (
              <div key={b.t} className="rounded-3xl border border-border bg-card p-7 text-center">
                <b.Icon className="mx-auto h-9 w-9 text-primary" strokeWidth={1.5} />
                <h3 className="mt-4 text-lg font-semibold">{b.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b.d}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-center text-xs text-muted-foreground">
            Cifrele de randament și ocupare sunt estimative și nu reprezintă o garanție de randament.
          </p>
        </div>
      </section>

      {/* FINANȚARE */}
      <section className="bg-card py-12 md:py-20">
        <div className="mx-auto max-w-6xl px-5">
          <SectionHead
            kicker="Finanțare"
            title={<>Cum îți permiți un apartament în <Accent>centrul Bucureștiului</Accent>.</>}
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              { Icon: Wallet,    t: "Plată eșalonată",     d: "Avansul acum, restul în tranșe corelate cu stadiul construcției. Nu plătești tot dintr-o dată." },
              { Icon: Landmark,  t: "Credit ipotecar",     d: "Proiectul poate fi achiziționat și prin credit ipotecar. Contactează-ne pentru lista băncilor partenere." },
              { Icon: KeyRound,  t: "Preț de pre-lansare", d: "Cumpărând acum, blochezi un preț sub valoarea estimată la finalizare. Câștigul vine din faza de execuție." },
            ].map((b) => (
              <div key={b.t} className="rounded-3xl border border-border bg-background p-7 text-center">
                <b.Icon className="mx-auto h-9 w-9 text-primary" strokeWidth={1.5} />
                <h3 className="mt-4 text-lg font-semibold">{b.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CUMPERI ÎN SIGURANȚĂ */}
      <section id="siguranta" className="py-12 md:py-20">
        <div className="mx-auto max-w-6xl px-5">
          <SectionHead
            kicker="Achiziție sigură"
            title={<>Cumperi în siguranță, chiar dacă te <Accent>muți abia în 2027</Accent>.</>}
            sub="Achiziția off-plan la Radu Vodă 25 este structurată ca să-ți protejeze investiția în fiecare etapă."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { Icon: FileText,     t: "Autorizație de construire",        d: "Proiect cu documentația în regulă. Autorizația și stadiul construcției sunt disponibile la cerere." },
              { Icon: ShieldCheck,  t: "Avansul tău, protejat",            d: "Plățile sunt corelate cu stadiul real al construcției. Mecanismul de protecție se detaliază în antecontract." },
              { Icon: CalendarClock,t: "Clauză clară de finalizare",       d: "Termen de predare și penalități de întârziere stabilite în antecontractul notarial." },
              { Icon: HardHat,      t: "Plătești corelat cu stadiul",      d: "Tranșele sunt legate de progresul real al construcției — nu plătești în avans pentru ce nu s-a făcut." },
              { Icon: BadgeCheck,   t: "Recepție înainte de ultima plată", d: "Ultima tranșă se achită după recepția apartamentului." },
              { Icon: Wallet,       t: "Prețul de la prima discuție e final", d: "Prețul pe care îl auzi la prima întâlnire este prețul final. Fără costuri ascunse care apar după semnare." },
              { Icon: Eye,          t: "Vizitezi șantierul oricând",       d: "Poți intra pe șantier să vezi structura, compartimentările și instalațiile înainte să cumperi." },
              { Icon: Landmark,     t: "Documentație transparentă",        d: "Autorizația, antecontractul și planurile pot fi puse la dispoziție pentru verificare." },
            ].map((b) => (
              <div key={b.t} className="rounded-3xl border border-border bg-card p-7 text-center">
                <b.Icon className="mx-auto h-9 w-9 text-primary" strokeWidth={1.5} />
                <h3 className="mt-4 text-lg font-semibold">{b.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b.d}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <a
              href="#contact"
              className="rounded-full border border-primary px-7 py-3 text-sm font-semibold text-primary hover:bg-accent transition-colors"
            >
              Discută condițiile contractuale cu un consultant
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-card py-12 md:py-20">
        <div className="mx-auto max-w-3xl px-5">
          <SectionHead kicker="Întrebări frecvente" title="Ce întreabă cei mai mulți cumpărători." />
          <div className="mt-10 divide-y divide-border rounded-3xl border border-border bg-background text-left">
            {FAQ.map((q, i) => (
              <div key={i} className="px-6">
                <button
                  onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="font-semibold">{q.q}</span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-primary transition-transform ${faqOpen === i ? "rotate-180" : ""}`}
                  />
                </button>
                {faqOpen === i && (
                  <p className="-mt-1 pb-5 text-sm leading-relaxed text-muted-foreground">{q.a}</p>
                )}
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Mai ai o întrebare?{" "}
            <a href="#contact" className="font-semibold text-primary hover:underline">
              Vorbește cu un consultant →
            </a>
          </p>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="cta-anchor py-12 md:py-20">
        <div className="mx-auto max-w-2xl px-5 text-center">
          <SectionHead
            kicker="Contact"
            title={<>Primește lista de prețuri și <Accent>planurile</Accent>.</>}
            sub="Lasă-ne datele sau sună-ne direct. Un consultant te contactează în maxim 24h cu disponibilitatea actuală și planurile apartamentelor."
          />
          <div className="mt-6 flex justify-center">
            <a
              href={`tel:${PHONE_TEL}`}
              className="inline-flex items-center gap-2 rounded-full border border-primary px-7 py-3 text-sm font-semibold text-primary hover:bg-accent transition-colors"
            >
              <Phone className="h-4 w-4" /> Sună acum: {PHONE_DISPLAY}
            </a>
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-sm text-muted-foreground">
            <a href={`mailto:${EMAIL}`} className="inline-flex items-center gap-1.5 hover:text-foreground">
              <Mail className="h-4 w-4 text-primary" /> {EMAIL}
            </a>
            <span>{PROGRAM}</span>
          </div>
          <div className="mx-auto mt-8 max-w-md text-left">
            <LeadForm variant="page" />
          </div>
        </div>
      </section>

      {/* MODAL */}
      {modal && (() => {
        const d = apartmentDetails[modal];
        return (
          <div
            className="fixed inset-0 z-[70] flex items-center justify-center p-4"
            onClick={() => setModal(null)}
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <div
              className="relative z-10 w-full max-w-lg rounded-3xl bg-background p-8 shadow-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setModal(null)} className="absolute right-5 top-5 text-muted-foreground hover:text-foreground">
                <X className="h-5 w-5" />
              </button>
              <h3 className="text-2xl font-semibold">{d.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{d.subtitle}</p>
              <div className="mt-4 flex items-end gap-2">
                <span className="text-3xl font-bold text-primary">{d.price}</span>
                <span className="mb-1 text-sm text-muted-foreground">{d.suffix}</span>
              </div>
              <div className="mt-6 divide-y divide-border">
                {d.rows.map((r) => (
                  <div key={r.l} className="flex justify-between py-3 text-sm">
                    <span className="text-muted-foreground">{r.l}</span>
                    <span className="font-medium text-right max-w-[55%]">{r.v}</span>
                  </div>
                ))}
              </div>
              <a
                href="#contact"
                onClick={() => setModal(null)}
                className="mt-6 block w-full rounded-full bg-primary py-3 text-center text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Solicită ofertă personalizată
              </a>
            </div>
          </div>
        );
      })()}

      {/* FOOTER */}
      <footer className="bg-[oklch(0.18_0.01_60)] py-10 text-center text-sm text-[oklch(0.7_0.01_80)]">
        <div className="mx-auto max-w-6xl px-5">
          <img src={logo.url} alt="Radu Vodă 25" className="mx-auto h-20 w-auto opacity-90" />
          <div className="mt-4">Str. Radu Vodă 25, Sector 4, București · Finalizare 2027</div>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            <a href={`tel:${PHONE_TEL}`} className="hover:text-white">{PHONE_DISPLAY}</a>
            <a href={`mailto:${EMAIL}`} className="hover:text-white">{EMAIL}</a>
            <span className="opacity-70">{PROGRAM}</span>
          </div>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-4 text-xs">
            <a href="https://anpc.ro/ce-este-sal/" target="_blank" rel="noreferrer" className="hover:text-white">ANPC-SAL</a>
            <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noreferrer" className="hover:text-white">SOL (ODR)</a>
          </div>
          <div className="mt-5 text-xs opacity-70">
            Prețurile afișate sunt fără TVA 19%. Imaginile sunt randări cu titlu de prezentare.
          </div>
        </div>
      </footer>

      {/* BARĂ STICKY JOS */}
      <div
        className={`fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 border-t border-border bg-background/95 backdrop-blur transition-transform duration-300 ${
          barHidden ? "translate-y-full" : "translate-y-0"
        }`}
      >
        <a
          href="#contact"
          className="flex items-center justify-center gap-2 bg-primary py-4 text-sm font-bold text-primary-foreground"
        >
          Solicită disponibilitățile
        </a>
        <a
          href={`tel:${PHONE_TEL}`}
          className="flex items-center justify-center gap-2 py-4 text-sm font-bold text-foreground"
        >
          <Phone className="h-4 w-4 text-primary" /> Sună acum
        </a>
      </div>
    </div>
  );
}

function LeadForm({ variant }: { variant: "hero" | "page" }) {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [err, setErr] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr(false);
    setSending(true);
    try {
      const data = Object.fromEntries(new FormData(e.currentTarget).entries());
      if (LEAD_ENDPOINT) {
        const res = await fetch(LEAD_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error("fail");
      } else {
        await new Promise((r) => setTimeout(r, 700));
      }
      setSent(true);
    } catch {
      setErr(true);
    } finally {
      setSending(false);
    }
  }

  const card = variant === "hero" ? "bg-background/95 backdrop-blur shadow-2xl" : "bg-card shadow-sm";

  if (sent) {
    return (
      <div className={`rounded-3xl border border-border ${card} p-7 text-center`}>
        <BadgeCheck className="mx-auto h-10 w-10 text-primary" />
        <div className="mt-2 text-2xl font-semibold text-primary">Mulțumim!</div>
        <p className="mt-2 text-sm text-muted-foreground">
          Un consultant te contactează în cel mai scurt timp. Pentru ceva urgent, sună la {PHONE_DISPLAY}.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`rounded-3xl border border-border ${card} p-5 md:p-6`}>
      {variant === "hero" && (
        <p className="mb-3 text-sm font-semibold text-foreground">Primește lista de prețuri + planurile</p>
      )}
      <div className="space-y-3">
        <input
          required
          name="nume"
          placeholder="Nume complet"
          className="w-full rounded-full border border-border bg-background px-5 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
        />
        <input
          required
          type="tel"
          name="telefon"
          placeholder="Telefon"
          className="w-full rounded-full border border-border bg-background px-5 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
        />
        <input
          type="email"
          name="email"
          placeholder="Email (opțional)"
          className="w-full rounded-full border border-border bg-background px-5 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
        />
        <select
          name="tip"
          className="w-full rounded-full border border-border bg-background px-5 py-3 text-foreground focus:border-primary focus:outline-none"
        >
          <option value="">Mă interesează…</option>
          <option>Apartament 2 camere</option>
          <option>Apartament 3 camere</option>
          <option>Apartament etaj 5 (terasă)</option>
          <option>Spațiu comercial</option>
          <option>Încă decid</option>
        </select>
        {err && (
          <p className="text-sm text-red-600">
            Ceva n-a mers. Încearcă din nou sau sună-ne la {PHONE_DISPLAY}.
          </p>
        )}
        <button
          type="submit"
          disabled={sending}
          className="w-full rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-60"
        >
          {sending ? "Se trimite…" : "Vreau oferta și planurile"}
        </button>
        <p className="text-center text-[11px] text-muted-foreground">
          Prin trimitere ești de acord să fii contactat în legătură cu proiectul.
        </p>
      </div>
    </form>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-background text-muted-foreground hover:border-primary"
      }`}
    >
      {children}
    </button>
  );
}

function ApartCard({
  img, alt, title, sub, price, priceReduced, suffix, extra, tag, onDetails,
}: {
  img: string; alt: string; title: string; sub: string;
  price: string; priceReduced?: string; suffix: string;
  extra: string; tag: string | null; onDetails: () => void;
}) {
  return (
    <div
      className={`group flex flex-col overflow-hidden rounded-3xl bg-background text-center ${
        tag === "Cel mai solicitat" ? "border-2 border-primary" : "border border-border"
      }`}
    >
      <div className="relative overflow-hidden">
        <img
          src={img}
          alt={alt}
          className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {tag && (
          <span className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
            {tag}
          </span>
        )}
        <span className="absolute right-3 bottom-3 rounded bg-black/45 px-2 py-0.5 text-[10px] text-white/80">Randare</span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{sub}</p>
        <div className="mt-4">
          {priceReduced ? (
            <div>
              <div className="text-sm text-muted-foreground line-through">{price}</div>
              <div className="text-2xl font-bold text-primary">
                {priceReduced} <span className="text-sm font-normal text-muted-foreground">{suffix}</span>
              </div>
            </div>
          ) : (
            <div className="text-2xl font-bold text-primary">
              {price} <span className="text-sm font-normal text-muted-foreground">{suffix}</span>
            </div>
          )}
          <div className="text-xs text-muted-foreground">{extra}</div>
        </div>
        <div className="mt-auto flex items-center justify-center gap-4 pt-5">
          <button onClick={onDetails} className="text-sm font-semibold text-primary hover:underline">
            Vezi detalii →
          </button>
          <a href="#contact" className="text-sm text-muted-foreground hover:underline">
            Solicită ofertă
          </a>
        </div>
      </div>
    </div>
  );
}
