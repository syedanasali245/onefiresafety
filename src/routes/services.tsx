import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { CTASection } from "@/components/site/CTASection";
import { ArrowRight, Flame, GraduationCap, Wrench, Search, Lock, Building2, ShieldCheck, Truck, Wind } from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => ({ meta: [
    { title: "Services — ONE FIRE Safety & Security" },
    { name: "description", content: "Fire protection systems, trainings, maintenance contracts, audits and turnkey industrial safety solutions." },
  ]}),
  component: ServicesPage,
});

const SERVICES = [
  { icon: Flame, t: "Fire Protection Systems", d: "Sprinkler, hydrant, foam and gaseous suppression system design, installation and commissioning to NFPA & BS standards.", items: ["Sprinkler systems", "Hydrant systems", "Foam systems", "Gas suppression"] },
  { icon: Search, t: "Detection & Alarm", d: "Addressable & conventional fire alarm panels integrated with smoke, heat and beam detection.", items: ["Addressable panels", "Smoke / heat detection", "Gas detection", "Voice evacuation"] },
  { icon: Wrench, t: "Servicing & Maintenance", d: "Annual maintenance contracts for extinguishers, alarms, sprinklers and suppression infrastructure.", items: ["Extinguisher refilling", "AMC contracts", "Hydrostatic testing", "Spare parts"] },
  { icon: GraduationCap, t: "Fire & Safety Training", d: "Certified, scenario-based training for industrial workforces, emergency teams and facility management.", items: ["Basic fire safety", "Evacuation drills", "First aid", "Confined-space entry"] },
  { icon: ShieldCheck, t: "Fire, Health & Safety Audits", d: "Independent audits against NFPA, BS and OSHA frameworks with remediation roadmaps.", items: ["Risk assessment", "Compliance audits", "Insurance audits", "Drill assessment"] },
  { icon: Lock, t: "Security Systems", d: "CCTV, access control, intrusion detection and integrated monitoring for enterprise sites.", items: ["IP CCTV", "Access control", "Intrusion detection", "VMS integration"] },
  { icon: Building2, t: "Turnkey Industrial Solutions", d: "End-to-end project delivery for plants, warehouses, malls and high-rise buildings.", items: ["Design & engineering", "Project management", "Commissioning", "Handover"] },
  { icon: Wind, t: "Smoke Management", d: "Mechanical and natural smoke ventilation design and integration with life-safety systems.", items: ["Stair pressurisation", "Smoke extraction", "Damper integration"] },
  { icon: Truck, t: "Fire Vehicles & Mobile Units", d: "Supply of fire trucks, foam units and mobile fire-fighting platforms.", items: ["Fire trucks", "Foam tenders", "Rescue vehicles"] },
];

function ServicesPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="What We Do"
        title="End-to-end fire protection & security engineering."
        subtitle="From concept design and compliance audits to installation, training and 24/7 maintenance — we own every step of your safety lifecycle."
        crumbs={[{ label: "Services" }]}
      />

      <section className="section">
        <div className="container-x grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map(({ icon: Icon, t, d, items }, i) => (
            <div key={t} className="card-elevated rounded-xl p-7 relative overflow-hidden group">
              <div className="absolute top-0 right-0 text-7xl font-extrabold text-surface select-none leading-none">0{i + 1}</div>
              <div className="relative">
                <div className="h-12 w-12 rounded-md bg-charcoal text-white flex items-center justify-center group-hover:bg-primary transition-colors">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-lg font-bold text-charcoal">{t}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{d}</p>
                <ul className="mt-4 space-y-1.5">
                  {items.map((it) => (
                    <li key={it} className="text-xs text-charcoal/70 flex items-center gap-2">
                      <span className="h-1 w-1 rounded-full bg-primary" /> {it}
                    </li>
                  ))}
                </ul>
                <Link to="/contact" className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                  Request scope <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <CTASection />
    </SiteLayout>
  );
}
