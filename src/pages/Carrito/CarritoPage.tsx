import React, { useState, useEffect } from "react";
import styles from "../Carrito/Carrtito.module.css";
import Header from "../../components/Header/Header";


// Tipos de producto
type ProductCart = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  quantity: number;
};

// Tipo de formulario
type FormData = {
  nombre: string;
  apellido: string;
  distrito: string;
  direccion: string;
  referencia: string;
  celular: string;
};

const initialForm: FormData = {
  nombre: "",
  apellido: "",
  distrito: "",
  direccion: "",
  referencia: "",
  celular: "",
};

function CarritoPage() {
  const [cart, setCart] = useState<ProductCart[]>([]);
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [distritos, setDistritos] = useState<string[]>([]);

  // Cargar carrito desde localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem("carrito");
    if (storedCart) setCart(JSON.parse(storedCart));
  }, []);

  // Cargar distritos desde JSON (custom hook simulado)
  useEffect(() => {
    fetch("/distritos.json")
      .then((res) => res.json())
      .then((data) => setDistritos(data.distritos))
      .catch((err) => console.error("Error cargando distritos:", err));
  }, []);

  // Manejo de cambio en formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));

    // Validación inmediata
    let errorMsg = "";
    if (!value.trim()) errorMsg = "Campo obligatorio";
    if ((name === "nombre" || name === "apellido") && /\d/.test(value))
      errorMsg = "Debe ingresar un valor válido";
    if (name === "celular" && !/^\d{6,15}$/.test(value))
      errorMsg = "Debe ingresar un número válido";

    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  // Manejo de compra
  const handleComprar = () => {
    const newErrors: { [key: string]: string } = {};

    // Validar todos los campos
    Object.entries(form).forEach(([key, value]) => {
      if (!value.trim()) newErrors[key] = "Campo obligatorio";
    });

    // Validar nombre/apellido
    if (form.nombre && /\d/.test(form.nombre)) newErrors.nombre = "Debe ingresar un valor válido";
    if (form.apellido && /\d/.test(form.apellido)) newErrors.apellido = "Debe ingresar un valor válido";

    // Validar celular
    if (form.celular && !/^\d{6,15}$/.test(form.celular)) newErrors.celular = "Debe ingresar un número válido";

    setErrors(newErrors);

    // Si hay errores, no continuar
    if (Object.keys(newErrors).length > 0) return;

    // Mostrar alerta de éxito
    alert("Compra registrada con éxito!\n" + JSON.stringify(form, null, 2));

    // Limpiar carrito y formulario, redirigir al Home
    localStorage.removeItem("carrito");
    setCart([]);
    setForm(initialForm);
    window.location.href = "/"; // redirige a HomePage
  };

  // Calcular total
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
       <div className={styles.pageContainer}>
      <h1>🛒 Resumen del Carrito</h1>

      {cart.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <table className={styles.cartTable}>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item.id}>
                <td>
                  <img src={item.thumbnail} alt={item.title} className={styles.thumbnail} />
                  {item.title}
                </td>
                <td>${item.price.toFixed(2)}</td>
                <td>{item.quantity}</td>
                <td>${(item.price * item.quantity).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {cart.length > 0 && (
        <>
          <h2>Total: ${total.toFixed(2)}</h2>

          {/* Formulario de envío */}
          <div className={styles.formContainer}>
            <h3>Formulario de Envío</h3>
            <input
              type="text"
              placeholder="Nombre"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
            />
            {errors.nombre && <span className={styles.error}>{errors.nombre}</span>}

            <input
              type="text"
              placeholder="Apellido"
              name="apellido"
              value={form.apellido}
              onChange={handleChange}
            />
            {errors.apellido && <span className={styles.error}>{errors.apellido}</span>}

            <select name="distrito" value={form.distrito} onChange={handleChange}>
              <option value="">Selecciona tu distrito</option>
              {distritos.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
            {errors.distrito && <span className={styles.error}>{errors.distrito}</span>}

            <input
              type="text"
              placeholder="Dirección"
              name="direccion"
              value={form.direccion}
              onChange={handleChange}
            />
            {errors.direccion && <span className={styles.error}>{errors.direccion}</span>}

            <input
              type="text"
              placeholder="Referencia"
              name="referencia"
              value={form.referencia}
              onChange={handleChange}
            />
            {errors.referencia && <span className={styles.error}>{errors.referencia}</span>}

            <input
              type="text"
              placeholder="Celular"
              name="celular"
              value={form.celular}
              onChange={handleChange}
            />
            {errors.celular && <span className={styles.error}>{errors.celular}</span>}

            <button onClick={handleComprar} className={styles.checkoutBtn}>
              Comprar
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default CarritoPage;
