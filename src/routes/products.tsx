import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { CTASection } from "@/components/site/CTASection";
import { ArrowRight, Flame } from "lucide-react";

export const Route = createFileRoute("/products")({
  head: () => ({ meta: [
    { title: "Products — Fire & Safety Catalogue | ONE FIRE" },
    { name: "description", content: "Browse our catalogue of fire protection, detection, PPE, rescue and security equipment from leading global manufacturers." },
  ]}),
  component: ProductsPage,
});

const CATEGORIES = [
  "All", "Respiratory", "Gas Detection", "Fire Protection", "PPE", "Rescue", "Fire Vehicles", "Security",
];

const PRODUCTS = [
  { t: "Full Face Mask", c: "Respiratory", d: "Wide-vision full face mask for industrial respiratory protection." },
  { t: "SCBA System", c: "Respiratory", d: "Self-contained breathing apparatus for hazardous environments." },
  { t: "Air Purifying Respirator", c: "Respiratory", d: "Lightweight powered air-purifying respirator." },
  { t: "Altair 4x", c: "Gas Detection", d: "Four-gas portable detector for industrial atmospheres." },
  { t: "Altair 5x", c: "Gas Detection", d: "Five-gas portable detector with PID option." },
  { t: "Altair Pro", c: "Gas Detection", d: "Single-gas personal monitor for everyday use." },
  { t: "Fire Alarm Panel", c: "Fire Protection", d: "Addressable & conventional control panels." },
  { t: "Fire Hydrant System", c: "Fire Protection", d: "Underground and aboveground hydrant networks." },
  { t: "Fire Sprinklers", c: "Fire Protection", d: "Standard, ESFR and concealed sprinkler heads." },
  { t: "Foam Suppression", c: "Fire Protection", d: "Foam concentrate, proportioners and mobile units." },
  { t: "Dupont Coveralls", c: "PPE", d: "Tychem & Tyvek protective coveralls for chemical exposure." },
  { t: "Safety Harness", c: "PPE", d: "Full-body harnesses for working at height." },
  { t: "Fall Arrest Kit", c: "PPE", d: "Lanyards, anchors and self-retracting lifelines." },
  { t: "Confined Space Kit", c: "Rescue", d: "Tripods, winches and retrieval systems." },
  { t: "Hydraulic Cutters", c: "Rescue", d: "Resqtec G-Series rescue cutters and spreaders." },
  { t: "Rescue Rams", c: "Rescue", d: "Telescopic rams for vehicle extrication." },
  { t: "Fire Truck", c: "Fire Vehicles", d: "Custom-built industrial fire-fighting trucks." },
  { t: "Mobile Foam Unit", c: "Fire Vehicles", d: "Trailer-mounted foam suppression unit." },
  { t: "IP CCTV", c: "Security", d: "High-resolution IP camera systems with VMS." },
  { t: "Access Control", c: "Security", d: "Card, biometric and mobile-credential systems." },
];

function ProductsPage() {
  const [cat, setCat] = useState("All");
  const filtered = cat === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.c === cat);

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Catalogue"
        title="Equipment trusted by the front line."
        subtitle="A curated catalogue of fire protection, detection, PPE and rescue equipment from globally certified manufacturers."
        crumbs={[{ label: "Products" }]}
      />

      <section className="section">
        <div className="container-x">
          <div className="flex flex-wrap gap-2 mb-10">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors border ${
                  cat === c ? "bg-charcoal text-white border-charcoal" : "border-border text-charcoal/70 hover:border-primary hover:text-primary"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filtered.map((p) => (
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
                  <div className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-widest text-white bg-primary/90 px-2 py-1 rounded">
                    {p.c}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-charcoal">{p.t}</h3>
                  <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{p.d}</p>
                  <div className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary">
                    Explore <ArrowRight className="h-3 w-3" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </SiteLayout>
  );
}
