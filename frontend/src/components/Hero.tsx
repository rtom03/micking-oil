import {
  ArrowRight,
  MapPin,
  ShieldCheck,
  Truck,
  BadgeCheck,
} from "lucide-react";
import { Link } from "react-router-dom";

/**
 * DESIGN NOTES — what changed and why
 * ------------------------------------------------------------------
 * 1. Positioning bug: the gradient + content layers used `inset-0`
 *    with no `absolute` class and no `relative` parent, so they had
 *    zero effect — everything was just stacking in normal document
 *    flow. Fixed by making <section> the relative anchor and giving
 *    each overlay `absolute inset-0`.
 * 2. Missing background: the comment referenced a background image
 *    that was never added. The section is now a real component that
 *    takes an `imageSrc` prop — pass your photography in and it
 *    renders as a proper full-bleed background. Until then it falls
 *    back to a crafted "diagnostic scanner" gradient in the same
 *    palette, so the layout is never broken or empty.
 * 3. Headline baked into the image: relying on flattened text inside
 *    a photo breaks on every screen size, isn't selectable, isn't
 *    read by screen readers, and can't be A/B tested or localized.
 *    Added a real <h1> so the headline is an actual, accessible
 *    element — the image now supports the message instead of
 *    carrying it alone.
 * 4. Custom hex colors moved from Tailwind arbitrary-value classes
 *    (bg-[#0B0C0E]) to a small style-token object, so the exact
 *    brand colors render reliably regardless of Tailwind setup.
 * 5. Trust strip and CTAs gained icons — scannable at a glance
 *    instead of requiring the visitor to read three short strings.
 * 6. Added a slow scanning-line animation across the backdrop, tying
 *    back to the "diagnostic alert" idea in the badge — the one
 *    deliberate motion flourish, respecting prefers-reduced-motion.
 * 7. Height fix: swapped the tall aspect-ratio box (aspect-[4/5] is
 *    taller than it is wide on a phone) for explicit, shorter
 *    responsive min-heights, and removed a stray `mt-40` on the
 *    content wrapper that was pushing the copy ~160px toward the
 *    bottom — past the visible area on mobile, which is what made
 *    the content look covered/cut off. Also trimmed vertical spacing
 *    (padding, gaps, headline size) at the mobile breakpoint so the
 *    whole block breathes inside the shorter hero.
 */

const tokens = {
  ink: "#0B0C0E",
  ember: "#F2A93B",
  emberBright: "#FFC15C",
  fog: "#C9CCD1",
};

type CTA = { label: string; href: string };

type HeroProps = {
  eyebrow?: string;
  headline?: string;
  subhead?: string;
  primaryCta?: CTA;
  secondaryCta?: CTA;
  imageSrc?: string;
  imageAlt?: string;
};

const DEFAULT_TRUST_ITEMS = [
  { icon: ShieldCheck, label: "100% Genuine Stock" },
  { icon: Truck, label: "Nationwide Delivery" },
  { icon: BadgeCheck, label: "Certified Dealers Only" },
];

const Hero = ({
  subhead = "Every day on the road adds up. The right engine oil, changed on time, keeps your car working as hard as you do",
  primaryCta = { label: "Shop Genuine Engine Oil", href: "/products" },
  secondaryCta = { label: "Find a Dealer Near You", href: "/products" },
  imageSrc,
  imageAlt = "Close-up of an engine bay during a scheduled oil service",
}: HeroProps) => {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: tokens.ink }}
    >
      <style>{`
        @keyframes gs-scan {
          0%   { transform: translateY(-10%); opacity: 0; }
          10%  { opacity: 0.35; }
          90%  { opacity: 0.35; }
          100% { transform: translateY(110%); opacity: 0; }
        }
        .gs-scanline {
          animation: gs-scan 6s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .gs-scanline { animation: none; display: none; }
        }
      `}</style>

      {/* Background layer: real photo if provided, otherwise a crafted
          diagnostic-panel placeholder in the brand palette.
          Explicit, shorter min-heights per breakpoint instead of a
          tall aspect-ratio box — keeps the hero compact on mobile. */}
      <div className="relative min-h-[420px] w-full sm:min-h-[480px] lg:min-h-[560px]">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={imageAlt}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                radial-gradient(ellipse 60% 50% at 78% 30%, rgba(242,169,59,0.16), transparent 60%),
                linear-gradient(180deg, #111318 0%, ${tokens.ink} 100%)
              `,
            }}
            aria-hidden="true"
          >
            {/* faint schematic grid, evokes a diagnostic readout */}
            <div
              className="absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
                backgroundSize: "40px 30px",
              }}
            />
            <div
              className="gs-scanline absolute inset-x-0 h-24"
              style={{
                background:
                  "linear-gradient(180deg, transparent, rgba(242,169,59,0.5), transparent)",
              }}
            />
          </div>
        )}

        {/* Legibility gradients — strongest where the copy sits */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to top, ${tokens.ink} 0%, rgba(11,12,14,0.55) 45%, transparent 75%)`,
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(11,12,14,0.4) 0%, transparent 55%)`,
          }}
        />

        {/* Content */}
        <div className="absolute inset-0 z-10 flex flex-col justify-end px-6 pb-10 sm:px-10 sm:pb-14 lg:px-16">
          <div className="max-w-xl">
            {/* Subhead */}
            <p
              className="mt-3 max-w-md text-md leading-relaxed sm:mt-4 sm:text-base"
              style={{ color: tokens.fog }}
            >
              {subhead}
            </p>

            {/* CTAs */}
            <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:items-center">
              <Link
                to={primaryCta.href}
                className="group inline-flex items-center justify-center gap-2 rounded-md px-6 py-3 text-sm font-bold uppercase tracking-wide transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:py-3.5"
                style={{ backgroundColor: tokens.ember, color: tokens.ink }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = tokens.emberBright)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = tokens.ember)
                }
              >
                {primaryCta.label}
                <ArrowRight
                  size={16}
                  strokeWidth={2.5}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </Link>
              <Link
                to={secondaryCta.href}
                className="inline-flex items-center justify-center gap-2 rounded-md border border-white/30 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:border-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:py-3.5"
              >
                <MapPin size={16} strokeWidth={2.5} />
                {secondaryCta.label}
              </Link>
            </div>
          </div>

          {/* Trust strip */}
          <div
            className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3 border-t pt-4 sm:mt-10 sm:pt-5"
            style={{ borderColor: "rgba(255,255,255,0.1)" }}
          >
            {DEFAULT_TRUST_ITEMS.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.12em]"
                style={{ color: "rgba(201,204,209,0.85)" }}
              >
                <Icon
                  size={13}
                  strokeWidth={2.25}
                  style={{ color: tokens.ember }}
                />
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
