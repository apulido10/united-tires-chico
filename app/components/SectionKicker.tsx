export function SectionKicker({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span aria-hidden className="h-px w-8 bg-[color:var(--brand)]" />
      <span className="text-xs font-medium uppercase tracking-widest text-[color:var(--brand)]">
        {children}
      </span>
    </div>
  );
}
