import { Button } from "@/components/ui/button";
import { ArrowRight, Award, Heart, Leaf, Users } from "lucide-react";
import { Link } from "../lib/router-compat";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-primary py-14 lg:py-20 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, oklch(0.72 0.12 72) 0%, transparent 50%)",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-body text-sm font-semibold text-secondary uppercase tracking-wider mb-2">
            Our Story
          </p>
          <h1 className="font-display text-4xl lg:text-6xl font-bold text-primary-foreground leading-tight max-w-2xl">
            About ARSAM Fabrics & Textiles
          </h1>
          <p className="font-body text-primary-foreground/75 text-lg mt-4 max-w-xl">
            Born from a passion for quality Pakistani textiles, serving homes
            and hearts since 2020.
          </p>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="order-2 lg:order-1">
              <p className="font-body text-sm font-semibold text-secondary uppercase tracking-wider mb-3">
                Who We Are
              </p>
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-6 leading-tight">
                Pakistan's Premier Textile Destination
              </h2>
              <div className="space-y-4 font-body text-muted-foreground leading-relaxed">
                <p>
                  ARSAM Fabrics & Textiles Ltd was founded in 2020 with a simple
                  yet powerful belief:
                  <strong className="text-foreground">
                    {" "}
                    every home and every person deserves the finest fabrics
                  </strong>
                  . We started as a small operation with big dreams — to bring
                  the best of Pakistan's legendary textile heritage directly to
                  our customers.
                </p>
                <p>
                  We source exclusively from Pakistan's premier textile mills,
                  cutting out middlemen to ensure you receive authentic,
                  high-quality products at honest prices. Whether it's the
                  softest bed sheets, the most vibrant clothing prints, or the
                  most intricately crafted prayer mats — each piece in our
                  collection is chosen with care.
                </p>
                <p>
                  Pakistan is home to some of the world's finest textile
                  craftspeople. From the hand-embroidered lawn of Punjab to the
                  woven khaddar of the northwest, our inventory celebrates the
                  rich diversity of Pakistani textile tradition.
                </p>
              </div>
            </div>
            <div className="order-1 lg:order-2 relative">
              <div className="grid grid-cols-2 gap-3">
                <div className="aspect-[3/4] rounded-xl overflow-hidden shadow-brand">
                  <img
                    src="/assets/generated/cat-bridal-dress.dim_600x600.jpg"
                    alt="Premium bridal wear"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-3 pt-6">
                  <div className="aspect-square rounded-xl overflow-hidden shadow-brand">
                    <img
                      src="/assets/generated/cat-bed-sheets.dim_600x600.jpg"
                      alt="Premium bed sheets"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="bg-primary rounded-xl p-4 text-center">
                    <p className="font-display font-bold text-secondary text-3xl">
                      2020
                    </p>
                    <p className="font-body text-primary-foreground/80 text-xs mt-1">
                      Established
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-14 lg:py-20 bg-accent/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="font-body text-sm font-semibold text-secondary uppercase tracking-wider mb-2">
              What Drives Us
            </p>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground">
              Our Core Values
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Award className="h-8 w-8 text-secondary" />,
                title: "Quality First",
                desc: "Every product is vetted for authenticity and quality before reaching our shelves. We refuse to compromise.",
              },
              {
                icon: <Leaf className="h-8 w-8 text-secondary" />,
                title: "Authenticity",
                desc: "We partner only with certified Pakistani textile mills, ensuring genuine origin and craftsmanship in every product.",
              },
              {
                icon: <Heart className="h-8 w-8 text-secondary" />,
                title: "Craftsmanship",
                desc: "We celebrate the artisans and weavers whose skilled hands create the textiles we're proud to sell.",
              },
              {
                icon: <Users className="h-8 w-8 text-secondary" />,
                title: "Community",
                desc: "Supporting Pakistani textile workers and communities is central to everything we do as a business.",
              },
            ].map((value) => (
              <div
                key={value.title}
                className="bg-card rounded-xl p-6 border border-border shadow-xs text-center hover:shadow-brand transition-shadow"
              >
                <div className="flex justify-center mb-4">{value.icon}</div>
                <h3 className="font-display font-bold text-card-foreground text-lg mb-2">
                  {value.title}
                </h3>
                <p className="font-body text-muted-foreground text-sm leading-relaxed">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Heritage Section */}
      <section className="py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="font-body text-sm font-semibold text-secondary uppercase tracking-wider mb-3">
                Our Heritage
              </p>
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-6 leading-tight">
                Pakistan's Textile Legacy
              </h2>
              <div className="space-y-4 font-body text-muted-foreground leading-relaxed">
                <p>
                  Pakistan's textile industry is one of the oldest and most
                  refined in the world. From the Indus Valley Civilization
                  through the Mughal era to today, Pakistan's weavers have
                  always been masters of their craft.
                </p>
                <p>
                  Our collections draw from this deep heritage — embroidered
                  lawn that reflects the Punjab's floral traditions,
                  heavy-weight khaddar suited to the seasons, intricate
                  hand-block prints from Sindh, and the luxuriously fine cotton
                  of Pakistan's famous mills.
                </p>
                <p>
                  When you buy from ARSAM, you're not just purchasing fabric —
                  you're connecting with centuries of artisanal tradition and
                  supporting the livelihoods of Pakistani craftspeople.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                {
                  src: "/assets/generated/cat-carpets-rugs.dim_600x600.jpg",
                  alt: "Carpets & Rugs",
                },
                {
                  src: "/assets/generated/cat-janamaz.dim_600x600.jpg",
                  alt: "Janamaz",
                },
                {
                  src: "/assets/generated/cat-ladies-dress.dim_600x600.jpg",
                  alt: "Ladies Dress",
                },
                {
                  src: "/assets/generated/cat-gents-suiting.dim_600x600.jpg",
                  alt: "Gents Suiting",
                },
                {
                  src: "/assets/generated/cat-kids-garments.dim_600x600.jpg",
                  alt: "Kids Garments",
                },
                {
                  src: "/assets/generated/cat-groom-dress.dim_600x600.jpg",
                  alt: "Groom Dress",
                },
              ].map((img) => (
                <div
                  key={img.alt}
                  className="aspect-square rounded-lg overflow-hidden shadow-xs"
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-14 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Experience Quality?
          </h2>
          <p className="font-body text-primary-foreground/75 text-lg max-w-xl mx-auto mb-8">
            Explore our full collection of premium Pakistani fabrics, garments &
            home textiles.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/categories">
              <Button
                size="lg"
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold gap-2"
                data-ocid="about.shop_now.primary_button"
              >
                Shop Now <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10"
                data-ocid="about.contact.secondary_button"
              >
                Get in Touch
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
