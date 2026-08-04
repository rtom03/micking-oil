import img1L5w30 from "/1L-5w-30-SM.png";
import img4L5w30 from "/4L-5w-30-SM.png";
import img5L5w30 from "/5L-5w-30-SM.png";
import img6L5w30 from "/6L-5w-30-SM.png";
import img1L5w20 from "/1L-5w-20-SN.png";
import img5L5w20 from "/5L-5w-20-SN.png";
import img6L5w20 from "/6L-5w-20-SN.png";
import GP5L5w20 from "/5L-0w-20-SN.png";
import GP4L5w20 from "/4L-0w-20-SN.png";
import GP1L5w20 from "/1L-0w-20-SN.png";
import GT5L5w20 from "/5L-5w-30-SN.png";
import GT1L5w20 from "/1L-5w-30-SN.png";

/** A single purchasable size within a product line. */
export interface ProductVariant {
  /** Display label as printed on the bottle (can differ between sizes within a family). */
  label: string;
  /** e.g. "1L", "4L" */
  size: string;
  /** Volume in litres, useful for sorting/filtering. */
  volumeLitres: number;
  /** Price in Naira. TODO: replace placeholders with real prices. */
  price: number;
  image: string;
}

/** A product family — one or more variants sharing a grade and spec. */
export interface Product {
  /** Stable URL identifier, e.g. "micking-super-plus". Independent of display name. */
  slug: string;
  name: string;
  grade: string; // e.g. "5W-30"
  apiRating: string; // e.g. "API SM"
  description: string;
  variants: ProductVariant[];
}

export const MICKING_SUPER_PLUS: Product = {
  slug: "micking-super-plus",
  name: "Micking Super +",
  grade: "5W-30",
  apiRating: "API SM",
  description:
    "Fully synthetic gasoline motor oil with super high viscosity index and eco-friendly formulation.",
  variants: [
    {
      label: "Gold Super +",
      size: "4L",
      volumeLitres: 4,
      price: 30000, // TODO: set real price
      image: img4L5w30,
    },
    {
      label: "Gold Super +",
      size: "5L",
      volumeLitres: 5,
      price: 36000, // TODO: set real price
      image: img5L5w30,
    },
    {
      label: "Gold Super +",
      size: "6L",
      volumeLitres: 6,
      price: 43500, // TODO: set real price
      image: img6L5w30,
    },
    {
      label: "Max Super +",
      size: "1L",
      volumeLitres: 1,
      price: 8000, // TODO: set real price
      image: img1L5w30,
    },
  ],
};
// console.log(MICKING_SUPER_PLUS + "kkkk");
export const MICKING_GOLD_TOP: Product = {
  slug: "micking-gold-top",
  name: "Micking Gold Top",
  grade: "5W-20",
  apiRating: "API SN",
  description:
    "Fully synthetic gasoline motor oil with super high viscosity index (VHVI) and eco-friendly formulation.",
  variants: [
    {
      label: "Gold Top",
      size: "1L",
      volumeLitres: 1,
      price: 8000, // TODO: set real price
      image: img1L5w20,
    },
    {
      label: "Gold Top",
      size: "5L",
      volumeLitres: 5,
      price: 36000, // TODO: set real price
      image: img5L5w20,
    },
    {
      label: "Gold Top",
      size: "6L",
      volumeLitres: 6,
      price: 43500, // TODO: set real price
      image: img6L5w20,
    },
  ],
};

export const MICKING_GOLD_PRIME_A: Product = {
  slug: "micking-gold-prime-a",
  // NOTE: was "Micking Gold Top" in the source data — same as MICKING_GOLD_TOP,
  // which would have collided on this route. Renamed to match its variant
  // label ("Gold Prime A"). Flag if this isn't the intended name.
  name: "Micking Gold Prime A",
  grade: "0W-20",
  apiRating: "API SN",
  description:
    "Fully synthetic gasoline motor oil with super high viscosity index (VHVI) and eco-friendly formulation.",
  variants: [
    {
      label: "Gold Prime A",
      size: "1L",
      volumeLitres: 1,
      price: 8000, // TODO: set real price
      image: GP1L5w20,
    },
    {
      label: "Gold Prime A",
      size: "4L",
      volumeLitres: 4,
      price: 30000, // TODO: set real price
      image: GP4L5w20,
    },
    {
      label: "Gold Prime A",
      size: "5L",
      volumeLitres: 5,
      price: 36000, // TODO: set real price
      image: GP5L5w20,
    },
  ],
};

export const MICKING_GOLD_TOP_PLUS: Product = {
  slug: "micking-gold-top-plus",
  name: "Micking Gold Top Plus",
  grade: "5W-30",
  apiRating: "API SN",
  description:
    "Fully synthetic gasoline motor oil with super high viscosity index (VHVI) and eco-friendly formulation.",
  variants: [
    {
      label: "Gold Top +",
      size: "1L",
      volumeLitres: 1,
      price: 8000, // TODO: set real price
      image: GT1L5w20,
    },
    {
      label: "Gold Top +",
      size: "5L",
      volumeLitres: 5,
      price: 36000, // TODO: set real price
      image: GT5L5w20,
    },
  ],
};

export const PRODUCTS: Product[] = [
  MICKING_SUPER_PLUS,
  MICKING_GOLD_TOP,
  MICKING_GOLD_PRIME_A,
  MICKING_GOLD_TOP_PLUS,
];
