import logo from "@/assets/logo.png";
import { Link } from "@tanstack/react-router";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-3 group">
      <div className="relative h-11 w-11 flex items-center justify-center overflow-hidden">
        <img src={logo} alt="One Fire Safety & Security" className="h-11 w-11 object-contain" />
      </div>
      <div className="leading-tight">
        <div className={`font-display font-extrabold text-[16px] tracking-tight ${light ? "text-white" : "text-charcoal"}`}>
          ONE FIRE
        </div>
        <div className={`text-[10px] font-semibold tracking-[0.22em] uppercase ${light ? "text-white/70" : "text-primary"}`}>
          Safety &amp; Security
        </div>
      </div>
    </Link>
  );
}
