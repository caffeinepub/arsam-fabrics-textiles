import { Mail, MapPin, Phone } from "lucide-react";
import { SiFacebook, SiInstagram } from "react-icons/si";
import { Link } from "../lib/router-compat";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <img
              src="/assets/generated/arsam-logo-transparent.dim_400x120.png"
              alt="ARSAM Fabrics & Textiles Ltd"
              className="h-12 w-auto object-contain mb-4"
            />
            <p className="text-primary-foreground/75 text-sm leading-relaxed font-body">
              Born from a passion for quality Pakistani textiles. Sourcing
              directly from Pakistan's premier textile mills since 2020.
            </p>
            <div className="flex gap-3 mt-4">
              <a
                href="https://www.facebook.com/people/ARSAM-Fabrics-Textile-Pvt-Ltd/100066844298863/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-foreground/60 hover:text-secondary transition-colors"
                aria-label="Facebook"
              >
                <SiFacebook className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-foreground/60 hover:text-secondary transition-colors"
                aria-label="Instagram"
              >
                <SiInstagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-bold text-secondary mb-4 text-lg">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                { label: "Home", to: "/" },
                { label: "All Categories", to: "/categories" },
                { label: "About Us", to: "/about" },
                { label: "Contact Us", to: "/contact" },
                { label: "Custom Orders", to: "/custom-orders" },
                { label: "Shipping Info", to: "/shipping" },
                { label: "Payment Methods", to: "/payment-methods" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-primary-foreground/70 hover:text-secondary text-sm transition-colors font-body"
                    data-ocid={`footer.${link.label.toLowerCase().replace(/\s+/g, "-")}.link`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-display font-bold text-secondary mb-4 text-lg">
              Categories
            </h3>
            <ul className="space-y-2">
              {[
                { label: "Ladies Dress", id: "1" },
                { label: "Bridal Dress", id: "2" },
                { label: "Gents Suiting", id: "3" },
                { label: "Bed Sheets", id: "11" },
                { label: "Carpets & Rugs", id: "6" },
                { label: "Kids Garments", id: "5" },
              ].map((cat) => (
                <li key={cat.id}>
                  <Link
                    to={`/category/${cat.id}`}
                    className="text-primary-foreground/70 hover:text-secondary text-sm transition-colors font-body"
                    data-ocid="footer.category.link"
                  >
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-display font-bold text-secondary mb-4 text-lg">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-primary-foreground/70 text-sm font-body">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0 text-secondary" />
                <span>
                  ARSAM Fabrics & Textiles Ltd
                  <br />
                  Pakistan
                </span>
              </li>
              <li className="flex items-center gap-3 text-primary-foreground/70 text-sm font-body">
                <Phone className="h-4 w-4 flex-shrink-0 text-secondary" />
                <a
                  href="tel:+923004827509"
                  className="hover:text-secondary transition-colors"
                >
                  +92 300 4827509
                </a>
              </li>
              <li className="flex items-center gap-3 text-primary-foreground/70 text-sm font-body">
                <Mail className="h-4 w-4 flex-shrink-0 text-secondary" />
                <a
                  href="mailto:info@arsamfabrics.com"
                  className="hover:text-secondary transition-colors"
                >
                  info@arsamfabrics.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-primary-foreground/60 text-xs font-body">
            © {currentYear} ARSAM Fabrics & Textiles Ltd. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link
              to="/shipping"
              className="text-primary-foreground/60 hover:text-secondary text-xs font-body transition-colors"
              data-ocid="footer.shipping.link"
            >
              Shipping Info
            </Link>
            <Link
              to="/payment-methods"
              className="text-primary-foreground/60 hover:text-secondary text-xs font-body transition-colors"
              data-ocid="footer.payment.link"
            >
              Payment Methods
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
