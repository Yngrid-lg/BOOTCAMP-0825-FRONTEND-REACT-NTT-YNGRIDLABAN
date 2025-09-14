import React from "react";

type Product = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
};

type AgregarProps = {
  product: Product;
};

function Agregar({ product }: AgregarProps) {
  const handleAddToCart = () => {
    // Obtener carrito actual de localStorage
    const storedCart = localStorage.getItem("carrito");
    let cart = storedCart ? JSON.parse(storedCart) : [];

    // Revisar si el producto ya está en el carrito
    const existingIndex = cart.findIndex((item: any) => item.id === product.id);

    if (existingIndex >= 0) {
      // Si existe, incrementar cantidad
      cart[existingIndex].quantity += 1;
    } else {
      // Si no existe, agregar con cantidad 1
      cart.push({ ...product, quantity: 1 });
    }

    // Guardar carrito actualizado en localStorage
    localStorage.setItem("carrito", JSON.stringify(cart));

    alert(`${product.title} agregado al carrito.`);
  };

  return (
    <button onClick={handleAddToCart} style={{ marginTop: "0.5rem", padding: "0.4rem 0.8rem", borderRadius: "5px", border: "none", backgroundColor: "#3498db", color: "white", cursor: "pointer" }}>
      Agregar
    </button>
  );
}

export default Agregar;
