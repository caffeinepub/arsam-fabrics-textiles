import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ArrowRight,
  PackageCheck,
  Scissors,
  Shield,
  Sparkles,
  Star,
} from "lucide-react";
import type { Category } from "../backend.d";
import CategoryCard from "../components/CategoryCard";
import ProductCard from "../components/ProductCard";
import { useCategories, useFeaturedProducts } from "../hooks/useQueries";
import { Link } from "../lib/router-compat";

// Static category data as fallback/seed
const STATIC_CATEGORIES: Category[] = [
  {
    id: 1n,
    name: "Ladies Dress",
    description: "Elegant women's clothing including lawn, chiffon & more",
    imageUrl: "/assets/generated/cat-ladies-dress.dim_600x600.jpg",
    sortOrder: 1n,
  },
  {
    id: 2n,
    name: "Bridal Dress",
    description: "Exquisite bridal wear for your special day",
    imageUrl: "/assets/generated/cat-bridal-dress.dim_600x600.jpg",
    sortOrder: 2n,
  },
  {
    id: 3n,
    name: "Gents Suiting",
    description: "Premium suits, Pent Coat & Shalwar Qameez",
    imageUrl: "/assets/generated/cat-gents-suiting.dim_600x600.jpg",
    sortOrder: 3n,
  },
  {
    id: 4n,
    name: "Jeans & Trousers",
    description: "Quality denim jeans, trousers & casual pants",
    imageUrl: "/assets/generated/cat-jeans-trousers.dim_600x600.jpg",
    sortOrder: 4n,
  },
  {
    id: 5n,
    name: "Kids Garments",
    description: "Festive & casual wear for children",
    imageUrl: "/assets/generated/cat-kids-garments.dim_600x600.jpg",
    sortOrder: 5n,
  },
  {
    id: 6n,
    name: "Carpets & Rugs",
    description: "Handcrafted Pakistani carpets & decorative rugs",
    imageUrl: "/assets/generated/cat-carpets-rugs.dim_600x600.jpg",
    sortOrder: 6n,
  },
  {
    id: 7n,
    name: "Janamaz",
    description: "Prayer mats in finest quality fabrics",
    imageUrl: "/assets/generated/cat-janamaz.dim_600x600.jpg",
    sortOrder: 7n,
  },
  {
    id: 8n,
    name: "Ladies Shoes",
    description: "Stylish footwear for every occasion",
    imageUrl: "/assets/generated/cat-ladies-shoes.dim_600x600.jpg",
    sortOrder: 8n,
  },
  {
    id: 9n,
    name: "Gents Shoes",
    description: "Classic & contemporary men's footwear",
    imageUrl: "/assets/generated/cat-gents-shoes.dim_600x600.jpg",
    sortOrder: 9n,
  },
  {
    id: 10n,
    name: "Towels",
    description: "Luxuriously soft cotton towels",
    imageUrl: "/assets/generated/cat-towels.dim_600x600.jpg",
    sortOrder: 10n,
  },
  {
    id: 11n,
    name: "Bed Sheets",
    description: "Premium cotton & linen bed linen sets",
    imageUrl: "/assets/generated/cat-bed-sheets.dim_600x600.jpg",
    sortOrder: 11n,
  },
  {
    id: 12n,
    name: "Ladies Purse",
    description: "Elegant handbags & clutches",
    imageUrl: "/assets/generated/cat-ladies-purse.dim_600x600.jpg",
    sortOrder: 12n,
  },
  {
    id: 13n,
    name: "Gents Wallets",
    description: "Premium leather wallets & card holders",
    imageUrl: "/assets/generated/cat-gents-wallets.dim_600x600.jpg",
    sortOrder: 13n,
  },
  {
    id: 14n,
    name: "School Bags",
    description: "Durable backpacks for students",
    imageUrl: "/assets/generated/cat-school-bags.dim_600x600.jpg",
    sortOrder: 14n,
  },
  {
    id: 15n,
    name: "Luggage & Travel Bags",
    description: "Quality suitcases & travel bags",
    imageUrl: "/assets/generated/cat-luggage-bags.dim_600x600.jpg",
    sortOrder: 15n,
  },
  {
    id: 16n,
    name: "Groom Dress",
    description: "Stunning sherwani & groom wear",
    imageUrl: "/assets/generated/cat-groom-dress.dim_600x600.jpg",
    sortOrder: 16n,
  },
  {
    id: 17n,
    name: "Custom Orders",
    description: "Bespoke dresses & handmade shoes",
    imageUrl: "/assets/generated/cat-custom-orders.dim_600x600.jpg",
    sortOrder: 17n,
  },
  {
    id: 18n,
    name: "Caps & Accessories",
    description: "Caps, socks & fashion accessories",
    imageUrl: "/assets/generated/cat-caps-accessories.dim_600x600.jpg",
    sortOrder: 18n,
  },
];

