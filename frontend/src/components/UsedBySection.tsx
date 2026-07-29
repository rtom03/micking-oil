import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type RefObject,
} from "react";

/** Extends CSSProperties so the custom property is type-checked instead of cast with `as string`. */
interface MarqueeTrackStyle extends CSSProperties {
  "--marquee-distance"?: string;
}

/**
 * Measures the pixel width of one full set of marquee content and keeps it
 * in sync via ResizeObserver. Driving the animation off an exact pixel value
 * (instead of a CSS percentage) avoids the classic marquee bug where the
 * loop desyncs — showing a blank gap — because a percentage transform
 * recalculates against the element's current bounding box every frame.
 */
const useMarqueeDistance = (ref: RefObject<HTMLDivElement | null>): number => {
  const [distance, setDistance] = useState<number>(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const measure = () => setDistance(el.scrollWidth / 2);
    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);

  return distance;
};

const COMPANIES_ROW_1: string[] = [
  "GIGM",
  "Toyota (Briscoe)",
  "Mikano International Limited",
  "Leventis",
  "Affordable Cars",
];

const COMPANIES_ROW_2: string[] = [
  "Chisco",
  "Ineh Mic",
  "Sifax Group",
  "NAHCO Aviance",
  "ABC Transport",
];

interface LogoBadgeProps {
  name: string;
}

const LogoBadge = ({ name }: LogoBadgeProps) => (
  <div className="flex shrink-0 items-center justify-center whitespace-nowrap rounded-lg border border-black/10 bg-white px-6 py-4 shadow-sm">
    <span className="text-sm font-bold uppercase tracking-wide text-[#14120F]/80">
      {name}
    </span>
  </div>
);

interface MarqueeRowProps {
  items: string[];
  direction: "left" | "right";
  durationSeconds?: number;
}

const MarqueeRow = ({
  items,
  direction,
  durationSeconds = 32,
}: MarqueeRowProps) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const distance = useMarqueeDistance(trackRef);
  const doubled: string[] = [...items, ...items];

  const trackStyle: MarqueeTrackStyle | undefined = distance
    ? {
        animation: `${
          direction === "left" ? "marquee-left" : "marquee-right"
        } ${durationSeconds}s linear infinite`,
        // Exact pixel distance — not a % — so the loop can't desync.
        "--marquee-distance": `${distance}px`,
        willChange: "transform",
      }
    : undefined;

  return (
    <div
      ref={trackRef}
      className="marquee-track flex w-max gap-6"
      style={trackStyle}
    >
      {doubled.map((name, i) => (
        <LogoBadge key={`${name}-${i}`} name={name} />
      ))}
    </div>
  );
};

const UsedBySection = () => {
  return (
    <section className="w-full bg-[#FAFAF9] py-16 sm:py-20">
      {/* Keyframes reference the --marquee-distance custom property set
          per-row above, so each row's loop is exact regardless of its
          own content width. Move to your global stylesheet if preferred. */}
      <style>{`
        @keyframes marquee-left {
          from { transform: translateX(0); }
          to { transform: translateX(calc(-1 * var(--marquee-distance))); }
        }
        @keyframes marquee-right {
          from { transform: translateX(calc(-1 * var(--marquee-distance))); }
          to { transform: translateX(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none !important; }
        }
      `}</style>

      {/* Heading */}
      <div className="mx-auto max-w-3xl px-6 text-center sm:px-10">
        <h2 className="mt-2 text-4xl font-extrabold tracking-tight text-[#14120F] sm:text-5xl">
          Keeping Nigeria Moving
        </h2>

        {/* <p className="text-2xl font-extrabold uppercase tracking-wide text-[#D6241C] sm:text-3xl">
          Used By
        </p> */}
        <p className="mt-4 text-[15px] leading-relaxed text-[#14120F]/60">
          Trusted by the fleets, logistics operators, and transport companies
          that keep the country running — every single day.
        </p>
      </div>

      {/* Logo marquee */}
      <div className="relative mt-12 space-y-5 overflow-hidden">
        {/* Edge fade masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#FAFAF9] to-transparent sm:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#FAFAF9] to-transparent sm:w-32" />

        <MarqueeRow items={COMPANIES_ROW_1} direction="left" />
        <MarqueeRow items={COMPANIES_ROW_2} direction="right" />
      </div>
    </section>
  );
};

export default UsedBySection;
