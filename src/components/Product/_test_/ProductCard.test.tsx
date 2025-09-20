import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ProductCard from "../ProductCard";
import type { Product } from "../../../app/domain/product";

jest.mock("../../Button/AddCar", () => {
    const React = require("react");
    return {
        __esModule: true,
        default: (props: { onAdd: () => void }) =>
            React.createElement(
                "button",
                { onClick: props.onAdd },
                "Agregar al carrito"
            ),
    };
});

describe("ProductCard", () => {
    const mockProduct: Product = {
        id: 1,
        title: "Laptop Gamer",
        description: "Potente laptop para juegos",
        price: 3500,
        category: "Electrónica",
        thumbnail: "laptop.jpg",
        stock: 5,
    };

    const mockOnAdd = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("debe renderizar todos los detalles del producto", () => {
        render(<ProductCard product={mockProduct} onAdd={mockOnAdd} />);

        expect(screen.getByText("Laptop Gamer")).toBeInTheDocument();
        expect(screen.getByText("Potente laptop para juegos")).toBeInTheDocument();
        expect(screen.getByText(/Categoría: Electrónica/)).toBeInTheDocument();
        expect(screen.getByText(/Precio: S\/3500/)).toBeInTheDocument();

        const img = screen.getByRole("img", { name: /Laptop Gamer/i });
        expect(img).toHaveAttribute("src", "laptop.jpg");

        expect(screen.getByRole("button", { name: /Agregar al carrito/i })).toBeInTheDocument();
    });

    it("debe llamar a onAdd cuando se hace clic en el botón", () => {
        render(<ProductCard product={mockProduct} onAdd={mockOnAdd} />);

        const button = screen.getByRole("button", { name: /Agregar al carrito/i });
        fireEvent.click(button);

        expect(mockOnAdd).toHaveBeenCalledTimes(1);
    });
});
