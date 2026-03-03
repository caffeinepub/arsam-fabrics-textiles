import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, ShoppingCart } from "lucide-react";
import type { Product } from "../backend.d";
import { useCart } from "../context/CartContext";
import { Link } from "../lib/router-compat";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 1 }: ProductCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
    });
  };

  return (
    <article
      className="group bg-card border border-border rounded-lg overflow-hidden shadow-xs hover:shadow-brand transition-all duration-300 flex flex-col"
      data-ocid={`product.item.${index}`}
    >
      <div className="relative aspect-square overflow-hidden bg-muted">
        <Link to={`/product/${product.id}`}>
          <img
            src={
              product.imageUrl ||
              "/assets/generated/cat-ladies-dress.dim_600x600.jpg"
            }
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </Link>
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
          <Link
            to={`/product/${product.id}`}
            className="hover:text-primary transition-colors"
            data-ocid={`product.item.${index}.link`}
          >
            {product.name}
          </Link>
        </h3>

        <p className="text-muted-foreground text-xs line-clamp-2 mb-3 flex-1 font-body">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <span className="font-display font-bold text-primary text-lg">
            PKR {product.price.toLocaleString()}
          </span>
          <Badge
            variant={product.inStock ? "default" : "destructive"}
            className={`text-xs ${product.inStock ? "bg-green-100 text-green-800" : ""}`}
          >
            {product.inStock ? "In Stock" : "Sold Out"}
          </Badge>
        </div>

        <div className="flex gap-2 mt-3">
          <Link to={`/product/${product.id}`} className="flex-1">
            <Button
              variant="outline"
              size="sm"
              className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground text-xs gap-1"
              data-ocid={`product.item.${index}.secondary_button`}
            >
              <Eye className="h-3 w-3" />
              View
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
            Add
          </Button>
        </div>
      </div>
    </article>
  );
}
