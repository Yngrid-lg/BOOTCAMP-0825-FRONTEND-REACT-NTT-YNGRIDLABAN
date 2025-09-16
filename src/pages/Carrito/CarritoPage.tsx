import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { ModulesRoutes } from "../../router/modules-routes";

import styles from "./Carrito.module.css";

import Header from "../../components/Header/Header";

import Navbar from "../../components/Navbar/Navbar";

import Footer from "../../components/Footer/Footer";

import AlertModal from "../../components/shared/Modal/AlertModal";

import useForm from "../../components/shared/hooks/useForm";

import distritosData from "../../data/distritos.json";

import type { Product } from "../Home/HomePage";



type CartItem = {

  id: number;

  title: string;

  price: number;

  quantity: number;

  thumbnail: string;

};



interface FormData {

  nombre: string;

  apellido: string;

  distrito: string;

  direccion: string;

  referencia: string;

  celular: string;

}



function CarritoPage() {

  const navigate = useNavigate();

  const [cart, setCart] = useState<CartItem[]>([]);

  const [cartCount, setCartCount] = useState(0);

  const [modalVisible, setModalVisible] = useState(false);

  const [modalMessage, setModalMessage] = useState("");



  const { values, errors, handleChange, handleSubmit } = useForm<FormData>({

    initialValues: {

      nombre: "",

      apellido: "",

      distrito: "",

      direccion: "",

      referencia: "",

      celular: "",

    },

    validations: {

      nombre: (value) => {

        if (!/^[a-zA-Z\s]+$/.test(value)) {

          return "El nombre solo puede contener letras.";

        }

        return "";

      },

      apellido: (value) => {

        if (!/^[a-zA-Z\s]+$/.test(value)) {

          return "El apellido solo puede contener letras.";

        }

        return "";

      },

      distrito: (value) => (value === "" ? "El distrito es obligatorio." : ""),

      direccion: (value) => (value.trim() === "" ? "La dirección es obligatoria." : ""),

      celular: (value) => {

        if (!/^\d{9,}$/.test(value)) {

          return "El celular debe contener al menos 9 dígitos y solo números.";

        }

        return "";

      },

    },

    onSubmit: async () => {

      await validateStock();

    },

  });



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



  const validateStock = async () => {

    try {

      const productsRes = await fetch("https://dummyjson.com/products");

      const productsData = await productsRes.json();

      const apiProducts = productsData.products;



      for (const item of cart) {

        const productFromApi: Product | undefined = apiProducts.find((p: any) => p.id === item.id);

        if (productFromApi && item.quantity > productFromApi.stock) {

          setModalMessage(`Lo sentimos, el producto "${item.title}" tiene un stock limitado. Solo hay ${productFromApi.stock} unidades disponibles.`);

          setModalVisible(true);

          return; // Detiene el proceso si hay un problema de stock

        }

      }



      handlePurchase(); // Si todo el stock es válido, procede con la compra

    } catch (error) {

      console.error("Error al validar el stock:", error);

      setModalMessage("Ocurrió un error al validar el stock. Intenta de nuevo.");

      setModalVisible(true);

    }

  };



  const handlePurchase = () => {

    setModalMessage("¡Compra realizada con éxito 🎉!");

    setModalVisible(true);



    const userAndOrderData = {

      ...values,

      productos: cart,

    };



    console.log("Datos del pedido:", userAndOrderData);

    localStorage.removeItem("carrito");

    setCart([]);

    setCartCount(0);

    navigate(ModulesRoutes.HomePage);

  };



  return (

    <div className={styles.pageContainer}>

      <Header />

      <Navbar search="" setSearch={() => { }} cartCount={cartCount} />



      <div className={styles.mainContent}>

        <h2>Resumen de Compra</h2>

        {cart.length === 0 ? (

          <p>El carrito está vacío...</p>

        ) : (

          <>

            <table className={styles.cartTable}>

              <thead>

                <tr>

                  <th>Producto</th>

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

            <h3>Total: S/{total.toFixed(2)}</h3>

          </>

        )}



        {cart.length > 0 && (

          <div className={styles.checkoutForm}>

            <h3>Formulario de Envío</h3>

            <form onSubmit={handleSubmit} className={styles.Form}>

              <div className={styles.formGroup}>

                <label htmlFor="nombre">Nombre:</label>

                <input

                  type="text"

                  id="nombre"

                  name="nombre"

                  value={values.nombre}

                  onChange={handleChange}

                  className={errors.nombre ? styles.inputError : ""}

                />

                {errors.nombre && <span className={styles.errorText}>{errors.nombre}</span>}

              </div>

              <div className={styles.formGroup}>

                <label htmlFor="apellido">Apellido:</label>

                <input

                  type="text"

                  id="apellido"

                  name="apellido"

                  value={values.apellido}

                  onChange={handleChange}

                  className={errors.apellido ? styles.inputError : ""}

                />

                {errors.apellido && <span className={styles.errorText}>{errors.apellido}</span>}

              </div>

              <div className={styles.formGroup}>

                <label htmlFor="distrito">Distrito:</label>

                <select

                  id="distrito"

                  name="distrito"

                  value={values.distrito}

                  onChange={handleChange}

                  className={errors.distrito ? styles.inputError : ""}

                >

                  <option value="">Selecciona tu distrito</option>

                  {distritosData.map((distrito) => (

                    <option key={distrito.id} value={distrito.nombre}>

                      {distrito.nombre}

                    </option>

                  ))}

                </select>

                {errors.distrito && <span className={styles.errorText}>{errors.distrito}</span>}

              </div>

              <div className={styles.formGroup}>

                <label htmlFor="direccion">Dirección:</label>

                <input

                  type="text"

                  id="direccion"

                  name="direccion"

                  value={values.direccion}

                  onChange={handleChange}

                  className={errors.direccion ? styles.inputError : ""}

                />

                {errors.direccion && <span className={styles.errorText}>{errors.direccion}</span>}

              </div>

              <div className={styles.formGroup}>

                <label htmlFor="referencia">Referencia (Opcional):</label>

                <input

                  type="text"

                  id="referencia"

                  name="referencia"

                  value={values.referencia}

                  onChange={handleChange}

                />

              </div>

              <div className={styles.formGroup}>

                <label htmlFor="celular">Celular:</label>

                <input

                  type="tel"

                  id="celular"

                  name="celular"

                  value={values.celular}

                  onChange={handleChange}

                  className={errors.celular ? styles.inputError : ""}

                />

                {errors.celular && <span className={styles.errorText}>{errors.celular}</span>}

              </div>



              <button type="submit" className={styles.submitBtn}>

                Realizar Compra

              </button>

            </form>

          </div>

        )}

      </div>



      <AlertModal

        message={modalMessage}

        isVisible={modalVisible}

        onClose={() => setModalVisible(false)}

      />



      <Footer />

    </div>

  );

}



export default CarritoPage;