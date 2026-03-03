import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight, Grid3X3 } from "lucide-react";
import type { Category } from "../backend.d";
import CategoryCard from "../components/CategoryCard";
import { useCategories } from "../hooks/useQueries";
import { Link } from "../lib/router-compat";

const STATIC_CATEGORIES: Category[] = [
  {
    id: 1n,
    name: "Ladies Dress",
    description:
      "Elegant women's clothing including embroidered lawn, chiffon & silk",
    imageUrl: "/assets/generated/cat-ladies-dress.dim_600x600.jpg",
    sortOrder: 1n,
  },
  {
    id: 2n,
    name: "Bridal Dress",
    description: "Exquisite bridal wear for your most special day",
    imageUrl: "/assets/generated/cat-bridal-dress.dim_600x600.jpg",
    sortOrder: 2n,
  },
  {
    id: 3n,
    name: "Gents Suiting",
    description: "Premium suits, Pent Coat, Blazers & Shalwar Qameez",
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
    description: "Festive & everyday wear for children of all ages",
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
    description: "Finest quality prayer mats in traditional designs",
    imageUrl: "/assets/generated/cat-janamaz.dim_600x600.jpg",
    sortOrder: 7n,
  },
  {
    id: 8n,
    name: "Ladies Shoes",
    description: "Stylish footwear including heels, flats & sandals",
    imageUrl: "/assets/generated/cat-ladies-shoes.dim_600x600.jpg",
    sortOrder: 8n,
  },
  {
    id: 9n,
    name: "Gents Shoes",
    description: "Classic & contemporary men's leather footwear",
    imageUrl: "/assets/generated/cat-gents-shoes.dim_600x600.jpg",
    sortOrder: 9n,
  },
  {
    id: 10n,
    name: "Towels",
    description: "Luxuriously soft cotton towels for home & bath",
    imageUrl: "/assets/generated/cat-towels.dim_600x600.jpg",
    sortOrder: 10n,
  },
  {
    id: 11n,
    name: "Bed Sheets",
    description: "Premium cotton & linen bed linen sets for restful sleep",
    imageUrl: "/assets/generated/cat-bed-sheets.dim_600x600.jpg",
    sortOrder: 11n,
  },
  {
    id: 12n,
    name: "Ladies Purse",
    description: "Elegant handbags, clutches & shoulder bags",
    imageUrl: "/assets/generated/cat-ladies-purse.dim_600x600.jpg",
    sortOrder: 12n,
  },
  {
    id: 13n,
    name: "Gents Wallets",
    description: "Premium leather wallets & card holders for men",
    imageUrl: "/assets/generated/cat-gents-wallets.dim_600x600.jpg",
    sortOrder: 13n,
  },
  {
    id: 14n,
    name: "School Bags",
    description: "Durable & stylish backpacks for students",
    imageUrl: "/assets/generated/cat-school-bags.dim_600x600.jpg",
    sortOrder: 14n,
  },
  {
    id: 15n,
    name: "Luggage & Travel Bags",
    description: "Quality suitcases, travel bags & trolleys",
    imageUrl: "/assets/generated/cat-luggage-bags.dim_600x600.jpg",
    sortOrder: 15n,
  },
  {
    id: 16n,
    name: "Groom Dress",
    description: "Stunning sherwani, achkan & groom wear collections",
    imageUrl: "/assets/generated/cat-groom-dress.dim_600x600.jpg",
    sortOrder: 16n,
  },
  {
    id: 17n,
    name: "Custom Orders",
    description: "Bespoke handcrafted dresses & handmade shoes to order",
    imageUrl: "/assets/generated/cat-custom-orders.dim_600x600.jpg",
    sortOrder: 17n,
  },
  {
    id: 18n,
    name: "Caps & Accessories",
    description: "Caps, socks, scarves & fashion accessories",
    imageUrl: "/assets/generated/cat-caps-accessories.dim_600x600.jpg",
    sortOrder: 18n,
  },
];

