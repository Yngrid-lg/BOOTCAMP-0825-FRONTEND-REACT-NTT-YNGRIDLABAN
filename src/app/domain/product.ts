
export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    thumbnail: string;
    category: string;
    stock: number;
    quantity?: number;
}

export interface ProductResponse {
    products: Product[];
}
