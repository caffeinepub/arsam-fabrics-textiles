import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Check,
  Grid3X3,
  Loader2,
  MessageSquare,
  Package,
  RefreshCw,
  Shield,
  ShoppingBag,
  X,
} from "lucide-react";
import { useState } from "react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useAllContactMessages,
  useAllCustomOrders,
  useCategories,
  useFeaturedProducts,
  useIsAdmin,
  useUpdateOrderStatus,
} from "../hooks/useQueries";

const ORDER_STATUSES = [
  "pending",
  "confirmed",
  "in_progress",
  "completed",
  "cancelled",
];

function StatsCard({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  color: string;
}) {
  return (
    <div className="bg-card border border-border rounded-xl p-5 flex items-center gap-4">
      <div
        className={`w-12 h-12 rounded-lg flex items-center justify-center ${color}`}
      >
        {icon}
      </div>
      <div>
        <p className="font-body text-muted-foreground text-sm">{label}</p>
        <p className="font-display font-bold text-foreground text-2xl">
          {value}
        </p>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const { login, loginStatus, identity } = useInternetIdentity();
  const isLoggedIn = loginStatus === "success" && !!identity;

  const { data: isAdmin, isLoading: adminLoading } = useIsAdmin();
  const { data: categories, isLoading: catsLoading } = useCategories();
  const { data: products, isLoading: prodsLoading } = useFeaturedProducts();
  const { data: orders, isLoading: ordersLoading } = useAllCustomOrders();
  const { data: messages, isLoading: msgsLoading } = useAllContactMessages();
  const { mutateAsync: updateStatus, isPending: updatingStatus } =
    useUpdateOrderStatus();

  const [activeTab, setActiveTab] = useState("overview");

  if (!isLoggedIn) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="bg-card border border-border rounded-2xl p-8 lg:p-12 text-center max-w-md w-full shadow-brand">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <h1 className="font-display text-2xl font-bold text-card-foreground mb-2">
            Admin Dashboard
          </h1>
          <p className="font-body text-muted-foreground mb-6">
            You must be signed in to access the admin dashboard. Please login
            with your Internet Identity.
          </p>
          <Button
            size="lg"
            onClick={() => login()}
            disabled={loginStatus === "logging-in"}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
            data-ocid="admin.login.button"
          >
            {loginStatus === "logging-in" ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Signing In...
              </>
            ) : (
              "Sign In to Continue"
            )}
          </Button>
        </div>
      </main>
    );
  }

  if (adminLoading) {
    return (
      <main
        className="min-h-screen bg-background py-12"
        data-ocid="admin.loading_state"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Skeleton className="h-10 w-48 mb-4" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-24 rounded-xl" />
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (!isAdmin) {
    return (
      <main
        className="min-h-screen bg-background flex items-center justify-center p-4"
        data-ocid="admin.unauthorized.panel"
      >
        <div className="bg-card border border-border rounded-2xl p-8 text-center max-w-md w-full">
          <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <X className="h-8 w-8 text-destructive" />
          </div>
          <h1 className="font-display text-xl font-bold text-card-foreground mb-2">
            Access Denied
          </h1>
          <p className="font-body text-muted-foreground mb-4">
            Your account does not have admin privileges. Contact the store owner
            to get access.
          </p>
          <p className="font-body text-xs text-muted-foreground bg-muted p-2 rounded font-mono">
            Principal: {identity?.getPrincipal().toString()}
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-primary py-8 lg:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Shield className="h-5 w-5 text-secondary" />
              <p className="font-body text-xs text-secondary font-semibold uppercase tracking-wider">
                Admin
              </p>
            </div>
            <h1 className="font-display text-2xl lg:text-3xl font-bold text-primary-foreground">
              Dashboard
            </h1>
            <p className="font-body text-primary-foreground/70 text-sm mt-1 font-mono">
              {identity?.getPrincipal().toString().slice(0, 25)}...
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-primary-foreground hover:bg-primary-foreground/10 gap-2"
            onClick={() => window.location.reload()}
            data-ocid="admin.refresh.button"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatsCard
            icon={<Grid3X3 className="h-6 w-6 text-primary-foreground" />}
            label="Categories"
            value={catsLoading ? "..." : (categories?.length ?? 0)}
            color="bg-primary"
          />
          <StatsCard
            icon={<Package className="h-6 w-6 text-secondary-foreground" />}
            label="Featured Products"
            value={prodsLoading ? "..." : (products?.length ?? 0)}
            color="bg-secondary"
          />
          <StatsCard
            icon={<ShoppingBag className="h-6 w-6 text-white" />}
            label="Custom Orders"
            value={ordersLoading ? "..." : (orders?.length ?? 0)}
            color="bg-blue-500"
          />
          <StatsCard
            icon={<MessageSquare className="h-6 w-6 text-white" />}
            label="Messages"
            value={msgsLoading ? "..." : (messages?.length ?? 0)}
            color="bg-purple-500"
          />
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6 bg-muted">
            <TabsTrigger value="overview" data-ocid="admin.overview.tab">
              Overview
            </TabsTrigger>
            <TabsTrigger value="orders" data-ocid="admin.orders.tab">
              Custom Orders
              {orders && orders.length > 0 && (
                <Badge className="ml-1.5 bg-primary text-primary-foreground text-xs px-1.5 py-0">
                  {orders.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="messages" data-ocid="admin.messages.tab">
              Messages
              {messages && messages.length > 0 && (
                <Badge className="ml-1.5 bg-primary text-primary-foreground text-xs px-1.5 py-0">
                  {messages.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="categories" data-ocid="admin.categories.tab">
              Categories
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" data-ocid="admin.overview.panel">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Orders */}
              <div className="bg-card border border-border rounded-xl p-5">
                <h3 className="font-display font-bold text-card-foreground text-lg mb-4 flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5 text-primary" />
                  Recent Custom Orders
                </h3>
                {ordersLoading ? (
                  <div className="space-y-2">
                    {[1, 2, 3].map((i) => (
                      <Skeleton key={i} className="h-12" />
                    ))}
                  </div>
                ) : orders && orders.length > 0 ? (
                  <div className="space-y-2">
                    {orders.slice(0, 5).map((order) => (
                      <div
                        key={order.id.toString()}
                        className="flex items-center justify-between p-3 bg-muted rounded-lg"
                      >
                        <div>
                          <p className="font-body font-semibold text-sm">
                            {order.customerName}
                          </p>
                          <p className="font-body text-xs text-muted-foreground">
                            {order.orderType}
                          </p>
                        </div>
                        <Badge
                          className={
                            order.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : order.status === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-blue-100 text-blue-800"
                          }
                        >
                          {order.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p
                    className="font-body text-muted-foreground text-sm"
                    data-ocid="admin.orders.empty_state"
                  >
                    No orders yet.
                  </p>
                )}
              </div>

              {/* Recent Messages */}
              <div className="bg-card border border-border rounded-xl p-5">
                <h3 className="font-display font-bold text-card-foreground text-lg mb-4 flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  Recent Messages
                </h3>
                {msgsLoading ? (
                  <div className="space-y-2">
                    {[1, 2, 3].map((i) => (
                      <Skeleton key={i} className="h-12" />
                    ))}
                  </div>
                ) : messages && messages.length > 0 ? (
                  <div className="space-y-2">
                    {messages.slice(0, 5).map((msg) => (
                      <div
                        key={msg.id.toString()}
                        className="p-3 bg-muted rounded-lg"
                      >
                        <div className="flex justify-between items-start">
                          <p className="font-body font-semibold text-sm">
                            {msg.name}
                          </p>
                          <span className="font-body text-xs text-muted-foreground">
                            {msg.email}
                          </span>
                        </div>
                        <p className="font-body text-xs text-muted-foreground mt-1 line-clamp-2">
                          {msg.message}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p
                    className="font-body text-muted-foreground text-sm"
                    data-ocid="admin.messages.empty_state"
                  >
                    No messages yet.
                  </p>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Custom Orders Tab */}
          <TabsContent value="orders" data-ocid="admin.orders.panel">
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="p-5 border-b border-border">
                <h3 className="font-display font-bold text-card-foreground text-lg">
                  Custom Order Requests
                </h3>
              </div>
              {ordersLoading ? (
                <div className="p-5 space-y-3">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-16" />
                  ))}
                </div>
              ) : !orders || orders.length === 0 ? (
                <div
                  className="p-10 text-center"
                  data-ocid="admin.orders_list.empty_state"
                >
                  <ShoppingBag className="h-10 w-10 text-muted-foreground/30 mx-auto mb-3" />
                  <p className="font-body text-muted-foreground">
                    No custom orders yet.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table data-ocid="admin.orders.table">
                    <TableHeader>
                      <TableRow>
                        <TableHead>Customer</TableHead>
                        <TableHead>Order Type</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orders.map((order, i) => (
                        <TableRow
                          key={order.id.toString()}
                          data-ocid={`admin.orders.row.${i + 1}`}
                        >
                          <TableCell className="font-body font-semibold">
                            {order.customerName}
                          </TableCell>
                          <TableCell className="font-body text-sm">
                            {order.orderType}
                          </TableCell>
                          <TableCell className="font-body text-sm">
                            {order.phone}
                          </TableCell>
                          <TableCell className="font-body text-sm">
                            {order.email || "—"}
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={
                                order.status === "completed"
                                  ? "bg-green-100 text-green-800"
                                  : order.status === "pending"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : order.status === "cancelled"
                                      ? "bg-red-100 text-red-800"
                                      : "bg-blue-100 text-blue-800"
                              }
                            >
                              {order.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Select
                              value={order.status}
                              onValueChange={async (status) => {
                                await updateStatus({ id: order.id, status });
                              }}
                              disabled={updatingStatus}
                            >
                              <SelectTrigger
                                className="w-36 h-7 text-xs"
                                data-ocid={`admin.orders.status.select.${i + 1}`}
                              >
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {ORDER_STATUSES.map((s) => (
                                  <SelectItem
                                    key={s}
                                    value={s}
                                    className="text-xs"
                                  >
                                    {s.replace("_", " ")}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages" data-ocid="admin.messages.panel">
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="p-5 border-b border-border">
                <h3 className="font-display font-bold text-card-foreground text-lg">
                  Contact Messages
                </h3>
              </div>
              {msgsLoading ? (
                <div className="p-5 space-y-3">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-20" />
                  ))}
                </div>
              ) : !messages || messages.length === 0 ? (
                <div
                  className="p-10 text-center"
                  data-ocid="admin.messages_list.empty_state"
                >
                  <MessageSquare className="h-10 w-10 text-muted-foreground/30 mx-auto mb-3" />
                  <p className="font-body text-muted-foreground">
                    No messages yet.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table data-ocid="admin.messages.table">
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Message</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {messages.map((msg, i) => (
                        <TableRow
                          key={msg.id.toString()}
                          data-ocid={`admin.messages.row.${i + 1}`}
                        >
                          <TableCell className="font-body font-semibold">
                            {msg.name}
                          </TableCell>
                          <TableCell className="font-body text-sm">
                            {msg.email}
                          </TableCell>
                          <TableCell className="font-body text-sm">
                            {msg.phone || "—"}
                          </TableCell>
                          <TableCell className="font-body text-sm max-w-xs">
                            <p className="line-clamp-2">{msg.message}</p>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Categories Tab */}
          <TabsContent value="categories" data-ocid="admin.categories.panel">
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="p-5 border-b border-border flex justify-between items-center">
                <h3 className="font-display font-bold text-card-foreground text-lg">
                  Categories
                </h3>
              </div>
              {catsLoading ? (
                <div className="p-5 space-y-3">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-16" />
                  ))}
                </div>
              ) : !categories || categories.length === 0 ? (
                <div
                  className="p-10 text-center"
                  data-ocid="admin.categories_list.empty_state"
                >
                  <Grid3X3 className="h-10 w-10 text-muted-foreground/30 mx-auto mb-3" />
                  <p className="font-body text-muted-foreground">
                    No categories in backend yet.
                  </p>
                  <p className="font-body text-muted-foreground text-sm mt-1">
                    Categories are shown from static data on the public pages.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table data-ocid="admin.categories.table">
                    <TableHeader>
                      <TableRow>
                        <TableHead>Image</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Sort Order</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {categories.map((cat, i) => (
                        <TableRow
                          key={cat.id.toString()}
                          data-ocid={`admin.categories.row.${i + 1}`}
                        >
                          <TableCell>
                            <div className="w-10 h-10 rounded overflow-hidden bg-muted">
                              <img
                                src={cat.imageUrl}
                                alt={cat.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </TableCell>
                          <TableCell className="font-body font-semibold">
                            {cat.name}
                          </TableCell>
                          <TableCell className="font-body text-sm max-w-xs">
                            <p className="line-clamp-2">{cat.description}</p>
                          </TableCell>
                          <TableCell className="font-body text-sm">
                            {cat.sortOrder.toString()}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
