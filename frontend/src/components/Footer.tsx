const Footer = () => {
  return (
    <footer className="relative border-r-4 border-[#1E3A8A] bg-[#F8FAFC] px-6 py-14 sm:px-10 lg:px-14">
      <div className="mx-auto max-w-3xl">
        {/* Eyebrow */}
        <p className="text-xs font-semibold tracking-[0.2em] text-[#C97B3D]">
          REACH US
        </p>

        {/* Heading */}
        <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#1A1A1A] sm:text-4xl">
          Contact Information
        </h2>

        {/* Address */}
        <div className="mt-8">
          <p className="text-xs font-semibold tracking-[0.2em] text-[#C97B3D]">
            ADDRESS
          </p>
          <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-[#3F3F3F]">
            8, Kunle Ogunade Close, Off Int'l Airport Road by Conoil, Opposite
            Mobil Filling Station, Behind Marriott Hotel, Ikeja, Lagos.
          </p>
        </div>

        {/* Contact grid */}
        <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-3">
          {/* Phone */}
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-[#C97B3D]">
              PHONE
            </p>
            <ul className="mt-2 space-y-1.5">
              {["0706 864 7625", "0818 490 8016", "0803 306 0882"].map(
                (phone) => (
                  <li key={phone}>
                    <a
                      href={`tel:${phone.replace(/\s+/g, "")}`}
                      className="text-[15px] font-medium text-[#1A1A1A] underline decoration-[#D1D5DB] underline-offset-4 transition-colors hover:text-[#C97B3D] hover:decoration-[#C97B3D]"
                    >
                      {phone}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Email */}
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-[#C97B3D]">
              EMAIL
            </p>
            <div className="mt-2">
              <a
                href="mailto:gstoneltd20@yahoo.com"
                className="text-[15px] font-medium text-[#1A1A1A] underline decoration-[#D1D5DB] underline-offset-4 transition-colors hover:text-[#C97B3D] hover:decoration-[#C97B3D]"
              >
                gstoneltd20@yahoo.com
              </a>
            </div>
          </div>

          {/* Website */}
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-[#C97B3D]">
              WEBSITE
            </p>
            <div className="mt-2">
              <a
                href="https://www.goldenstone.com.ng"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[15px] font-medium text-[#1A1A1A] underline decoration-[#D1D5DB] underline-offset-4 transition-colors hover:text-[#C97B3D] hover:decoration-[#C97B3D]"
              >
                www.goldenstone.com.ng
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
