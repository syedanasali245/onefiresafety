import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { CTASection } from "@/components/site/CTASection";
import { ArrowRight, Flame } from "lucide-react";
import { FILTER_CATEGORIES, getCatalogForFilter } from "@/lib/products";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Products — Fire & Safety Catalogue | ONE FIRE" },
      {
        name: "description",
        content:
          "Browse fire fighting systems, fire alarm systems, emergency & safety equipment, and fire rated doors.",
      },
    ],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  const [cat, setCat] = useState<string>("All");
  const catalog = getCatalogForFilter(cat);

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Catalogue"
        title="Equipment trusted by the front line."
        subtitle="Fire fighting, detection, emergency safety and fire rated door solutions — organised by category and product type."
        crumbs={[{ label: "Products" }]}
      />

      <section className="section">
        <div className="container-x">
          <div className="flex flex-wrap gap-2 mb-10">
            {FILTER_CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors border ${
                  cat === c
                    ? "bg-charcoal text-white border-charcoal"
                    : "border-border text-charcoal/70 hover:border-primary hover:text-primary"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="space-y-14">
            {catalog.map((categoryGroup) => (
              <div key={categoryGroup.category}>
                {cat === "All" && (
                  <h2 className="text-2xl md:text-3xl font-extrabold text-charcoal mb-8 border-b border-border pb-4">
                    {categoryGroup.category}
                  </h2>
                )}

                {categoryGroup.types.map((typeGroup) => (
                  <div key={`${categoryGroup.category}-${typeGroup.type}`} className="mb-12 last:mb-0">
                    <h3 className="text-lg font-bold text-charcoal mb-1">{typeGroup.type}</h3>
                    <p className="text-xs text-muted-foreground mb-5">{categoryGroup.category}</p>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                      {typeGroup.products.map((p) => (
                        <Link
                          key={p.slug}
                          to="/products/$slug"
                          params={{ slug: p.slug }}
                          className="card-elevated rounded-xl overflow-hidden group"
                        >
                          <div className="aspect-[4/3] bg-charcoal relative overflow-hidden">
                            <div className="absolute inset-0 grid-bg opacity-10" />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <Flame
                                className="h-16 w-16 text-primary group-hover:scale-110 transition-transform"
                                strokeWidth={1.2}
                              />
                            </div>
                            <div className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-widest text-white bg-primary/90 px-2 py-1 rounded">
                              {typeGroup.type}
                            </div>
                          </div>
                          <div className="p-5">
                            <h4 className="font-bold text-charcoal">{p.title}</h4>
                            <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed line-clamp-2">
                              {p.description}
                            </p>
                            <div className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary">
                              Explore <ArrowRight className="h-3 w-3" />
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </SiteLayout>
  );
}
