import { ArrowRight } from "lucide-react";
import type { Category } from "../backend.d";
import { Link } from "../lib/router-compat";

interface CategoryCardProps {
  category: Category;
  index?: number;
}

export default function CategoryCard({
  category,
  index = 1,
}: CategoryCardProps) {
  return (
    <Link
      to={`/category/${category.id}`}
      className="group relative block aspect-square overflow-hidden rounded-xl shadow-xs hover:shadow-brand transition-all duration-300"
      data-ocid={`category.item.${index}`}
    >
      <img
        src={
          category.imageUrl ||
          "/assets/generated/cat-ladies-dress.dim_600x600.jpg"
        }
        alt={category.name}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        loading="lazy"
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-3 lg:p-4">
        <h3 className="font-display font-bold text-white text-sm lg:text-base leading-tight mb-0.5">
          {category.name}
        </h3>
        {category.description && (
          <p className="text-white/70 text-xs line-clamp-1 font-body hidden sm:block">
            {category.description}
          </p>
        )}
        <div className="flex items-center gap-1 mt-1.5 text-secondary opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-xs font-semibold font-body">Shop Now</span>
          <ArrowRight className="h-3 w-3" />
        </div>
      </div>
    </Link>
  );
}
