import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Logo } from "./Logo";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/products", label: "Products" },
  { to: "/downloads", label: "Downloads" },
  { to: "/faqs", label: "FAQs" },
  { to: "/offices", label: "Offices" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Top utility bar */}
      <div className="hidden md:block bg-charcoal text-white/80 text-xs">
        <div className="container-x flex h-9 items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" /> 24/7 Emergency Response</span>
            <span className="hidden lg:inline">Plot No 101-K, Block 2 PECHS, Karachi 75400</span>
          </div>
          <div className="flex items-center gap-5">
            <a href="tel:+923340811200" className="hover:text-white transition-colors">+92 334 0811200</a>
            <a href="mailto:info@onefiresafety.com" className="hover:text-white transition-colors">info@onefiresafety.com</a>
          </div>
        </div>
      </div>

      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled ? "bg-white/85 backdrop-blur-md border-b border-border shadow-sm" : "bg-white border-b border-transparent"
        }`}
      >
        <div className="container-x flex h-20 items-center justify-between">
          <Logo />

          <nav className="hidden lg:flex items-center gap-1">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                activeOptions={{ exact: n.to === "/" }}
                activeProps={{ className: "text-primary" }}
                className="relative px-3 py-2 text-sm font-semibold text-charcoal/80 hover:text-primary transition-colors"
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a href="tel:+923340811200" className="hidden md:inline-flex items-center gap-2 text-sm font-semibold text-charcoal hover:text-primary">
              <Phone className="h-4 w-4" /> Call
            </a>
            <Link to="/contact" className="hidden md:inline-flex btn-primary !py-2.5 !px-5">
              Get a Quote
            </Link>
            <button
              className="lg:hidden p-2 rounded-md hover:bg-surface"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="lg:hidden border-t border-border bg-white">
            <nav className="container-x py-4 flex flex-col gap-1">
              {NAV.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  activeOptions={{ exact: n.to === "/" }}
                  activeProps={{ className: "text-primary bg-surface" }}
                  className="px-3 py-3 rounded-md text-sm font-semibold text-charcoal hover:bg-surface"
                >
                  {n.label}
                </Link>
              ))}
              <Link to="/contact" onClick={() => setOpen(false)} className="btn-primary mt-2">
                Get a Quote
              </Link>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
