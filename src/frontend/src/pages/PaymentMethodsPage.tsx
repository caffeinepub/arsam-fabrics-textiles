import { Badge } from "@/components/ui/badge";
import {
  Banknote,
  Building2,
  CreditCard,
  Globe,
  ShieldCheck,
  Smartphone,
} from "lucide-react";

const PAYMENT_METHODS = [
  {
    icon: <Banknote className="h-7 w-7 text-secondary" />,
    title: "Cash on Delivery (COD)",
    badge: "Pakistan Only",
    badgeVariant: "default" as const,
    desc: "Pay cash when your order arrives at your door. Available for all domestic orders within Pakistan.",
    details: [
      "Available on all domestic orders",
      "Payment collected by courier on delivery",
      "No additional charges",
    ],
  },
  {
    icon: <Building2 className="h-7 w-7 text-secondary" />,
    title: "Bank Transfer",
    badge: "Pakistan & International",
    badgeVariant: "default" as const,
    desc: "Direct bank transfer to our account. Provide your payment screenshot via WhatsApp for order confirmation.",
    details: [
      "Bank: Meezan Bank / HBL",
      "Account details shared on order confirmation",
      "Order dispatched after payment verification",
    ],
  },
  {
    icon: <Smartphone className="h-7 w-7 text-secondary" />,
    title: "EasyPaisa",
    badge: "Pakistan Only",
    badgeVariant: "default" as const,
    desc: "Send payment via EasyPaisa mobile wallet. Fast, simple, and secure.",
    details: [
      "Account number shared on order confirmation",
      "Send payment screenshot via WhatsApp",
      "Order processed within 1 business day",
    ],
  },
  {
    icon: <Smartphone className="h-7 w-7 text-secondary" />,
    title: "JazzCash",
    badge: "Pakistan Only",
    badgeVariant: "default" as const,
    desc: "Pay easily via JazzCash mobile wallet. Convenient for all JazzCash users.",
    details: [
      "Account number shared on order confirmation",
      "Send payment screenshot via WhatsApp",
      "Order processed within 1 business day",
    ],
  },
  {
    icon: <Globe className="h-7 w-7 text-secondary" />,
    title: "Wise (International Transfer)",
    badge: "International",
    badgeVariant: "secondary" as const,
    desc: "For international customers, we accept Wise (formerly TransferWise) for low-fee global transfers.",
    details: [
      "PKR or USD/GBP/EUR accepted",
      "Account details provided on request",
      "Order confirmed after receipt of funds",
    ],
  },
  {
    icon: <Globe className="h-7 w-7 text-secondary" />,
    title: "Western Union / MoneyGram",
    badge: "International",
    badgeVariant: "secondary" as const,
    desc: "Overseas customers can send payment via Western Union or MoneyGram. Contact us before placing your order.",
    details: [
      "Available in most countries worldwide",
      "Contact us for recipient details",
      "Order dispatched after funds received",
    ],
  },
];

export default function PaymentMethodsPage() {
  return (
    <main className="min-h-screen bg-background" data-ocid="payment.page">
      {/* Header */}
      <section className="bg-primary py-14 lg:py-20 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 80% 50%, oklch(0.72 0.12 72) 0%, transparent 50%)",
          }}
        />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-secondary/20 border border-secondary/40 text-secondary text-xs font-semibold px-3 py-1.5 rounded-full mb-4 font-body">
            <ShieldCheck className="h-3 w-3" />
            Secure & Flexible Payments
          </div>
          <h1 className="font-display text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
            Payment Methods
          </h1>
          <p className="font-body text-primary-foreground/75 text-lg max-w-xl mx-auto">
            We offer multiple convenient payment options for both domestic and
            international customers.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Method Cards */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-12"
          data-ocid="payment.methods.list"
        >
          {PAYMENT_METHODS.map((method, i) => (
            <div
              key={method.title}
              className="bg-card border border-border rounded-xl p-6 flex flex-col gap-4 hover:shadow-md transition-shadow"
              data-ocid={`payment.method.item.${i + 1}`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 flex-shrink-0">
                    {method.icon}
                  </div>
                  <h3 className="font-display font-bold text-foreground text-base leading-tight">
                    {method.title}
                  </h3>
                </div>
                <Badge
                  className={`flex-shrink-0 text-xs whitespace-nowrap ${
                    method.badgeVariant === "secondary"
                      ? "bg-blue-100 text-blue-800 border-0"
                      : "bg-green-100 text-green-800 border-0"
                  }`}
                >
                  {method.badge}
                </Badge>
              </div>

              <p className="font-body text-muted-foreground text-sm leading-relaxed">
                {method.desc}
              </p>

              <ul className="space-y-1.5 mt-auto">
                {method.details.map((detail) => (
                  <li
                    key={detail}
                    className="flex items-start gap-2 font-body text-xs text-muted-foreground"
                  >
                    <CreditCard className="h-3.5 w-3.5 text-secondary flex-shrink-0 mt-0.5" />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* How to Pay */}
        <section
          className="bg-accent/40 border border-border rounded-xl p-6 mb-10"
          data-ocid="payment.howtopay.section"
        >
          <h2 className="font-display text-xl font-bold text-foreground mb-4">
            How to Complete Your Payment
          </h2>
          <ol className="space-y-3 font-body text-sm text-muted-foreground list-none">
            {[
              "Place your order by filling the Custom Order form or contacting us via WhatsApp.",
              "We confirm your order and share the total amount along with payment details.",
              "Make the payment using your preferred method listed above.",
              "Send us your payment receipt/screenshot via WhatsApp for confirmation.",
              "We dispatch your order within 1–2 business days after payment is verified.",
            ].map((step, i) => (
              <li key={step} className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-secondary/20 text-secondary font-display font-bold text-xs flex-shrink-0 mt-0.5">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </section>

        {/* Security Note */}
        <section
          className="flex items-start gap-4 bg-card border border-border rounded-xl p-5"
          data-ocid="payment.security.section"
        >
          <ShieldCheck className="h-8 w-8 text-secondary flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-display font-bold text-foreground mb-1">
              Your Security Matters
            </h3>
            <p className="font-body text-muted-foreground text-sm leading-relaxed">
              ARSAM Fabrics & Textiles will never ask for your passwords or
              sensitive banking credentials. All payment details are shared
              through our official WhatsApp number only. If in doubt, contact us
              directly before making any transfer.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
