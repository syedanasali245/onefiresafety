import { Link } from "@tanstack/react-router";
import { MapPin, Mail, Phone, ArrowRight, Linkedin, Facebook, Instagram } from "lucide-react";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-charcoal text-white/80">
      <div className="container-x py-16 grid gap-12 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <Logo light />
          <p className="mt-5 text-sm text-white/60 leading-relaxed">
            Your Number One partner in fire protection, life safety and security infrastructure across Pakistan and beyond.
          </p>
          <div className="mt-6 flex gap-3">
            {[Linkedin, Facebook, Instagram].map((Icon, i) => (
              <a key={i} href="#" className="h-9 w-9 rounded-md border border-white/15 flex items-center justify-center hover:bg-primary hover:border-primary transition-colors">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-white text-sm font-semibold tracking-widest uppercase mb-5">Quick Links</h4>
          <ul className="space-y-3 text-sm">
            {[
              ["/about", "About Us"],
              ["/services", "Services"],
              ["/products", "Products"],
              ["/downloads", "Downloads"],
              ["/faqs", "FAQs"],
              ["/offices", "Offices"],
            ].map(([to, label]) => (
              <li key={to}>
                <Link to={to} className="text-white/60 hover:text-primary transition-colors inline-flex items-center gap-2">
                  <ArrowRight className="h-3 w-3" /> {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white text-sm font-semibold tracking-widest uppercase mb-5">Head Office</h4>
          <ul className="space-y-4 text-sm">
            <li className="flex gap-3"><MapPin className="h-4 w-4 mt-0.5 text-primary shrink-0" /><span>Plot No 101-K, Office No 03,<br />Block 2 PECHS, Karachi 75400</span></li>
            <li className="flex gap-3"><Phone className="h-4 w-4 mt-0.5 text-primary shrink-0" /><a href="tel:+923340811200" className="hover:text-white">+92 334 0811200</a></li>
            <li className="flex gap-3"><Mail className="h-4 w-4 mt-0.5 text-primary shrink-0" /><a href="mailto:info@onefiresafety.com" className="hover:text-white">info@onefiresafety.com</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white text-sm font-semibold tracking-widest uppercase mb-5">Emergency Inquiry</h4>
          <p className="text-sm text-white/60 mb-4">Need urgent fire safety assessment? Reach our experts directly.</p>
          <Link to="/contact" className="btn-primary w-full">Request a Callback <ArrowRight className="h-4 w-4" /></Link>
          <a
            href="https://wa.me/923340811200"
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-md border border-white/20 px-5 py-2.5 text-sm font-semibold hover:bg-white/10 transition-colors"
          >
            Chat on WhatsApp
          </a>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x py-5 flex flex-col sm:flex-row gap-3 items-center justify-between text-xs text-white/50">
          <p>© {new Date().getFullYear()} One Fire Safety & Security. All rights reserved.</p>
          <p className="tracking-widest uppercase">A Company of <span className="text-white">Alinex Ent.</span></p>
        </div>
      </div>
    </footer>
  );
}
