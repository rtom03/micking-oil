import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { PRODUCTS, type ProductVariant } from "../constants/prodData";
import { findNearestDistributor } from "../services/distributorService";
import Loader from "../components/Loader";
import DistributorModal from "../components/DistributorModal";
import type { Distributor } from "../services/distributor";

const nairaFormatter = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  maximumFractionDigits: 0,
});

const Product = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = PRODUCTS.find((p) => p.slug === slug);
  const [loading, setLoading] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    product?.variants[0] ?? null,
  );

  const [modalOpen, setModalOpen] = useState(false);

  const [nearestDistributor, setNearestDistributor] = useState<{
    distributor: Distributor;
    distance: number;
  } | null>(null);

  // const handleBuy = async () => {
  //   setLoading(true);
  //   try {
  //     const result = await findNearestDistributor();

  //     console.log(result.distributor);

  //     window.open(`https://wa.me/${result.distributor.phone}`, "_blank");
  //   } catch (err) {
  //     console.error(err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  //   const handleBuy = async () => {
  //     setLoading(true);

  //     try {
  //       const { distributor } = await findNearestDistributor();

  //       const message = encodeURIComponent(
  //         `
  // Hello,

  // I'd like to get more information about this product.

  // Product: ${product?.name}
  // Size: ${selectedVariant?.size}
  // Price: ${nairaFormatter.format(selectedVariant?.price!)}
  // Grade: ${product?.grade}
  // API Rating: ${product?.apiRating}
  // Volume: ${selectedVariant?.volumeLitres}L

  // Distributor's Info: ${distributor.location}

  // Thank you.
  //     `.trim(),
  //       );

  //       // window.open(
  //       //   `https://wa.me/${distributor.phone}?text=${message}`,
  //       //   "_blank",
  //       // );
  //       window.location.href = `https://wa.me/${distributor.phone}?text=${message}`;
  //     } catch (err) {
  //       console.error(err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  // Hooks must run unconditionally — guard the "not found" return after this.

  const handleBuy = async () => {
    setLoading(true);

    try {
      const result = await findNearestDistributor();

      setNearestDistributor(result);

      setModalOpen(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const continueToWhatsapp = () => {
    if (!nearestDistributor) return;

    const { distributor } = nearestDistributor;

    const message = encodeURIComponent(
      `
Hello,

I'd like to get more information about this product.

Product: ${product?.name}
Size: ${selectedVariant?.size}
Price: ${nairaFormatter.format(selectedVariant?.price!)}
Grade: ${product?.grade}
API Rating: ${product?.apiRating}
Volume: ${selectedVariant?.volumeLitres}L

Thank you.
`.trim(),
    );

    window.location.href = `https://wa.me/${distributor.phone}?text=${message}`;
  };

  if (!product || !selectedVariant) {
    return (
      <section className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h1 className="text-2xl font-extrabold text-[#14120F]">
          Product not found
        </h1>
        <p className="mt-2 text-sm text-[#14120F]/60">
          The product you're looking for doesn't exist or may have been removed.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block rounded-md bg-[#D6241C] px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#B81E17]"
        >
          Back to Products
        </Link>
      </section>
    );
  }

  return (
    <section className="w-full bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-14">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-[#14120F]/50">
          <Link to="/" className="hover:text-[#D6241C]">
            Home
          </Link>
          <span>/</span>
          <Link to="/products" className="hover:text-[#D6241C]">
            Products
          </Link>
          <span>/</span>
          <span className="text-[#14120F]">{product.name}</span>
        </nav>

        <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Gallery */}
          <div>
            <div className="flex items-center justify-center bg-[#F4F4F2]">
              <img
                key={selectedVariant.image}
                src={selectedVariant.image}
                alt={`${product.name} — ${selectedVariant.size}`}
                className="h-auto w-full max-w-sm object-contain py-8"
              />
            </div>

            {/* Thumbnails — one per variant */}
            {product.variants.length > 1 && (
              <div className="mt-4 flex gap-3">
                {product.variants.map((variant) => {
                  const isActive = variant.size === selectedVariant.size;
                  return (
                    <button
                      key={variant.size}
                      type="button"
                      onClick={() => setSelectedVariant(variant)}
                      aria-label={`View ${product.name} ${variant.size}`}
                      aria-pressed={isActive}
                      className={`flex h-20 w-20 shrink-0 items-center justify-center rounded-md border bg-[#F4F4F2] p-2 transition-colors ${
                        isActive
                          ? "border-[#D6241C]"
                          : "border-black/10 hover:border-black/30"
                      }`}
                    >
                      <img
                        src={variant.image}
                        alt=""
                        className="h-full w-full object-contain"
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-[#14120F] px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
                {product.grade}
              </span>
              <span className="rounded-full border border-black/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-[#14120F]/70">
                {product.apiRating}
              </span>
            </div>

            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-[#14120F] sm:text-4xl">
              {product.name}
            </h1>

            <p className="mt-3 text-2xl font-extrabold text-[#D6241C]">
              {nairaFormatter.format(selectedVariant.price)}
            </p>

            <p className="mt-4 text-[15px] leading-relaxed text-[#14120F]/70">
              {product.description}
            </p>

            {/* Size selector */}
            <div className="mt-8">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#14120F]/50">
                Size — {selectedVariant.size}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.variants.map((variant) => {
                  const isActive = variant.size === selectedVariant.size;
                  return (
                    <button
                      key={variant.size}
                      type="button"
                      onClick={() => setSelectedVariant(variant)}
                      aria-pressed={isActive}
                      className={`rounded-md border px-4 py-2 text-sm font-bold transition-colors ${
                        isActive
                          ? "border-[#D6241C] bg-[#D6241C] text-white"
                          : "border-black/15 text-[#14120F] hover:border-[#D6241C] hover:text-[#D6241C]"
                      }`}
                    >
                      {variant.size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={handleBuy}
              type="button"
              className="mt-8 w-full rounded-md bg-[#D6241C] px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#B81E17] sm:w-auto"
            >
              {loading ? <Loader /> : "Enquire About This Product"}
            </button>

            {/* Specs */}
            <dl className="mt-10 divide-y divide-black/10 border-t border-black/10">
              <div className="flex justify-between py-3 text-sm">
                <dt className="text-[#14120F]/60">Grade</dt>
                <dd className="font-semibold text-[#14120F]">
                  {product.grade}
                </dd>
              </div>
              <div className="flex justify-between py-3 text-sm">
                <dt className="text-[#14120F]/60">API Rating</dt>
                <dd className="font-semibold text-[#14120F]">
                  {product.apiRating}
                </dd>
              </div>
              <div className="flex justify-between py-3 text-sm">
                <dt className="text-[#14120F]/60">Bottle Label</dt>
                <dd className="font-semibold text-[#14120F]">
                  {selectedVariant.label}
                </dd>
              </div>
              <div className="flex justify-between py-3 text-sm">
                <dt className="text-[#14120F]/60">Volume</dt>
                <dd className="font-semibold text-[#14120F]">
                  {selectedVariant.volumeLitres} L
                </dd>
              </div>
            </dl>

            {/* Available sizes summary */}
            <p className="mt-6 text-xs text-[#14120F]/50">
              Available in {product.variants.map((v) => v.size).join(", ")}.
            </p>
          </div>
        </div>
      </div>
      <DistributorModal
        open={modalOpen}
        distributor={nearestDistributor?.distributor ?? null}
        distance={nearestDistributor?.distance}
        onClose={() => setModalOpen(false)}
        onContinue={continueToWhatsapp}
      />
    </section>
  );
};

export default Product;
