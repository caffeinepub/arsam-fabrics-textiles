import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Eye, ShoppingCart } from "lucide-react";
import type { Category } from "../backend.d";
import { useCart } from "../context/CartContext";
import { useCategories, useProductsByCategory } from "../hooks/useQueries";
import { Link, useParams } from "../lib/router-compat";

const STATIC_CATEGORIES: Record<string, Category> = {
  "1": {
    id: 1n,
    name: "Ladies Dress",
    description:
      "Elegant women's clothing including embroidered lawn, chiffon & silk",
    imageUrl: "/assets/generated/cat-ladies-dress.dim_600x600.jpg",
    sortOrder: 1n,
  },
  "2": {
    id: 2n,
    name: "Bridal Dress",
    description: "Exquisite bridal wear for your most special day",
    imageUrl: "/assets/generated/cat-bridal-dress.dim_600x600.jpg",
    sortOrder: 2n,
  },
  "3": {
    id: 3n,
    name: "Gents Suiting",
    description: "Premium suits, Pent Coat, Blazers & Shalwar Qameez",
    imageUrl: "/assets/generated/cat-gents-suiting.dim_600x600.jpg",
    sortOrder: 3n,
  },
  "4": {
    id: 4n,
    name: "Jeans & Trousers",
    description: "Quality denim jeans, trousers & casual pants",
    imageUrl: "/assets/generated/cat-jeans-trousers.dim_600x600.jpg",
    sortOrder: 4n,
  },
  "5": {
    id: 5n,
    name: "Kids Garments",
    description: "Festive & everyday wear for children of all ages",
    imageUrl: "/assets/generated/cat-kids-garments.dim_600x600.jpg",
    sortOrder: 5n,
  },
  "6": {
    id: 6n,
    name: "Carpets & Rugs",
    description: "Handcrafted Pakistani carpets & decorative rugs",
    imageUrl: "/assets/generated/cat-carpets-rugs.dim_600x600.jpg",
    sortOrder: 6n,
  },
  "7": {
    id: 7n,
    name: "Janamaz",
    description: "Finest quality prayer mats in traditional designs",
    imageUrl: "/assets/generated/cat-janamaz.dim_600x600.jpg",
    sortOrder: 7n,
  },
  "8": {
    id: 8n,
    name: "Ladies Shoes",
    description: "Stylish footwear including heels, flats & sandals",
    imageUrl: "/assets/generated/cat-ladies-shoes.dim_600x600.jpg",
    sortOrder: 8n,
  },
  "9": {
    id: 9n,
    name: "Gents Shoes",
    description: "Classic & contemporary men's leather footwear",
    imageUrl: "/assets/generated/cat-gents-shoes.dim_600x600.jpg",
    sortOrder: 9n,
  },
  "10": {
    id: 10n,
    name: "Towels",
    description: "Luxuriously soft cotton towels for home & bath",
    imageUrl: "/assets/generated/cat-towels.dim_600x600.jpg",
    sortOrder: 10n,
  },
  "11": {
    id: 11n,
    name: "Bed Sheets",
    description: "Premium cotton & linen bed linen sets for restful sleep",
    imageUrl: "/assets/generated/cat-bed-sheets.dim_600x600.jpg",
    sortOrder: 11n,
  },
  "12": {
    id: 12n,
    name: "Ladies Purse",
    description: "Elegant handbags, clutches & shoulder bags",
    imageUrl: "/assets/generated/cat-ladies-purse.dim_600x600.jpg",
    sortOrder: 12n,
  },
  "13": {
    id: 13n,
    name: "Gents Wallets",
    description: "Premium leather wallets & card holders for men",
    imageUrl: "/assets/generated/cat-gents-wallets.dim_600x600.jpg",
    sortOrder: 13n,
  },
  "14": {
    id: 14n,
    name: "School Bags",
    description: "Durable & stylish backpacks for students",
    imageUrl: "/assets/generated/cat-school-bags.dim_600x600.jpg",
    sortOrder: 14n,
  },
  "15": {
    id: 15n,
    name: "Luggage & Travel Bags",
    description: "Quality suitcases, travel bags & trolleys",
    imageUrl: "/assets/generated/cat-luggage-bags.dim_600x600.jpg",
    sortOrder: 15n,
  },
  "16": {
    id: 16n,
    name: "Groom Dress",
    description: "Stunning sherwani, achkan & groom wear collections",
    imageUrl: "/assets/generated/cat-groom-dress.dim_600x600.jpg",
    sortOrder: 16n,
  },
  "17": {
    id: 17n,
    name: "Custom Orders",
    description: "Bespoke handcrafted dresses & handmade shoes to order",
    imageUrl: "/assets/generated/cat-custom-orders.dim_600x600.jpg",
    sortOrder: 17n,
  },
  "18": {
    id: 18n,
    name: "Caps & Accessories",
    description: "Caps, socks, scarves & fashion accessories",
    imageUrl: "/assets/generated/cat-caps-accessories.dim_600x600.jpg",
    sortOrder: 18n,
  },
};

// Static product catalog — shown when backend has no products yet
type StaticProduct = {
  id: bigint;
  categoryId: bigint;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  inStock: boolean;
  isFeatured: boolean;
  createdAt: bigint;
};

