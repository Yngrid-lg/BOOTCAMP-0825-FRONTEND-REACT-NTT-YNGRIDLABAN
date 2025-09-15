import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ModulesRoutes } from "../../router/modules-routes";
import styles from "./Carrtito.module.css";
import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

type CartItem = {
  id: number;
  title: string;
  price: number;
  quantity: number;
  thumbnail: string; // Imagen del producto
};

function CarritoPage() {
  const navigate = useNavigate();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const storedCart = localStorage.getItem("carrito");
    const parsedCart: CartItem[] = storedCart ? JSON.parse(storedCart) : [];
    setCart(parsedCart);
    updateCartCount(parsedCart);
  }, []);

  const updateCartCount = (items: CartItem[]) => {
    const total = items.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(total);
  };

  const increaseQuantity = (id: number) => {
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
    localStorage.setItem("carrito", JSON.stringify(updatedCart));
    updateCartCount(updatedCart);
  };

  const decreaseQuantity = (id: number) => {
    const updatedCart = cart.map((item) =>
      item.id === id
        ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
        : item
    );
    setCart(updatedCart);
    localStorage.setItem("carrito", JSON.stringify(updatedCart));
    updateCartCount(updatedCart);
  };

  const removeItem = (id: number) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("carrito", JSON.stringify(updatedCart));
    updateCartCount(updatedCart);
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className={styles.pageContainer}>
      <Header />
      <Navbar search="" setSearch={() => {}} cartCount={cartCount} />

      <h2>Mi Carrito</h2>

      {cart.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <table className={styles.cartTable}>
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Cantidad</th>
              <th>Precio Unit.</th>
              <th>Eliminar</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item.id}>
                <td>
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className={styles.productImg}
                  />
                </td>
                <td>{item.title}</td>
                <td>
                  <button
                    className={styles.qtyBtn}
                    onClick={() => decreaseQuantity(item.id)}
                  >
                    -
                  </button>
                  <span className={styles.qtyNumber}>{item.quantity}</span>
                  <button
                    className={styles.qtyBtn}
                    onClick={() => increaseQuantity(item.id)}
                  >
                    +
                  </button>
                </td>
                <td>S/{item.price.toFixed(2)}</td>
                <td>
                  <button
                    className={styles.removeBtn}
                    onClick={() => removeItem(item.id)}
                  >
                    Eliminar
                  </button>
                </td>
                <td>S/{(item.price * item.quantity).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <h3>Total: S/{total.toFixed(2)}</h3>

      {/* Formulario de envío */}
      {cart.length > 0 && (
        <div className={styles.checkoutForm}>
          <h3>Formulario de Envío</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Pedido enviado correctamente!");
              localStorage.removeItem("carrito");
              setCart([]);
              setCartCount(0);
              navigate(ModulesRoutes.HomePage);
            }}
          >
            <div className={styles.formGroup}>
              <label>Nombre:</label>
              <input type="text" name="name" required />
            </div>
            <div className={styles.formGroup}>
              <label>Dirección:</label>
              <input type="text" name="address" required />
            </div>
            <div className={styles.formGroup}>
              <label>Ciudad:</label>
              <input type="text" name="city" required />
            </div>
            <div className={styles.formGroup}>
              <label>Código Postal:</label>
              <input type="text" name="zipcode" required />
            </div>
            <div className={styles.formGroup}>
              <label>Notas adicionales:</label>
              <textarea name="notes" rows={3}></textarea>
            </div>
            <button type="submit" className={styles.submitBtn}>
              Enviar Pedido
            </button>
          </form>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default CarritoPage;
