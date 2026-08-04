import { Link } from "react-router-dom";
import {
  PRODUCTS,
  type Product,
  type ProductVariant,
} from "../constants/prodData";

const nairaFormatter = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  maximumFractionDigits: 0,
});

interface FlatVariant {
  product: Product;
  variant: ProductVariant;
}

/**
 * Flattens every product family's variants into one flat list — e.g. Micking
 * Super + (1L, 4L, 5L, 6L) becomes 4 separate entries here, alongside every
 * other product's variants, all in one unsorted, ungrouped array.
 */
const ALL_VARIANTS: FlatVariant[] = PRODUCTS.flatMap((product) =>
  product.variants.map((variant) => ({ product, variant })),
);

const Products = () => {
  return (
    <section className="w-full bg-white py-6 sm:py-4">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-14">
        <h2 className="mb-6 px-4 text-center text-xl font-extrabold tracking-tight text-black sm:mb-8 sm:text-2xl md:mb-10 md:text-3xl">
          Find The Right Oil For Your Engine
        </h2>
        <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-6 lg:grid-cols-4">
          {ALL_VARIANTS.map(({ product, variant }) => (
            <Link
              key={`${product.slug}-${variant.size}`}
              to={`/products/${product.slug}`}
              className="block"
            >
              <img
                src={variant.image}
                alt={`${product.name} ${variant.size}`}
                className="w-full h-auto"
              />
              <p className="text-sm text-[#2B2B28]">
                {product.name} — {variant.size}
              </p>
              <p className="text-sm text-[#6B6B66]">
                {nairaFormatter.format(variant.price)}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
