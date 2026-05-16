import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowRight, Flame, ShieldCheck, Wrench, GraduationCap, Search, Lock, Truck,
  ChevronLeft, ChevronRight, CheckCircle2, Award, Building2, Users,
  Phone, Mail, MessageCircle,
} from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { SectionHeader } from "@/components/site/SectionHeader";
import { CTASection } from "@/components/site/CTASection";
import heroFire from "@/assets/hero-firefighters.jpg";
import heroSprink from "@/assets/hero-sprinkler.jpg";
import heroSec from "@/assets/hero-security.jpg";
import heroTrain from "@/assets/hero-training.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ONE FIRE Safety & Security — Your Number One Partner" },
      { name: "description", content: "Enterprise-grade fire protection, life-safety systems and security infrastructure. NFPA & BS compliant. A company of Alinex Ent." },
    ],
  }),
  component: HomePage,
});

const SLIDES = [
  {
    img: heroFire,
    eyebrow: "Fire Safety & Security",
    title: "Your Number One Partner\nin Fire Safety & Security",
    sub: "A company of ALINEX ENT. delivering professional, high-grade fire protection and security infrastructure systems.",
  },
  {
    img: heroSprink,
    eyebrow: "Fire Protection Systems",
    title: "High Performance Services\nfor Industries & Technologies",
    sub: "Sprinklers, hydrants, foam systems and fire alarms — engineered to NFPA & BS standards.",
  },
  {
    img: heroSec,
    eyebrow: "Security Infrastructure",
    title: "Safety First\nis Safety Always",
    sub: "Integrated surveillance, access control and emergency response solutions for enterprise facilities.",
  },
  {
    img: heroTrain,
    eyebrow: "Trainings & Audits",
    title: "Train. Audit. Protect.",
    sub: "Industry-recognised fire-safety training, health & safety audits and certified maintenance contracts.",
  },
];