export default function CategoriesPage() {
  const { data: categories, isLoading } = useCategories();
  const displayCategories =
    categories && categories.length > 0 ? categories : STATIC_CATEGORIES;

  return (
    <main className="min-h-screen bg-background">
      {/* Page Header */}
      <section className="bg-primary py-10 lg:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-2">
            <Grid3X3 className="h-6 w-6 text-secondary" />
            <p className="font-body text-sm font-semibold text-secondary uppercase tracking-wider">
              Browse
            </p>
          </div>
          <h1 className="font-display text-3xl lg:text-5xl font-bold text-primary-foreground">
            All Categories
          </h1>
          <p className="font-body text-primary-foreground/75 mt-2 max-w-xl">
            Explore our complete range of premium Pakistani fabrics, garments,
            footwear & home textiles.
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-10 lg:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 lg:gap-4">
              {Array.from({ length: 18 }, (_, i) => i).map((i) => (
                <Skeleton key={i} className="aspect-square rounded-xl" />
              ))}
            </div>
          ) : (
            <>
              {/* Clothing Section */}
              <div className="mb-10">
                <h2 className="font-display text-xl lg:text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <span className="w-6 h-0.5 bg-secondary inline-block" />
                  Clothing & Apparel
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 lg:gap-4">
                  {displayCategories
                    .filter((c) =>
                      [1n, 2n, 3n, 4n, 5n, 16n, 18n].includes(c.id),
                    )
                    .map((cat, i) => (
                      <CategoryCard
                        key={cat.id.toString()}
                        category={cat}
                        index={i + 1}
                      />
                    ))}
                </div>
              </div>

              {/* Footwear Section */}
              <div className="mb-10">
                <h2 className="font-display text-xl lg:text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <span className="w-6 h-0.5 bg-secondary inline-block" />
                  Footwear
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 lg:gap-4">
                  {displayCategories
                    .filter((c) => [8n, 9n].includes(c.id))
                    .map((cat, i) => (
                      <CategoryCard
                        key={cat.id.toString()}
                        category={cat}
                        index={i + 1}
                      />
                    ))}
                </div>
              </div>

              {/* Home Textiles */}
              <div className="mb-10">
                <h2 className="font-display text-xl lg:text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <span className="w-6 h-0.5 bg-secondary inline-block" />
                  Home Textiles
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 lg:gap-4">
                  {displayCategories
                    .filter((c) => [6n, 7n, 10n, 11n].includes(c.id))
                    .map((cat, i) => (
                      <CategoryCard
                        key={cat.id.toString()}
                        category={cat}
                        index={i + 1}
                      />
                    ))}
                </div>
              </div>

              {/* Bags & Accessories */}
              <div className="mb-10">
                <h2 className="font-display text-xl lg:text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <span className="w-6 h-0.5 bg-secondary inline-block" />
                  Bags & Accessories
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 lg:gap-4">
                  {displayCategories
                    .filter((c) => [12n, 13n, 14n, 15n].includes(c.id))
                    .map((cat, i) => (
                      <CategoryCard
                        key={cat.id.toString()}
                        category={cat}
                        index={i + 1}
                      />
                    ))}
                </div>
              </div>

              {/* Custom */}
              <div>
                <h2 className="font-display text-xl lg:text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <span className="w-6 h-0.5 bg-secondary inline-block" />
                  Custom & Bespoke
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 lg:gap-4">
                  {displayCategories
                    .filter((c) => [17n].includes(c.id))
                    .map((cat, i) => (
                      <CategoryCard
                        key={cat.id.toString()}
                        category={cat}
                        index={i + 1}
                      />
                    ))}
                  <Link
                    to="/custom-orders"
                    className="group relative block aspect-square overflow-hidden rounded-xl shadow-xs hover:shadow-brand transition-all duration-300 bg-primary"
                    data-ocid="categories.custom_order.link"
                  >
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                      <div className="text-secondary text-4xl mb-3">✂️</div>
                      <h3 className="font-display font-bold text-primary-foreground text-sm lg:text-base">
                        Request Custom Order
                      </h3>
                      <p className="text-primary-foreground/70 text-xs mt-1 font-body">
                        Tailored just for you
                      </p>
                      <div className="flex items-center gap-1 mt-2 text-secondary text-xs font-semibold font-body group-hover:gap-2 transition-all">
                        Order Now <ArrowRight className="h-3 w-3" />
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
