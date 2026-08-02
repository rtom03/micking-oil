import { useEffect, useRef, useState } from "react";
import { cn } from "../../lib/utils.ts";

export interface LogoMarqueeItem {
  name: string;
  /** Optional — entries without a logo fall back to an initials badge. */
  logo?: string;
}

interface LogoMarqueeCardsProps {
  items: LogoMarqueeItem[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}

const SPEED_SECONDS: Record<
  NonNullable<LogoMarqueeCardsProps["speed"]>,
  number
> = {
  fast: 20,
  normal: 40,
  slow: 80,
};

const getInitials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

/**
 * Horizontal, auto-height logo pills that scroll continuously.
 * Adapted from Aceternity's InfiniteMovingCards: same duplicate-and-loop
 * mechanism (renders the list twice so a -50% translate loops seamlessly),
 * but the card is a logo+name row instead of a testimonial blockquote, and
 * the scroll keyframes are scoped locally instead of living in
 * tailwind.config — so this works as a drop-in with no extra setup.
 */
export const LogoMarqueeCards = ({
  items,
  direction = "left",
  speed = "slow",
  pauseOnHover = true,
  className,
}: LogoMarqueeCardsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLUListElement>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const scroller = scrollerRef.current;
    if (!container || !scroller) return;

    // Duplicate the list once so translating the track by -50% loops
    // seamlessly with no visible seam or blank gap.
    const originalChildren = Array.from(scroller.children);
    originalChildren.forEach((item) => {
      scroller.appendChild(item.cloneNode(true));
    });

    container.style.setProperty(
      "--animation-direction",
      direction === "left" ? "forwards" : "reverse",
    );
    container.style.setProperty(
      "--animation-duration",
      `${SPEED_SECONDS[speed]}s`,
    );

    setStart(true);
    // Intentionally runs once on mount — items are expected to be static.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]",
        className,
      )}
    >
      <style>{`
        @keyframes gs-logo-scroll {
          to { transform: translate(calc(-50% - 0.5rem)); }
        }
        .gs-logo-track {
          animation: gs-logo-scroll var(--animation-duration, 40s)
            var(--animation-direction, forwards) linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .gs-logo-track { animation: none; }
        }
      `}</style>

      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max shrink-0 flex-nowrap gap-4 py-2",
          start && "gs-logo-track",
          pauseOnHover && "hover:[animation-play-state:paused]",
        )}
      >
        {items.map((item, idx) => (
          <li
            key={`${item.name}-${idx}`}
            className="flex shrink-0 items-center gap-3 whitespace-nowrap rounded-xl border border-black/10 bg-white px-5 py-3 shadow-sm"
          >
            {item.logo ? (
              <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-md bg-neutral-50 ring-1 ring-black/5">
                <img
                  src={item.logo}
                  alt={`${item.name} logo`}
                  sizes="36px"
                  className="object-contain p-1"
                />
              </div>
            ) : (
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-neutral-100 text-xs font-bold text-neutral-500 ring-1 ring-black/5">
                {getInitials(item.name)}
              </div>
            )}
            <span className="text-sm font-bold uppercase tracking-wide text-[#14120F]/80">
              {item.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};
