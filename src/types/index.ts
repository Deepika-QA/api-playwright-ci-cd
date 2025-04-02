export interface Order {
    id: string;
    productId: string;
    quantity: number;
    totalPrice: number;
    createdAt: Date;
}

export interface OrderRequest {
    productId: string;
    quantity: number;
}