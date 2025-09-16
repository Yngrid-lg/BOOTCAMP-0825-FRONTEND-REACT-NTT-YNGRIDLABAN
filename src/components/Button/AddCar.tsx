import React, { useState } from "react";
import styles from "./AddCar.module.css";
import type { Product } from "../../pages/Home/HomePage"; 
import AlertModal from "../shared/Modal/AlertModal";

type AddCar = {
  product: Product;
  onAdd: () => void;
};

type CartItem = Product & {
  quantity: number;
};

function AddCar({ product, onAdd }: AddCar) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleAddToCart = () => {
    const storedCart = localStorage.getItem("carrito");
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
        setModalMessage("No puedes agregar más productos, ¡has alcanzado el stock máximo!");
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

export default AddCar;