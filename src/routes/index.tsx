import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

const brandLogos = [
  { name: "Geberit",        src: "/images/brands/geberit.png",        w: "max-w-[140px]", f: "" },
  { name: "Ideal Standard", src: "/images/brands/ideal-standard.png", w: "max-w-[140px]", f: "" },
  { name: "Rockwool",       src: "/images/brands/rockwool.png",       w: "max-w-[140px]", f: "" },
  { name: "Knauf",          src: "/images/brands/knauf.png",          w: "max-w-[140px]", f: "" },
  { name: "Alumil",         src: "/images/brands/alumil.png",         w: "max-w-[140px]", f: "" },
  { name: "Equitone",       src: "/images/brands/equitone.png",       w: "max-w-[180px]", f: "" },
  { name: "Porcelanosa",    src: "/images/brands/porcelanosa.png",    w: "max-w-[180px]", f: "" },
  { name: "Legrand",        src: "/images/brands/legrand.png",        w: "max-w-[140px]", f: "" },
];

const logo = { url: "/images/logo-transparent.png" };
// Exterioale
const hero    = { url: "/images/IMG_3068.jpg" }; // noapte, dramatic, cinematic
const extDay  = { url: "/images/IMG_3069.jpg" }; // zi, clădire completă + cer albastru
const extLife = { url: "/images/IMG_3070.jpg" }; // balcoane cu oameni + cupolă biserică
const extDay2 = { url: "/images/IMG_3072.jpg" }; // exterior 2 unghi diferit
const extNight2 = { url: "/images/IMG_3073.jpg" }; // noapte 2, similar hero
// Interioare
const intKitchen  = { url: "/images/IMG_3056.jpg" }; // bucătărie + living, parkhet lemn
const intBathLux  = { url: "/images/IMG_3057.jpg" }; // baie marmură + cadă + femeie blurred
const intBathBlack = { url: "/images/IMG_3058.jpg" }; // baie marmură cu armături negre
const intBathWarm = { url: "/images/IMG_3059.jpg" }; // baie caldă beige stilizată
const intBed      = { url: "/images/IMG_3060.jpg" }; // dormitor cu fereastră podea-tavan spre balcon
const intLiving   = { url: "/images/IMG_3061.jpg" }; // living luminos cu uși franceze spre balcon
const intShower   = { url: "/images/IMG_3062.jpg" }; // duș sticlă + femeie blurred, piatra bej
// Finisaj întunecat (parchet walnut) — mai premium, cu balcoane mobilate
const darkBed     = { url: "/images/IMG_3063.jpg" }; // dormitor walnut + balcon mobilat cu plante
const darkLiving  = { url: "/images/IMG_3064.jpg" }; // salon walnut + uși franceze + balcon cu fotolii rattan
const darkKitchen = { url: "/images/IMG_3065.jpg" }; // bucătărie walnut + lumini LED + stager styling

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Radu Vodă 25. Apartamente boutique lângă Piața Unirii" },
      { name: "description", content: "Proiect boutique cu 26 de apartamente la câteva minute de Piața Unirii. Prețuri de la 236.512€. Finalizare 2027. Plan de plată etapizat." },
      { property: "og:title", content: "Radu Vodă 25. Apartamente boutique lângă Piața Unirii" },
      { property: "og:description", content: "26 de apartamente în centrul Bucureștiului. Avans 30%. Reducere 5%." },
      { property: "og:image", content: hero.url },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

function Accent({ children }: { children: React.ReactNode }) {
  return <span className="text-primary">{children}</span>;
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-accent-foreground">
      {children}
    </div>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
      {children}
    </span>
  );
}