const STATIC_PRODUCTS: Record<string, StaticProduct[]> = {
  "1": [
    {
      id: 101n,
      categoryId: 1n,
      name: "Embroidered Lawn Suit",
      description:
        "3-piece embroidered lawn suit with chiffon dupatta, perfect for summer.",
      price: 4500,
      imageUrl: "/assets/generated/prod-ladies-dress.dim_600x600.jpg",
      inStock: true,
      isFeatured: true,
      createdAt: 0n,
    },
    {
      id: 102n,
      categoryId: 1n,
      name: "Printed Chiffon Suit",
      description:
        "Elegant printed chiffon 2-piece suit, lightweight and stylish.",
      price: 3800,
      imageUrl: "/assets/generated/prod-ladies-dress.dim_600x600.jpg",
      inStock: true,
      isFeatured: false,
      createdAt: 0n,
    },
    {
      id: 103n,
      categoryId: 1n,
      name: "Pure Silk Maxi",
      description:
        "Luxurious pure silk maxi dress with intricate hand embroidery.",
      price: 8500,
      imageUrl: "/assets/generated/prod-ladies-dress.dim_600x600.jpg",
      inStock: true,
      isFeatured: true,
      createdAt: 0n,
    },
    {
      id: 104n,
      categoryId: 1n,
      name: "Cotton Khaddar Suit",
      description:
        "Warm and comfortable cotton khaddar suit for winter season.",
      price: 2900,
      imageUrl: "/assets/generated/prod-ladies-dress.dim_600x600.jpg",
      inStock: true,
      isFeatured: false,
      createdAt: 0n,
    },
    {
      id: 105n,
      categoryId: 1n,
      name: "Velvet Embroidered Suit",
      description:
        "Rich velvet suit with golden embroidery, ideal for formal occasions.",
      price: 9500,
      imageUrl: "/assets/generated/prod-ladies-dress.dim_600x600.jpg",
      inStock: false,
      isFeatured: false,
      createdAt: 0n,
    },
    {
      id: 106n,
      categoryId: 1n,
      name: "Digital Print Lawn",
      description: "Trendy digital print lawn fabric, unstitched 3-piece.",
      price: 2200,
      imageUrl: "/assets/generated/prod-ladies-dress.dim_600x600.jpg",
      inStock: true,
      isFeatured: false,
      createdAt: 0n,
    },
  ],
  "2": [
    {
      id: 201n,
      categoryId: 2n,
      name: "Lehenga Choli Bridal Set",
      description:
        "Heavy embroidered lehenga choli with dupatta, fully handcrafted.",
      price: 85000,
      imageUrl: "/assets/generated/prod-bridal-dress.dim_600x600.jpg",
      inStock: true,
      isFeatured: true,
      createdAt: 0n,
    },
    {
      id: 202n,
      categoryId: 2n,
      name: "Bridal Sharara Suit",
      description:
        "Classic bridal sharara with zardozi embroidery on net fabric.",
      price: 65000,
      imageUrl: "/assets/generated/prod-bridal-dress.dim_600x600.jpg",
      inStock: true,
      isFeatured: true,
      createdAt: 0n,
    },
    {
      id: 203n,
      categoryId: 2n,
      name: "Velvet Bridal Maxi",
      description:
        "Deep red velvet bridal maxi with heavy stone and thread work.",
      price: 72000,
      imageUrl: "/assets/generated/prod-bridal-dress.dim_600x600.jpg",
      inStock: true,
      isFeatured: false,
      createdAt: 0n,
    },
    {
      id: 204n,
      categoryId: 2n,
      name: "Walima Chiffon Suit",
      description: "Light and elegant chiffon suit for walima, pastel shades.",
      price: 28000,
      imageUrl: "/assets/generated/prod-bridal-dress.dim_600x600.jpg",
      inStock: true,
      isFeatured: false,
      createdAt: 0n,
    },
    {
      id: 205n,
      categoryId: 2n,
      name: "Gold Tissue Bridal Gown",
      description: "Shimmering gold tissue gown with crystal embellishments.",
      price: 95000,
      imageUrl: "/assets/generated/prod-bridal-dress.dim_600x600.jpg",
      inStock: false,
      isFeatured: false,
      createdAt: 0n,
    },
    {
      id: 206n,
      categoryId: 2n,
      name: "Mehndi Printed Gharara",
      description: "Vibrant yellow gharara set for mehndi function.",
      price: 18500,
      imageUrl: "/assets/generated/prod-bridal-dress.dim_600x600.jpg",
      inStock: true,
      isFeatured: false,
      createdAt: 0n,
    },
  ],
  "3": [
    {
      id: 301n,
      categoryId: 3n,
      name: "3-Piece Formal Suit",
      description:
        "Premium worsted wool 3-piece suit — jacket, trouser & waistcoat.",
      price: 32000,
      imageUrl: "/assets/generated/prod-gents-suiting.dim_600x600.jpg",
      inStock: true,
      isFeatured: true,
      createdAt: 0n,
    },
    {
      id: 302n,
      categoryId: 3n,
      name: "Embroidered Shalwar Qameez",
      description:
        "Premium cotton shalwar qameez with fine embroidery on neckline.",
      price: 5500,
      imageUrl: "/assets/generated/prod-gents-suiting.dim_600x600.jpg",
      inStock: true,
      isFeatured: false,
      createdAt: 0n,
    },
    {
      id: 303n,
      categoryId: 3n,
      name: "Khaddar Shalwar Qameez",
      description: "Warm khaddar shalwar qameez for winter, hand-loom quality.",
      price: 4200,
      imageUrl: "/assets/generated/prod-gents-suiting.dim_600x600.jpg",
      inStock: true,
      isFeatured: true,
      createdAt: 0n,
    },
    {
      id: 304n,
      categoryId: 3n,
      name: "Pent Coat (Blazer Set)",
      description: "Classic two-button blazer with matching trouser.",
      price: 22000,
      imageUrl: "/assets/generated/prod-gents-suiting.dim_600x600.jpg",
      inStock: true,
      isFeatured: false,
      createdAt: 0n,
    },
    {
      id: 305n,
      categoryId: 3n,
      name: "Lawn Shalwar Qameez",
      description: "Breathable lawn shalwar qameez for summer, classic cut.",
      price: 2800,
      imageUrl: "/assets/generated/prod-gents-suiting.dim_600x600.jpg",
      inStock: true,
      isFeatured: false,
      createdAt: 0n,
    },
    {
      id: 306n,
      categoryId: 3n,
      name: "Waistcoat + Trouser Set",
      description:
        "Smart casual waistcoat and trouser combo in premium fabric.",
      price: 12000,
      imageUrl: "/assets/generated/prod-gents-suiting.dim_600x600.jpg",
      inStock: false,
      isFeatured: false,
      createdAt: 0n,
    },
  ],
  "4": [
    {
      id: 401n,
      categoryId: 4n,
      name: "Slim Fit Denim Jeans",
      description: "Classic slim fit blue denim jeans, 100% cotton denim.",
      price: 3200,
      imageUrl: "/assets/generated/prod-jeans-trousers.dim_600x600.jpg",
      inStock: true,
      isFeatured: true,
      createdAt: 0n,
    },
    {
      id: 402n,
      categoryId: 4n,
      name: "Straight Cut Chinos",
      description:
        "Smart straight-cut chinos in khaki, perfect for casual wear.",
      price: 2800,
      imageUrl: "/assets/generated/prod-jeans-trousers.dim_600x600.jpg",
      inStock: true,
      isFeatured: false,
      createdAt: 0n,
    },
    {
      id: 403n,
      categoryId: 4n,
      name: "Formal Dress Trouser",
      description: "Premium formal trouser in charcoal grey, office wear.",
      price: 4500,
      imageUrl: "/assets/generated/prod-jeans-trousers.dim_600x600.jpg",
      inStock: true,
      isFeatured: false,
      createdAt: 0n,
    },
    {
      id: 404n,
      categoryId: 4n,
      name: "Cargo Pants",
      description: "Durable multi-pocket cargo pants in olive green.",
      price: 3600,
      imageUrl: "/assets/generated/prod-jeans-trousers.dim_600x600.jpg",
      inStock: true,
      isFeatured: false,
      createdAt: 0n,
    },
    {
      id: 405n,
      categoryId: 4n,
      name: "Black Skinny Jeans",
      description: "Trendy black skinny fit jeans with stretch denim.",
      price: 3000,
      imageUrl: "/assets/generated/prod-jeans-trousers.dim_600x600.jpg",
      inStock: true,
      isFeatured: false,
      createdAt: 0n,
    },
    {
      id: 406n,
      categoryId: 4n,
      name: "Linen Summer Trousers",
      description: "Breathable linen trousers for hot weather, relaxed fit.",
      price: 2600,
      imageUrl: "/assets/generated/prod-jeans-trousers.dim_600x600.jpg",
      inStock: false,
      isFeatured: false,
      createdAt: 0n,
    },
  ],
  "5": [
    {
      id: 501n,
      categoryId: 5n,
      name: "Kids Eid Shalwar Qameez",
      description:
        "Festive embroidered shalwar qameez set for boys (2–12 years).",
      price: 2200,
      imageUrl: "/assets/generated/prod-kids-garments.dim_600x600.jpg",
      inStock: true,
      isFeatured: true,
      createdAt: 0n,
    },
    {
      id: 502n,
      categoryId: 5n,
      name: "Girls Frock with Dupatta",
      description: "Colourful party frock with matching dupatta for girls.",
      price: 1800,
      imageUrl: "/assets/generated/prod-kids-garments.dim_600x600.jpg",
      inStock: true,
      isFeatured: false,
      createdAt: 0n,
    },
    {
      id: 503n,
      categoryId: 5n,
      name: "Kids Winter Suit Set",
      description:
        "Warm fleece shalwar qameez for boys and girls, winter season.",
      price: 2500,
      imageUrl: "/assets/generated/prod-kids-garments.dim_600x600.jpg",
      inStock: true,
      isFeatured: true,
      createdAt: 0n,
    },
    {
      id: 504n,
      categoryId: 5n,
      name: "Baby Romper Suit",
      description: "Soft cotton romper for toddlers (6 months–2 years).",
      price: 1200,
      imageUrl: "/assets/generated/prod-kids-garments.dim_600x600.jpg",
      inStock: true,
      isFeatured: false,
      createdAt: 0n,
    },
    {
      id: 505n,
      categoryId: 5n,
      name: "Girls Lawn Summer Suit",
      description: "Light printed lawn suit for girls, 3-piece set.",
      price: 1600,
      imageUrl: "/assets/generated/prod-kids-garments.dim_600x600.jpg",
      inStock: true,
      isFeatured: false,
      createdAt: 0n,
    },
    {
      id: 506n,
      categoryId: 5n,
      name: "Kids Casual T-Shirt & Shorts",
      description: "Cotton casual set for everyday play, boys (4–10 years).",
      price: 1100,
      imageUrl: "/assets/generated/prod-kids-garments.dim_600x600.jpg",
      inStock: true,
      isFeatured: false,
      createdAt: 0n,
    },
  ],
  "6": [
    {
      id: 601n,
      categoryId: 6n,
      name: "Hand-Knotted Wool Carpet (5×8 ft)",
      description:
        "Traditional hand-knotted wool carpet with floral pattern, 5×8 feet.",
      price: 45000,
      imageUrl: "/assets/generated/prod-carpets-rugs.dim_600x600.jpg",
      inStock: true,
      isFeatured: true,
      createdAt: 0n,
    },
    {
      id: 602n,
      categoryId: 6n,
      name: "Kashmiri Silk Carpet (4×6 ft)",
      description: "Fine Kashmiri silk carpet with intricate motifs, 4×6 feet.",
      price: 75000,
      imageUrl: "/assets/generated/prod-carpets-rugs.dim_600x600.jpg",
      inStock: true,
      isFeatured: true,
      createdAt: 0n,
    },
    {
      id: 603n,
      categoryId: 6n,
      name: "Cotton Kilim Rug (3×5 ft)",
      description: "Flat-woven cotton kilim in geometric design, 3×5 feet.",
      price: 8500,
      imageUrl: "/assets/generated/prod-carpets-rugs.dim_600x600.jpg",
      inStock: true,
      isFeatured: false,
      createdAt: 0n,
    },
    {
      id: 604n,
      categoryId: 6n,
      name: "Round Dhurrie Rug (4 ft dia)",
      description:
        "Handwoven round dhurrie rug in bright colours, 4 ft diameter.",
      price: 6000,
      imageUrl: "/assets/generated/prod-carpets-rugs.dim_600x600.jpg",
      inStock: true,
      isFeatured: false,
      createdAt: 0n,
    },
    {
      id: 605n,
      categoryId: 6n,
      name: "Runner Carpet (2×8 ft)",
      description:
        "Narrow hallway runner carpet in traditional design, 2×8 feet.",
      price: 12000,
      imageUrl: "/assets/generated/prod-carpets-rugs.dim_600x600.jpg",
      inStock: false,
      isFeatured: false,
      createdAt: 0n,
    },
    {
      id: 606n,
      categoryId: 6n,
      name: "Shaggy Rug (5×7 ft)",
      description: "Plush shaggy rug in cream/beige, soft underfoot, 5×7 feet.",
      price: 18000,
      imageUrl: "/assets/generated/prod-carpets-rugs.dim_600x600.jpg",
      inStock: true,
      isFeatured: false,
      createdAt: 0n,
    },
  ],
  "7": [
    {
      id: 701n,
      categoryId: 7n,
      name: "Velvet Janamaz",
      description:
        "Premium velvet prayer mat with golden border and anti-slip base.",
      price: 1800,
      imageUrl: "/assets/generated/prod-janamaz.dim_600x600.jpg",
      inStock: true,
      isFeatured: true,
      createdAt: 0n,
    },
    {
      id: 702n,
      categoryId: 7n,
      name: "Embroidered Cotton Janamaz",
      description: "Hand-embroidered cotton prayer mat in traditional design.",
      price: 1200,
      imageUrl: "/assets/generated/prod-janamaz.dim_600x600.jpg",
      inStock: true,
      isFeatured: false,
      createdAt: 0n,
    },
    {
      id: 703n,
      categoryId: 7n,
      name: "Foam-Padded Janamaz",
      description: "Comfortable foam-padded prayer mat for extra cushioning.",
      price: 1500,
      imageUrl: "/assets/generated/prod-janamaz.dim_600x600.jpg",
      inStock: true,
      isFeatured: false,
      createdAt: 0n,
    },
    {
      id: 704n,
      categoryId: 7n,
      name: "Foldable Travel Janamaz",
      description:
        "Compact foldable prayer mat, easy to carry while travelling.",
      price: 800,
      imageUrl: "/assets/generated/prod-janamaz.dim_600x600.jpg",
      inStock: true,
      isFeatured: false,
      createdAt: 0n,
    },
    {
      id: 705n,
      categoryId: 7n,
      name: "Kids Janamaz (Small)",
      description: "Small-sized prayer mat for children with colourful design.",
      price: 650,
      imageUrl: "/assets/generated/prod-janamaz.dim_600x600.jpg",
      inStock: true,
      isFeatured: false,
      createdAt: 0n,
    },
    {
      id: 706n,
      categoryId: 7n,
      name: "Silk Janamaz with Compass",
      description: "Luxurious silk prayer mat with built-in Qibla compass.",
      price: 2800,
      imageUrl: "/assets/generated/prod-janamaz.dim_600x600.jpg",
      inStock: false,
      isFeatured: false,
      createdAt: 0n,
    },
  ],
  "8": [
    {
      id: 801n,
      categoryId: 8n,
      name: "Embroidered Khussa (Handmade)",
      description:
        "Traditional handmade khussa with intricate embroidery, all sizes.",
      price: 3500,
      imageUrl: "/assets/generated/prod-ladies-shoes.dim_600x600.jpg",
      inStock: true,
      isFeatured: true,
      createdAt: 0n,
    },
    {
      id: 802n,
      categoryId: 8n,
      name: "Stiletto Heels",
      description: "Elegant pointed toe stiletto heels in black leather.",
      price: 5200,
      imageUrl: "/assets/generated/prod-ladies-shoes.dim_600x600.jpg",
      inStock: true,
      isFeatured: false,
      createdAt: 0n,
    },
    {
      id: 803n,
      categoryId: 8n,
      name: "Platform Sandals",
      description: "Trendy platform sandals with ankle strap, various colours.",
      price: 3800,
      imageUrl: "/assets/generated/prod-ladies-shoes.dim_600x600.jpg",
      inStock: true,
      isFeatured: false,
      createdAt: 0n,
    },
    {
      id: 804n,
      categoryId: 8n,
      name: "Flat Mojri Slip-Ons",
      description: "Comfortable flat mojri in velvet with golden tassels.",
      price: 2200,
      imageUrl: "/assets/generated/prod-ladies-shoes.dim_600x600.jpg",
      inStock: true,
      isFeatured: false,
      createdAt: 0n,
    },
    {
      id: 805n,
      categoryId: 8n,
      name: "Block Heel Pumps",
      description:
        "Classic block heel pumps in nude, comfortable for all-day wear.",
      price: 4500,
      imageUrl: "/assets/generated/prod-ladies-shoes.dim_600x600.jpg",
      inStock: true,
      isFeatured: false,
      createdAt: 0n,
    },
    {
      id: 806n,
      categoryId: 8n,
      name: "Bridal Heels (Embellished)",
      description:
        "Heavily embellished bridal heels with crystals and gold work.",
      price: 9500,
      imageUrl: "/assets/generated/prod-ladies-shoes.dim_600x600.jpg",
      inStock: false,
      isFeatured: false,
      createdAt: 0n,
    },
  ],
  "9": [
    {
      id: 901n,
      categoryId: 9n,
      name: "Leather Oxford Shoes",
      description: "Classic full-grain leather oxford shoes, formal wear.",
      price: 8500,
      imageUrl: "/assets/generated/prod-gents-shoes.dim_600x600.jpg",
      inStock: true,
      isFeatured: true,
      createdAt: 0n,
    },
    {
      id: 902n,
      categoryId: 9n,
      name: "Handmade Khussa (Men)",
      description: "Traditional handmade leather khussa with embroidery.",
      price: 4500,
      imageUrl: "/assets/generated/prod-gents-shoes.dim_600x600.jpg",
      inStock: true,
      isFeatured: true,
      createdAt: 0n,
    },
    {
      id: 903n,
      categoryId: 9n,
      name: "Casual Loafers",
      description: "Slip-on leather loafers for casual and semi-formal wear.",
      price: 6200,
      imageUrl: "/assets/generated/prod-gents-shoes.dim_600x600.jpg",
      inStock: true,
      isFeatured: false,
      createdAt: 0n,
    },
    {
      id: 904n,
      categoryId: 9n,
      name: "Suede Chelsea Boots",
      description: "Premium suede Chelsea boots for winter, pull-on style.",
      price: 12000,
      imageUrl: "/assets/generated/prod-gents-shoes.dim_600x600.jpg",
      inStock: true,
      isFeatured: false,
      createdAt: 0n,
    },
    {
      id: 905n,
      categoryId: 9n,
      name: "Sandals (Summer)",
      description: "Comfortable leather sandals for summer, open-toe design.",
      price: 3500,
      imageUrl: "/assets/generated/prod-gents-shoes.dim_600x600.jpg",
      inStock: true,
      isFeatured: false,
      createdAt: 0n,
    },
    {
      id: 906n,
      categoryId: 9n,
      name: "Jogging Trainers",
      description: "Lightweight sports trainers for running and exercise.",
      price: 5800,
      imageUrl: "/assets/generated/prod-gents-shoes.dim_600x600.jpg",
      inStock: false,
      isFeatured: false,
      createdAt: 0n,
    },
  ],
  "10": [
    {
      id: 1001n,
      categoryId: 10n,
      name: "Bath Towel Set (2 pcs)",
      description: "100% Egyptian cotton bath towels, super soft, 600 GSM.",
      price: 2800,
      imageUrl: "/assets/generated/prod-towels.dim_600x600.jpg",
      inStock: true,
      isFeatured: true,
      createdAt: 0n,
    },
    {
      id: 1002n,
      categoryId: 10n,
      name: "Hand Towels (4 pcs)",
      description: "Soft cotton hand towels in assorted colours, quick-dry.",
      price: 1400,
      imageUrl: "/assets/generated/prod-towels.dim_600x600.jpg",
      inStock: true,
      isFeatured: false,
      createdAt: 0n,
    },
    {
      id: 1003n,
      categoryId: 10n,
      name: "Luxury Towel Gift Set",
      description: "Premium towel gift set — 1 bath + 2 hand + 2 face towels.",
      price: 5500,
      imageUrl: "/assets/generated/prod-towels.dim_600x600.jpg",
      inStock: true,
      isFeatured: true,
      createdAt: 0n,
    },
    {
      id: 1004n,
      categoryId: 10n,
      name: "Kids Hooded Towel",
      description: "Adorable hooded towel for children with cartoon design.",
      price: 1200,
      imageUrl: "/assets/generated/prod-towels.dim_600x600.jpg",
      inStock: true,
      isFeatured: false,
      createdAt: 0n,
    },
    {
      id: 1005n,
      categoryId: 10n,
      name: "Kitchen Towels (6 pcs)",
      description: "Absorbent cotton kitchen towels in checked design.",
      price: 900,
      imageUrl: "/assets/generated/prod-towels.dim_600x600.jpg",
      inStock: true,
      isFeatured: false,
      createdAt: 0n,
    },
    {
      id: 1006n,
      categoryId: 10n,
      name: "Pool / Beach Towel",
      description: "Extra-large lightweight pool towel in vibrant print.",
      price: 3200,
      imageUrl: "/assets/generated/prod-towels.dim_600x600.jpg",
      inStock: false,
      isFeatured: false,
      createdAt: 0n,
    },
  ],
  "11": [
    {
      id: 1101n,
      categoryId: 11n,
      name: "Cotton Bed Sheet Set (King)",
      description:
        "200-thread-count pure cotton bed sheet set: fitted + flat + 2 pillowcases, king size.",
      price: 4800,
      imageUrl: "/assets/generated/prod-bed-sheets.dim_600x600.jpg",
      inStock: true,
      isFeatured: true,
      createdAt: 0n,
    },
    {
      id: 1102n,
      categoryId: 11n,
      name: "Embroidered Bed Sheet Set",
      description: "Beautiful embroidered cotton bed sheet set, double size.",
      price: 6500,
      imageUrl: "/assets/generated/prod-bed-sheets.dim_600x600.jpg",
      inStock: true,
      isFeatured: true,
      createdAt: 0n,
    },
    {
      id: 1103n,
      categoryId: 11n,
      name: "Satin Weave Bed Sheet",
      description: "Silky smooth satin weave bed sheet set in ivory white.",
      price: 5800,
      imageUrl: "/assets/generated/prod-bed-sheets.dim_600x600.jpg",
      inStock: true,
      isFeatured: false,
      createdAt: 0n,
    },
    {
      id: 1104n,
      categoryId: 11n,
      name: "Kids Printed Bed Sheet",
      description:
        "Fun printed bed sheet set for children's bedroom, single size.",
      price: 2500,
      imageUrl: "/assets/generated/prod-bed-sheets.dim_600x600.jpg",
      inStock: true,
      isFeatured: false,
      createdAt: 0n,
    },
    {
      id: 1105n,
      categoryId: 11n,
      name: "Flannelette Winter Sheet Set",
      description: "Cosy flannelette bed sheet set for cold winter nights.",
      price: 3800,
      imageUrl: "/assets/generated/prod-bed-sheets.dim_600x600.jpg",
      inStock: true,
      isFeatured: false,
      createdAt: 0n,
    },
    {
      id: 1106n,
      categoryId: 11n,
      name: "Linen Bed Sheet Set",
      description: "Premium pure linen sheets, naturally cooling for summer.",
      price: 7200,
      imageUrl: "/assets/generated/prod-bed-sheets.dim_600x600.jpg",
      inStock: false,
      isFeatured: false,
      createdAt: 0n,
    },
  ],
  "12": [
    {
      id: 1201n,
      categoryId: 12n,
      name: "Leather Shoulder Bag",
      description: "Genuine leather shoulder bag with multiple compartments.",
      price: 7500,
      imageUrl: "/assets/generated/prod-ladies-purse.dim_600x600.jpg",
      inStock: true,
      isFeatured: true,
      createdAt: 0n,
    },
    {
      id: 1202n,
      categoryId: 12n,
      name: "Embroidered Clutch",
      description:
        "Hand-embroidered clutch bag with mirror work, bridal & party.",
      price: 3200,
      imageUrl: "/assets/generated/prod-ladies-purse.dim_600x600.jpg",
      inStock: true,
      isFeatured: false,
      createdAt: 0n,
    },
    {
      id: 1203n,
      categoryId: 12n,
      name: "Tote Handbag (Canvas)",
      description: "Large canvas tote bag for everyday use, sturdy handles.",
      price: 2500,
      imageUrl: "/assets/generated/prod-ladies-purse.dim_600x600.jpg",
      inStock: true,
      isFeatured: false,
      createdAt: 0n,
    },
    {
      id: 1204n,
      categoryId: 12n,
      name: "Mini Crossbody Bag",
      description:
        "Compact crossbody bag in genuine leather, adjustable strap.",
      price: 5800,
      imageUrl: "/assets/generated/prod-ladies-purse.dim_600x600.jpg",
      inStock: true,
      isFeatured: false,
      createdAt: 0n,
    },
    {
      id: 1205n,
      categoryId: 12n,
      name: "Beaded Evening Bag",
      description: "Glamorous beaded evening bag for weddings and events.",
      price: 4200,
      imageUrl: "/assets/generated/prod-ladies-purse.dim_600x600.jpg",
      inStock: true,
      isFeatured: false,
      createdAt: 0n,
    },
    {
      id: 1206n,
      categoryId: 12n,
      name: "Woven Straw Bag",
      description: "Trendy handwoven straw bag for summer outings.",
      price: 2800,
      imageUrl: "/assets/generated/prod-ladies-purse.dim_600x600.jpg",
      inStock: false,
      isFeatured: false,
      createdAt: 0n,
    },
  ],
  "13": [
    {
      id: 1301n,
      categoryId: 13n,
      name: "Genuine Leather Bifold Wallet",
      description:
        "Classic bifold wallet in full-grain leather with 8 card slots.",
      price: 3500,
      imageUrl: "/assets/generated/prod-gents-wallets.dim_600x600.jpg",
      inStock: true,
      isFeatured: true,
      createdAt: 0n,
    },
    {
      id: 1302n,
      categoryId: 13n,
      name: "Slim Cardholder Wallet",
      description:
        "Ultra-slim cardholder wallet, minimalist design for 6 cards.",
      price: 2200,
      imageUrl: "/assets/generated/prod-gents-wallets.dim_600x600.jpg",
      inStock: true,
      isFeatured: false,
      createdAt: 0n,
    },
    {
      id: 1303n,
      categoryId: 13n,
      name: "Travel Passport Wallet",
      description:
        "Leather passport holder with multiple card and currency slots.",
      price: 4800,
      imageUrl: "/assets/generated/prod-gents-wallets.dim_600x600.jpg",
      inStock: true,
      isFeatured: false,
      createdAt: 0n,
    },
    {
      id: 1304n,
      categoryId: 13n,
      name: "Money Clip Wallet",
      description: "Stainless steel money clip with 4-card leather sleeve.",
      price: 2800,
      imageUrl: "/assets/generated/prod-gents-wallets.dim_600x600.jpg",
      inStock: true,
      isFeatured: false,
      createdAt: 0n,
    },
    {
      id: 1305n,
      categoryId: 13n,
      name: "Trifold Leather Wallet",
      description: "Spacious trifold leather wallet with zipper coin pocket.",
      price: 3200,
      imageUrl: "/assets/generated/prod-gents-wallets.dim_600x600.jpg",
      inStock: true,
      isFeatured: false,
      createdAt: 0n,
    },
    {
      id: 1306n,
      categoryId: 13n,
      name: "Embossed Crocodile Wallet",
      description: "Premium embossed crocodile-pattern leather wallet.",
      price: 5500,
      imageUrl: "/assets/generated/prod-gents-wallets.dim_600x600.jpg",
      inStock: false,
      isFeatured: false,
      createdAt: 0n,
    },
  ],
  "14": [
    {
      id: 1401n,
      categoryId: 14n,
      name: "Kids School Backpack (Primary)",
      description: "Lightweight ergonomic backpack for primary school, 15L.",
      price: 2200,
      imageUrl: "/assets/generated/prod-school-bags.dim_600x600.jpg",
      inStock: true,
      isFeatured: true,
      createdAt: 0n,
    },
    {
      id: 1402n,
      categoryId: 14n,
      name: "Teen School Bag (20L)",
      description: "Spacious 20L backpack for secondary school students.",
      price: 3500,
      imageUrl: "/assets/generated/prod-school-bags.dim_600x600.jpg",
      inStock: true,
      isFeatured: false,
      createdAt: 0n,
    },
    {
      id: 1403n,
      categoryId: 14n,
      name: "Trolley School Bag",
      description: "Wheeled school bag with extendable handle, 18L.",
      price: 4800,
      imageUrl: "/assets/generated/prod-school-bags.dim_600x600.jpg",
      inStock: true,
      isFeatured: true,
      createdAt: 0n,
    },
    {
      id: 1404n,
      categoryId: 14n,
      name: "College Laptop Bag",
      description: 'College bag with padded 15.6" laptop compartment, 25L.',
      price: 4200,
      imageUrl: "/assets/generated/prod-school-bags.dim_600x600.jpg",
      inStock: true,
      isFeatured: false,
      createdAt: 0n,
    },
    {
      id: 1405n,
      categoryId: 14n,
      name: "Girls Character School Bag",
      description: "Cute character school bag for girls (age 5–10).",
      price: 2800,
      imageUrl: "/assets/generated/prod-school-bags.dim_600x600.jpg",
      inStock: true,
      isFeatured: false,
      createdAt: 0n,
    },
    {
      id: 1406n,
      categoryId: 14n,
      name: "Canvas Satchel Bag",
      description:
        "Classic canvas satchel with cross-body strap for older students.",
      price: 3000,
      imageUrl: "/assets/generated/prod-school-bags.dim_600x600.jpg",
      inStock: false,
      isFeatured: false,
      createdAt: 0n,
    },
  ],
  "15": [
    {
      id: 1501n,
      categoryId: 15n,
      name: 'Hard Shell Suitcase (20")',
      description:
        "Lightweight hard-shell carry-on suitcase with TSA lock, 20 inch.",
      price: 12000,
      imageUrl: "/assets/generated/prod-luggage-bags.dim_600x600.jpg",
      inStock: true,
      isFeatured: true,
      createdAt: 0n,
    },
    {
      id: 1502n,
      categoryId: 15n,
      name: 'Hard Shell Suitcase (28")',
      description:
        "Large hard-shell checked suitcase with spinner wheels, 28 inch.",
      price: 18000,
      imageUrl: "/assets/generated/prod-luggage-bags.dim_600x600.jpg",
      inStock: true,
      isFeatured: false,
      createdAt: 0n,
    },
    {
      id: 1503n,
      categoryId: 15n,
      name: "Duffle Travel Bag",
      description:
        "50L canvas duffle bag for short trips, with shoulder strap.",
      price: 5500,
      imageUrl: "/assets/generated/prod-luggage-bags.dim_600x600.jpg",
      inStock: true,
      isFeatured: false,
      createdAt: 0n,
    },
    {
      id: 1504n,
      categoryId: 15n,
      name: "Travel Backpack (40L)",
      description: "Hiking & travel backpack with rain cover, 40L.",
      price: 7500,
      imageUrl: "/assets/generated/prod-luggage-bags.dim_600x600.jpg",
      inStock: true,
      isFeatured: true,
      createdAt: 0n,
    },
    {
      id: 1505n,
      categoryId: 15n,
      name: "Luggage Set (3 pcs)",
      description:
        'Matching hard-shell luggage set: 20", 24" & 28" trolley cases.',
      price: 38000,
      imageUrl: "/assets/generated/prod-luggage-bags.dim_600x600.jpg",
      inStock: false,
      isFeatured: false,
      createdAt: 0n,
    },
    {
      id: 1506n,
      categoryId: 15n,
      name: "Garment Travel Bag",
      description:
        "Suit bag for keeping formal wear wrinkle-free while travelling.",
      price: 4200,
      imageUrl: "/assets/generated/prod-luggage-bags.dim_600x600.jpg",
      inStock: true,
      isFeatured: false,
      createdAt: 0n,
    },
  ],
  "16": [
    {
      id: 1601n,
      categoryId: 16n,
      name: "Classic Gold Sherwani",
      description: "Fully embroidered gold sherwani with churidar and dupatta.",
      price: 55000,
      imageUrl: "/assets/generated/prod-groom-dress.dim_600x600.jpg",
      inStock: true,
      isFeatured: true,
      createdAt: 0n,
    },
    {
      id: 1602n,
      categoryId: 16n,
      name: "Black Achkan Suit",
      description: "Elegant black achkan with silver threadwork, complete set.",
      price: 45000,
      imageUrl: "/assets/generated/prod-groom-dress.dim_600x600.jpg",
      inStock: true,
      isFeatured: true,
      createdAt: 0n,
    },
    {
      id: 1603n,
      categoryId: 16n,
      name: "Ivory Khaddar Sherwani",
      description:
        "Classic ivory khaddar sherwani for nikah, minimalist style.",
      price: 28000,
      imageUrl: "/assets/generated/prod-groom-dress.dim_600x600.jpg",
      inStock: true,
      isFeatured: false,
      createdAt: 0n,
    },
    {
      id: 1604n,
      categoryId: 16n,
      name: "Mehndi Kurta Pajama",
      description: "Vibrant mehndi-function kurta pajama for the groom.",
      price: 12000,
      imageUrl: "/assets/generated/prod-groom-dress.dim_600x600.jpg",
      inStock: true,
      isFeatured: false,
      createdAt: 0n,
    },
    {
      id: 1605n,
      categoryId: 16n,
      name: "3-Piece Groom Suit",
      description:
        "Western-style 3-piece groom suit in navy blue, bespoke tailoring.",
      price: 38000,
      imageUrl: "/assets/generated/prod-groom-dress.dim_600x600.jpg",
      inStock: false,
      isFeatured: false,
      createdAt: 0n,
    },
    {
      id: 1606n,
      categoryId: 16n,
      name: "Velvet Sherwani (Maroon)",
      description:
        "Rich maroon velvet sherwani with intricate zari embroidery.",
      price: 68000,
      imageUrl: "/assets/generated/prod-groom-dress.dim_600x600.jpg",
      inStock: true,
      isFeatured: false,
      createdAt: 0n,
    },
  ],
  "17": [
    {
      id: 1701n,
      categoryId: 17n,
      name: "Custom Stitched Ladies Suit",
      description:
        "Bespoke stitched ladies suit from your own fabric, all sizes.",
      price: 3500,
      imageUrl: "/assets/generated/prod-custom-orders.dim_600x600.jpg",
      inStock: true,
      isFeatured: true,
      createdAt: 0n,
    },
    {
      id: 1702n,
      categoryId: 17n,
      name: "Custom Bridal Dress",
      description:
        "Fully custom bridal dress, designed to your exact specifications.",
      price: 50000,
      imageUrl: "/assets/generated/prod-custom-orders.dim_600x600.jpg",
      inStock: true,
      isFeatured: true,
      createdAt: 0n,
    },
    {
      id: 1703n,
      categoryId: 17n,
      name: "Handmade Leather Shoes (Ladies)",
      description:
        "Handcrafted ladies leather shoes made to your measurements.",
      price: 7500,
      imageUrl: "/assets/generated/prod-custom-orders.dim_600x600.jpg",
      inStock: true,
      isFeatured: false,
      createdAt: 0n,
    },
    {
      id: 1704n,
      categoryId: 17n,
      name: "Handmade Leather Shoes (Gents)",
      description: "Bespoke men's leather shoes, handstitched to your size.",
      price: 8500,
      imageUrl: "/assets/generated/prod-custom-orders.dim_600x600.jpg",
      inStock: true,
      isFeatured: false,
      createdAt: 0n,
    },
    {
      id: 1705n,
      categoryId: 17n,
      name: "Custom Embroidery Service",
      description:
        "Custom embroidery on your garment — name, motifs, or design.",
      price: 2000,
      imageUrl: "/assets/generated/prod-custom-orders.dim_600x600.jpg",
      inStock: true,
      isFeatured: false,
      createdAt: 0n,
    },
    {
      id: 1706n,
      categoryId: 17n,
      name: "Custom Kids Fancy Dress",
      description: "Bespoke costume or fancy dress for children's events.",
      price: 4500,
      imageUrl: "/assets/generated/prod-custom-orders.dim_600x600.jpg",
      inStock: true,
      isFeatured: false,
      createdAt: 0n,
    },
  ],
  "18": [
    {
      id: 1801n,
      categoryId: 18n,
      name: "Embroidered Topi (Cap)",
      description: "Traditional hand-embroidered topi cap, various sizes.",
      price: 850,
      imageUrl: "/assets/generated/prod-caps-accessories.dim_600x600.jpg",
      inStock: true,
      isFeatured: true,
      createdAt: 0n,
    },
    {
      id: 1802n,
      categoryId: 18n,
      name: "Cotton Socks Pack (6 pairs)",
      description: "Premium cotton socks in assorted colours, pack of 6 pairs.",
      price: 600,
      imageUrl: "/assets/generated/prod-caps-accessories.dim_600x600.jpg",
      inStock: true,
      isFeatured: false,
      createdAt: 0n,
    },
    {
      id: 1803n,
      categoryId: 18n,
      name: "Pashmina Shawl / Scarf",
      description: "Soft Kashmiri pashmina shawl with printed border.",
      price: 3500,
      imageUrl: "/assets/generated/prod-caps-accessories.dim_600x600.jpg",
      inStock: true,
      isFeatured: true,
      createdAt: 0n,
    },
    {
      id: 1804n,
      categoryId: 18n,
      name: "Men's Wool Beanie Cap",
      description: "Warm knitted beanie cap for winter, stretchable fit.",
      price: 550,
      imageUrl: "/assets/generated/prod-caps-accessories.dim_600x600.jpg",
      inStock: true,
      isFeatured: false,
      createdAt: 0n,
    },
    {
      id: 1805n,
      categoryId: 18n,
      name: "Ladies Dupatta (Chiffon)",
      description: "Plain chiffon dupatta with lace border, multiple colours.",
      price: 900,
      imageUrl: "/assets/generated/prod-caps-accessories.dim_600x600.jpg",
      inStock: true,
      isFeatured: false,
      createdAt: 0n,
    },
    {
      id: 1806n,
      categoryId: 18n,
      name: "Winter Wool Gloves",
      description:
        "Warm knitted wool gloves in grey and navy, one size fits most.",
      price: 450,
      imageUrl: "/assets/generated/prod-caps-accessories.dim_600x600.jpg",
      inStock: false,
      isFeatured: false,
      createdAt: 0n,
    },
  ],
};

