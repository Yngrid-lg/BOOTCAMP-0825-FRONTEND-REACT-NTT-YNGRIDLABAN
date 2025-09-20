
import { render, screen, fireEvent } from "@testing-library/react";
import { CartProvider } from "../../../../context/provider/CartProvider";
import HomePage from "../HomePage";
import { MemoryRouter } from "react-router-dom"; // 
jest.mock("../../../../Services/productService", () => ({
  productService: {
    getProducts: jest.fn().mockResolvedValue([]),
    getCategories: jest.fn().mockResolvedValue([]),
  },
}));

describe("HomePage - Validación de búsqueda", () => {
  it("muestra mensaje cuando input tiene menos de 3 caracteres", async () => {
    render(
      <MemoryRouter>
        <CartProvider>
          <HomePage />
        </CartProvider>
      </MemoryRouter>
    );

    const searchInput = screen.getByPlaceholderText("Buscar productos...");
    fireEvent.change(searchInput, { target: { value: "ab" } });

    expect(
      await screen.findByText(/Debes ingresar al menos 3 caracteres/i)
    ).toBeInTheDocument();
  });

  it("no muestra mensaje cuando se escriben 3 o más caracteres", async () => {
    render(
      <MemoryRouter>
        <CartProvider>
          <HomePage />
        </CartProvider>
      </MemoryRouter>
    );

    const searchInput = screen.getByPlaceholderText("Buscar productos...");
    fireEvent.change(searchInput, { target: { value: "abc" } });

    expect(
      screen.queryByText(/Debes ingresar al menos 3 caracteres/i)
    ).not.toBeInTheDocument();
  });
});
