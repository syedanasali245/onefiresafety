import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { CTASection } from "@/components/site/CTASection";
import { SectionHeader } from "@/components/site/SectionHeader";
import { Award, Building2, Flag, ShieldCheck, Users } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [
    { title: "About — ONE FIRE Safety & Security" },
    { name: "description", content: "ONE FIRE Safety & Security is a company of Alinex Ent. — delivering enterprise-grade fire protection and life-safety solutions." },
  ]}),
  component: AboutPage,
});

const TIMELINE = [
  { year: "1965", title: "Founding heritage", body: "Decades of cumulative fire-safety expertise rooted in the founding partner companies of Alinex Ent." },
  { year: "1992", title: "Industrial expansion", body: "Scaled servicing across manufacturing, oil & gas and commercial complexes nationwide." },
  { year: "2010", title: "Certified compliance", body: "Operations aligned with NFPA, BS and ISO 9001 quality frameworks." },
  { year: "Today", title: "ONE FIRE Safety & Security", body: "A modern, technology-driven arm of Alinex Ent. delivering turnkey fire and security infrastructure." },
];

function AboutPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="About Us"
        title="A heritage of safety, engineered for the modern industrial era."
        subtitle="ONE FIRE Safety & Security is a proud company of ALINEX ENT. — combining 5+ years of fire-protection experience with modern engineering practice."
        crumbs={[{ label: "About" }]}
      />

      <section className="section">
        <div className="container-x grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeader
              eyebrow="Our Mission"
              title="Protect lives, assets and continuity — without compromise."
              description="We design, install and maintain fire protection and security systems for facilities where the cost of failure is unacceptable. Our work is measured by code compliance, response time and operational uptime."
            />
            <div className="mt-8 grid sm:grid-cols-2 gap-4">
              {[
                { icon: Building2, t: "100+ projects" },
                { icon: Users, t: "Expert engineering team" },
                { icon: ShieldCheck, t: "NFPA & BS compliant" },
                { icon: Award, t: "ISO 9001:2015 aligned" },
              ].map(({ icon: Icon, t }) => (
                <div key={t} className="card-elevated rounded-lg p-4 flex items-center gap-3">
                  <Icon className="h-5 w-5 text-primary" />
                  <span className="text-sm font-semibold text-charcoal">{t}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-charcoal">
            <div className="absolute inset-0 grid-bg opacity-10" />
            <div className="absolute inset-0 hero-vignette" />
            <div className="absolute inset-0 flex flex-col justify-end p-10 text-white">
              <Flag className="h-10 w-10 text-primary mb-4" />
              <p className="font-display text-2xl md:text-3xl font-bold leading-tight">
                "Safety First is Safety Always."
              </p>
              <p className="mt-3 text-white/60 text-sm">— Our operating principle, applied on every site we touch.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-surface">
        <div className="container-x">
          <SectionHeader eyebrow="Our Story" title="A timeline shaped by safety." />
          <div className="mt-14 relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2" />
            <div className="space-y-12">
              {TIMELINE.map((t, i) => (
                <div key={t.year} className={`relative flex flex-col md:flex-row md:items-center gap-6 ${i % 2 ? "md:flex-row-reverse" : ""}`}>
                  <div className="md:w-1/2 md:px-10">
                    <div className="card-elevated rounded-xl p-6">
                      <div className="text-primary text-sm font-bold tracking-widest uppercase">{t.year}</div>
                      <h3 className="mt-2 text-xl font-bold text-charcoal">{t.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{t.body}</p>
                    </div>
                  </div>
                  <div className="absolute left-4 md:left-1/2 h-4 w-4 rounded-full bg-primary ring-4 ring-background md:-translate-x-1/2" />
                  <div className="md:w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <SectionHeader eyebrow="Leadership" title="People accountable for outcomes." align="center" />
          <div className="mt-12 grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              { n: "Syed Anas Ali", r: "Director — Operations" },
              { n: "Syed Burhan Ali", r: "Director — Business Development" },
            ].map((p) => (
              <div key={p.n} className="card-elevated rounded-2xl p-8 text-center">
                <div className="h-20 w-20 mx-auto rounded-full bg-charcoal text-white flex items-center justify-center text-2xl font-extrabold">
                  {p.n.split(" ").map((s) => s[0]).slice(0, 2).join("")}
                </div>
                <h3 className="mt-5 font-bold text-charcoal text-lg">{p.n}</h3>
                <p className="text-xs uppercase tracking-widest text-primary mt-1">{p.r}</p>
                <Link to="/contact" className="mt-5 inline-flex text-sm font-semibold text-charcoal hover:text-primary">Get in touch →</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </SiteLayout>
  );
}
