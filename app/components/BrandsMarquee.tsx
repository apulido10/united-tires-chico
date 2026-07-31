type Props = {
  brands: string[];
  reverse?: boolean;
};

export function BrandsMarquee({ brands, reverse = false }: Props) {
  const items = [...brands, ...brands];
  return (
    <div
      className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
    >
      <ul
        className="marquee-track flex w-max gap-12 py-2 text-sm text-zinc-300"
        style={reverse ? { animationDirection: "reverse" } : undefined}
        aria-label="Brands we carry"
      >
        {items.map((b, i) => (
          <li key={i} aria-hidden={i >= brands.length} className="whitespace-nowrap">
            {b}
          </li>
        ))}
      </ul>
    </div>
  );
}
