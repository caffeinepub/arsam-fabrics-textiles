import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function CartSidebar() {
  const {
    items,
    removeItem,
    updateQuantity,
    totalItems,
    totalPrice,
    isOpen,
    setIsOpen,
  } = useCart();

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent
        side="right"
        className="w-full sm:w-96 flex flex-col p-0"
        data-ocid="cart.sheet"
      >
        <SheetHeader className="px-6 py-4 border-b border-border bg-primary text-primary-foreground">
          <div className="flex items-center justify-between">
            <SheetTitle className="font-display text-primary-foreground flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-secondary" />
              Your Cart
              {totalItems > 0 && (
                <span className="bg-secondary text-secondary-foreground text-xs rounded-full px-2 py-0.5 font-body font-semibold">
                  {totalItems}
                </span>
              )}
            </SheetTitle>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setIsOpen(false)}
              className="text-primary-foreground hover:bg-primary-foreground/10"
              data-ocid="cart.close_button"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </SheetHeader>

        {items.length === 0 ? (
          <div
            className="flex-1 flex flex-col items-center justify-center p-8 text-center"
            data-ocid="cart.empty_state"
          >
            <ShoppingBag className="h-16 w-16 text-muted-foreground/30 mb-4" />
            <h3 className="font-display text-lg font-semibold text-muted-foreground mb-2">
              Your cart is empty
            </h3>
            <p className="text-muted-foreground text-sm font-body">
              Browse our collections and add items to your cart.
            </p>
            <Button
              onClick={() => setIsOpen(false)}
              className="mt-4 bg-primary hover:bg-primary/90 text-primary-foreground"
              data-ocid="cart.continue_button"
            >
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1">
              <div className="p-4 space-y-4">
                {items.map((item, idx) => (
                  <div
                    key={item.productId.toString()}
                    className="flex gap-3 bg-card rounded-lg p-3 border border-border"
                    data-ocid={`cart.item.${idx + 1}`}
                  >
                    <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0 bg-muted">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-display font-semibold text-sm text-card-foreground line-clamp-2 leading-tight">
                        {item.name}
                      </h4>
                      <p className="text-primary font-display font-bold text-sm mt-1">
                        PKR {item.price.toLocaleString()}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-6 w-6"
                          onClick={() =>
                            updateQuantity(item.productId, item.quantity - 1)
                          }
                          data-ocid={`cart.item.${idx + 1}.secondary_button`}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="text-sm font-semibold w-6 text-center">
                          {item.quantity}
                        </span>
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-6 w-6"
                          onClick={() =>
                            updateQuantity(item.productId, item.quantity + 1)
                          }
                          data-ocid={`cart.item.${idx + 1}.primary_button`}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-6 w-6 ml-auto text-destructive hover:bg-destructive/10"
                          onClick={() => removeItem(item.productId)}
                          data-ocid={`cart.item.${idx + 1}.delete_button`}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="border-t border-border p-6 space-y-4 bg-card">
              <div className="flex justify-between items-center">
                <span className="font-body font-semibold text-muted-foreground">
                  Subtotal
                </span>
                <span className="font-display font-bold text-primary text-lg">
                  PKR {totalPrice.toLocaleString()}
                </span>
              </div>
              <p className="text-xs text-muted-foreground font-body">
                Shipping & taxes calculated at checkout.
              </p>
              <Button
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                data-ocid="cart.checkout.button"
              >
                Proceed to Checkout
              </Button>
              <Button
                variant="outline"
                className="w-full border-primary text-primary hover:bg-primary/10"
                onClick={() => setIsOpen(false)}
                data-ocid="cart.continue_button"
              >
                Continue Shopping
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
