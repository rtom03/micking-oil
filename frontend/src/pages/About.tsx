/**
 * About page — Golden Stone Investments Ltd.
 *
 * This page intentionally uses its own quieter, editorial visual identity
 * (warm neutrals, amber accent, monospace "kicker" labels) distinct from the
 * bold red/orange/black marketing pages elsewhere in the site.
 */

interface OtherProduct {
  name: string;
  code: string;
}

const VISCOSITY_GRADES: string[] = [
  "0W-20",
  "5W-20",
  "5W-30",
  "5W-40",
  "10W-40",
  "15W-40",
  "20W-50",
];

const OTHER_PRODUCTS: OtherProduct[] = [
  { name: "Gear Oils", code: "80W-90 GL-4 / 85W-140 GL-5" },
  { name: "Diesel Engine Oil", code: "15W-40 CI-4" },
  { name: "Hydraulic Oils", code: "RO-100 / RO-68 / RO-46" },
  { name: "Grease", code: "EP2 / EP3" },
  { name: "Coolant", code: "—" },
  { name: "Automatic Transmission Fluid", code: "ATF Dex 11" },
];

const PARTNERS: string[] = [
  "A.G. Leventis (Nigeria) Ltd",
  "Chisco",
  "Mikano",
  "Briscoe",
  "Globe Motors",
  "Sifax Group",
  "GIGM",
];

const COMPANY_PROFILE_URL =
  "https://cdn.shopify.com/s/files/1/0709/3927/9536/files/Company_Profile_-_About_us_d945edb5-24a7-4330-b90f-5f241d8cba30.pdf?v=1782827084";

const oswald = { fontFamily: "'Oswald', sans-serif" } as const;
const mono = { fontFamily: "'IBM Plex Mono', monospace" } as const;

const Kicker = ({ children }: { children: React.ReactNode }) => (
  <div
    style={mono}
    className="mb-2.5 text-xs font-medium uppercase tracking-[0.14em] text-[#9c5f16]"
  >
    {children}
  </div>
);

