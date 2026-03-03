import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  Category,
  ContactMessage,
  CustomOrderRequest,
  Product,
} from "../backend.d";
import { useActor } from "./useActor";

export function useCategories() {
  const { actor, isFetching } = useActor();
  return useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllCategories();
    },
    enabled: !!actor && !isFetching,
    staleTime: 5 * 60 * 1000,
  });
}

export function useProductsByCategory(categoryId: bigint | undefined) {
  const { actor, isFetching } = useActor();
  return useQuery<Product[]>({
    queryKey: ["products", "category", categoryId?.toString()],
    queryFn: async () => {
      if (!actor || categoryId === undefined) return [];
      return actor.getProductsByCategory(categoryId);
    },
    enabled: !!actor && !isFetching && categoryId !== undefined,
  });
}

export function useFeaturedProducts() {
  const { actor, isFetching } = useActor();
  return useQuery<Product[]>({
    queryKey: ["products", "featured"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getFeaturedProducts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useProduct(id: bigint | undefined) {
  const { actor, isFetching } = useActor();
  return useQuery<Product | null>({
    queryKey: ["product", id?.toString()],
    queryFn: async () => {
      if (!actor || id === undefined) return null;
      return actor.getProductById(id);
    },
    enabled: !!actor && !isFetching && id !== undefined,
  });
}

export function useSearchProducts(term: string) {
  const { actor, isFetching } = useActor();
  return useQuery<Product[]>({
    queryKey: ["search", term],
    queryFn: async () => {
      if (!actor || !term.trim()) return [];
      return actor.searchProducts(term);
    },
    enabled: !!actor && !isFetching && term.trim().length > 0,
  });
}

export function useIsAdmin() {
  const { actor, isFetching } = useActor();
  return useQuery<boolean>({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAllCustomOrders() {
  const { actor, isFetching } = useActor();
  return useQuery<CustomOrderRequest[]>({
    queryKey: ["customOrders"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllCustomOrders();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAllContactMessages() {
  const { actor, isFetching } = useActor();
  return useQuery<ContactMessage[]>({
    queryKey: ["contactMessages"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllContactMessages();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAllProducts() {
  const { actor, isFetching } = useActor();
  return useQuery<Product[]>({
    queryKey: ["products", "all"],
    queryFn: async () => {
      if (!actor) return [];
      // Get products from all categories by fetching featured + searching
      return actor.getFeaturedProducts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitContact() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({
      name,
      email,
      phone,
      message,
    }: {
      name: string;
      email: string;
      phone: string;
      message: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitContactMessage(name, email, phone, message);
    },
  });
}

export function useSubmitCustomOrder() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({
      customerName,
      phone,
      email,
      description,
      orderType,
    }: {
      customerName: string;
      phone: string;
      email: string;
      description: string;
      orderType: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitCustomOrder(
        customerName,
        phone,
        email,
        description,
        orderType,
      );
    },
  });
}

export function useUpdateOrderStatus() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }: { id: bigint; status: string }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateOrderStatus(id, status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customOrders"] });
    },
  });
}

export function useCreateCategory() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      name,
      description,
      imageUrl,
      sortOrder,
    }: {
      name: string;
      description: string;
      imageUrl: string;
      sortOrder: bigint;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.createCategory(name, description, imageUrl, sortOrder);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}

export function useCreateProduct() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      name,
      description,
      categoryId,
      price,
      imageUrl,
      inStock,
      isFeatured,
    }: {
      name: string;
      description: string;
      categoryId: bigint;
      price: number;
      imageUrl: string;
      inStock: boolean;
      isFeatured: boolean;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.createProduct(
        name,
        description,
        categoryId,
        price,
        imageUrl,
        inStock,
        isFeatured,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

export function useDeleteProduct() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteProduct(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}
