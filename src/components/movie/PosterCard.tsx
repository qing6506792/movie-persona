import type { Movie } from "@/types/movie";

export type PosterMotif = "sun" | "horizon" | "window" | "stripes";

export type PosterTheme = {
  from: string;
  via: string;
  to: string;
  accent: string;
  motif: PosterMotif;
};

type PosterCardProps = {
  movie: Pick<Movie, "title" | "year">;
  tagline: string;
  theme: PosterTheme;
  className?: string;
};

function Motif({ motif, accent }: { motif: PosterMotif; accent: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 200 300"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 size-full"
    >
      {motif === "sun" && (
        <>
          <circle cx="100" cy="115" r="48" fill={accent} fillOpacity="0.85" />
          <rect x="0" y="175" width="200" height="125" fill="#0b0d14" fillOpacity="0.45" />
          <path d="M0 175 H200" stroke={accent} strokeOpacity="0.5" />
        </>
      )}
      {motif === "horizon" && (
        <>
          <circle cx="140" cy="90" r="22" fill={accent} fillOpacity="0.8" />
          <path
            d="M0 190 Q50 150 100 180 T200 165 V300 H0Z"
            fill="#0b0d14"
            fillOpacity="0.4"
          />
          <path
            d="M0 225 Q60 195 110 220 T200 210 V300 H0Z"
            fill="#0b0d14"
            fillOpacity="0.55"
          />
        </>
      )}
      {motif === "window" && (
        <>
          <rect
            x="55"
            y="55"
            width="90"
            height="120"
            rx="4"
            fill="none"
            stroke={accent}
            strokeOpacity="0.8"
            strokeWidth="2"
          />
          <path
            d="M100 55 V175 M55 115 H145"
            stroke={accent}
            strokeOpacity="0.8"
            strokeWidth="2"
          />
          <path d="M55 175 L30 230 H170 L145 175Z" fill={accent} fillOpacity="0.18" />
        </>
      )}
      {motif === "stripes" &&
        [0, 1, 2, 3, 4, 5].map((i) => (
          <path
            key={i}
            d={`M${-40 + i * 45} 260 L${60 + i * 45} 40`}
            stroke={accent}
            strokeOpacity={0.15 + i * 0.08}
            strokeWidth="6"
          />
        ))}
    </svg>
  );
}

export default function PosterCard({
  movie,
  tagline,
  theme,
  className = "",
}: PosterCardProps) {
  return (
    <figure
      className={`relative isolate aspect-[2/3] w-full overflow-hidden rounded-2xl border border-white/10 shadow-xl shadow-black/40 ${className}`}
      style={{
        backgroundImage: `linear-gradient(160deg, ${theme.from}, ${theme.via} 55%, ${theme.to})`,
      }}
    >
      <Motif motif={theme.motif} accent={theme.accent} />

      <span className="absolute left-3 top-3 rounded-full bg-black/40 px-2 py-0.5 text-[0.7rem] tracking-wider text-cream/80">
        设计演示
      </span>

      <figcaption
        className="absolute inset-x-0 bottom-0 p-3 pt-12 sm:p-4 sm:pt-14"
        style={{
          backgroundImage:
            "linear-gradient(to top, rgba(11,13,20,0.92), rgba(11,13,20,0))",
        }}
      >
        <p className="font-display text-base font-bold leading-snug text-cream sm:text-lg">
          {movie.title}
          {movie.year ? (
            <span className="ml-1.5 text-xs font-normal text-cream/60">
              {movie.year}
            </span>
          ) : null}
        </p>
        <p className="mt-1 text-xs leading-relaxed text-cream/75">{tagline}</p>
      </figcaption>
    </figure>
  );
}