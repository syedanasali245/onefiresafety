import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { CTASection } from "@/components/site/CTASection";
import { SectionHeader } from "@/components/site/SectionHeader";
import {
  Award,
  Building2,
  CheckCircle2,
  ClipboardList,
  Flag,
  ShieldCheck,
  Wrench,
  Users,
  Zap,
} from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — ONE FIRE Safety & Security" },
      {
        name: "description",
        content:
          "ONE FIRE Safety & Security is a company of Alinex Ent. — delivering enterprise-grade fire protection and life-safety solutions across Pakistan.",
      },
    ],
  }),
  component: AboutPage,
});

const WHY_CHOOSE_US = [
  {
    icon: ShieldCheck,
    title: "NFPA & BS Compliant Systems",
    body: "Every system we design, supply and install is engineered to meet NFPA and British Standards — giving your facility the highest level of internationally recognised fire safety compliance.",
  },
  {
    icon: Wrench,
    title: "End-to-End Project Delivery",
    body: "From initial hazard assessment and system design through supply, installation, commissioning and ongoing maintenance — we manage the full project lifecycle under one accountable team.",
  },
  {
    icon: Building2,
    title: "Proven Across Demanding Environments",
    body: "With 100+ completed industrial projects, our systems protect manufacturing plants, warehouses, commercial high-rises, oil & gas facilities and critical infrastructure across Pakistan.",
  },
  {
    icon: ClipboardList,
    title: "Multi-Brand Product Network",
    body: "We work with a wide range of leading manufacturers — including Honeywell, Bosch, Apollo, INIM Electronics, Context Plus, Belden, Ceasefire, Atelia, ZKTeco, Garrini Electronics, Orinsong, Howdy and others — giving you access to the right product at the right specification for your facility.",
  },
  {
    icon: Zap,
    title: "Rapid Response & Maintenance Support",
    body: "Fire safety systems demand zero downtime. Our Annual Maintenance Contracts and dedicated service teams ensure your protection infrastructure stays operational and inspection-ready around the clock.",
  },
  {
    icon: Users,
    title: "Certified Training Programmes",
    body: "We train your workforce through practical, hands-on fire and safety courses aligned to OSHA and civil defence standards — turning your team into an active layer of your safety strategy.",
  },
];

function AboutPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="About Us"
        title="Pakistan's trusted name in fire protection and life safety."
        subtitle="ONE FIRE Safety & Security is a company of ALINEX ENT. — built to deliver professional, code-compliant fire and security infrastructure for industrial and commercial facilities."
        crumbs={[{ label: "About" }]}
      />

      {/* About Us */}
      <section className="section">
        <div className="container-x grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeader
              eyebrow="Who We Are"
              title="Fire protection engineered for high-stakes environments."
              description="ONE FIRE Safety & Security was established under ALINEX ENT. with a single purpose: to deliver fire protection and life-safety systems that perform when it matters most. We operate across Pakistan's most demanding environments — from manufacturing plants and warehouses to commercial buildings and industrial facilities — supplying, installing and maintaining systems that meet NFPA and BS compliance standards."
            />
            <p className="mt-5 text-muted-foreground leading-relaxed text-sm">
              Our catalogue spans fire fighting systems, fire alarm and detection systems, emergency and safety equipment, and fire-rated doors — all sourced from internationally certified manufacturers. Whether you need a standalone fire extinguisher supply or a fully integrated turnkey suppression and alarm infrastructure, our team of engineers manages every stage of the project with precision and accountability.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed text-sm">
              We are more than a supplier. We are a long-term partner — conducting independent fire and safety audits, running certified workforce training programmes, and supporting your facilities through structured annual maintenance contracts that keep your protection systems ready at all times.
            </p>
            <div className="mt-8 grid sm:grid-cols-2 gap-4">
              {[
                { icon: Building2, t: "100+ projects delivered" },
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
                "Safety isn't a product you install once. It's a standard you maintain every day."
              </p>
              <p className="mt-3 text-white/60 text-sm">
                — The principle behind every system we design and every service we deliver.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section bg-surface">
        <div className="container-x">
          <SectionHeader
            eyebrow="Why Choose Us"
            title="What sets ONE FIRE apart."
            description="We combine technical depth, international product standards and on-the-ground service capability to deliver fire safety outcomes that stand up to real-world demands."
            align="center"
          />
          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_CHOOSE_US.map(({ icon: Icon, title, body }) => (
              <div key={title} className="card-elevated rounded-2xl p-7 flex flex-col gap-4">
                <div className="h-11 w-11 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-charcoal text-base">{title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{body}</p>
                </div>
                <CheckCircle2 className="h-4 w-4 text-primary mt-auto" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="section">
        <div className="container-x">
          <SectionHeader eyebrow="Leadership" title="People accountable for outcomes." align="center" />
          <div className="mt-12 grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {["Syed Anas Ali", "Syed Burhan Ali"].map((name) => (
              <div key={name} className="card-elevated rounded-2xl p-8 text-center">
                <div className="h-20 w-20 mx-auto rounded-full bg-charcoal text-white flex items-center justify-center text-2xl font-extrabold">
                  {name
                    .split(" ")
                    .map((s) => s[0])
                    .slice(0, 2)
                    .join("")}
                </div>
                <h3 className="mt-5 font-bold text-charcoal text-lg">{name}</h3>
                <Link to="/contact" className="mt-5 inline-flex text-sm font-semibold text-charcoal hover:text-primary">
                  Get in touch →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </SiteLayout>
  );
}