const apartmentDetails = {
  "2cam": {
    title: "Apartament 2 camere",
    subtitle: "63-74 mp utili, balcon până la 14 mp",
    price: "224.686€*",
    priceFull: "236.512€",
    avans: "Avans de la 67.000€",
    rows: [
      { l: "Suprafață utilă", v: "63-74 mp" },
      { l: "Balcon", v: "până la 14 mp" },
      { l: "Compartimentare", v: "Hol, cameră de zi, bucătărie, dormitor, baie" },
      { l: "Orientare balcon", v: "Spre curte sau stradă" },
      { l: "Etaje disponibile", v: "1-4" },
      { l: "Plan plată", v: "Avans 30%, plată eșalonată conform grafic" },
      { l: "TVA", v: "Prețul nu include TVA" },
    ],
    note: "Ideal pentru cupluri sau investiție cu randament ridicat în centrul Bucureștiului.",
  },
  "3cam": {
    title: "Apartament 3 camere",
    subtitle: "82-109 mp utili, balcon sau terasă până la 44 mp",
    price: "337.769€*",
    priceFull: "355.547€",
    avans: "Avans 30%",
    rows: [
      { l: "Suprafață utilă", v: "82-109 mp" },
      { l: "Balcon sau terasă", v: "până la 44 mp" },
      { l: "Compartimentare", v: "Hol, cameră de zi, bucătărie, 2 dormitoare, 2 băi" },
      { l: "Extra", v: "Unele unități au terasă generoasă privată" },
      { l: "Etaje disponibile", v: "1-4" },
      { l: "Plan plată", v: "Avans 30%, plată eșalonată conform grafic" },
      { l: "TVA", v: "Prețul nu include TVA" },
    ],
    note: "Cel mai solicitat tip de unitate. Perfect pentru familii care vor centrul fără compromisuri.",
  },
  "ph": {
    title: "Penthouse",
    subtitle: "Etaj 5, 86-109 mp utili, terase extinse, vedere panoramică",
    price: "Preț la cerere",
    priceFull: "",
    avans: "Câteva unități disponibile",
    rows: [
      { l: "Suprafață utilă", v: "86-109 mp" },
      { l: "Terase private", v: "Extinse, mult mai mari față de etajele inferioare" },
      { l: "Compartimentare", v: "Hol, cameră de zi, bucătărie, 2 dormitoare, 2 băi" },
      { l: "Etaj", v: "5 (ultimul etaj)" },
      { l: "Vedere", v: "Panoramică, spații exterioare private" },
      { l: "Finisaje", v: "Superioare față de restul proiectului" },
      { l: "Disponibilitate", v: "Câteva unități, exclusivitate maximă în proiect" },
    ],
    note: "Exclusivitate maximă în proiect. Finisaje superioare și spații exterioare private mult mai mari.",
  },
};

