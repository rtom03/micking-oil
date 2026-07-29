import React from "react";
import {
  FileText,
  Image as ImageIcon,
  ExternalLink,
  Download,
  Calendar,
  Building2,
} from "lucide-react";

type LetterProps = {
  id: string;
  title: string;
  description: string;
  fileType: "PDF" | "JPG" | "PNG";
  issued: string;
  issuer: string;
  url: string;
  downloadLabel: string;
};

const letters: LetterProps[] = [
  {
    id: "kojo",
    title: "Kojo Auto Service Centre",
    description:
      "Official letter of reference confirming Golden Stone Investment Ltd as a trusted vendor since 2016, supplying high-quality battery, engine oil, and grease products for Kojo's Toyota-authorized auto-service operations.",
    fileType: "PDF",
    issued: "Jun 23, 2026",
    issuer: "Kojo Motors",
    url: "https://cdn.shopify.com/s/files/1/0709/3927/9536/files/Kojo_Reference_23_June_2026_v2.pdf?v=1783068216",
    downloadLabel: "Download PDF",
  },
  {
    id: "primero",
    title: "Primero Transport Services Ltd",
    description:
      "Letter of reference from Primero TSL's Procurement Superintendent affirming a reliable, quality-driven vendor relationship with Golden Stone Investment Ltd since 2016, covering battery, engine oil, and grease supply for their transport fleet.",
    fileType: "PDF",
    issued: "Jun 23, 2026",
    issuer: "Primero TSL",
    url: "https://cdn.shopify.com/s/files/1/0709/3927/9536/files/Primero_reference.png?v=1783068216",
    downloadLabel: "Download PDF",
  },
  {
    id: "briscoe",
    title: "R.T. Briscoe (Nigeria) Plc",
    description:
      "Letter of reference from R.T. Briscoe's Procurement Executive confirming Golden Stone Investment Ltd as a reputable vendor since 2016, supplying high-quality battery, engine oil, and grease for their vehicle service and maintenance business.",
    fileType: "JPG",
    issued: "Mar 15, 2021",
    issuer: "R.T. Briscoe",
    url: "https://cdn.shopify.com/s/files/1/0709/3927/9536/files/Briscoe_Referral.jpg?v=1783068214",
    downloadLabel: "Download Image",
  },
  {
    id: "inehmic",
    title: "Ineh-Mic Automobile Co. Ltd",
    description:
      "Letter of reference signed by the General Manager of Ineh-Mic Automobile Co. Ltd, affirming Golden Stone Investment Ltd as a reliable vendor since 2016, supplying high-quality battery, engine oil, and grease for their auto-work business.",
    fileType: "PNG",
    issued: "Jun 23, 2026",
    issuer: "Ineh-Mic Motors",
    url: "https://cdn.shopify.com/s/files/1/0709/3927/9536/files/Inehmic_Referral.png?v=1783068215",
    downloadLabel: "Download Image",
  },
];

const FILE_ICON: Record<LetterProps["fileType"], React.ReactNode> = {
  PDF: <FileText size={15} strokeWidth={2} />,
  JPG: <ImageIcon size={15} strokeWidth={2} />,
  PNG: <ImageIcon size={15} strokeWidth={2} />,
};

