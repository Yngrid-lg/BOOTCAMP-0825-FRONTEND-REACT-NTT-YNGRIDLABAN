import React from "react";
import styles from "../Button/Agregar.module.css";

type Product = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
};

type AgregarProps = {
  product: Product;
  onAdd: () => void; // función para actualizar el contador
};

function Agregar({ product, onAdd }: AgregarProps) {
  const handleAddToCart = () => {
    const storedCart = localStorage.getItem("carrito");
    let cart = storedCart ? JSON.parse(storedCart) : [];

    const existingIndex = cart.findIndex((item: any) => item.id === product.id);
    if (existingIndex >= 0) {
      cart[existingIndex].quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("carrito", JSON.stringify(cart));

    // Actualizar contador en tiempo real
    onAdd();
  };

  return (
    <button onClick={handleAddToCart} className={styles.button}>
      Agregar al carrito
    </button>
  );
}

export default Agregar;
