import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { CTASection } from "@/components/site/CTASection";
import { Mail, MapPin, Phone } from "lucide-react";

export const Route = createFileRoute("/offices")({
  head: () => ({ meta: [
    { title: "Offices — ONE FIRE Safety & Security" },
    { name: "description", content: "Visit our offices across Pakistan. Head office in Karachi, with operations nationwide." },
  ]}),
  component: OfficesPage,
});

const OFFICES = [
  { city: "Karachi (Head Office)", addr: "Plot No 101-K, Office No 03, Block 2 PECHS, Karachi 75400", phone: "+92 334 0811200", email: "info@onefiresafety.com" },
  { city: "Lahore", addr: "Sales & Service Office, Gulberg III, Lahore", phone: "+92 300 9121994", email: "lahore@onefiresafety.com" },
  { city: "Rawalpindi", addr: "Saddar, Rawalpindi", phone: "+92 334 0811200", email: "rwp@onefiresafety.com" },
  { city: "Faisalabad", addr: "D-Ground, Faisalabad", phone: "+92 300 9121994", email: "fsd@onefiresafety.com" },
  { city: "International", addr: "Representative Office, Germany", phone: "+49 1577 3856513", email: "intl@onefiresafety.com" },
];

function OfficesPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Locations"
        title="Operations rooted across Pakistan."
        subtitle="Nationwide service network with rapid mobilisation for installations and maintenance."
        crumbs={[{ label: "Offices" }]}
      />

      <section className="section">
        <div className="container-x grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {OFFICES.map((o) => (
            <div key={o.city} className="card-elevated rounded-xl overflow-hidden">
              <div className="aspect-[16/9] bg-charcoal relative overflow-hidden">
                <div className="absolute inset-0 grid-bg opacity-10" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <MapPin className="h-14 w-14 text-primary" strokeWidth={1.4} />
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-charcoal text-lg">{o.city}</h3>
                <div className="mt-3 space-y-2 text-sm">
                  <p className="flex gap-3 text-charcoal/80"><MapPin className="h-4 w-4 text-primary mt-0.5 shrink-0" /> {o.addr}</p>
                  <a href={`tel:${o.phone.replace(/\s/g, "")}`} className="flex gap-3 text-charcoal/80 hover:text-primary"><Phone className="h-4 w-4 text-primary mt-0.5" /> {o.phone}</a>
                  <a href={`mailto:${o.email}`} className="flex gap-3 text-charcoal/80 hover:text-primary"><Mail className="h-4 w-4 text-primary mt-0.5" /> {o.email}</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <CTASection />
    </SiteLayout>
  );
}
