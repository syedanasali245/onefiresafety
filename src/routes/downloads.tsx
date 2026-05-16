import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { CTASection } from "@/components/site/CTASection";
import { Download, FileText } from "lucide-react";

export const Route = createFileRoute("/downloads")({
  head: () => ({ meta: [
    { title: "Downloads — ONE FIRE Safety & Security" },
    { name: "description", content: "Product brochures, technical datasheets, certifications and manuals." },
  ]}),
  component: DownloadsPage,
});

const FILES = [
  { t: "ONE FIRE Company Profile", c: "Corporate", s: "2.4 MB" },
  { t: "Fire Protection Systems Brochure", c: "Brochure", s: "3.1 MB" },
  { t: "Sprinkler System Datasheet", c: "Datasheet", s: "1.2 MB" },
  { t: "SCBA Technical Manual", c: "Manual", s: "4.6 MB" },
  { t: "Altair 4x Product Sheet", c: "Datasheet", s: "980 KB" },
  { t: "Chubbsafes Catalogue", c: "Brochure", s: "5.2 MB" },
  { t: "Bristol Fire Suits Spec", c: "Datasheet", s: "1.8 MB" },
  { t: "ISO 9001 Certification", c: "Certification", s: "640 KB" },
  { t: "AMC Service Agreement Template", c: "Document", s: "210 KB" },
];

function DownloadsPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Resources"
        title="Brochures, datasheets & certifications."
        subtitle="Everything you need to evaluate, specify and approve fire & safety solutions."
        crumbs={[{ label: "Downloads" }]}
      />

      <section className="section">
        <div className="container-x grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FILES.map((f) => (
            <a
              key={f.t}
              href="#"
              className="card-elevated rounded-xl p-6 flex items-start gap-4 group"
            >
              <div className="h-12 w-12 rounded-md bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <FileText className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <div className="text-[10px] uppercase tracking-widest text-primary font-bold">{f.c}</div>
                <h3 className="mt-1 font-bold text-charcoal leading-tight">{f.t}</h3>
                <p className="mt-1 text-xs text-muted-foreground">PDF · {f.s}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-charcoal group-hover:text-primary">
                  <Download className="h-4 w-4" /> Download
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      <CTASection />
    </SiteLayout>
  );
}
