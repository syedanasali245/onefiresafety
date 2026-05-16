import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { CheckCircle2, Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [
    { title: "Contact — ONE FIRE Safety & Security" },
    { name: "description", content: "Speak to our team about fire-safety audits, project quotes and emergency response." },
  ]}),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Valid email required").max(255),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  subject: z.string().trim().min(1, "Subject is required").max(150),
  message: z.string().trim().min(10, "Tell us a bit more").max(2000),
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = schema.safeParse(Object.fromEntries(fd));
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      for (const i of parsed.error.issues) errs[i.path[0] as string] = i.message;
      setErrors(errs);
      return;
    }
    setErrors({});
    setSent(true);
    e.currentTarget.reset();
  };

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Get in Touch"
        title="Tell us about your facility."
        subtitle="Project enquiries, emergency assessments, training requests and partnership opportunities — our team responds within one working day."
        crumbs={[{ label: "Contact" }]}
      />

      <section className="section">
        <div className="container-x grid lg:grid-cols-[1fr_1.3fr] gap-10">
          {/* Info */}
          <div className="space-y-5">
            {[
              { icon: MapPin, t: "Head Office", v: "Plot No 101-K, Office No 03, Block 2 PECHS, Karachi 75400" },
              { icon: Phone, t: "Call Us", v: "+92 334 0811200 · +92 300 9121994", href: "tel:+923340811200" },
              { icon: Mail, t: "Email", v: "info@onefiresafety.com", href: "mailto:info@onefiresafety.com" },
              { icon: MessageCircle, t: "WhatsApp", v: "Chat directly with our directors", href: "https://wa.me/923340811200" },
            ].map(({ icon: Icon, t, v, href }) => (
              <a
                key={t}
                href={href ?? "#"}
                className="card-elevated rounded-xl p-6 flex gap-4 items-start"
              >
                <div className="h-11 w-11 rounded-md bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-primary font-bold">{t}</div>
                  <div className="mt-1 text-charcoal font-semibold">{v}</div>
                </div>
              </a>
            ))}
          </div>

          {/* Form */}
          <div className="card-elevated rounded-2xl p-8 md:p-10">
            <h2 className="font-display text-2xl md:text-3xl font-extrabold text-charcoal">Send a message</h2>
            <p className="mt-2 text-sm text-muted-foreground">Fill out the form — we'll be in touch within one business day.</p>

            {sent ? (
              <div className="mt-8 rounded-xl border border-primary/20 bg-primary/5 p-6 flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-primary mt-0.5" />
                <div>
                  <h3 className="font-bold text-charcoal">Message sent.</h3>
                  <p className="text-sm text-muted-foreground mt-1">Thank you — our team will follow up shortly.</p>
                  <button onClick={() => setSent(false)} className="mt-4 text-sm font-semibold text-primary">Send another →</button>
                </div>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="mt-6 grid sm:grid-cols-2 gap-4" noValidate>
                {([
                  ["name", "Full name", "text", "Syed Anas Ali"],
                  ["email", "Email address", "email", "you@company.com"],
                  ["phone", "Phone (optional)", "tel", "+92 ..."],
                  ["subject", "Subject", "text", "Sprinkler system audit"],
                ] as const).map(([n, label, type, placeholder]) => (
                  <label key={n} className={n === "subject" ? "sm:col-span-2" : ""}>
                    <span className="text-xs font-semibold uppercase tracking-widest text-charcoal/70">{label}</span>
                    <input
                      name={n} type={type} placeholder={placeholder}
                      className="mt-2 w-full rounded-md border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
                    />
                    {errors[n] && <span className="text-xs text-primary mt-1 inline-block">{errors[n]}</span>}
                  </label>
                ))}
                <label className="sm:col-span-2">
                  <span className="text-xs font-semibold uppercase tracking-widest text-charcoal/70">Message</span>
                  <textarea
                    name="message" rows={5} placeholder="Tell us about your facility, scope and timeline."
                    className="mt-2 w-full rounded-md border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
                  />
                  {errors.message && <span className="text-xs text-primary mt-1 inline-block">{errors.message}</span>}
                </label>
                <div className="sm:col-span-2 flex flex-wrap gap-3">
                  <button type="submit" className="btn-primary">Send Message <Send className="h-4 w-4" /></button>
                  <a href="https://wa.me/923340811200" target="_blank" rel="noreferrer"
                     className="inline-flex items-center justify-center gap-2 rounded-md px-6 py-3 text-sm font-semibold text-white"
                     style={{ background: "var(--whatsapp)" }}>
                    <MessageCircle className="h-4 w-4" /> WhatsApp Us
                  </a>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