const About = () => {
  return (
    <main className="mx-auto max-w-[1040px] bg-white font-['Work_Sans'] leading-relaxed text-[#1d2023]">
      {/* Local font import — move to index.html <head> for production (with preconnect) */}
      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Work+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@500;600&display=swap");
      `}</style>

      {/* Hero */}
      <div className="bg-gradient-to-b from-[#faf8f4] to-white px-[22px] py-16 sm:px-10 sm:py-[72px] sm:pb-[52px]">
        <Kicker>Automotive Lubricants Distributor — Lagos, Nigeria</Kicker>
        <h1
          style={oswald}
          className="max-w-[820px] text-[32px] font-bold leading-[1.08] sm:text-[50px]"
        >
          Golden Stone Investments Ltd. — distributor of{" "}
          <span className="text-[#c1791f]">MICKING</span> engine oils and
          industrial lubricants
        </h1>
        <p className="mt-4 max-w-[640px] text-[17px] text-[#565c63]">
          We supply a complete range of engine oils, gear oils, hydraulic
          fluids, grease, and related lubricant products to workshops, fleets,
          and distributors across Nigeria.
        </p>
        <div className="mt-8 h-[3px] w-16 rounded-sm bg-[#c1791f]" />
      </div>

      {/* Who We Are */}
      <div className="border-t border-[#e4e0d6] px-[22px] py-14 sm:px-10">
        <Kicker>Who We Are</Kicker>
        <div className="grid grid-cols-1 items-start gap-10 sm:grid-cols-[1fr_auto]">
          <div>
            <p className="max-w-[720px] text-base text-[#565c63]">
              Golden Stone Investments Ltd. supplies MICKING engine oils and
              industrial lubricants to workshops, fleets, and distributors
              across Lagos and beyond. Our product range is selected to support
              engine protection, smooth mechanical performance, and long-lasting
              equipment reliability.
            </p>

            <div className="mt-[18px] flex flex-wrap gap-3">
              <a
                href={COMPANY_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={oswald}
                className="inline-flex items-center justify-center gap-2.5 rounded-[10px] border border-[#e4e0d6] bg-white px-[18px] py-3 text-sm uppercase tracking-wide text-[#1d2023] transition-all hover:-translate-y-px hover:border-[#c1791f] hover:text-[#9c5f16]"
              >
                View Documentation
              </a>
            </div>
          </div>

          <div className="border-t border-[#e4e0d6] pt-4 text-left sm:min-w-[180px] sm:border-l sm:border-t-0 sm:pl-6 sm:text-right">
            <Kicker>Brand</Kicker>
            <div style={oswald} className="text-[22px] font-bold">
              MICKING OIL
            </div>
          </div>
        </div>
      </div>

      {/* Product Offerings */}
      <div className="border-t border-[#e4e0d6] px-[22px] py-14 sm:px-10">
        <Kicker>What We Stock</Kicker>
        <h2 style={oswald} className="mb-[18px] text-[25px] font-semibold">
          Product Offerings
        </h2>

        <div
          style={oswald}
          className="mb-3.5 mt-[22px] text-sm font-semibold uppercase tracking-[0.06em] text-[#9c5f16]"
        >
          Gasoline Engine Oils
        </div>
        <div className="flex flex-wrap gap-2.5">
          {VISCOSITY_GRADES.map((grade) => (
            <div
              key={grade}
              style={mono}
              className="rounded-full border border-[#e4e0d6] bg-[#faf8f4] px-4 py-2 text-sm font-semibold"
            >
              {grade}
            </div>
          ))}
        </div>
        <div className="mt-3.5 text-sm text-[#565c63]">
          Available in fully synthetic and semi-synthetic formulations.
        </div>

        <div
          style={oswald}
          className="mb-3.5 mt-[34px] text-sm font-semibold uppercase tracking-[0.06em] text-[#9c5f16]"
        >
          Other Products
        </div>
        <ul className="grid grid-cols-1 gap-x-8 gap-y-1 lg:grid-cols-2">
          {OTHER_PRODUCTS.map((item) => (
            <li
              key={item.name}
              className="flex justify-between gap-3 border-b border-[#e4e0d6] py-3.5 text-[15px]"
            >
              {item.name}
              <span
                style={mono}
                className="whitespace-nowrap text-[13px] text-[#565c63]"
              >
                {item.code}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Usage Guidance */}
      <div className="border-t border-[#e4e0d6] px-[22px] py-14 sm:px-10">
        <Kicker>Before You Buy</Kicker>
        <h2 style={oswald} className="mb-[18px] text-[25px] font-semibold">
          Usage Guidance
        </h2>
        <div className="flex max-w-[720px] items-start gap-4">
          <div
            style={oswald}
            className="mt-0.5 flex h-[30px] w-[30px] min-w-[30px] items-center justify-center rounded-full border-[1.5px] border-[#c6491e] text-lg font-bold text-[#c6491e]"
          >
            i
          </div>
          <p className="text-[15.5px]">
            Check your engine cap or owner's manual for the correct oil
            specification before purchase to ensure the right viscosity and
            grade for your vehicle or machine.
          </p>
        </div>
      </div>

      {/* Partnerships */}
      <div className="border-t border-[#e4e0d6] px-[22px] py-14 sm:px-10">
        <Kicker>Trusted By</Kicker>
        <h2 style={oswald} className="mb-[18px] text-[25px] font-semibold">
          Partnerships
        </h2>
        <p className="mb-[22px] max-w-[720px] text-base text-[#565c63]">
          Golden Stone Investments Ltd. is associated with leading automotive
          and transport companies, including:
        </p>
        <div className="flex flex-wrap gap-x-7 gap-y-3">
          {PARTNERS.map((partner) => (
            <div
              key={partner}
              style={oswald}
              className="border-b-2 border-[#e4e0d6] pb-1.5 text-[15px]"
            >
              {partner}
            </div>
          ))}
        </div>
      </div>

      {/* Contact */}
      <div className="border-t border-[#e4e0d6] px-[22px] py-14 sm:px-10">
        <Kicker>Reach Us</Kicker>
        <h2 style={oswald} className="mb-[18px] text-[25px] font-semibold">
          Contact Information
        </h2>
        <div className="grid grid-cols-1 gap-x-7 gap-y-8 sm:grid-cols-3">
          <div className="sm:col-span-3">
            <div
              style={mono}
              className="mb-2 text-[11px] uppercase tracking-[0.1em] text-[#9c5f16]"
            >
              Address
            </div>
            <div className="text-[15px]">
              8, Kunle Ogunade Close, Off Int'l Airport Road by Conoil, Opposite
              Mobil Filling Station, Behind Marriott Hotel, Ikeja, Lagos.
            </div>
          </div>

          <div>
            <div
              style={mono}
              className="mb-2 text-[11px] uppercase tracking-[0.1em] text-[#9c5f16]"
            >
              Phone
            </div>
            <div className="space-y-0.5 text-[15px]">
              {["0706 864 7625", "0818 490 8016", "0803 306 0882"].map(
                (phone) => (
                  <div key={phone}>
                    <a
                      href={`tel:${phone.replace(/\s+/g, "")}`}
                      className="border-b border-[#e4e0d6] transition-colors hover:border-[#c1791f] hover:text-[#9c5f16]"
                    >
                      {phone}
                    </a>
                  </div>
                ),
              )}
            </div>
          </div>

          <div>
            <div
              style={mono}
              className="mb-2 text-[11px] uppercase tracking-[0.1em] text-[#9c5f16]"
            >
              Email
            </div>
            <div className="text-[15px]">
              <a
                href="mailto:gstoneltd20@yahoo.com"
                className="border-b border-[#e4e0d6] transition-colors hover:border-[#c1791f] hover:text-[#9c5f16]"
              >
                gstoneltd20@yahoo.com
              </a>
            </div>
          </div>

          <div>
            <div
              style={mono}
              className="mb-2 text-[11px] uppercase tracking-[0.1em] text-[#9c5f16]"
            >
              Website
            </div>
            <div className="text-[15px]">
              <a
                href="https://www.goldenstone.com.ng"
                target="_blank"
                rel="noopener noreferrer"
                className="border-b border-[#e4e0d6] transition-colors hover:border-[#c1791f] hover:text-[#9c5f16]"
              >
                www.goldenstone.com.ng
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default About;
