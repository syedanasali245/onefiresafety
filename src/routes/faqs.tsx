import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { CTASection } from "@/components/site/CTASection";
import { Plus, Minus } from "lucide-react";

export const Route = createFileRoute("/faqs")({
  head: () => ({ meta: [
    { title: "FAQs — Fire Safety Questions Answered | ONE FIRE" },
    { name: "description", content: "Fire extinguisher classes, fire chemistry, Halotron explained and practical fire-safety guidance." },
  ]}),
  component: FAQsPage,
});

const FAQS = [
  { q: "How does fire actually work?", a: "Fire is a chemical chain reaction involving fuel, oxygen, heat and an uninhibited chain reaction — the 'fire tetrahedron'. Removing any one element extinguishes the fire." },
  { q: "What do ABC ratings on fire extinguishers mean?", a: "Class A: ordinary combustibles (wood, paper). Class B: flammable liquids. Class C: electrical equipment. Class D: combustible metals. Class K: cooking oils. ABC extinguishers cover the most common hazards." },
  { q: "What is Halotron I and where should I use it?", a: "Halotron I is a clean agent extinguishant used to protect sensitive electronics, data centres and aircraft. It leaves no residue and is electrically non-conductive." },
  { q: "How often should fire extinguishers be serviced?", a: "Monthly visual checks by the occupier and an annual professional inspection are recommended. Hydrostatic testing is required every 5–12 years depending on type." },
  { q: "What is the difference between an addressable and conventional fire alarm?", a: "Conventional systems group detectors by zone. Addressable systems identify the exact device that triggered, enabling faster response and easier diagnostics." },
  { q: "Do you provide on-site fire training?", a: "Yes — we conduct certified scenario-based fire safety, evacuation and first-aid training at client facilities across Pakistan." },
  { q: "Are your systems NFPA compliant?", a: "All our designs follow NFPA, BS EN and applicable local civil-defence standards. Compliance documentation is provided with every project." },
  { q: "How do I request an audit or quote?", a: "Use the contact form, call our hotline or reach our directors directly via WhatsApp — most enquiries are responded to within one working day." },
];

function FAQsPage() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Knowledge"
        title="Fire safety, explained clearly."
        subtitle="Practical answers to the most common fire-protection and life-safety questions."
        crumbs={[{ label: "FAQs" }]}
      />

      <section className="section">
        <div className="container-x max-w-3xl">
          <div className="space-y-3">
            {FAQS.map((f, i) => {
              const isOpen = open === i;
              return (
                <div key={i} className="card-elevated rounded-xl overflow-hidden">
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-4 p-6 text-left"
                  >
                    <span className="font-bold text-charcoal">{f.q}</span>
                    <span className={`h-9 w-9 rounded-full flex items-center justify-center shrink-0 transition-colors ${isOpen ? "bg-primary text-white" : "bg-surface text-charcoal"}`}>
                      {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 -mt-2 text-sm text-muted-foreground leading-relaxed">{f.a}</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection />
    </SiteLayout>
  );
}