function Index() {
  const [sent, setSent] = useState(false);
  const [modal, setModal] = useState<keyof typeof apartmentDetails | null>(null);

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">

      {/* NAV */}
      <header className="fixed top-0 z-50 w-full border-b border-border/60 bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:h-20">
          <a href="#top">
            <img src={logo.url} alt="Radu Vodă 25" className="h-12 w-auto md:h-16" />
          </a>
          <nav className="hidden gap-7 text-sm text-muted-foreground md:flex">
            <a href="#proiect" className="hover:text-foreground transition-colors">Proiect</a>
            <a href="#apartamente" className="hover:text-foreground transition-colors">Apartamente</a>
            <a href="#locatie" className="hover:text-foreground transition-colors">Locație</a>
            <a href="#contact" className="hover:text-foreground transition-colors">Contact</a>
          </nav>
          <a href="#contact" className="rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition-colors md:px-5 md:text-sm">
            Disponibilități
          </a>
        </div>
      </header>

      {/* ── 1. HERO MOBILE FULL-SCREEN ── */}
      {/* Mobile: poza full-screen cu overlay + text deasupra */}
      <section id="top" className="relative md:hidden">
        <div className="relative h-[100svh] overflow-hidden">
          <img
            src={hero.url}
            alt="Fațada Radu Vodă 25, București"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: "center 35%" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />
          <div className="absolute inset-0 flex flex-col justify-end p-6 pb-10">
            <span className="mb-3 inline-block w-fit rounded-full bg-primary/20 border border-primary/40 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary">Imobil boutique, Piața Unirii</span>
            <h1 className="text-[1.75rem] font-semibold leading-tight text-white">
              Una dintre puținele șanse de a cumpăra un apartament nou{" "}
              <span className="text-primary">lângă Piața Unirii</span>.
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-white/80">
              26 de apartamente boutique în centrul Bucureștiului. Finalizare 2027.
            </p>
            <div className="mt-5 grid grid-cols-2 gap-2">
              {[
                { n: "de la 236.512€", l: "preț" },
                { n: "30%", l: "avans minim" },
                { n: "26", l: "apartamente" },
                { n: "2027", l: "finalizare" },
              ].map((s) => (
                <div key={s.l} className="rounded-xl bg-white/10 backdrop-blur-sm px-3 py-2">
                  <div className="text-sm font-bold text-primary">{s.n}</div>
                  <div className="text-xs text-white/70">{s.l}</div>
                </div>
              ))}
            </div>
            <a href="#contact" className="mt-5 block w-full rounded-full bg-primary py-4 text-center text-sm font-bold text-primary-foreground">
              Solicită disponibilitățile
            </a>
            <a href="#proiect" className="mt-3 block w-full rounded-full border border-white/30 py-3 text-center text-sm font-semibold text-white">
              Descoperă proiectul
            </a>
          </div>
          <div className="absolute right-4 top-20 rounded-2xl bg-primary px-3 py-2 text-center shadow-lg">
            <div className="text-xs font-semibold text-primary-foreground">REDUCERE</div>
            <div className="text-2xl font-bold text-primary-foreground">5%</div>
            <div className="text-xs text-primary-foreground/80">unități selectate</div>
          </div>
        </div>
      </section>

      {/* Desktop hero */}
      <section id="top-desktop" className="hidden md:block mx-auto max-w-6xl px-5 pb-6 pt-40">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <Eyebrow>Imobil boutique, Piața Unirii</Eyebrow>
            <h1 className="mt-4 text-5xl font-semibold leading-[1.1] tracking-tight lg:text-6xl">
              Una dintre puținele oportunități de a cumpăra un apartament nou{" "}
              <Accent>lângă Piața Unirii</Accent>.
            </h1>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
              Radu Vodă 25 este un proiect boutique cu doar 26 de apartamente, conceput pentru cei care înțeleg că valoarea unei proprietăți nu este dată doar de metri pătrați, ci și de locația pe care o ocupă în oraș.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["La câteva minute de Piața Unirii", "Doar 26 de apartamente", "Finalizare 2027", "Plan de plată etapizat"].map((t) => (
                <span key={t} className="rounded-full bg-accent px-3.5 py-1.5 text-sm text-accent-foreground">✓ {t}</span>
              ))}
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#contact" className="rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
                Solicită disponibilitățile actuale
              </a>
              <a href="#proiect" className="rounded-full border border-primary px-7 py-3 text-sm font-semibold text-primary hover:bg-accent transition-colors">
                Descoperă proiectul
              </a>
            </div>
            <div className="mt-10 flex flex-wrap gap-8 border-t border-border pt-8">
              {[
                { n: "de la 236.512€", l: "preț apartamente" },
                { n: "30%", l: "avans minim" },
                { n: "26", l: "apartamente" },
                { n: "2027", l: "finalizare" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="text-xl font-bold text-primary">{s.n}</div>
                  <div className="text-sm text-muted-foreground">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative overflow-hidden rounded-3xl">
            <img
              src={hero.url}
              alt="Fațada Radu Vodă 25, București"
              className="aspect-[4/5] w-full object-cover shadow-xl transition-transform duration-700 hover:scale-105"
              style={{ objectPosition: "center 35%" }}
            />
            <div className="absolute right-4 top-4 rounded-2xl bg-primary px-4 py-3 text-center shadow-lg">
              <div className="text-xs font-semibold text-primary-foreground">REDUCERE</div>
              <div className="text-3xl font-bold text-primary-foreground">5%</div>
              <div className="text-xs text-primary-foreground/80">unități selectate</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BRANDS MARQUEE ── */}
      <section className="pt-0 pb-12 overflow-hidden">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-8">
          Materiale și echipamente <span className="text-primary text-lg font-black mx-2">+</span> Branduri internaționale
        </p>
        <div className="overflow-hidden">
          <div className="marquee-track">
            {[...brandLogos, ...brandLogos].map((b, i) => (
              <div key={i} className="mx-5 shrink-0 flex items-center justify-center rounded-2xl px-7 py-5" style={{ background: "rgba(255,255,255,0.95)" }}>
                <img
                  src={b.src}
                  alt={b.name}
                  className={`h-12 w-auto ${b.w} object-contain`}
                  style={b.f ? { filter: b.f } : {}}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2. LOCAȚIE CARE ECONOMISEȘTE TIMP (= "Minute pe care le câștigi" la Cordia) ── */}
      <section id="proiect" className="bg-card py-12 md:py-20">
        <div className="mx-auto max-w-6xl px-5">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <Eyebrow>Locație</Eyebrow>
              <h2 className="mt-4 text-2xl font-semibold leading-tight md:text-4xl">
                O locație care <Accent>economisește timp</Accent>.
              </h2>
              <p className="mt-4 text-muted-foreground">
                Într-un oraș în care traficul consumă ore în fiecare săptămână, locația devine una dintre cele mai valoroase resurse. La Radu Vodă 25, majoritatea punctelor de interes sunt la câteva minute distanță.
              </p>
              {/* Distanțe highlight – ca blocul de stats Cordia */}
              <div className="mt-8 rounded-3xl bg-background p-6">
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { n: "5 min", l: "Metrou Piața Unirii" },
                    { n: "5 min", l: "Centru Istoric" },
                    { n: "10 min", l: "Piața Unirii (mers)" },
                    { n: "40 min", l: "Aeroport Henri Coandă" },
                  ].map((d) => (
                    <div key={d.l} className="border-l-2 border-primary pl-4">
                      <div className="text-2xl font-bold text-primary">{d.n}</div>
                      <div className="text-sm text-muted-foreground">{d.l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="overflow-hidden rounded-3xl shadow-lg">
              <iframe
                title="Locație Radu Vodă 25, București"
                src="https://maps.google.com/maps?q=Strada+Radu+Vod%C4%83+nr.+25%2C+Sector+4%2C+Bucure%C8%99ti%2C+Romania&z=18&output=embed"
                className="aspect-[4/3] w-full border-0"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. DE CE CENTRUL BUCUREȘTIULUI (= "Totul la îndemână" la Cordia) ── */}
      <section className="py-12 md:py-20">
        <div className="mx-auto max-w-6xl px-5">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className="overflow-hidden rounded-3xl shadow-lg">
              <img
                src={extLife.url}
                alt="Balcoane Radu Vodă 25 cu vedere spre centrul Bucureștiului"
                className="aspect-[4/3] w-full object-cover transition-transform duration-700 hover:scale-105"
                style={{ objectPosition: "center top" }}
              />
            </div>
            <div>
              <Eyebrow>Context</Eyebrow>
              <h2 id="locatie" className="mt-4 text-2xl font-semibold leading-tight md:text-4xl">
                De ce este atât de dificil să găsești o proprietate nouă în{" "}
                <Accent>centrul Bucureștiului</Accent>?
              </h2>
              <p className="mt-4 text-muted-foreground">
                Majoritatea dezvoltărilor rezidențiale noi s-au concentrat în zone aflate în expansiune, unde terenurile sunt mai accesibile. Zone precum Piața Unirii sunt deja construite și consolidate. Oportunitățile de a dezvolta proiecte noi devin din ce în ce mai rare.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Imobil premium în centrul istoric al Bucureștiului",
                  "Acces direct la metrou, în 5 minute",
                  "Parcare subterană inclusă",
                  "Investiție cu potențial de valorificare pe termen lung",
                  "Grad superior de siguranță al construcției",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 text-primary font-bold">✓</span>
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. AVANTAJE / CARACTERISTICI (= facilități Cordia) ── */}
      <section className="bg-card py-12 md:py-20">
        <div className="mx-auto max-w-6xl px-5">
          <Eyebrow>De ce Radu Vodă 25</Eyebrow>
          <h2 className="mt-4 max-w-2xl text-3xl font-semibold leading-tight md:text-4xl">
            Construit pentru <Accent>confortul de zi cu zi</Accent>.
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: "🏛️", t: "Imobil Premium", d: "Arhitectură modernă, fațadă ventilată, izolație cu vată bazaltică. Construit pentru durată." },
              { icon: "🌿", t: "Centru Istoric și Verde", d: "Amplasat în inima Bucureștiului, lângă parcuri și spații verzi, la câțiva pași de Piața Unirii." },
              { icon: "🔒", t: "Grad Superior de Siguranță", d: "Zidărie masivă, tâmplărie premium din aluminiu, sisteme moderne de instalații." },
              { icon: "🚗", t: "Parcare Subterană", d: "44 de locuri de parcare, 40 subterane, inclusiv stații de încărcare pentru vehicule electrice." },
              { icon: "⚡", t: "Branduri Internaționale", d: "Geberit, Rockwool, Knauf, Alumil, Legrand, Porcelanosa, Equitone, Ideal Standard și altele." },
              { icon: "🏆", t: "Dezvoltator de Încredere", d: "Experiență dovedită în piața imobiliară din București, cu proiecte finalizate la termen." },
            ].map((b) => (
              <div key={b.t} className="rounded-3xl border border-border bg-background p-7 transition-shadow hover:shadow-md">
                <div className="text-3xl">{b.icon}</div>
                <h3 className="mt-4 text-lg font-semibold">{b.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b.d}</p>
              </div>
            ))}
          </div>
          {/* Galerie 4 poze */}
          <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
            {[
              { im: intBathWarm,  alt: "Baie cu marmură albă și armături negre matte", pos: "center center" },
              { im: darkKitchen,  alt: "Bucătărie cu finisaj premium walnut",      pos: "center center" },
              { im: intBathBlack, alt: "Baie cu marmură și armături negre",       pos: "center center" },
              { im: intShower,    alt: "Duș cu iluminat indirect",                pos: "center top"    },
            ].map((item, i) => (
              <div key={i} className="overflow-hidden rounded-2xl">
                <img
                  src={item.im.url}
                  alt={item.alt}
                  className="aspect-square w-full object-cover transition-transform duration-500 hover:scale-110"
                  style={{ objectPosition: item.pos }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. APARTAMENTE CU PREȚURI (= secțiunea apartamente Cordia cu price ranges) ── */}
      <section id="apartamente" className="py-12 md:py-20">
        <div className="mx-auto max-w-6xl px-5">
          <Eyebrow>Apartamente</Eyebrow>
          <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-semibold leading-tight md:text-4xl">
                26 de unități. <Accent>O selecție atent gândită.</Accent>
              </h2>
              <p className="mt-2 text-muted-foreground">2 subsoluri, parter (6.02m), mezanin, 5 etaje, finisaje premium.</p>
            </div>
            <Badge>Reducere -5% unități selectate</Badge>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {/* 2 camere */}
            <div className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-background">
              <div className="overflow-hidden">
                <img
                  src={darkLiving.url}
                  alt="Apartament 2 camere — salon cu balcon mobilat"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  style={{ objectPosition: "center center" }}
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-xl font-semibold">2 camere</h3>
                <p className="mt-1 text-sm text-muted-foreground">63-74 mp utili, balcon până la 14 mp</p>
                <div className="mt-4">
                  <div className="text-sm text-muted-foreground line-through">236.512€</div>
                  <div className="text-2xl font-bold text-primary">224.686€*</div>
                  <div className="text-xs text-muted-foreground">Avans de la 67.000€, plată în etape</div>
                </div>
                <p className="mt-3 text-sm">Ideal pentru cupluri sau investiție</p>
                <div className="mt-auto pt-5 flex gap-4 items-center">
                  <button onClick={() => setModal("2cam")} className="text-sm font-semibold text-primary hover:underline">
                    Vezi detalii →
                  </button>
                  <a href="#contact" className="text-sm text-muted-foreground hover:underline">Solicită ofertă</a>
                </div>
              </div>
            </div>

            {/* 3 camere */}
            <div className="group flex flex-col overflow-hidden rounded-3xl border-2 border-primary bg-background">
              <div className="relative overflow-hidden">
                <img
                  src={darkKitchen.url}
                  alt="Apartament 3 camere — bucătărie cu finisaje premium"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  style={{ objectPosition: "center center" }}
                />
                <span className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">Cel mai solicitat</span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-xl font-semibold">3 camere</h3>
                <p className="mt-1 text-sm text-muted-foreground">82-109 mp utili, balcon sau terasă până la 44 mp</p>
                <div className="mt-4">
                  <div className="text-sm text-muted-foreground line-through">355.547€</div>
                  <div className="text-2xl font-bold text-primary">337.769€*</div>
                  <div className="text-xs text-muted-foreground">Avans 30%, plată eșalonată</div>
                </div>
                <p className="mt-3 text-sm">Perfect pentru familii</p>
                <div className="mt-auto pt-5 flex gap-4 items-center">
                  <button onClick={() => setModal("3cam")} className="text-sm font-semibold text-primary hover:underline">
                    Vezi detalii →
                  </button>
                  <a href="#contact" className="text-sm text-muted-foreground hover:underline">Solicită ofertă</a>
                </div>
              </div>
            </div>

            {/* Penthouse */}
            <div className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-background">
              <div className="overflow-hidden">
                <img
                  src={intBathLux.url}
                  alt="Penthouse — baie cu marmură și cadă"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  style={{ objectPosition: "center 20%" }}
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-xl font-semibold">Penthouse</h3>
                <p className="mt-1 text-sm text-muted-foreground">Ultimul etaj, terase extinse, vedere panoramică</p>
                <div className="mt-4">
                  <div className="text-2xl font-bold text-primary">Preț la cerere</div>
                  <div className="text-xs text-muted-foreground">1 unitate disponibilă, exclusiv</div>
                </div>
                <p className="mt-3 text-sm">Pentru cei care caută excepționalul</p>
                <div className="mt-auto pt-5 flex gap-4 items-center">
                  <button onClick={() => setModal("ph")} className="text-sm font-semibold text-primary hover:underline">
                    Vezi detalii →
                  </button>
                  <a href="#contact" className="text-sm text-muted-foreground hover:underline">Contactează-ne</a>
                </div>
              </div>
            </div>
          </div>

          <p className="mt-4 text-xs text-muted-foreground">*Prețuri cu reducere de 5% pentru unitățile selectate. Prețurile nu includ TVA.</p>

          <div className="mt-10 text-center">
            <a href="#contact" className="inline-block rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
              Solicită planurile complete și disponibilitatea
            </a>
          </div>
        </div>
      </section>

      {/* ── 6. PLAN DE PLATĂ (= "De ce înainte de finalizare" la Cordia) ── */}
      <section className="bg-card py-12 md:py-20">
        <div className="mx-auto max-w-6xl px-5">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className="overflow-hidden rounded-3xl shadow-lg">
              <img
                src={extNight2.url}
                alt="Radu Vodă 25 — vedere nocturnă"
                className="aspect-[4/3] w-full object-cover transition-transform duration-700 hover:scale-105"
                style={{ objectPosition: "center 40%" }}
              />
            </div>
            <div>
              <Eyebrow>Plan de plată</Eyebrow>
              <h2 className="mt-4 text-2xl font-semibold leading-tight md:text-4xl">
                De ce să cumperi <Accent>înainte de finalizare</Accent>?
              </h2>
              <p className="mt-4 text-muted-foreground">
                Achiziția în faza de dezvoltare oferă o selecție mai bună și plată eșalonată pe etape de construcție. Radu Vodă 25 permite distribuirea investiției pe parcursul construcției.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  { step: "01", title: "Rezervare", sub: "Avans 30%", desc: "De la 67.000€. Blochezi unitatea și prețul actual." },
                  { step: "02", title: "Pe parcurs", sub: "Tranșe etapizate", desc: "Tranșe corelate cu stadiul lucrărilor." },
                  { step: "03", title: "Finalizare 2027", sub: "Ultima tranșă", desc: "Ultima tranșă la predare. Intri direct în apartament." },
                ].map((s) => (
                  <div key={s.step} className="rounded-2xl bg-background p-5">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-2xl font-bold text-primary">{s.step}</span>
                      <span className="font-semibold">{s.title}</span>
                      <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">{s.sub}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">{s.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. CONTACT ── */}
      <section id="contact" className="py-12 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-2 md:items-start">
          <div>
            <Eyebrow>Contact</Eyebrow>
            <h2 className="mt-4 text-2xl font-semibold leading-tight md:text-4xl">
              Disponibilități și <Accent>consultanță</Accent>.
            </h2>
            <p className="mt-4 max-w-md text-muted-foreground">
              Completați formularul. Un consultant vă va contacta pentru a discuta opțiunile disponibile și pentru a vă ajuta să identificați apartamentul potrivit.
            </p>
            <div className="mt-8 space-y-4 text-sm">
              {[
                { l: "Adresă", v: "Str. Radu Vodă 25, Sector 4, București" },
                { l: "Etapă", v: "Vânzare în curs, finalizare 2027" },
                { l: "Avans", v: "30%, de la 67.000€" },
                { l: "Reducere", v: "5% pentru unitățile selectate" },
              ].map((r) => (
                <div key={r.l} className="flex gap-3">
                  <span className="font-semibold text-primary shrink-0">{r.l}</span>
                  <span className="text-muted-foreground">{r.v}</span>
                </div>
              ))}
            </div>
          </div>

          <form
            onSubmit={(e) => { e.preventDefault(); setSent(true); }}
            className="rounded-3xl border border-border bg-card p-7 shadow-sm md:p-9"
          >
            {sent ? (
              <div className="flex h-full min-h-[360px] flex-col items-center justify-center text-center">
                <div className="text-4xl font-semibold text-primary">Mulțumim.</div>
                <p className="mt-3 max-w-xs text-sm text-muted-foreground">
                  Un consultant vă va contacta în cel mai scurt timp pentru a discuta disponibilitățile.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {[
                  { n: "nume", l: "Nume complet", t: "text" },
                  { n: "email", l: "Email", t: "email" },
                  { n: "telefon", l: "Telefon", t: "tel" },
                ].map((f) => (
                  <input
                    key={f.n}
                    required
                    type={f.t}
                    name={f.n}
                    placeholder={f.l}
                    className="w-full rounded-full border border-border bg-background px-5 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                  />
                ))}
                <select
                  name="tip"
                  className="w-full rounded-full border border-border bg-background px-5 py-3 text-foreground focus:border-primary focus:outline-none"
                >
                  <option value="">Tip apartament</option>
                  <option>2 camere</option>
                  <option>3 camere</option>
                  <option>Penthouse</option>
                  <option>Indiferent</option>
                </select>
                <button
                  type="submit"
                  className="w-full rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  Solicită disponibilitățile actuale
                </button>
                <p className="text-xs text-muted-foreground">
                  Prin trimiterea formularului, ești de acord să fii contactat în legătură cu proiectul Radu Vodă 25.
                </p>
              </div>
            )}
          </form>
        </div>
      </section>

      {/* ── APARTMENT DETAIL MODAL ── */}
      {modal && (() => {
        const d = apartmentDetails[modal];
        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setModal(null)}>
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <div
              className="relative z-10 w-full max-w-lg rounded-3xl bg-background p-8 shadow-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setModal(null)}
                className="absolute right-5 top-5 text-muted-foreground hover:text-foreground text-xl leading-none"
              >
                ✕
              </button>
              <h3 className="text-2xl font-semibold">{d.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{d.subtitle}</p>
              <div className="mt-4 flex items-end gap-3">
                <span className="text-3xl font-bold text-primary">{d.price}</span>
                {d.priceFull && <span className="text-sm text-muted-foreground line-through mb-1">{d.priceFull}</span>}
              </div>
              <p className="text-xs text-muted-foreground">{d.avans}</p>
              <div className="mt-6 divide-y divide-border">
                {d.rows.map((r) => (
                  <div key={r.l} className="flex justify-between py-3 text-sm">
                    <span className="text-muted-foreground">{r.l}</span>
                    <span className="font-medium text-right max-w-[55%]">{r.v}</span>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-sm text-muted-foreground italic">{d.note}</p>
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

      <footer className="bg-[oklch(0.18_0.01_60)] py-8 text-center text-sm text-[oklch(0.7_0.01_80)]">
        <div className="mx-auto max-w-6xl px-5">
          © {new Date().getFullYear()} Radu Vodă <span className="text-primary">25</span>. Str. Radu Vodă 25, Sector 4, București. Finalizare 2027. Prețurile nu includ TVA.
        </div>
      </footer>
    </div>
  );
}
