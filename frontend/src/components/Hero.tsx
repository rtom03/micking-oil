import heroImage from "/hero-engine-oil.jpg";

const Hero = () => {
  return (
    <section className="relative w-full overflow-hidden bg-[#0B0C0E]">
      {/* Background image — full width, natural aspect ratio, nothing cropped */}
      <img
        src={heroImage}
        alt="A driver stands over a smoking engine in Lagos traffic — a preventable breakdown."
        className="block w-full h-200"
      />

      {/* Legibility gradient — strongest at the bottom where the CTA sits */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C0E] via-[#0B0C0E]/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0B0C0E]/30 via-transparent to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 z-10 flex flex-col justify-end px-6 pb-14 sm:px-10 sm:pb-16 lg:px-16">
        <div className="max-w-xl">
          {/* Signature element: pulsing diagnostic alert tag */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#F2A93B]/40 bg-black/40 px-3 py-1.5 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#F2A93B] opacity-75 motion-reduce:animate-none" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#F2A93B]" />
            </span>
            <span className="font-mono text-[11px] font-medium uppercase tracking-[0.15em] text-[#F2A93B]">
              Engine health alert · Lagos
            </span>
          </div>

          {/* Subhead — supports the image's headline, doesn't repeat it */}
          {/* <p className="max-w-md text-[15px] leading-relaxed text-[#C9CCD1] sm:text-base">
            Sludge builds up quietly. By the time it shows on the dashboard, the
            damage is already done. Genuine engine oil, changed on schedule, is
            the cheapest insurance your engine will ever get.
          </p> */}

          {/* CTAs */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button className="rounded-md bg-[#F2A93B] px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-[#0B0C0E] transition-colors hover:bg-[#FFC15C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F2A93B]">
              Shop Genuine Engine Oil
            </button>
            <button className="rounded-md border border-white/30 px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:border-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
              Find a Dealer Near You
            </button>
          </div>
        </div>

        {/* Trust strip */}
        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-white/10 pt-5 font-mono text-[11px] uppercase tracking-[0.12em] text-[#C9CCD1]/80">
          <span>100% Genuine Stock</span>
          <span className="h-1 w-1 rounded-full bg-[#C9CCD1]/40" />
          <span>Nationwide Delivery</span>
          <span className="h-1 w-1 rounded-full bg-[#C9CCD1]/40" />
          <span>Certified Dealers Only</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
