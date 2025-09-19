import React, { useState } from "react";
import styles from "./AddCar.module.css";
import type { Product } from "../../app/domain/product";
import AlertModal from "../../app/shared/Modal/AlertModal";
import { useCart } from "../../context/CartContext";

type AddCarProps = {
  product: Product;
  onAdd: () => void;
};

function AddCar({ product, onAdd }: AddCarProps) {
  const { cart, addItem } = useCart();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleAddToCart = () => {
    const existingItem = cart.find(item => item.id === product.id);

    if (product.stock === 0) {
      setModalMessage("¡Producto sin stock!");
      setModalVisible(true);
      return;
    }

    if (existingItem && existingItem.quantity >= product.stock) {
      setModalMessage(
        "No puedes agregar más productos, ¡has alcanzado el stock máximo!"
      );
      setModalVisible(true);
      return;
    }

    addItem(product);
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
