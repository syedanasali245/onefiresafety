interface Props {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}
export function SectionHeader({ eyebrow, title, description, align = "left" }: Props) {
  return (
    <div className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className="mt-4 text-3xl md:text-5xl font-extrabold text-charcoal leading-[1.05]">
        {title}
      </h2>
      {description && <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed">{description}</p>}
    </div>
  );
}
