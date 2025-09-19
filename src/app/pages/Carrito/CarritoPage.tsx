import React from "react";
import { useNavigate } from "react-router-dom";
import { ModulesRoutes } from "../../../router/appRoutes";

import styles from "./Carrito.module.css";
import Header from "../../../components/Header/Header";
import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";
import AlertModal from "../../shared/Modal/AlertModal";

import { useCart } from "../../../context/CartContext";
import CartTable from "../../../components/Cart/CartTable/CartTable";
import FormCar from "../../../components/Cart/FormCar/FormCar";
import useForm from "../../shared/hooks/useForm";

import distritosData from "../../../data/distritos.json";
import type { FormCarData } from "../../domain/FormCarData";
import type { Product } from "../../domain/product";

function CarritoPage() {
  const navigate = useNavigate();
  const { cart, clearCart, addItem, increaseQuantity } = useCart();

  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalMessage, setModalMessage] = React.useState("");

  const [stockModalVisible, setStockModalVisible] = React.useState(false);
  const stockModalMessage = "Has alcanzado el stock máximo de este producto";

  const { values, errors, handleChange, handleSubmit } = useForm<FormCarData>({
    initialValues: {
      nombre: "",
      apellido: "",
      distrito: "",
      direccion: "",
      referencia: "",
      celular: "",
    },
    validations: {
      nombre: (value) =>
        !/^[a-zA-Z\s]+$/.test(value) ? "El nombre solo puede contener letras" : "",
      apellido: (value) =>
        !/^[a-zA-Z\s]+$/.test(value) ? "El apellido solo puede contener letras" : "",
      distrito: (value) => (value === "" ? "El distrito es obligatorio" : ""),
      direccion: (value) => (value.trim() === "" ? "La dirección es obligatoria" : ""),
      celular: (value) =>
        !/^\d{9,}$/.test(value) ? "El celular debe tener al menos 9 dígitos" : "",
    },
    onSubmit: () => handlePurchase(),
  });

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePurchase = () => {
    if (cart.length === 0) {
      setModalMessage("No hay productos en el carrito");
      setModalVisible(true);
      return;
    }

    const pedido = {
      ...values,
      productos: cart,
      total,
    };

    console.log("Pedido confirmado:", pedido);
    setModalMessage("¡Compra realizada con éxito 🎉!");
    setModalVisible(true);

    clearCart();
    setTimeout(() => navigate(ModulesRoutes.HomePage), 2000);
  };

  const handleIncrease = (id: number) => {
    increaseQuantity(id, () => setStockModalVisible(true));
  };

  const handleAdd = (product: Product) => {
    addItem(product, () => setStockModalVisible(true));
  };

  return (
    <div className={styles.pageContainer}>
      <Header />
      <Navbar search="" setSearch={() => { }} cartCount={cart.length} />

      <div className={styles.mainContent}>
        <h2>Resumen de compra</h2>

        {cart.length === 0 ? (
          <p>No hay productos en el carrito</p>
        ) : (
          <div className={styles.cartAndFormContainer}>
            {/* Tabla de productos */}
            <CartTable />

            {/* Formulario de envío */}
            <FormCar
              values={values}
              errors={errors}
              onChange={handleChange}
              onSubmit={handleSubmit}
              distritos={distritosData.map((d) => d.nombre)}
            />
          </div>
        )}
      </div>

      {/* Modal de compra */}
      <AlertModal
        message={modalMessage}
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
      />

      {/* Modal de stock máximo */}
      <AlertModal
        message={stockModalMessage}
        isVisible={stockModalVisible}
        onClose={() => setStockModalVisible(false)}
      />

      <Footer />
    </div>
  );
}

export default CarritoPage;
