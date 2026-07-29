import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Camera,
  ExternalLink,
  Download,
  ChevronLeft,
  ChevronRight,
  Quote,
  BadgeCheck,
} from "lucide-react";

const EXHIBITION = {
  badge: "Event Gallery",
  title: "Golden Stone Investment Ltd at the JCN Consulting Highway Exhibition",
  description:
    "Highlights from our exhibition stand featuring the MICKING product range, alongside moments from our recognition and awards ceremony with JCN Consulting and road safety officials.",
  image:
    "https://cdn.shopify.com/s/files/1/0709/3927/9536/files/Exhibition.png?v=1782914060",
  alt: "Golden Stone Investment Ltd exhibition stand and award ceremony at the JCN Consulting Highway event",
};

type Testimonial = {
  quote: string;
  name: string;
  image: string;
  alt: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "I always trust MICKING for my car — quality I can count on every time.",
    name: "Verified Customer",
    image:
      "https://cdn.shopify.com/s/files/1/0709/3927/9536/files/Happy_customer_1.png?v=1783068899",
    alt: "Happy customer with MICKING Gold Super+ engine oil",
  },
  {
    quote: "Great service and a product that keeps my engine running smoothly.",
    name: "Verified Customer",
    image:
      "https://cdn.shopify.com/s/files/1/0709/3927/9536/files/Happy_Customer_2?v=1783068899",
    alt: "Happy customer with MICKING Gold Top engine oil",
  },
  {
    quote: "Convenient, reliable, and exactly the quality I was looking for.",
    name: "Verified Customer",
    image:
      "https://cdn.shopify.com/s/files/1/0709/3927/9536/files/happy_customer_3.png?v=1783068901",
    alt: "Happy customer with MICKING Gold Prime A engine oil",
  },
  {
    quote:
      "Golden Stone Investment made it easy to get genuine, high-quality oil.",
    name: "Verified Customer",
    image:
      "https://cdn.shopify.com/s/files/1/0709/3927/9536/files/Happy_customer_4.png?v=1783068899",
    alt: "Happy customer with MICKING Gold Prime 4 engine oil",
  },
  {
    quote:
      "Excellent product and a smooth buying experience from start to finish.",
    name: "Verified Customer",
    image:
      "https://cdn.shopify.com/s/files/1/0709/3927/9536/files/Happy_customer_5.png?v=1783068902",
    alt: "Happy customer with MICKING engine oil",
  },
];

const AUTOPLAY_MS = 5000;

function Badge({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        width: "fit-content",
        background: "#eef2ff",
        color: "#4338ca",
        fontSize: "11.5px",
        fontWeight: 600,
        letterSpacing: "0.04em",
        textTransform: "uppercase",
        padding: "5px 10px",
        borderRadius: "999px",
      }}
    >
      {icon}
      {children}
    </div>
  );
}

function ExhibitionCard() {
  return (
    <div className="gs-card">
      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        <Badge icon={<Camera size={13} strokeWidth={2.25} />}>
          {EXHIBITION.badge}
        </Badge>

        <div>
          <h3
            style={{
              margin: "0 0 6px 0",
              fontSize: "20px",
              fontWeight: 700,
              lineHeight: 1.3,
              color: "#111827",
              letterSpacing: "-0.01em",
            }}
          >
            {EXHIBITION.title}
          </h3>
          <p
            style={{
              margin: 0,
              fontSize: "14.5px",
              lineHeight: 1.65,
              color: "#6b7280",
            }}
          >
            {EXHIBITION.description}
          </p>
        </div>

        <div
          style={{
            borderRadius: "12px",
            overflow: "hidden",
            border: "1px solid #e5e7eb",
            lineHeight: 0,
            background: "#f9fafb",
          }}
        >
          <img
            src={EXHIBITION.image}
            alt={EXHIBITION.alt}
            style={{ display: "block", width: "100%", height: "auto" }}
          />
        </div>

        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <a
            href={EXHIBITION.image}
            target="_blank"
            rel="noopener noreferrer"
            className="gs-btn gs-btn-primary"
          >
            <ExternalLink size={15} strokeWidth={2.25} />
            View Full Size
          </a>
          <a
            href={EXHIBITION.image}
            download
            className="gs-btn gs-btn-secondary"
          >
            <Download size={15} strokeWidth={2.25} />
            Download Image
          </a>
        </div>
      </div>
    </div>
  );
}