function InfoCell({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div
      style={{
        background: "#f9fafb",
        border: "1px solid #eef0f2",
        borderRadius: "10px",
        padding: "10px 12px",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        minWidth: 0,
      }}
    >
      <div style={{ color: "#9ca3af", display: "flex", flexShrink: 0 }}>
        {icon}
      </div>
      <div style={{ minWidth: 0 }}>
        <div
          style={{
            fontSize: "11px",
            color: "#9ca3af",
            fontWeight: 500,
            letterSpacing: "0.02em",
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontSize: "13.5px",
            fontWeight: 600,
            color: "#111827",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {value}
        </div>
      </div>
    </div>
  );
}

function ReferenceLetterCard({ letter }: { letter: LetterProps }) {
  return (
    <div className="ref-card">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "14px",
          height: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: "12px",
          }}
        >
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
            <span
              style={{
                width: 5,
                height: 5,
                borderRadius: "999px",
                background: "#4338ca",
                display: "inline-block",
              }}
            />
            Reference Letter
          </div>
        </div>

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
            {letter.title}
          </h3>
          <p
            style={{
              margin: 0,
              fontSize: "14.5px",
              lineHeight: 1.65,
              color: "#6b7280",
            }}
          >
            {letter.description}
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "8px",
            marginTop: "auto",
            paddingTop: "6px",
          }}
        >
          <InfoCell
            icon={FILE_ICON[letter.fileType]}
            label="File"
            value={letter.fileType}
          />
          <InfoCell
            icon={<Calendar size={15} strokeWidth={2} />}
            label="Issued"
            value={letter.issued}
          />
          <InfoCell
            icon={<Building2 size={15} strokeWidth={2} />}
            label="Issuer"
            value={letter.issuer}
          />
        </div>

        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <a
            href={letter.url}
            target="_blank"
            rel="noopener noreferrer"
            className="ref-btn ref-btn-primary"
          >
            <ExternalLink size={15} strokeWidth={2.25} />
            View Document
          </a>
          <a href={letter.url} download className="ref-btn ref-btn-secondary">
            <Download size={15} strokeWidth={2.25} />
            {letter.downloadLabel}
          </a>
        </div>
      </div>
    </div>
  );
}

export default function ReferenceLetters() {
  return (
    <div
      style={{
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif",
        maxWidth: "1040px",
        margin: "0 auto",
        padding: "48px 24px",
      }}
    >
      <style>{`
        .ref-card {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 16px;
          padding: 26px;
          box-shadow: 0 1px 2px rgba(16, 24, 40, 0.04);
          color: #111827;
          transition: box-shadow 0.2s ease, transform 0.2s ease, border-color 0.2s ease;
        }
        .ref-card:hover {
          box-shadow: 0 12px 24px rgba(16, 24, 40, 0.08);
          border-color: #d1d5db;
          transform: translateY(-2px);
        }
        .ref-btn {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          text-decoration: none;
          padding: 10px 16px;
          border-radius: 9px;
          font-size: 13.5px;
          font-weight: 600;
          transition: background 0.15s ease, border-color 0.15s ease, color 0.15s ease;
        }
        .ref-btn-primary {
          background: #111827;
          color: #ffffff;
        }
        .ref-btn-primary:hover {
          background: #000000;
        }
        .ref-btn-secondary {
          background: #ffffff;
          color: #374151;
          border: 1px solid #d1d5db;
        }
        .ref-btn-secondary:hover {
          background: #f9fafb;
          border-color: #9ca3af;
        }
        .ref-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 22px;
        }
        @media (max-width: 760px) {
          .ref-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div style={{ marginBottom: "36px", maxWidth: "620px" }}>
        <div
          style={{
            display: "inline-block",
            fontSize: "12px",
            fontWeight: 700,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: "#4338ca",
            marginBottom: "12px",
          }}
        >
          Client Referrals
        </div>
        <h1
          style={{
            margin: "0 0 10px 0",
            fontSize: "32px",
            fontWeight: 800,
            letterSpacing: "-0.02em",
            color: "#111827",
            lineHeight: 1.2,
          }}
        >
          Trusted by our partners since 2016
        </h1>
        <p
          style={{
            margin: 0,
            fontSize: "15.5px",
            lineHeight: 1.65,
            color: "#6b7280",
          }}
        >
          Signed reference letters from long-standing automotive and transport
          partners, confirming Golden Stone Investment Ltd's track record as a
          reliable supplier of battery, engine oil, and grease products.
        </p>
      </div>

      <div className="ref-grid">
        {letters.map((letter) => (
          <ReferenceLetterCard key={letter.id} letter={letter} />
        ))}
      </div>
    </div>
  );
}
