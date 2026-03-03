import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Check, ShoppingCart, X } from "lucide-react";
import { toast } from "sonner";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/CartContext";
import { useProduct, useProductsByCategory } from "../hooks/useQueries";
import { Link, useParams } from "../lib/router-compat";

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const productId = id ? BigInt(id) : undefined;

  const { data: product, isLoading, isError } = useProduct(productId);
  const { data: relatedProducts } = useProductsByCategory(product?.categoryId);
  const { addItem } = useCart();

  const handleAddToCart = () => {
    if (!product) return;
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
    });
    toast.success(`${product.name} added to cart!`);
  };

  if (isLoading) {
    return (
      <main
        className="min-h-screen bg-background py-10"
        data-ocid="product.loading_state"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Skeleton className="h-8 w-32 mb-8" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <Skeleton className="aspect-square rounded-xl" />
            <div className="space-y-4">
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (isError || !product) {
    return (
      <main
        className="min-h-screen bg-background flex items-center justify-center"
        data-ocid="product.error_state"
      >
        <div className="text-center">
          <h1 className="font-display text-2xl font-bold text-foreground mb-2">
            Product Not Found
          </h1>
          <p className="text-muted-foreground font-body mb-4">
            This product doesn't exist or was removed.
          </p>
          <Link to="/categories">
            <Button
              className="bg-primary text-primary-foreground"
              data-ocid="product.back.button"
            >
              Browse Categories
            </Button>
          </Link>
        </div>
      </main>
    );
  }

  const otherProducts =
    relatedProducts?.filter((p) => p.id !== product.id).slice(0, 4) || [];

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 mb-8 text-sm font-body">
          <Link
            to="/categories"
            className="text-muted-foreground hover:text-primary transition-colors"
            data-ocid="product.categories.link"
          >
            Categories
          </Link>
          <span className="text-muted-foreground">/</span>
          <Link
            to={`/category/${product.categoryId}`}
            className="text-muted-foreground hover:text-primary transition-colors"
            data-ocid="product.category.link"
          >
            Back
          </Link>
          <span className="text-muted-foreground">/</span>
          <span className="text-foreground font-medium line-clamp-1">
            {product.name}
          </span>
        </nav>

        {/* Product Detail */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mb-14">
          {/* Image */}
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-brand-lg bg-muted">
              <img
                src={
                  product.imageUrl ||
                  "/assets/generated/cat-ladies-dress.dim_600x600.jpg"
                }
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {!product.inStock && (
              <div className="absolute top-4 right-4">
                <Badge variant="destructive" className="font-semibold">
                  Out of Stock
                </Badge>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <div className="flex items-start gap-3 mb-3">
              {product.isFeatured && (
                <Badge className="bg-secondary text-secondary-foreground font-semibold text-xs">
                  ★ Featured
                </Badge>
              )}
              <Badge
                className={
                  product.inStock
                    ? "bg-green-100 text-green-800 font-semibold text-xs flex items-center gap-1"
                    : "bg-red-100 text-red-800 font-semibold text-xs flex items-center gap-1"
                }
              >
                {product.inStock ? (
                  <>
                    <Check className="h-3 w-3" /> In Stock
                  </>
                ) : (
                  <>
                    <X className="h-3 w-3" /> Out of Stock
                  </>
                )}
              </Badge>
            </div>

            <h1 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-4 leading-tight">
              {product.name}
            </h1>

            <div className="mb-4">
              <span className="font-display text-3xl lg:text-4xl font-bold text-primary">
                PKR {product.price.toLocaleString()}
              </span>
            </div>

            <div className="prose prose-sm max-w-none mb-6">
              <p className="font-body text-muted-foreground leading-relaxed text-base">
                {product.description}
              </p>
            </div>

            <div className="space-y-3 mt-auto">
              <Button
                size="lg"
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base gap-2"
                data-ocid="product.add_to_cart.primary_button"
              >
                <ShoppingCart className="h-5 w-5" />
                {product.inStock ? "Add to Cart" : "Out of Stock"}
              </Button>

              <Link to={`/category/${product.categoryId}`} className="block">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full border-primary text-primary hover:bg-primary/10 font-semibold"
                  data-ocid="product.browse_category.secondary_button"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  More in This Category
                </Button>
              </Link>
            </div>

            <div className="mt-6 pt-6 border-t border-border">
              <p className="font-body text-xs text-muted-foreground">
                Product ID: #{product.id.toString()} • Added:{" "}
                {new Date(
                  Number(product.createdAt) / 1_000_000,
                ).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {otherProducts.length > 0 && (
          <section>
            <div className="mb-6">
              <h2 className="font-display text-2xl font-bold text-foreground">
                More from this Category
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {otherProducts.map((p, i) => (
                <ProductCard key={p.id.toString()} product={p} index={i + 1} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
