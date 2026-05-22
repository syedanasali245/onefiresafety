import logo from "@/assets/logo.png";
import { Link } from "@tanstack/react-router";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-3 group">
      <div className="relative h-12 w-12 flex shrink-0 items-center justify-center overflow-hidden">
        <img src={logo} alt="One Fire Safety & Security" className="h-12 w-12 object-contain" />
      </div>
      <div className="leading-none">
        <div
          className={`font-display font-extrabold text-[22px] tracking-tight ${light ? "text-white" : "text-charcoal"}`}
        >
          ONE FIRE
        </div>
        <div
          className={`mt-0.5 text-[7px] font-semibold tracking-[0.18em] uppercase ${light ? "text-white/65" : "text-primary"}`}
        >
          Safety &amp; Security
        </div>
      </div>
    </Link>
  );
}
