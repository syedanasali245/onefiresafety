import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { CTASection } from "@/components/site/CTASection";
import { ArrowRight, CheckCircle2, Download, Flame, Mail } from "lucide-react";

export const Route = createFileRoute("/products/$slug")({
  head: ({ params }) => {
    const name = params.slug.split("-").map((s: string) => s[0].toUpperCase() + s.slice(1)).join(" ");
    return { meta: [
      { title: `${name} — ONE FIRE Safety & Security` },
      { name: "description", content: `${name}: technical specifications, features and use cases.` },
    ]};
  },
  component: ProductDetailPage,
});

function ProductDetailPage() {
  const { slug } = Route.useParams();
  const name = slug.split("-").map((s) => s[0].toUpperCase() + s.slice(1)).join(" ");

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Product"
        title={name}
        subtitle="Certified, code-compliant equipment supplied, installed and serviced by ONE FIRE engineers."
        crumbs={[{ label: "Products", to: "/products" }, { label: name }]}
      />

      <section className="section">
        <div className="container-x grid lg:grid-cols-[1.1fr_1fr] gap-12">
          <div className="aspect-[4/3] rounded-2xl bg-charcoal relative overflow-hidden">
            <div className="absolute inset-0 grid-bg opacity-10" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Flame className="h-40 w-40 text-primary" strokeWidth={1} />
            </div>
          </div>

          <div>
            <h2 className="font-display text-3xl font-extrabold text-charcoal">{name}</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Engineered for industrial reliability, this product is supplied with full compliance documentation,
              installation support and lifecycle maintenance from ONE FIRE's certified engineers.
            </p>

            <h3 className="mt-8 text-sm font-semibold uppercase tracking-widest text-primary">Key Features</h3>
            <ul className="mt-3 space-y-2">
              {[
                "NFPA & BS compliant",
                "Manufacturer warranty supported",
                "Installation and commissioning available",
                "Annual maintenance contracts (AMC)",
              ].map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-charcoal/85">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" /> {f}
                </li>
              ))}
            </ul>

            <h3 className="mt-8 text-sm font-semibold uppercase tracking-widest text-primary">Use Cases</h3>
            <p className="mt-3 text-sm text-charcoal/85 leading-relaxed">
              Manufacturing plants, warehouses, commercial high-rises, oil & gas facilities,
              healthcare and public infrastructure.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/contact" className="btn-primary"><Mail className="h-4 w-4" /> Enquire Now</Link>
              <Link to="/downloads" className="btn-outline-dark"><Download className="h-4 w-4" /> Download Brochure</Link>
              <Link to="/products" className="text-sm font-semibold text-charcoal/70 hover:text-primary inline-flex items-center gap-1 px-3 py-3">
                ← Back to catalogue
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-surface">
        <div className="container-x">
          <div className="flex items-end justify-between mb-10">
            <h3 className="text-2xl md:text-3xl font-extrabold text-charcoal">Related Products</h3>
            <Link to="/products" className="text-sm font-semibold text-primary inline-flex items-center gap-1">View all <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {["Smoke Detectors", "Fire Sprinklers", "SCBA System", "Fire Alarm Panel"].map((t) => (
              <Link key={t} to="/products/$slug" params={{ slug: t.toLowerCase().replace(/[^a-z0-9]+/g, "-") }}
                className="card-elevated rounded-xl overflow-hidden group">
                <div className="aspect-[4/3] bg-charcoal flex items-center justify-center">
                  <Flame className="h-14 w-14 text-primary group-hover:scale-110 transition-transform" strokeWidth={1.2} />
                </div>
                <div className="p-4">
                  <h4 className="font-bold text-charcoal text-sm">{t}</h4>
                  <div className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-primary">
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
