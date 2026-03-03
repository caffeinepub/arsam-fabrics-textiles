import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, Loader2, Scissors } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useSubmitCustomOrder } from "../hooks/useQueries";

const ORDER_TYPES = [
  { value: "Ladies Dress", label: "Ladies Dress (Shalwar Kameez, Suit, etc.)" },
  { value: "Bridal Dress", label: "Bridal Dress & Lehenga" },
  { value: "Groom Dress", label: "Groom Dress (Sherwani, Achkan, etc.)" },
  { value: "Gents Suiting", label: "Gents Suit / Pent Coat / Shalwar Qameez" },
  { value: "Kids Dress", label: "Kids Dress (Festive or Casual)" },
  { value: "Handmade Ladies Shoes", label: "Handmade Ladies Shoes" },
  { value: "Handmade Gents Shoes", label: "Handmade Gents Shoes" },
  { value: "Custom Carpet", label: "Custom Carpet / Rug" },
  { value: "Other", label: "Other / Custom Request" },
];

export default function CustomOrdersPage() {
  const [form, setForm] = useState({
    customerName: "",
    phone: "",
    email: "",
    description: "",
    orderType: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const { mutateAsync, isPending, isError, error } = useSubmitCustomOrder();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !form.customerName ||
      !form.phone ||
      !form.orderType ||
      !form.description
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }
    try {
      await mutateAsync(form);
      setSubmitted(true);
      toast.success("Custom order request submitted successfully!");
    } catch {
      toast.error("Failed to submit order. Please try again.");
    }
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-primary py-12 lg:py-16 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 80% 50%, oklch(0.72 0.12 72) 0%, transparent 50%)",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-3">
            <Scissors className="h-7 w-7 text-secondary" />
            <p className="font-body text-sm font-semibold text-secondary uppercase tracking-wider">
              Bespoke Craftsmanship
            </p>
          </div>
          <h1 className="font-display text-3xl lg:text-5xl font-bold text-primary-foreground leading-tight max-w-2xl">
            Custom Orders
          </h1>
          <p className="font-body text-primary-foreground/75 text-lg mt-3 max-w-xl">
            Get handcrafted dresses and handmade shoes tailored to your exact
            measurements, preferences, and style.
          </p>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-10 bg-accent/30 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            {[
              {
                step: "01",
                title: "Submit Your Request",
                desc: "Fill out the form below with your requirements and measurements.",
              },
              {
                step: "02",
                title: "We Confirm & Estimate",
                desc: "Our team reviews your request and sends you a price quote within 24 hours.",
              },
              {
                step: "03",
                title: "We Craft & Deliver",
                desc: "Your order is handcrafted by skilled artisans and delivered to you.",
              },
            ].map((item) => (
              <div key={item.step} className="relative">
                <div className="font-display text-4xl font-black text-primary/15 mb-1">
                  {item.step}
                </div>
                <h3 className="font-display font-bold text-foreground text-base mb-1">
                  {item.title}
                </h3>
                <p className="font-body text-muted-foreground text-sm">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-12 lg:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {submitted ? (
            <div
              className="bg-card border border-border rounded-2xl p-10 lg:p-14 text-center shadow-brand"
              data-ocid="custom_order.success_state"
            >
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="h-10 w-10 text-green-600" />
              </div>
              <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-3">
                Order Request Received!
              </h2>
              <p className="font-body text-muted-foreground mb-2 leading-relaxed">
                Thank you for your custom order request,{" "}
                <strong>{form.customerName || "valued customer"}</strong>.
              </p>
              <p className="font-body text-muted-foreground mb-8 leading-relaxed">
                Our team will review your request and contact you within{" "}
                <strong>24 hours</strong> to discuss details, measurements, and
                provide a price estimate.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  onClick={() => {
                    setSubmitted(false);
                    setForm({
                      customerName: "",
                      phone: "",
                      email: "",
                      description: "",
                      orderType: "",
                    });
                  }}
                  className="bg-primary text-primary-foreground"
                  data-ocid="custom_order.submit_another.button"
                >
                  Submit Another Order
                </Button>
                <Button
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/10"
                  onClick={() => window.history.back()}
                  data-ocid="custom_order.back.button"
                >
                  Back to Shopping
                </Button>
              </div>
            </div>
          ) : (
            <div className="bg-card border border-border rounded-2xl p-6 lg:p-8 shadow-brand">
              <h2 className="font-display text-2xl font-bold text-card-foreground mb-6">
                Place Your Custom Order
              </h2>

              {isError && (
                <Alert
                  variant="destructive"
                  className="mb-4"
                  data-ocid="custom_order.error_state"
                >
                  <AlertDescription>
                    {error instanceof Error
                      ? error.message
                      : "Failed to submit order. Please try again."}
                  </AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="customerName"
                      className="font-body text-sm font-semibold"
                    >
                      Full Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="customerName"
                      value={form.customerName}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, customerName: e.target.value }))
                      }
                      placeholder="Your full name"
                      required
                      data-ocid="custom_order.name.input"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="phone"
                      className="font-body text-sm font-semibold"
                    >
                      Phone Number <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, phone: e.target.value }))
                      }
                      placeholder="+92 000 000 0000"
                      required
                      data-ocid="custom_order.phone.input"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label
                    htmlFor="email"
                    className="font-body text-sm font-semibold"
                  >
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, email: e.target.value }))
                    }
                    placeholder="your@email.com (optional)"
                    data-ocid="custom_order.email.input"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label
                    htmlFor="orderType"
                    className="font-body text-sm font-semibold"
                  >
                    Order Type <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={form.orderType}
                    onValueChange={(val) =>
                      setForm((p) => ({ ...p, orderType: val }))
                    }
                  >
                    <SelectTrigger
                      id="orderType"
                      data-ocid="custom_order.order_type.select"
                    >
                      <SelectValue placeholder="Select what you'd like to order..." />
                    </SelectTrigger>
                    <SelectContent>
                      {ORDER_TYPES.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label
                    htmlFor="description"
                    className="font-body text-sm font-semibold"
                  >
                    Order Description & Requirements{" "}
                    <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="description"
                    value={form.description}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, description: e.target.value }))
                    }
                    placeholder="Please describe your requirements in detail: fabric preferences, colors, measurements, design ideas, occasion, delivery timeline, etc."
                    rows={6}
                    required
                    data-ocid="custom_order.description.textarea"
                  />
                  <p className="text-xs text-muted-foreground font-body">
                    The more detail you provide, the better we can serve you.
                    Include measurements if available.
                  </p>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={isPending}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-base"
                  data-ocid="custom_order.form.submit_button"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Scissors className="mr-2 h-4 w-4" />
                      Submit Custom Order Request
                    </>
                  )}
                </Button>
              </form>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