export default function HomePage() {
  const { data: categories, isLoading: catsLoading } = useCategories();
  const { data: featuredProducts, isLoading: prodsLoading } =
    useFeaturedProducts();

  const displayCategories =
    categories && categories.length > 0 ? categories : STATIC_CATEGORIES;

  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[60vh] lg:h-[80vh] min-h-[420px] flex items-center overflow-hidden">
        <img
          src="/assets/generated/hero-banner.dim_1400x600.jpg"
          alt="ARSAM Fabrics & Textiles — Pakistan's finest fabrics"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/20" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-secondary/90 text-secondary-foreground text-xs font-semibold px-3 py-1.5 rounded-full mb-4 font-body">
              <Sparkles className="h-3 w-3" />
              Founded in Pakistan, 2020
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
              Pakistan's Finest
              <br />
              <span className="text-secondary">Fabrics & Textiles</span>
            </h1>
            <p className="font-body text-white/85 text-lg mb-8 max-w-lg leading-relaxed">
              From Pakistan's premier mills to your doorstep. Authentic quality
              in every thread — clothing, home textiles & more.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/categories">
                <Button
                  size="lg"
                  className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold text-base px-8"
                  data-ocid="home.hero.primary_button"
                >
                  Shop Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/custom-orders">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-primary font-semibold text-base px-8"
                  data-ocid="home.hero.secondary_button"
                >
                  Custom Orders
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-primary py-10 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                icon: <PackageCheck className="h-7 w-7 text-secondary" />,
                title: "Direct from Mills",
                desc: "Sourced directly from Pakistan's premier textile mills for authentic quality.",
              },
              {
                icon: <Shield className="h-7 w-7 text-secondary" />,
                title: "Quality Guarantee",
                desc: "Every product meets our strict quality standards before reaching you.",
              },
              {
                icon: <Scissors className="h-7 w-7 text-secondary" />,
                title: "Custom Orders",
                desc: "Bespoke dresses & handmade shoes crafted to your exact specifications.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-4 p-4 rounded-xl bg-primary-foreground/5 border border-primary-foreground/15"
              >
                <div className="flex-shrink-0 mt-0.5">{item.icon}</div>
                <div>
                  <h3 className="font-display font-bold text-primary-foreground text-base mb-1">
                    {item.title}
                  </h3>
                  <p className="font-body text-primary-foreground/70 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-12 lg:py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="font-body text-sm font-semibold text-secondary uppercase tracking-wider mb-1">
                Browse
              </p>
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground">
                All Categories
              </h2>
            </div>
            <Link
              to="/categories"
              className="hidden sm:flex items-center gap-1 text-primary font-semibold text-sm font-body hover:gap-2 transition-all"
              data-ocid="home.categories.link"
            >
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {catsLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 lg:gap-4">
              {Array.from({ length: 10 }, (_, i) => i).map((i) => (
                <Skeleton key={i} className="aspect-square rounded-xl" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 lg:gap-4">
              {displayCategories.slice(0, 10).map((cat, i) => (
                <CategoryCard
                  key={cat.id.toString()}
                  category={cat}
                  index={i + 1}
                />
              ))}
            </div>
          )}

          <div className="mt-6 text-center sm:hidden">
            <Link to="/categories">
              <Button
                variant="outline"
                className="border-primary text-primary"
                data-ocid="home.categories_mobile.button"
              >
                View All Categories <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 lg:py-16 bg-accent/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <p className="font-body text-sm font-semibold text-secondary uppercase tracking-wider mb-1">
              Highlights
            </p>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground">
              Featured Products
            </h2>
          </div>

          {prodsLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 4 }, (_, i) => i).map((i) => (
                <Skeleton key={i} className="aspect-[3/4] rounded-lg" />
              ))}
            </div>
          ) : featuredProducts && featuredProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {featuredProducts.map((product, i) => (
                <ProductCard
                  key={product.id.toString()}
                  product={product}
                  index={i + 1}
                />
              ))}
            </div>
          ) : (
            <div
              className="text-center py-16 bg-card rounded-xl border border-border"
              data-ocid="home.featured.empty_state"
            >
              <Star className="h-12 w-12 text-secondary mx-auto mb-3 opacity-50" />
              <h3 className="font-display font-semibold text-foreground text-xl mb-2">
                New Collection Coming Soon
              </h3>
              <p className="font-body text-muted-foreground mb-4">
                Our featured products will appear here once added by our team.
              </p>
              <Link to="/custom-orders">
                <Button
                  className="bg-primary text-primary-foreground"
                  data-ocid="home.featured.primary_button"
                >
                  Place a Custom Order
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* About Teaser */}
      <section className="py-12 lg:py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-brand-lg">
                <img
                  src="/assets/generated/cat-bridal-dress.dim_600x600.jpg"
                  alt="ARSAM Fabrics quality textiles"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-primary rounded-xl p-4 shadow-brand hidden lg:block">
                <p className="font-display font-bold text-secondary text-3xl">
                  2020
                </p>
                <p className="font-body text-primary-foreground/80 text-xs">
                  Est. in Pakistan
                </p>
              </div>
            </div>
            <div>
              <p className="font-body text-sm font-semibold text-secondary uppercase tracking-wider mb-2">
                Our Story
              </p>
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-4 leading-tight">
                Born from a Passion for Quality Pakistani Textiles
              </h2>
              <p className="font-body text-muted-foreground leading-relaxed mb-4">
                ARSAM was founded in 2020 with a simple belief: every home and
                every person deserves the finest fabrics. We source directly
                from Pakistan's premier textile mills, ensuring authenticity and
                quality in every product.
              </p>
              <p className="font-body text-muted-foreground leading-relaxed mb-6">
                From women's embroidered lawn to men's khaddar, children's
                festive wear and premium bed linen — our collection represents
                the best of Pakistani craftsmanship.
              </p>
              <Link to="/about">
                <Button
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold gap-2"
                  data-ocid="home.about.primary_button"
                >
                  Learn More About Us
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-14 lg:py-20 bg-primary relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 50%, oklch(0.72 0.12 72) 0%, transparent 50%), radial-gradient(circle at 80% 20%, oklch(0.97 0.01 80) 0%, transparent 40%)",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-secondary/20 border border-secondary/40 text-secondary text-xs font-semibold px-3 py-1.5 rounded-full mb-4 font-body">
            <Scissors className="h-3 w-3" />
            Bespoke Craftsmanship
          </div>
          <h2 className="font-display text-3xl lg:text-5xl font-bold text-primary-foreground mb-4 leading-tight">
            Place a Custom Order Today
          </h2>
          <p className="font-body text-primary-foreground/75 text-lg max-w-xl mx-auto mb-8">
            Get handcrafted dresses and handmade shoes tailored to your exact
            measurements and preferences.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/custom-orders">
              <Button
                size="lg"
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold text-base px-10"
                data-ocid="home.cta.primary_button"
              >
                Start Your Custom Order
              </Button>
            </Link>
            <Link to="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-primary font-semibold"
                data-ocid="home.cta.secondary_button"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
