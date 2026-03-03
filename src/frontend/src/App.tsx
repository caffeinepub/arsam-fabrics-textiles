import { Toaster } from "@/components/ui/sonner";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { CartProvider } from "./context/CartContext";
import AboutPage from "./pages/AboutPage";
import AdminPage from "./pages/AdminPage";
import CategoriesPage from "./pages/CategoriesPage";
import CategoryPage from "./pages/CategoryPage";
import ContactPage from "./pages/ContactPage";
import CustomOrdersPage from "./pages/CustomOrdersPage";
import HomePage from "./pages/HomePage";
import PaymentMethodsPage from "./pages/PaymentMethodsPage";
import ProductPage from "./pages/ProductPage";
import SearchPage from "./pages/SearchPage";
import ShippingPage from "./pages/ShippingPage";

function WhatsAppButton() {
  const phoneNumber = "923004827509";
  const message = encodeURIComponent(
    "Hello! I'm interested in your products at ARSAM Fabrics & Textiles.",
  );
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      data-ocid="whatsapp.chat.button"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25D366] hover:bg-[#20b858] text-white rounded-full shadow-lg px-4 py-3 transition-all duration-200 hover:scale-105"
      aria-label="Chat on WhatsApp"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        className="w-6 h-6 fill-white"
        role="img"
        aria-label="WhatsApp"
      >
        <title>WhatsApp</title>
        <path d="M16 0C7.163 0 0 7.163 0 16c0 2.827.737 5.476 2.027 7.775L0 32l8.437-2.006A15.94 15.94 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333a13.28 13.28 0 0 1-6.773-1.854l-.486-.29-5.007 1.192 1.22-4.877-.318-.504A13.256 13.256 0 0 1 2.667 16C2.667 8.636 8.636 2.667 16 2.667S29.333 8.636 29.333 16 23.364 29.333 16 29.333zm7.267-9.92c-.397-.198-2.349-1.159-2.713-1.29-.364-.133-.63-.198-.895.198-.265.397-1.027 1.29-1.26 1.556-.232.265-.464.298-.861.099-.397-.198-1.677-.618-3.194-1.972-1.18-1.053-1.977-2.353-2.209-2.75-.232-.397-.025-.612.175-.81.179-.178.397-.464.596-.696.198-.232.265-.397.397-.662.133-.265.066-.497-.033-.696-.099-.198-.895-2.156-1.227-2.951-.323-.775-.65-.67-.895-.682-.232-.01-.497-.013-.762-.013-.265 0-.696.099-1.06.497-.364.397-1.39 1.358-1.39 3.315s1.423 3.844 1.62 4.109c.198.265 2.8 4.276 6.787 5.996.949.41 1.69.655 2.268.838.953.303 1.82.26 2.506.158.765-.114 2.349-.96 2.68-1.886.33-.927.33-1.72.232-1.886-.099-.165-.364-.265-.762-.463z" />
      </svg>
      <span className="font-semibold text-sm hidden sm:inline">
        Chat with us
      </span>
    </a>
  );
}

function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

function NotFoundPage() {
  return (
    <main className="min-h-[50vh] flex items-center justify-center">
      <div className="text-center">
        <h1 className="font-display text-4xl font-bold text-foreground mb-2">
          404
        </h1>
        <p className="font-body text-muted-foreground mb-4">Page not found</p>
        <a
          href="/"
          className="font-body text-primary hover:underline"
          data-ocid="notfound.home.link"
        >
          Go back home
        </a>
      </div>
    </main>
  );
}

// Root route with layout
const rootRoute = createRootRoute({
  component: RootLayout,
  notFoundComponent: NotFoundPage,
});

// Child routes
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const categoriesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/categories",
  component: CategoriesPage,
});

const categoryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/category/$id",
  component: CategoryPage,
});

const productRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/product/$id",
  component: ProductPage,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: AboutPage,
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact",
  component: ContactPage,
});

const customOrdersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/custom-orders",
  component: CustomOrdersPage,
});

const searchRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/search",
  component: SearchPage,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminPage,
});

const shippingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/shipping",
  component: ShippingPage,
});

const paymentMethodsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/payment-methods",
  component: PaymentMethodsPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  categoriesRoute,
  categoryRoute,
  productRoute,
  aboutRoute,
  contactRoute,
  customOrdersRoute,
  searchRoute,
  adminRoute,
  shippingRoute,
  paymentMethodsRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <CartProvider>
      <Toaster position="top-right" richColors />
      <RouterProvider router={router} />
    </CartProvider>
  );
}
