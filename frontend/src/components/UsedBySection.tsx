import {
  LogoMarqueeCards,
  type LogoMarqueeItem,
} from "./ui/infinite-moving-cards";

// NOTE: no logo file on hand yet for these two — they render as an
// initials badge via LogoMarqueeCards' fallback until an image is added.
const ROW_1: LogoMarqueeItem[] = [
  { name: "GIGM", logo: "./gigm.jpg" },
  { name: "Toyota (Briscoe)", logo: "./briscoe.jpg" },
  { name: "Mikano International Limited", logo: "./mikano.png" },
  { name: "Leventis", logo: "./leventis.jpg" },
  { name: "Affordable Cars" },
];

const ROW_2: LogoMarqueeItem[] = [
  { name: "Chisco", logo: "./chisco.png" },
  { name: "Ineh Mic", logo: "./ineh.png" },
  { name: "Sifax Group", logo: "./sifax.jpg" },
  { name: "NAHCO Aviance", logo: "./nahco" },
  { name: "ABC Transport" },
];

const UsedBySection = () => {
  return (
    <section className="w-full bg-[#FAFAF9] py-16 sm:py-20">
      {/* Heading */}
      <div className="mx-auto max-w-3xl px-6 text-center sm:px-10">
        <h2 className="mt-2 text-4xl font-extrabold tracking-tight text-[#14120F] sm:text-5xl">
          Keeping Nigeria Moving
        </h2>
        <p className="mt-4 text-[15px] leading-relaxed text-[#14120F]/60">
          Trusted by the fleets, logistics operators, and transport companies
          that keep the country running — every single day.
        </p>
      </div>

      {/* Logo marquee — edge fade is handled by the mask-image inside
          LogoMarqueeCards itself, so no extra gradient overlay divs
          are needed here. */}
      <div className="mt-12 space-y-5">
        <LogoMarqueeCards items={ROW_1} direction="left" speed="slow" />
        <LogoMarqueeCards items={ROW_2} direction="right" speed="slow" />
      </div>
    </section>
  );
};

export default UsedBySection;
