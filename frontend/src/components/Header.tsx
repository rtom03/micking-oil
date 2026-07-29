import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Certifications", href: "/certifications" },
  { label: "Referrals", href: "/referrals" },
  { label: "Gallery/Exhibition", href: "/gallery" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full bg-white transition-shadow duration-200 ${
        scrolled ? "shadow-[0_2px_16px_rgba(0,0,0,0.08)]" : "shadow-none"
      }`}
    >
      {/* Top accent bar */}
      <div className="h-[3px] w-full bg-gradient-to-r from-[#D6241C] to-[#F2A93B]" />

      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-10 lg:px-14">
        {/* Logo */}
        <Link to="#home" className="flex items-center gap-3">
          <img
            className="flex h-11 w-11 items-center justify-center  font-serif text-lg font-bold text-white"
            src="/micking.webp"
          />

          <span className="flex flex-col leading-tight">
            <span className="text-lg font-extrabold uppercase tracking-wide text-[#14120F]">
              Micking
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D6241C]">
              Engine Oils
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className="group relative py-1 text-sm font-semibold uppercase tracking-wide text-[#14120F]/80 transition-colors hover:text-[#14120F]"
            >
              {link.label}
              <span className="absolute -bottom-0.5 left-0 h-[2px] w-0 bg-gradient-to-r from-[#D6241C] to-[#F2A93B] transition-all duration-200 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <Link
          to="#contact"
          className="hidden rounded-md bg-[#D6241C] px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#B81E17] lg:inline-block"
        >
          Contact Us
        </Link>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsOpen((v) => !v)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          className="inline-flex items-center justify-center rounded-md p-2 text-[#14120F] lg:hidden"
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile nav */}
      <div
        className={`overflow-hidden bg-white transition-[max-height] duration-300 ease-in-out lg:hidden ${
          isOpen ? "max-h-[26rem]" : "max-h-0"
        }`}
      >
        <nav className="flex flex-col gap-1 border-t border-black/5 px-6 py-4 sm:px-10">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              onClick={() => setIsOpen(false)}
              className="rounded-md px-2 py-3 text-sm font-semibold uppercase tracking-wide text-[#14120F]/80 transition-colors hover:bg-[#F2A93B]/10 hover:text-[#14120F]"
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="#contact"
            onClick={() => setIsOpen(false)}
            className="mt-2 rounded-md bg-[#D6241C] px-5 py-3 text-center text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#B81E17]"
          >
            Contact Us
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
