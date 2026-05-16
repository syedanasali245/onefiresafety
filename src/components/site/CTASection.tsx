import { Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck } from "lucide-react";

export function CTASection() {
  return (
    <section className="section">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-2xl bg-charcoal text-white p-10 md:p-16">
          <div className="absolute inset-0 grid-bg opacity-[0.07]" />
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary/40 blur-3xl" />
          <div className="relative grid md:grid-cols-[1.4fr_1fr] gap-10 items-center">
            <div>
              <span className="eyebrow !text-primary">Let's Talk</span>
              <h3 className="mt-4 text-3xl md:text-5xl font-extrabold leading-[1.05]">
                Build a safer facility with <span className="text-primary">ONE FIRE</span>.
              </h3>
              <p className="mt-4 text-white/70 max-w-xl">
                From hazard audits to turnkey fire protection installations — our engineers design, install and maintain
                systems that meet NFPA & BS standards.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Link to="/contact" className="btn-primary justify-between !py-4">
                Request a Quote <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="tel:+923340811200" className="btn-outline-light justify-between !py-4">
                <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4" /> Emergency Hotline</span>
                +92 334 0811200
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
