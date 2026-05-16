import logo from "@/assets/logo.png";
import { Link } from "@tanstack/react-router";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-3 group">
      <div className="relative h-11 w-11 rounded-md bg-white shadow-card flex items-center justify-center overflow-hidden ring-1 ring-border">
        <img src={logo} alt="One Fire Safety" className="h-9 w-9 object-contain" />
      </div>
      <div className="leading-tight">
        <div className={`font-display font-extrabold text-[15px] tracking-tight ${light ? "text-white" : "text-charcoal"}`}>
          ONE FIRE <span className="text-primary">SAFETY</span>
        </div>
        <div className={`text-[10px] font-semibold tracking-[0.2em] uppercase ${light ? "text-white/60" : "text-muted-foreground"}`}>
          A Company of Alinex Ent.
        </div>
      </div>
    </Link>
  );
}
