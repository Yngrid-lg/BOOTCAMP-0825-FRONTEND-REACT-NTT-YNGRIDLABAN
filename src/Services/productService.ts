import type { Product } from "../app/domain/product";

const productsApi = "https://dummyjson.com/products";

const getProducts = async (): Promise<Product[]> => {
    try {
        const response = await fetch(productsApi);
        if (!response.ok) throw new Error("Error al obtener productos");
        const data = await response.json();
        return data.products;
    } catch (error) {
        throw new Error("Products network error");
    }
};

const getProduct = async (id: number): Promise<Product> => {
    try {
        const response = await fetch(`${productsApi}/${id}`);
        if (!response.ok) throw new Error("Error al obtener el producto");
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error("Product network error");
    }
};

const getCategories = async (): Promise<string[]> => {
    try {
        const response = await fetch(`${productsApi}/category-list`);
        if (!response.ok) throw new Error("Error al obtener categorías");
        const data: string[] = await response.json(); return data;
    } catch (error) {
        throw new Error("Categories network error");
    }
};

export const productService = {
    getProducts,
    getProduct,
    getCategories,
};

