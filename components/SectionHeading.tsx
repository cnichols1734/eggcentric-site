interface Props {
  kicker?: string;
  title: string;
  body?: string;
  align?: "center" | "left";
  color?: "gold" | "cream" | "xp" | "good" | "danger";
}

const COLORS = {
  gold: "text-gold",
  cream: "text-cream",
  xp: "text-xp",
  good: "text-good",
  danger: "text-danger",
};

export function SectionHeading({ kicker, title, body, align = "center", color = "gold" }: Props) {
  return (
    <div className={`mx-auto max-w-3xl ${align === "center" ? "text-center" : "text-left"}`}>
      {kicker ? (
        <p className="mb-5 inline-block rounded-full border-[3px] border-ink bg-panel-deep px-3 py-1 text-xs font-extrabold uppercase tracking-[0.18em] text-cream-dim shadow-ink-sm">
          {kicker}
        </p>
      ) : null}
      <h2 className={`display ${COLORS[color]} text-[clamp(2rem,5.2vw,3.4rem)]`}>{title}</h2>
      {body ? <p className="mt-4 text-lg font-semibold text-cream-dim">{body}</p> : null}
    </div>
  );
}