function TestimonialCarousel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const count = TESTIMONIALS.length;

  const goTo = useCallback(
    (i: number) => {
      setCurrent(((i % count) + count) % count);
    },
    [count],
  );

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % count);
    }, AUTOPLAY_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused, count]);

  const handleManualNav = (i: number) => {
    goTo(i);
    setPaused(true);
    window.setTimeout(() => setPaused(false), AUTOPLAY_MS);
  };

  return (
    <div className="gs-card">
      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        <Badge icon={<BadgeCheck size={13} strokeWidth={2.25} />}>
          Customer Spotlight
        </Badge>

        <div>
          <h3
            style={{
              margin: "0 0 6px 0",
              fontSize: "20px",
              fontWeight: 700,
              lineHeight: 1.3,
              color: "#111827",
              letterSpacing: "-0.01em",
            }}
          >
            Happy Customers, Trusted Results
          </h3>
          <p
            style={{
              margin: 0,
              fontSize: "14.5px",
              lineHeight: 1.65,
              color: "#6b7280",
            }}
          >
            Real customers, real MICKING oil purchases. Here's a look at a few
            of the people we've served — swipe through to see more.
          </p>
        </div>

        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          style={{ position: "relative" }}
        >
          <div
            style={{
              borderRadius: "12px",
              overflow: "hidden",
              border: "1px solid #e5e7eb",
              position: "relative",
              aspectRatio: "4 / 5",
              background: "#f9fafb",
            }}
          >
            {TESTIMONIALS.map((t, i) => (
              <img
                key={i}
                src={t.image}
                alt={t.alt}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  opacity: i === current ? 1 : 0,
                  transition: "opacity 0.6s ease",
                }}
              />
            ))}

            {/* Quote overlay */}
            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                padding: "28px 18px 18px",
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.78), rgba(0,0,0,0.15) 60%, rgba(0,0,0,0))",
              }}
            >
              <Quote
                size={16}
                strokeWidth={2.5}
                color="#ffffff"
                style={{ opacity: 0.7, marginBottom: "6px" }}
              />
              <p
                style={{
                  margin: "0 0 4px",
                  color: "#ffffff",
                  fontSize: "15px",
                  lineHeight: 1.5,
                  fontWeight: 500,
                }}
              >
                {TESTIMONIALS[current].quote}
              </p>
              <p
                style={{
                  margin: 0,
                  color: "#d1d5db",
                  fontSize: "12px",
                  fontWeight: 600,
                  letterSpacing: "0.02em",
                }}
              >
                {TESTIMONIALS[current].name}
              </p>
            </div>

            {/* Arrows */}
            <button
              aria-label="Previous testimonial"
              className="gs-arrow"
              style={{ left: "10px" }}
              onClick={() => handleManualNav(current - 1)}
            >
              <ChevronLeft size={18} strokeWidth={2.5} />
            </button>
            <button
              aria-label="Next testimonial"
              className="gs-arrow"
              style={{ right: "10px" }}
              onClick={() => handleManualNav(current + 1)}
            >
              <ChevronRight size={18} strokeWidth={2.5} />
            </button>
          </div>

          {/* Dots */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "8px",
              marginTop: "14px",
            }}
          >
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to testimonial ${i + 1}`}
                onClick={() => handleManualNav(i)}
                className="gs-dot"
                style={{
                  background: i === current ? "#111827" : "#d1d5db",
                  width: i === current ? "20px" : "8px",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ExhibitionAndTestimonials() {
  return (
    <div
      style={{
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif",
        maxWidth: "720px",
        margin: "0 auto",
        padding: "48px 24px",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
      }}
    >
      <style>{`
        .gs-card {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 16px;
          padding: 26px;
          box-shadow: 0 1px 2px rgba(16, 24, 40, 0.04);
          color: #111827;
          transition: box-shadow 0.2s ease, border-color 0.2s ease;
        }
        .gs-card:hover {
          box-shadow: 0 12px 24px rgba(16, 24, 40, 0.08);
          border-color: #d1d5db;
        }
        .gs-btn {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          text-decoration: none;
          padding: 10px 16px;
          border-radius: 9px;
          font-size: 13.5px;
          font-weight: 600;
          transition: background 0.15s ease, border-color 0.15s ease;
          border: 1px solid transparent;
        }
        .gs-btn-primary {
          background: #111827;
          color: #ffffff;
        }
        .gs-btn-primary:hover {
          background: #000000;
        }
        .gs-btn-secondary {
          background: #ffffff;
          color: #374151;
          border-color: #d1d5db;
        }
        .gs-btn-secondary:hover {
          background: #f9fafb;
          border-color: #9ca3af;
        }
        .gs-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 36px;
          height: 36px;
          border-radius: 999px;
          border: none;
          background: rgba(255, 255, 255, 0.92);
          color: #111827;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(16, 24, 40, 0.12);
          transition: background 0.15s ease, transform 0.15s ease;
        }
        .gs-arrow:hover {
          background: #ffffff;
          transform: translateY(-50%) scale(1.06);
        }
        .gs-dot {
          height: 8px;
          border-radius: 999px;
          border: none;
          padding: 0;
          cursor: pointer;
          transition: background 0.2s ease, width 0.2s ease;
        }
      `}</style>

      <ExhibitionCard />
      <TestimonialCarousel />
    </div>
  );
}
