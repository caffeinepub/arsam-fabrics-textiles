import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LogOut, Menu, Search, ShoppingCart, User, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { Link, useNavigate } from "../lib/router-compat";
import CartSidebar from "./CartSidebar";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const { totalItems, setIsOpen: setCartOpen } = useCart();
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const navigate = useNavigate();

  const isLoggedIn = loginStatus === "success" && !!identity;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setSearchOpen(false);
      setMobileOpen(false);
    }
  };

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "Categories", to: "/categories" },
    { label: "About", to: "/about" },
    { label: "Contact", to: "/contact" },
    { label: "Custom Orders", to: "/custom-orders" },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-primary shadow-brand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link
              to="/"
              className="flex-shrink-0 flex items-center"
              data-ocid="nav.link"
            >
              <img
                src="/assets/generated/arsam-logo-transparent.dim_400x120.png"
                alt="ARSAM Fabrics & Textiles Ltd"
                className="h-10 lg:h-14 w-auto object-contain"
              />
            </Link>

            {/* Desktop Nav Links */}
            <nav
              className="hidden lg:flex items-center gap-1"
              aria-label="Main navigation"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="px-4 py-2 text-sm font-body font-semibold text-primary-foreground/90 hover:text-secondary transition-colors rounded-md hover:bg-primary-foreground/10"
                  data-ocid={`nav.${link.label.toLowerCase().replace(/\s+/g, "-")}.link`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {/* Desktop Search */}
              <div className="hidden md:block">
                {searchOpen ? (
                  <form
                    onSubmit={handleSearch}
                    className="flex items-center gap-2"
                  >
                    <Input
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search products..."
                      className="w-48 h-8 text-sm bg-white border-primary-foreground/30 text-foreground placeholder:text-muted-foreground"
                      autoFocus
                      data-ocid="nav.search_input"
                    />
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      onClick={() => setSearchOpen(false)}
                      className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/10"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </form>
                ) : (
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => setSearchOpen(true)}
                    className="text-primary-foreground hover:bg-primary-foreground/10"
                    aria-label="Search"
                    data-ocid="nav.search_input"
                  >
                    <Search className="h-5 w-5" />
                  </Button>
                )}
              </div>

              {/* Cart Button */}
              <Button
                size="icon"
                variant="ghost"
                className="relative text-primary-foreground hover:bg-primary-foreground/10"
                onClick={() => setCartOpen(true)}
                aria-label={`Cart (${totalItems} items)`}
                data-ocid="nav.cart.button"
              >
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-secondary text-secondary-foreground">
                    {totalItems}
                  </Badge>
                )}
              </Button>

              {/* Login/User Button */}
              {isLoggedIn ? (
                <div className="hidden md:flex items-center gap-2">
                  <Link to="/admin">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-primary-foreground hover:bg-primary-foreground/10 gap-1"
                      data-ocid="nav.admin.link"
                    >
                      <User className="h-4 w-4" />
                      <span className="text-xs">Admin</span>
                    </Button>
                  </Link>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => clear()}
                    className="text-primary-foreground hover:bg-primary-foreground/10 gap-1"
                    data-ocid="nav.logout.button"
                  >
                    <LogOut className="h-4 w-4" />
                    <span className="text-xs">Logout</span>
                  </Button>
                </div>
              ) : (
                <Button
                  size="sm"
                  onClick={() => login()}
                  disabled={loginStatus === "logging-in"}
                  className="hidden md:flex bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold text-xs"
                  data-ocid="nav.login.button"
                >
                  {loginStatus === "logging-in" ? "Signing in..." : "Sign In"}
                </Button>
              )}

              {/* Mobile Hamburger */}
              <Button
                size="icon"
                variant="ghost"
                className="lg:hidden text-primary-foreground hover:bg-primary-foreground/10"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Menu"
                data-ocid="nav.menu.button"
              >
                {mobileOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileOpen && (
            <div className="lg:hidden border-t border-primary-foreground/20 py-4">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="flex gap-2 mb-4">
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="flex-1 bg-white border-primary-foreground/30 text-foreground placeholder:text-muted-foreground"
                  data-ocid="nav.mobile.search_input"
                />
                <Button
                  type="submit"
                  size="icon"
                  className="bg-secondary text-secondary-foreground"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </form>

              {/* Mobile Nav Links */}
              <nav className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className="px-4 py-3 font-body font-semibold text-primary-foreground/90 hover:text-secondary hover:bg-primary-foreground/10 rounded-md transition-colors"
                    data-ocid={`nav.mobile.${link.label.toLowerCase().replace(/\s+/g, "-")}.link`}
                  >
                    {link.label}
                  </Link>
                ))}
                {isLoggedIn ? (
                  <>
                    <Link
                      to="/admin"
                      onClick={() => setMobileOpen(false)}
                      className="px-4 py-3 font-body font-semibold text-primary-foreground/90 hover:text-secondary hover:bg-primary-foreground/10 rounded-md transition-colors"
                      data-ocid="nav.mobile.admin.link"
                    >
                      Admin Dashboard
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        clear();
                        setMobileOpen(false);
                      }}
                      className="px-4 py-3 text-left font-body font-semibold text-primary-foreground/90 hover:text-secondary hover:bg-primary-foreground/10 rounded-md transition-colors"
                      data-ocid="nav.mobile.logout.button"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      login();
                      setMobileOpen(false);
                    }}
                    className="px-4 py-3 text-left font-body font-semibold text-secondary hover:bg-primary-foreground/10 rounded-md transition-colors"
                    data-ocid="nav.mobile.login.button"
                  >
                    Sign In
                  </button>
                )}
              </nav>
            </div>
          )}
        </div>
      </header>
      <CartSidebar />
    </>
  );
}
