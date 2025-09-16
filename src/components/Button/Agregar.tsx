import React, { useState } from "react";
import styles from "./Agregar.module.css";
import type { Product } from "../../pages/Home/HomePage"; 
import AlertModal from "../shared/Modal/AlertModal";

type AgregarProps = {
  product: Product;
  onAdd: () => void;
};

// Define a type for items in the cart
type CartItem = Product & {
  quantity: number;
};

function Agregar({ product, onAdd }: AgregarProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleAddToCart = () => {
    const storedCart = localStorage.getItem("carrito");
    // Ensure the cart is properly typed as an array of CartItem
    let cart: CartItem[] = storedCart ? JSON.parse(storedCart) : [];

    // Check if the product is out of stock
    if (product.stock === 0) {
      setModalMessage("¡Producto sin stock!");
      setModalVisible(true);
      return;
    }

    const existingItem = cart.find((item): item is CartItem => item.id === product.id);

    if (existingItem) {
      if (existingItem.quantity >= product.stock) {
        setModalMessage("No puedes agregar más de este producto, ¡has alcanzado el stock máximo!");
        setModalVisible(true);
        return;
      }
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("carrito", JSON.stringify(cart));
    onAdd();
  };

  return (
    <>
      <button onClick={handleAddToCart} className={styles.button}>
        Agregar al carrito
      </button>
      <AlertModal
        message={modalMessage}
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </>
  );
}

export default Agregar; 