import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Categoria from "../Category";

describe("Categoria component", () => {
    const categories = ["Electrónica", "Hogar", "Libros"];
    const setSelectedCategory = jest.fn();

    beforeEach(() => {
        setSelectedCategory.mockClear();
    });

    test("renderiza botón 'Todas las categorías'", () => {
        render(
            <Categoria
                categories={categories}
                selectedCategory=""
                setSelectedCategory={setSelectedCategory}
            />
        );

        expect(screen.getByText("Todas las categorías")).toBeInTheDocument();
    });

    test("renderiza las opciones de categorías en el select", () => {
        render(
            <Categoria
                categories={categories}
                selectedCategory=""
                setSelectedCategory={setSelectedCategory}
            />
        );

        categories.forEach((cat) => {
            expect(screen.getByText(cat)).toBeInTheDocument();
        });
    });

    test("cambia la categoría al seleccionar una opción", () => {
        render(
            <Categoria
                categories={categories}
                selectedCategory=""
                setSelectedCategory={setSelectedCategory}
            />
        );

        fireEvent.change(screen.getByRole("combobox"), {
            target: { value: "Hogar" },
        });

        expect(setSelectedCategory).toHaveBeenCalledWith("Hogar");
    });

    test("llama a setSelectedCategory con '' al hacer clic en 'Todas las categorías'", () => {
        render(
            <Categoria
                categories={categories}
                selectedCategory="Libros"
                setSelectedCategory={setSelectedCategory}
            />
        );

        fireEvent.click(screen.getByText("Todas las categorías"));

        expect(setSelectedCategory).toHaveBeenCalledWith("");
    });
});