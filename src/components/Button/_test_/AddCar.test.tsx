
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AddCar from "../AddCar";
import type { Product } from "../../../app/domain/product";

jest.mock("../../../context/CartContext", () => ({
    useCart: jest.fn(),
}));

import { useCart } from "../../../context/CartContext";

describe("AddCar component", () => {
    const mockAddItem = jest.fn();
    const mockOnAdd = jest.fn();

    const mockProduct: Product = {
        id: 1,
        title: "Laptop",
        description: "Laptop gamer",
        price: 1500,
        category: "Electrónica",
        stock: 5,
        thumbnail: "laptop.png",
    };

    beforeEach(() => {
        jest.clearAllMocks();
        (useCart as jest.Mock).mockReturnValue({
            cart: [],
            addItem: mockAddItem,
        });
    });

    test("agrega un producto al carrito cuando hay stock", () => {
        render(<AddCar product={mockProduct} onAdd={mockOnAdd} />);

        const button = screen.getByText(/Agregar al carrito/i);
        fireEvent.click(button);

        expect(mockAddItem).toHaveBeenCalledWith(mockProduct);
        expect(mockOnAdd).toHaveBeenCalled();
    });

    test("muestra modal si producto no tiene stock", () => {
        const outOfStockProduct = { ...mockProduct, stock: 0 };
        render(<AddCar product={outOfStockProduct} onAdd={mockOnAdd} />);

        const button = screen.getByText(/Agregar al carrito/i);
        fireEvent.click(button);


        expect(
            screen.getByText(/¡Producto sin stock!/i)
        ).toBeInTheDocument();

        expect(mockAddItem).not.toHaveBeenCalled();
    });


    test("muestra modal si ya alcanzó el stock máximo en el carrito", () => {
        (useCart as jest.Mock).mockReturnValue({
            cart: [{ id: mockProduct.id, quantity: mockProduct.stock }],
            addItem: mockAddItem,
        });

        render(<AddCar product={mockProduct} onAdd={mockOnAdd} />);

        const button = screen.getByText(/Agregar al carrito/i);
        fireEvent.click(button);

        expect(
            screen.getByText(/has alcanzado el stock máximo/i)
        ).toBeInTheDocument();

        expect(mockAddItem).not.toHaveBeenCalled();
    });
});