// Static product card displayed inline (no routing needed for static items)
function StaticProductCard({
  product,
  index,
}: { product: StaticProduct; index: number }) {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
    });
  };

  return (
    <article
      className="group bg-card border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col"
      data-ocid={`product.item.${index}`}
    >
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Badge variant="destructive" className="text-xs font-semibold">
              Out of Stock
            </Badge>
          </div>
        )}
        {product.isFeatured && product.inStock && (
          <Badge className="absolute top-2 left-2 bg-secondary text-secondary-foreground text-xs font-semibold">
            Featured
          </Badge>
        )}
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-display font-semibold text-card-foreground text-sm leading-tight mb-1 line-clamp-2">
          {product.name}
        </h3>

        <p className="text-muted-foreground text-xs line-clamp-2 mb-3 flex-1 font-body">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-auto mb-3">
          <span className="font-display font-bold text-primary text-lg">
            PKR {product.price.toLocaleString()}
          </span>
          <Badge
            className={`text-xs border-0 ${product.inStock ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
          >
            {product.inStock ? "In Stock" : "Sold Out"}
          </Badge>
        </div>

        <div className="flex gap-2">
          <Link to="/custom-orders" className="flex-1">
            <Button
              variant="outline"
              size="sm"
              className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground text-xs gap-1"
              data-ocid={`product.item.${index}.secondary_button`}
            >
              <Eye className="h-3 w-3" />
              Enquire
            </Button>
          </Link>
          <Button
            size="sm"
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground text-xs gap-1"
            data-ocid={`product.item.${index}.primary_button`}
          >
            <ShoppingCart className="h-3 w-3" />
            Add to Cart
          </Button>
        </div>
      </div>
    </article>
  );
}

export default function CategoryPage() {
  const { id } = useParams<{ id: string }>();
  const categoryId = id ? BigInt(id) : undefined;

  const { data: categories } = useCategories();
  const { data: backendProducts, isLoading } =
    useProductsByCategory(categoryId);

  // Find category from backend data or static fallback
  const category =
    categories?.find((c) => c.id === categoryId) ||
    (id ? STATIC_CATEGORIES[id] : undefined);

  // Use backend products if available, otherwise use static products
  const staticProducts = id ? (STATIC_PRODUCTS[id] ?? []) : [];
  const hasBackendProducts = backendProducts && backendProducts.length > 0;

  if (!category) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-2xl font-bold text-foreground mb-2">
            Category Not Found
          </h1>
          <p className="text-muted-foreground font-body mb-4">
            This category doesn't exist.
          </p>
          <Link to="/categories">
            <Button
              className="bg-primary text-primary-foreground"
              data-ocid="category.back.button"
            >
              Browse All Categories
            </Button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Category Header */}
      <section className="relative overflow-hidden">
        <div className="h-48 lg:h-64">
          <img
            src={category.imageUrl}
            alt={category.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-transparent" />
        </div>
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <Link
              to="/categories"
              className="inline-flex items-center gap-1 text-white/80 hover:text-secondary text-sm font-body mb-3 transition-colors"
              data-ocid="category.back.link"
            >
              <ArrowLeft className="h-4 w-4" />
              All Categories
            </Link>
            <h1 className="font-display text-3xl lg:text-4xl font-bold text-white">
              {category.name}
            </h1>
            {category.description && (
              <p className="font-body text-white/80 mt-1 max-w-lg">
                {category.description}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-10 lg:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 6 }, (_, i) => i).map((i) => (
                <div
                  key={i}
                  className="aspect-[3/4] rounded-lg bg-muted animate-pulse"
                />
              ))}
            </div>
          ) : hasBackendProducts ? (
            <>
              <p className="font-body text-muted-foreground text-sm mb-6">
                {backendProducts.length} product
                {backendProducts.length !== 1 ? "s" : ""} in {category.name}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {backendProducts.map((product, i) => (
                  <StaticProductCard
                    key={product.id.toString()}
                    product={{
                      id: product.id,
                      categoryId: product.categoryId,
                      name: product.name,
                      description: product.description,
                      price: product.price,
                      imageUrl: product.imageUrl || category.imageUrl,
                      inStock: product.inStock,
                      isFeatured: product.isFeatured,
                      createdAt: product.createdAt,
                    }}
                    index={i + 1}
                  />
                ))}
              </div>
            </>
          ) : staticProducts.length > 0 ? (
            <>
              <p className="font-body text-muted-foreground text-sm mb-6">
                {staticProducts.length} products in {category.name}
              </p>
              <div
                className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
                data-ocid="category.products.list"
              >
                {staticProducts.map((product, i) => (
                  <StaticProductCard
                    key={product.id.toString()}
                    product={product}
                    index={i + 1}
                  />
                ))}
              </div>
            </>
          ) : (
            <div
              className="text-center py-20 bg-card rounded-xl border border-border"
              data-ocid="category.products.empty_state"
            >
              <h3 className="font-display font-semibold text-foreground text-xl mb-2">
                Products Coming Soon
              </h3>
              <p className="font-body text-muted-foreground mb-6 max-w-sm mx-auto">
                This category is being stocked. Place a custom order or browse
                other categories.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link to="/categories">
                  <Button
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary/10"
                    data-ocid="category.browse.button"
                  >
                    Browse Other Categories
                  </Button>
                </Link>
                <Link to="/custom-orders">
                  <Button
                    className="bg-primary text-primary-foreground"
                    data-ocid="category.custom_order.button"
                  >
                    Place a Custom Order
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
