/**
 * Certifications page — Golden Stone Investments Ltd.
 *
 * Renders one or more certification/document cards. Data-driven so adding a
 * new certificate is a new array entry, not new markup.
 */

interface MetaField {
  label: string;
  value: string;
}

interface CertificationDocument {
  badge: string;
  title: string;
  description: string;
  meta: MetaField[];
  viewUrl: string;
  downloadUrl: string;
}

// NOTE: source content says "MICHANG" (description + Issuer field), while
// the brand is spelled "MICKING" everywhere else on the site. Kept verbatim
// below — flag if this should actually read "MICKING".
const CERTIFICATIONS: CertificationDocument[] = [
  {
    badge: "Certification Document",
    title: "Certificate of Analysis",
    description:
      "This document contains batch-level Certificates of Analysis issued by MICHANG Quality Assurance Team for multiple automotive and industrial fluid products. It includes verified laboratory results, product details, and quality control records.",
    meta: [
      { label: "File Type", value: "PDF" },
      { label: "Category", value: "Quality Certification" },
      { label: "Issuer", value: "MICHANG" },
    ],
    viewUrl:
      "https://cdn.shopify.com/s/files/1/0709/3927/9536/files/Certificat_D_Analysis_-_Certifications.pdf?v=1783010011",
    downloadUrl:
      "https://cdn.shopify.com/s/files/1/0709/3927/9536/files/Certificat_D_Analysis_-_Certifications.pdf?v=1783010011",
  },
];

const CertificateCard = ({ doc }: { doc: CertificationDocument }) => (
  <div className="max-w-[720px] rounded-2xl border border-[#e5e7eb] bg-white p-6 font-sans text-[#111827] shadow-[0_4px_16px_rgba(0,0,0,0.06)]">
    <div className="flex flex-col gap-3">
      <div className="w-fit rounded-full bg-[#f3f4f6] px-2.5 py-1.5 text-xs font-semibold uppercase tracking-[0.04em] text-[#374151]">
        {doc.badge}
      </div>

      <h3 className="text-[22px] leading-tight font-bold text-[#111827]">
        {doc.title}
      </h3>

      <p className="text-[15px] leading-[1.7] text-[#4b5563]">
        {doc.description}
      </p>

      <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {doc.meta.map((field) => (
          <div
            key={field.label}
            className="rounded-xl border border-[#e5e7eb] bg-[#f9fafb] p-3.5"
          >
            <div className="mb-1 text-xs text-[#6b7280]">{field.label}</div>
            <div className="text-sm font-semibold text-[#111827]">
              {field.value}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-2 flex flex-wrap gap-3">
        <a
          href={doc.viewUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-[10px] bg-[#111827] px-[18px] py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          View Document
        </a>
        <a
          href={doc.downloadUrl}
          download
          className="inline-block rounded-[10px] border border-[#d1d5db] bg-white px-[18px] py-3 text-sm font-semibold text-[#111827] transition-colors hover:border-[#9ca3af]"
        >
          Download PDF
        </a>
      </div>
    </div>
  </div>
);

const Certifications = () => {
  return (
    <section className="w-full bg-[#F9FAFB] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-14">
        <h1 className="text-2xl font-bold text-[#111827]">Certifications</h1>
        <p className="mt-2 max-w-2xl text-sm text-[#4b5563]">
          Laboratory-verified quality documentation for our product range.
        </p>

        <div className="mt-8 flex flex-col gap-6">
          {CERTIFICATIONS.map((doc) => (
            <CertificateCard key={doc.viewUrl} doc={doc} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
