import React, { useState } from "react";
import { useCart } from "../../../context/CartContext";
import styles from "./CartTable.module.css";
import AlertModal from "../../../app/shared/Modal/AlertModal";

const CartTable: React.FC = () => {
  const { cart, increaseQuantity, decreaseQuantity, removeItem, addItem } = useCart();
  const [stockModalVisible, setStockModalVisible] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleIncrease = (id: number) => {
    increaseQuantity(id, () => setStockModalVisible(true));
  };

  return (
    <div>
      <table className={styles.cartTable}>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Nombre</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Eliminar</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {cart.map(item => (
            <tr key={item.id}>
              <td>
                <img src={item.thumbnail} alt={item.title} className={styles.productImg} />
              </td>
              <td>{item.title}</td>
              <td>
                <button className={styles.qtyBtn} onClick={() => decreaseQuantity(item.id)}>-</button>
                <span className={styles.qtyNumber}>{item.quantity}</span>
                <button className={styles.qtyBtn} onClick={() => handleIncrease(item.id)}>+</button>
              </td>
              <td>S/ {item.price.toFixed(2)}</td>
              <td>
                <button className={styles.removeBtn} onClick={() => removeItem(item.id)}>Eliminar</button>
              </td>
              <td>S/ {(item.price * item.quantity).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Total: S/ {total.toFixed(2)}</h3>

      <AlertModal
        message="Has alcanzado el stock máximo de este producto"
        isVisible={stockModalVisible}
        onClose={() => setStockModalVisible(false)}
      />
    </div>
  );
};

export default CartTable;
