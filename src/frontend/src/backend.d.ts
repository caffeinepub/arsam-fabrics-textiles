import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Category {
    id: bigint;
    sortOrder: bigint;
    name: string;
    description: string;
    imageUrl: string;
}
export interface ContactMessage {
    id: bigint;
    name: string;
    createdAt: bigint;
    email: string;
    message: string;
    phone: string;
}
export interface CustomOrderRequest {
    id: bigint;
    customerName: string;
    status: string;
    createdAt: bigint;
    description: string;
    orderType: string;
    email: string;
    phone: string;
}
export interface UserProfile {
    name: string;
}
export interface Product {
    id: bigint;
    categoryId: bigint;
    inStock: boolean;
    name: string;
    createdAt: bigint;
    description: string;
    imageUrl: string;
    isFeatured: boolean;
    price: number;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createCategory(name: string, description: string, imageUrl: string, sortOrder: bigint): Promise<bigint>;
    createProduct(name: string, description: string, categoryId: bigint, price: number, imageUrl: string, inStock: boolean, isFeatured: boolean): Promise<bigint>;
    deleteCategory(id: bigint): Promise<void>;
    deleteProduct(id: bigint): Promise<void>;
    getAllCategories(): Promise<Array<Category>>;
    getAllContactMessages(): Promise<Array<ContactMessage>>;
    getAllCustomOrders(): Promise<Array<CustomOrderRequest>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getFeaturedProducts(): Promise<Array<Product>>;
    getProductById(id: bigint): Promise<Product | null>;
    getProductsByCategory(categoryId: bigint): Promise<Array<Product>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    searchProducts(term: string): Promise<Array<Product>>;
    submitContactMessage(name: string, email: string, phone: string, message: string): Promise<bigint>;
    submitCustomOrder(customerName: string, phone: string, email: string, description: string, orderType: string): Promise<bigint>;
    updateCategory(id: bigint, name: string, description: string, imageUrl: string, sortOrder: bigint): Promise<void>;
    updateOrderStatus(id: bigint, status: string): Promise<void>;
    updateProduct(id: bigint, name: string, description: string, categoryId: bigint, price: number, imageUrl: string, inStock: boolean, isFeatured: boolean): Promise<void>;
}
