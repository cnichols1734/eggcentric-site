/** Renders `text` with any exact `tokens` wrapped in inline code styling. */
export function Mono({ text, tokens }: { text: string; tokens: readonly string[] }) {
  const escaped = tokens.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).sort((a, b) => b.length - a.length);
  const re = new RegExp(`(${escaped.join("|")})`);
  const set = new Set(tokens);
  return (
    <>
      {text.split(re).map((part, k) =>
        set.has(part) ? (
          <code key={k} className="rounded border-2 border-ink bg-panel-deep px-1 text-[0.85em] text-gold whitespace-nowrap">
            {part}
          </code>
        ) : (
          <span key={k}>{part}</span>
        ),
      )}
    </>
  );
}

export const FILE_TOKENS = [
  "Eggcentric.exe",
  "Eggcentric.app",
  "Eggcentric.x86_64",
  "./Eggcentric.x86_64",
  "chmod +x Eggcentric.x86_64",
  "Eggcentric-Linux.zip",
] as const;
