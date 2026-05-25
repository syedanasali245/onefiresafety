import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { CTASection } from "@/components/site/CTASection";
import { ArrowRight, CheckCircle2, Download, Flame, Mail } from "lucide-react";
import { getProductBySlug, getRelatedProducts } from "@/lib/products";
import { getProductImage } from "@/lib/product-images";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = getProductBySlug(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: `${loaderData?.product.title ?? "Product"} — ONE FIRE Safety & Security`,
      },
      {
        name: "description",
        content: loaderData?.product.description ?? "Product specifications and use cases.",
      },
    ],
  }),
  component: ProductDetailPage,
});

function ProductDetailPage() {
  const { product } = Route.useLoaderData();
  const related = getRelatedProducts(product);
  const image = getProductImage(product.slug);

  return (
    <SiteLayout>
      <PageHero
        eyebrow={product.type}
        title={product.title}
        subtitle={product.description}
        crumbs={[
          { label: "Products", to: "/products" },
          { label: product.category },
          { label: product.title },
        ]}
      />

      <section className="section">
        <div className="container-x grid lg:grid-cols-[1.1fr_1fr] gap-12">
          <div className="aspect-[4/3] rounded-2xl bg-white border border-border relative overflow-hidden">
            {image ? (
              <img
                src={image}
                alt={product.title}
                className="absolute inset-0 w-full h-full object-contain p-6"
              />
            ) : (
              <>
                <div className="absolute inset-0 grid-bg opacity-10" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Flame className="h-40 w-40 text-primary" strokeWidth={1} />
                </div>
              </>
            )}
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">{product.type}</p>
            <h2 className="mt-2 font-display text-3xl font-extrabold text-charcoal">{product.title}</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">{product.description}</p>

            <h3 className="mt-8 text-sm font-semibold uppercase tracking-widest text-primary">Key Features</h3>
            <ul className="mt-3 space-y-2">
              {[
                "NFPA & BS compliant",
                "Manufacturer warranty supported",
                "Installation and commissioning available",
                "Annual maintenance contracts (AMC)",
              ].map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-charcoal/85">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" /> {f}
                </li>
              ))}
            </ul>

            <h3 className="mt-8 text-sm font-semibold uppercase tracking-widest text-primary">Use Cases</h3>
            <p className="mt-3 text-sm text-charcoal/85 leading-relaxed">
              Manufacturing plants, warehouses, commercial high-rises, oil & gas facilities, healthcare and public
              infrastructure.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/contact" className="btn-primary">
                <Mail className="h-4 w-4" /> Enquire Now
              </Link>
              <Link to="/downloads" className="btn-outline-dark">
                <Download className="h-4 w-4" /> Download Brochure
              </Link>
              <Link
                to="/products"
                className="text-sm font-semibold text-charcoal/70 hover:text-primary inline-flex items-center gap-1 px-3 py-3"
              >
                ← Back to catalogue
              </Link>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section bg-surface">
          <div className="container-x">
            <div className="flex items-end justify-between mb-10">
              <h3 className="text-2xl md:text-3xl font-extrabold text-charcoal">Related Products</h3>
              <Link to="/products" className="text-sm font-semibold text-primary inline-flex items-center gap-1">
                View all <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  to="/products/$slug"
                  params={{ slug: p.slug }}
                  className="card-elevated rounded-xl overflow-hidden group"
                >
                  <div className="aspect-[4/3] bg-white flex items-center justify-center relative overflow-hidden border border-border">
                    {getProductImage(p.slug) ? (
                      <img
                        src={getProductImage(p.slug)}
                        alt={p.title}
                        className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform"
                      />
                    ) : (
                      <Flame
                        className="h-14 w-14 text-primary group-hover:scale-110 transition-transform"
                        strokeWidth={1.2}
                      />
                    )}
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-charcoal text-sm">{p.title}</h4>
                    <div className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-primary">
                      Explore <ArrowRight className="h-3 w-3" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection />
    </SiteLayout>
  );
}
