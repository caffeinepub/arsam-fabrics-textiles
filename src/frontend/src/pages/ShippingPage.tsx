import { Badge } from "@/components/ui/badge";
import {
  AlertCircle,
  CheckCircle,
  Clock,
  Globe,
  Package,
  Truck,
} from "lucide-react";

const DOMESTIC_ZONES = [
  {
    region: "Lahore, Karachi, Islamabad",
    time: "2–3 business days",
    cost: "PKR 200–300",
  },
  {
    region: "Other Major Cities",
    time: "3–5 business days",
    cost: "PKR 300–400",
  },
  {
    region: "Remote / Rural Areas",
    time: "5–7 business days",
    cost: "PKR 400–600",
  },
];

const INTERNATIONAL_ZONES = [
  {
    region: "UAE, Saudi Arabia, Qatar, Kuwait",
    time: "5–8 business days",
    cost: "PKR 2,500–4,000",
  },
  { region: "UK, Europe", time: "7–12 business days", cost: "PKR 4,000–6,500" },
  {
    region: "USA, Canada, Australia",
    time: "8–14 business days",
    cost: "PKR 5,000–8,000",
  },
  {
    region: "Other Countries",
    time: "10–20 business days",
    cost: "Contact us for a quote",
  },
];

export default function ShippingPage() {
  return (
    <main className="min-h-screen bg-background" data-ocid="shipping.page">
      {/* Header */}
      <section className="bg-primary py-14 lg:py-20 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, oklch(0.72 0.12 72) 0%, transparent 50%)",
          }}
        />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-secondary/20 border border-secondary/40 text-secondary text-xs font-semibold px-3 py-1.5 rounded-full mb-4 font-body">
            <Globe className="h-3 w-3" />
            Worldwide Delivery
          </div>
          <h1 className="font-display text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
            Shipping Information
          </h1>
          <p className="font-body text-primary-foreground/75 text-lg max-w-xl mx-auto">
            We ship across Pakistan and internationally. All orders are
            carefully packed to ensure your items arrive in perfect condition.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 space-y-12">
        {/* How it Works */}
        <section data-ocid="shipping.process.section">
          <h2 className="font-display text-2xl font-bold text-foreground mb-6">
            How We Ship Your Order
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                icon: <Package className="h-7 w-7 text-secondary" />,
                step: "1",
                title: "Order Confirmed",
                desc: "We verify and pack your order within 1–2 business days.",
              },
              {
                icon: <Truck className="h-7 w-7 text-secondary" />,
                step: "2",
                title: "Dispatched",
                desc: "Your parcel is handed to our courier partner and tracking details are shared.",
              },
              {
                icon: <CheckCircle className="h-7 w-7 text-secondary" />,
                step: "3",
                title: "Delivered",
                desc: "Your order arrives at your doorstep within the estimated window.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="bg-card border border-border rounded-xl p-5 flex flex-col items-center text-center gap-3"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                  {item.icon}
                </div>
                <Badge className="bg-secondary/20 text-secondary border-0 text-xs font-bold">
                  Step {item.step}
                </Badge>
                <h3 className="font-display font-bold text-foreground">
                  {item.title}
                </h3>
                <p className="font-body text-muted-foreground text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Domestic Shipping */}
        <section data-ocid="shipping.domestic.section">
          <div className="flex items-center gap-3 mb-5">
            <Truck className="h-6 w-6 text-primary" />
            <h2 className="font-display text-2xl font-bold text-foreground">
              Pakistan Domestic Shipping
            </h2>
          </div>
          <div className="overflow-hidden rounded-xl border border-border">
            <table
              className="w-full text-sm"
              data-ocid="shipping.domestic.table"
            >
              <thead className="bg-primary text-primary-foreground">
                <tr>
                  <th className="text-left font-body font-semibold px-5 py-3">
                    Region
                  </th>
                  <th className="text-left font-body font-semibold px-5 py-3">
                    Delivery Time
                  </th>
                  <th className="text-left font-body font-semibold px-5 py-3">
                    Shipping Cost
                  </th>
                </tr>
              </thead>
              <tbody>
                {DOMESTIC_ZONES.map((zone, i) => (
                  <tr
                    key={zone.region}
                    className={i % 2 === 0 ? "bg-card" : "bg-accent/30"}
                  >
                    <td className="font-body text-foreground px-5 py-3">
                      {zone.region}
                    </td>
                    <td className="font-body text-muted-foreground px-5 py-3">
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 text-secondary flex-shrink-0" />
                        {zone.time}
                      </span>
                    </td>
                    <td className="font-display font-semibold text-primary px-5 py-3">
                      {zone.cost}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="font-body text-muted-foreground text-xs mt-2">
            * Free shipping on orders above PKR 5,000 within Pakistan.
          </p>
        </section>

        {/* International Shipping */}
        <section data-ocid="shipping.international.section">
          <div className="flex items-center gap-3 mb-5">
            <Globe className="h-6 w-6 text-primary" />
            <h2 className="font-display text-2xl font-bold text-foreground">
              International Shipping
            </h2>
          </div>
          <p className="font-body text-muted-foreground mb-4 text-sm leading-relaxed">
            ARSAM Fabrics & Textiles ships worldwide. We use trusted
            international couriers (TCS, DHL, FedEx) to ensure safe and timely
            delivery.
          </p>
          <div className="overflow-hidden rounded-xl border border-border">
            <table
              className="w-full text-sm"
              data-ocid="shipping.international.table"
            >
              <thead className="bg-primary text-primary-foreground">
                <tr>
                  <th className="text-left font-body font-semibold px-5 py-3">
                    Destination
                  </th>
                  <th className="text-left font-body font-semibold px-5 py-3">
                    Estimated Time
                  </th>
                  <th className="text-left font-body font-semibold px-5 py-3">
                    Shipping Cost
                  </th>
                </tr>
              </thead>
              <tbody>
                {INTERNATIONAL_ZONES.map((zone, i) => (
                  <tr
                    key={zone.region}
                    className={i % 2 === 0 ? "bg-card" : "bg-accent/30"}
                  >
                    <td className="font-body text-foreground px-5 py-3">
                      {zone.region}
                    </td>
                    <td className="font-body text-muted-foreground px-5 py-3">
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 text-secondary flex-shrink-0" />
                        {zone.time}
                      </span>
                    </td>
                    <td className="font-display font-semibold text-primary px-5 py-3">
                      {zone.cost}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="font-body text-muted-foreground text-xs mt-2">
            * Customs duties and import taxes are the responsibility of the
            buyer.
          </p>
        </section>

        {/* Important Notes */}
        <section data-ocid="shipping.notes.section">
          <div className="bg-accent/40 border border-border rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="h-5 w-5 text-secondary" />
              <h2 className="font-display text-lg font-bold text-foreground">
                Important Notes
              </h2>
            </div>
            <ul className="space-y-2 font-body text-sm text-muted-foreground list-none">
              {[
                "Delivery times are estimates and may vary due to public holidays, weather, or courier delays.",
                "For custom-stitched or handmade orders, please allow an additional 7–14 days for preparation before dispatch.",
                "Order tracking numbers are shared via WhatsApp or email once dispatched.",
                "Fragile or high-value items are double-packed for extra protection.",
                "To inquire about a specific delivery region not listed, please contact us via the Contact page.",
              ].map((note) => (
                <li key={note} className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-secondary flex-shrink-0 mt-0.5" />
                  {note}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}
