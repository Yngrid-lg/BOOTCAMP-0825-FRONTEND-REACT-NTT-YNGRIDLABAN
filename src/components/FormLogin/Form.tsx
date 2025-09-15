import { useForm } from "react-hook-form";
import { useState } from "react";
import styles from "./Form.module.css";

type FormData = { usuario: string; contraseña: string };
type RecoveryData = { email: string };

function Form() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const { register: registerRecovery, handleSubmit: handleRecovery, formState: { errors: recoveryErrors }, reset: resetRecovery } = useForm<RecoveryData>();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  // 🔹 Manejo del login
  const onSubmit = handleSubmit(async ({ usuario, contraseña }) => {
    if (!usuario.trim() || !contraseña.trim()) {
      setErrorMessage("No se permiten campos vacíos");
      return;
    }

    try {
      const res = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: usuario, password: contraseña }),
      });

      if (!res.ok) {
        setErrorMessage(res.status === 400 ? "Credenciales incorrectas" : "Algo salió mal");
        return;
      }

      const dataApi = await res.json();

      // 🔹 Guardamos siempre con JSON.stringify
      localStorage.setItem("userFullName", JSON.stringify(`${dataApi.firstName} ${dataApi.lastName}`));
      localStorage.setItem("token", JSON.stringify(dataApi.token));
      localStorage.setItem("isLoggedIn", JSON.stringify(true));

      window.location.reload(); // refresca para actualizar Navbar
    } catch {
      setErrorMessage("Algo salió mal, inténtelo más tarde");
    }
  });

  // 🔹 Recuperación de contraseña
  const onRecover = handleRecovery((data) => {
    setSuccessMessage(`Se envió un link de recuperación a ${data.email}`);
    setTimeout(() => {
      setShowModal(false);
      setSuccessMessage("");
      resetRecovery();
    }, 3000);
  });

  return (
    <div className={styles.PageContainer}>
      <form onSubmit={onSubmit} className={styles.formContainer}>
        <h2 className={styles.formTitle}>Inicia sesión</h2>
        <p className={styles.formSubtitle}>Bienvenido, por favor ingresa tus credenciales</p>

        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}

        <label>Usuario</label>
        <input placeholder="Ingresa tu usuario" {...register("usuario", { required: true })} />
        {errors.usuario && <span className={styles.errorMessage}>El usuario es obligatorio</span>}

        <label>Contraseña</label>
        <input type="password" placeholder="Ingresa tu contraseña" {...register("contraseña", { required: true })} />
        {errors.contraseña && <span className={styles.errorMessage}>La contraseña es obligatoria</span>}

        <button type="submit" className={styles.button}>Iniciar Sesión</button>

        <button type="button" className={styles.linkButton} onClick={() => setShowModal(true)}>Olvidé contraseña</button>
      </form>

      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>Recuperar contraseña</h3>
            <form onSubmit={onRecover}>
              <label>Correo electrónico</label>
              <input
                type="email"
                placeholder="Ingresa tu correo"
                {...registerRecovery("email", {
                  required: "El correo es obligatorio",
                  pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Ingresa un correo válido" }
                })}
              />
              {recoveryErrors.email && <span className={styles.errorMessage}>{recoveryErrors.email.message}</span>}

              <button type="submit" className={styles.button}>Enviar enlace</button>
              <button type="button" className={styles.linkButton} onClick={() => { resetRecovery(); setShowModal(false); }}>
                Cancelar
              </button>
            </form>
            {successMessage && <p className={styles.successMessage}>{successMessage}</p>}
          </div>
        </div>
      )}
    </div>
  );
}

export default Form;
