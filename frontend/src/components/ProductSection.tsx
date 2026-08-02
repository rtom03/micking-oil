import { Link } from "react-router-dom";
import { PRODUCTS, type Product } from "./../constants/product";

interface ProductCardProps {
  product: Product;
}

const nairaFormatter = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  maximumFractionDigits: 0,
});

const ProductCard = ({ product }: ProductCardProps) => {
  const coverImage = product.variants[0]?.image;
  const prices = product.variants.map((variant) => variant.price);
  const minPrice = Math.min(...prices);

  return (
    <Link to={`/products/${product.slug}`} className="block">
      {/* Natural aspect ratio — no forced square box, so there's no dead
          space padding out the sides of the bottle like a square crop would. */}
      <img
        src={coverImage}
        alt={product.name}
        className="block w-full h-auto"
      />
      <p className="mt-2 text-sm text-[#2B2B28]">{product.name}</p>
      <p className="text-sm text-[#6B6B66]">
        {nairaFormatter.format(minPrice)}
      </p>
    </Link>
  );
};

const ProductsSection = () => {
  return (
    <section className="w-full bg-white py-6 sm:py-10" id={"#shop"}>
      <h2 className="mb-6 px-4 text-center text-xl font-extrabold tracking-tight text-black sm:mb-8 sm:text-2xl md:mb-10 md:text-3xl">
        Buy from Your Nearest Distributor for Swift Delivery
      </h2>
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-14">
        <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-6 lg:grid-cols-4">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
