import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

interface Props {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  crumbs?: { label: string; to?: string }[];
}
export function PageHero({ eyebrow, title, subtitle, crumbs = [] }: Props) {
  return (
    <section className="relative bg-charcoal text-white overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-10" />
      <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-primary/30 blur-3xl" />
      <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />
      <div className="relative container-x py-20 md:py-28">
        <nav className="flex items-center gap-1 text-xs text-white/50 mb-6">
          <Link to="/" className="hover:text-white">Home</Link>
          {crumbs.map((c, i) => (
            <span key={i} className="flex items-center gap-1">
              <ChevronRight className="h-3 w-3" />
              {c.to ? <Link to={c.to} className="hover:text-white">{c.label}</Link> : <span className="text-white">{c.label}</span>}
            </span>
          ))}
        </nav>
        {eyebrow && <span className="eyebrow !text-primary">{eyebrow}</span>}
        <h1 className="mt-4 font-display font-extrabold text-4xl md:text-6xl leading-[1.05] max-w-4xl">{title}</h1>
        {subtitle && <p className="mt-5 max-w-2xl text-white/70 text-lg leading-relaxed">{subtitle}</p>}
      </div>
    </section>
  );
}
