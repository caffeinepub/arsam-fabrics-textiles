import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Search } from "lucide-react";
import ProductCard from "../components/ProductCard";
import { useSearchProducts } from "../hooks/useQueries";
import { Link, useSearchParams } from "../lib/router-compat";

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const { data: results, isLoading, isError } = useSearchProducts(query);

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-primary py-10 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="inline-flex items-center gap-1 text-primary-foreground/70 hover:text-secondary text-sm font-body mb-3 transition-colors"
            data-ocid="search.back.link"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          <div className="flex items-center gap-3">
            <Search className="h-6 w-6 text-secondary" />
            <div>
              <h1 className="font-display text-2xl lg:text-4xl font-bold text-primary-foreground">
                Search Results
              </h1>
              {query && (
                <p className="font-body text-primary-foreground/75 mt-1">
                  Showing results for: <strong>"{query}"</strong>
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-10 lg:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {!query ? (
            <div className="text-center py-16" data-ocid="search.empty_state">
              <Search className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
              <h2 className="font-display text-xl font-semibold text-foreground mb-2">
                Enter a Search Term
              </h2>
              <p className="font-body text-muted-foreground mb-4">
                Use the search bar in the navigation to search for products.
              </p>
              <Link to="/categories">
                <Button
                  className="bg-primary text-primary-foreground"
                  data-ocid="search.browse.button"
                >
                  Browse All Categories
                </Button>
              </Link>
            </div>
          ) : isLoading ? (
            <div data-ocid="search.loading_state">
              <p className="font-body text-muted-foreground text-sm mb-6">
                Searching...
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {Array.from({ length: 8 }, (_, i) => i).map((i) => (
                  <Skeleton key={i} className="aspect-[3/4] rounded-lg" />
                ))}
              </div>
            </div>
          ) : isError ? (
            <div className="text-center py-16" data-ocid="search.error_state">
              <p className="font-body text-muted-foreground mb-4">
                An error occurred while searching. Please try again.
              </p>
              <Link to="/">
                <Button
                  className="bg-primary text-primary-foreground"
                  data-ocid="search.home.button"
                >
                  Go Home
                </Button>
              </Link>
            </div>
          ) : results && results.length > 0 ? (
            <>
              <p className="font-body text-muted-foreground text-sm mb-6">
                Found <strong>{results.length}</strong> product
                {results.length !== 1 ? "s" : ""} for "{query}"
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {results.map((product, i) => (
                  <ProductCard
                    key={product.id.toString()}
                    product={product}
                    index={i + 1}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-16" data-ocid="search.empty_state">
              <Search className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
              <h2 className="font-display text-xl font-semibold text-foreground mb-2">
                No Results for "{query}"
              </h2>
              <p className="font-body text-muted-foreground mb-6 max-w-sm mx-auto">
                We couldn't find any products matching your search. Try a
                different term or browse our categories.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link to="/categories">
                  <Button
                    className="bg-primary text-primary-foreground"
                    data-ocid="search.browse.button"
                  >
                    Browse All Categories
                  </Button>
                </Link>
                <Link to="/custom-orders">
                  <Button
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary/10"
                    data-ocid="search.custom_order.button"
                  >
                    Custom Order
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