function HeroSlider() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % SLIDES.length), 6500);
    return () => clearInterval(t);
  }, []);
  const s = SLIDES[i];
  return (
    <section className="relative h-[88vh] min-h-[640px] w-full overflow-hidden bg-charcoal text-white">
      {SLIDES.map((slide, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-1000 ${idx === i ? "opacity-100" : "opacity-0"}`}
        >
          <img
            src={slide.img}
            alt=""
            className="absolute inset-0 h-full w-full object-cover slide-fade"
            {...(idx === 0 ? { fetchPriority: "high" as const } : { loading: "lazy" as const })}
          />
          <div className="absolute inset-0 hero-vignette" />
          <div className="absolute inset-0 bg-charcoal/55" />
        </div>
      ))}
      <div className="absolute inset-0 grid-bg opacity-[0.08]" />

      <div className="relative h-full container-x flex flex-col justify-center">
        <div key={i} className="max-w-3xl reveal">
          <span className="eyebrow !text-primary">{s.eyebrow}</span>
          <h1 className="mt-5 font-display font-extrabold text-4xl md:text-6xl lg:text-7xl leading-[1.02] whitespace-pre-line">
            {s.title}
          </h1>
          <p className="mt-6 max-w-2xl text-white/80 text-lg leading-relaxed">{s.sub}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/services" className="btn-primary !py-4 !px-7 text-base">
              Explore Solutions <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/contact" className="btn-outline-light !py-4 !px-7 text-base">
              Contact an Expert
            </Link>
          </div>
        </div>

        {/* slide controls */}
        <div className="absolute right-6 lg:right-10 bottom-10 flex items-center gap-3">
          <button
            aria-label="Previous"
            onClick={() => setI((v) => (v - 1 + SLIDES.length) % SLIDES.length)}
            className="h-11 w-11 rounded-full border border-white/25 hover:bg-white/10 flex items-center justify-center"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            aria-label="Next"
            onClick={() => setI((v) => (v + 1) % SLIDES.length)}
            className="h-11 w-11 rounded-full border border-white/25 hover:bg-white/10 flex items-center justify-center"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="absolute left-6 lg:left-10 bottom-10 flex gap-2">
          {SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              aria-label={`Slide ${idx + 1}`}
              className={`h-1 rounded-full transition-all ${idx === i ? "bg-primary w-12" : "bg-white/30 w-6"}`}
            />
          ))}
        </div>
      </div>

      {/* Stats strip */}
      <div className="absolute inset-x-0 bottom-0 hidden md:block">
        <div className="container-x">
          <div className="bg-white text-charcoal grid grid-cols-4 rounded-t-xl shadow-elevated overflow-hidden">
            {[
              ["20+", "Years of Service"],
              ["500+", "Projects Delivered"],
              ["24/7", "Emergency Response"],
              ["NFPA / BS", "Compliance Standards"],
            ].map(([n, l]) => (
              <div key={l} className="px-6 py-5 border-r last:border-r-0 border-border">
                <div className="text-2xl md:text-3xl font-extrabold text-primary">{n}</div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const PILLARS = [
  { icon: Flame, t: "Protection", d: "Sprinklers, hydrants & suppression engineered for hazard." },
  { icon: Search, t: "Detection", d: "Smoke, heat & gas detection integrated with control panels." },
  { icon: ShieldCheck, t: "Prevention", d: "Audits, training and code-compliant facility design." },
  { icon: Lock, t: "Security", d: "Access control, CCTV and 24/7 monitoring infrastructure." },
];

function AboutBlock() {
  return (
    <section className="section bg-surface">
      <div className="container-x grid lg:grid-cols-[1.1fr_1fr] gap-12 items-center">
        <div>
          <SectionHeader
            eyebrow="About ONE FIRE"
            title="An authoritative name in fire protection & life safety."
            description="ONE FIRE Safety & Security is a proud company of ALINEX ENT., bringing decades of combined industrial expertise to high-stake environments — from manufacturing plants and warehouses to commercial high-rises."
          />
          <ul className="mt-8 space-y-3">
            {[
              "Turnkey design, supply, install & commission",
              "NFPA & BS code-compliant engineering",
              "Annual maintenance & rapid response contracts",
              "Certified trainings for industrial workforces",
            ].map((t) => (
              <li key={t} className="flex items-start gap-3 text-sm md:text-base text-charcoal/85">
                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" /> {t}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex gap-3">
            <Link to="/about" className="btn-primary">Our Story <ArrowRight className="h-4 w-4" /></Link>
            <Link to="/services" className="btn-outline-dark">View Services</Link>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5">
          {PILLARS.map(({ icon: Icon, t, d }) => (
            <div key={t} className="card-elevated rounded-xl p-6">
              <div className="h-12 w-12 rounded-md bg-primary/10 text-primary flex items-center justify-center">
                <Icon className="h-6 w-6" />
              </div>
              <h4 className="mt-5 text-lg font-bold text-charcoal">{t}</h4>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const SERVICES = [
  { icon: Flame, t: "Fire Protection Systems", d: "Sprinklers, hydrants, foam, gaseous suppression and fire alarm systems." },
  { icon: GraduationCap, t: "Fire & Safety Trainings", d: "Practical, certified safety training for industrial workforces." },
  { icon: Wrench, t: "Servicing & Maintenance", d: "AMC contracts for extinguishers, alarms & suppression systems." },
  { icon: Search, t: "Fire, Health & Safety Audits", d: "Independent audits against NFPA, BS and OSHA frameworks." },
  { icon: Lock, t: "Security Systems", d: "CCTV, access control, intrusion detection & integrated monitoring." },
  { icon: Building2, t: "Turnkey Industrial Solutions", d: "End-to-end project delivery for plants, warehouses and high-rises." },
];

function Services() {
  return (
    <section className="section">
      <div className="container-x">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <SectionHeader eyebrow="Core Services" title="Engineered protection for industrial complexity." />
          <Link to="/services" className="btn-outline-dark self-start md:self-end">All Services <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map(({ icon: Icon, t, d }, i) => (
            <Link
              key={t}
              to="/services"
              className="card-elevated group rounded-xl p-7 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 text-7xl font-extrabold text-surface select-none leading-none">
                0{i + 1}
              </div>
              <div className="relative">
                <div className="h-12 w-12 rounded-md bg-charcoal text-white flex items-center justify-center group-hover:bg-primary transition-colors">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-lg font-bold text-charcoal">{t}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{d}</p>
                <div className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                  Read more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

const PRODUCTS = [
  { t: "Smoke Detectors", d: "Photoelectric & ionisation detectors for early warning." },
  { t: "Fire Sprinklers", d: "Standard, ESFR and concealed sprinkler heads." },
  { t: "SCBA Systems", d: "Self-contained breathing apparatus for hazardous entry." },
  { t: "Fire Alarm Panels", d: "Addressable & conventional control panels." },
  { t: "Fall Arrest Equipment", d: "Harnesses, lanyards and confined-space rescue kits." },
  { t: "Rescue Equipment", d: "Hydraulic cutters, spreaders and rescue rams." },
  { t: "PPE & Chemical Suits", d: "Dupont coveralls, Newtex fire-entry & welding suits." },
  { t: "Fire Vehicles", d: "Fire trucks and industrial fire-fighting vehicles." },
];

function Products() {
  return (
    <section className="section bg-surface">
      <div className="container-x">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <SectionHeader eyebrow="Featured Products" title="Equipment trusted on the front line." />
          <Link to="/products" className="btn-outline-dark self-start md:self-end">Browse Catalogue <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PRODUCTS.map((p) => (
            <Link
              key={p.t}
              to="/products/$slug"
              params={{ slug: p.t.toLowerCase().replace(/[^a-z0-9]+/g, "-") }}
              className="card-elevated rounded-xl overflow-hidden group"
            >
              <div className="aspect-[4/3] bg-charcoal relative overflow-hidden">
                <div className="absolute inset-0 grid-bg opacity-10" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Flame className="h-16 w-16 text-primary group-hover:scale-110 transition-transform" strokeWidth={1.2} />
                </div>
                <div className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-widest text-white bg-primary px-2 py-1 rounded">Featured</div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-charcoal">{p.t}</h3>
                <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{p.d}</p>
                <div className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary">
                  Explore more <ArrowRight className="h-3 w-3" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyUs() {
  return (
    <section className="section bg-charcoal text-white relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-[0.06]" />
      <div className="absolute -top-32 right-1/3 h-96 w-96 rounded-full bg-primary/25 blur-3xl" />
      <div className="container-x relative">
        <div className="max-w-3xl">
          <span className="eyebrow !text-primary">Why Choose Us</span>
          <h2 className="mt-4 font-display text-3xl md:text-5xl font-extrabold leading-[1.05]">
            A partner accountable for <span className="text-gradient-fire">every alarm, valve and exit sign</span>.
          </h2>
        </div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { n: "500+", l: "Industrial projects delivered", icon: Building2 },
            { n: "20+", l: "Years of operational expertise", icon: Award },
            { n: "100%", l: "NFPA & BS compliant designs", icon: ShieldCheck },
            { n: "24/7", l: "Emergency response operations", icon: Users },
          ].map(({ n, l, icon: Icon }) => (
            <div key={l} className="border border-white/10 rounded-xl p-6 backdrop-blur-sm bg-white/[0.03]">
              <Icon className="h-7 w-7 text-primary" />
              <div className="mt-5 text-4xl font-extrabold">{n}</div>
              <div className="mt-1 text-sm text-white/60">{l}</div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap gap-4 items-center justify-center text-xs uppercase tracking-widest text-white/40">
          {["NFPA Standards", "BS EN 54", "ISO 9001:2015", "OSHA Aligned", "Pakistan Civil Defence"].map((s) => (
            <span key={s} className="px-4 py-2 border border-white/15 rounded-full">{s}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

const PROFILES = [
  {
    name: "Syed Anas Ali",
    role: "Director — Operations",
    email: "anas@onefiresafety.com",
    phones: ["+92 334 0811200", "+49 1577 3856513"],
    wa: "923340811200",
  },
  {
    name: "Syed Burhan Ali",
    role: "Director — Business Development",
    email: "burhan@onefiresafety.com",
    phones: ["+92 300 9121994"],
    wa: "923009121994",
  },
];

function Team() {
  return (
    <section className="section">
      <div className="container-x">
        <SectionHeader
          eyebrow="Speak to a Specialist"
          title="Talk directly to our leadership."
          description="Reach our directors for project consultations, emergency assessments and partnership inquiries."
          align="center"
        />
        <div className="mt-14 grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {PROFILES.map((p) => (
            <div key={p.name} className="card-elevated rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 h-32 w-32 bg-primary/5 rounded-full -translate-y-12 translate-x-12" />
              <div className="relative">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-full bg-charcoal text-white flex items-center justify-center text-2xl font-extrabold">
                    {p.name.split(" ").map((s) => s[0]).slice(0, 2).join("")}
                  </div>
                  <div>
                    <h3 className="font-bold text-charcoal text-lg">{p.name}</h3>
                    <p className="text-xs uppercase tracking-widest text-primary mt-0.5">{p.role}</p>
                  </div>
                </div>

                <div className="mt-6 space-y-3 text-sm">
                  <a href={`mailto:${p.email}`} className="flex items-center gap-3 text-charcoal hover:text-primary">
                    <Mail className="h-4 w-4 text-primary" /> {p.email}
                  </a>
                  {p.phones.map((ph) => (
                    <a key={ph} href={`tel:${ph.replace(/\s/g, "")}`} className="flex items-center gap-3 text-charcoal hover:text-primary">
                      <Phone className="h-4 w-4 text-primary" /> {ph}
                    </a>
                  ))}
                </div>

                <a
                  href={`https://wa.me/${p.wa}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
                  style={{ background: "var(--whatsapp)" }}
                >
                  <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const BRANDS = ["MSA", "Dupont", "Newtex", "Resqtec", "Chubb", "Bristol", "Honeywell", "3M", "Tyco", "Viking"];

function Brands() {
  return (
    <section className="py-16 bg-surface border-y border-border">
      <div className="container-x">
        <p className="eyebrow text-center w-full justify-center flex">We Represent</p>
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {BRANDS.map((b) => (
            <div key={b} className="h-16 rounded-md bg-white border border-border flex items-center justify-center text-charcoal/60 font-display font-bold text-lg tracking-wider hover:text-primary transition-colors">
              {b}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HomePage() {
  return (
    <SiteLayout>
      <HeroSlider />
      <AboutBlock />
      <Services />
      <Products />
      <WhyUs />
      <Team />
      <Brands />
      <CTASection />
    </SiteLayout>
  );
}
