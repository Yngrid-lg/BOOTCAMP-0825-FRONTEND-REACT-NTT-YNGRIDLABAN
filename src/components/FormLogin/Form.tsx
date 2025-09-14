import { useForm } from 'react-hook-form'
import styles from "./Form.module.css"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ModulesRoutes } from "../../router/modules-routes";


type FormData = {
  usuario: string;
  contraseña: string;
};

type RecoveryData = {
  email: string;
};

function Form() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
   const { register: registerRecovery, handleSubmit: handleRecovery, formState: { errors: recoveryErrors } } = useForm<RecoveryData>(); 
   const [successMessage, setSuccessMessage] = useState("");

  
  const [errorMessage, setErrorMessage] = useState("");
  const [showModal, setShowModal] = useState(false); // para "Olvidé contraseña"
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    const { usuario, contraseña } = data;

    // Validación extra: no espacios en blanco
    if (!usuario.trim() || !contraseña.trim()) {
      setErrorMessage("No se permiten campos vacíos");
      return;
    }

    try {
      const res = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: usuario,
          password: contraseña,
        }),
      });

      if (!res.ok) {
        if (res.status === 400) {
          setErrorMessage("Credenciales incorrectas");
        } else {
          setErrorMessage("Algo salió mal, inténtelo más tarde");
        }
        return;
      }

      const dataApi = await res.json();
      console.log("Usuario logueado correctamente:", dataApi);

      // Guardar usuario en localStorage
      localStorage.setItem("token", dataApi.Token);
      localStorage.setItem("user", dataApi.username);

      // Redirigir al Home
      navigate(ModulesRoutes.HomePage);
    } catch (err) {
      setErrorMessage("Algo salió mal, inténtelo más tarde");
    }
  });

  // Recuperación de contraseña
  const onRecover = handleRecovery((data) => {
    console.log("Correo enviado para recuperar:", data.email);
    setSuccessMessage(`Se envió un link de recuperación a ${data.email}`);
    setTimeout(() => {
      setShowModal(false);
      setSuccessMessage("");
    }, 3000); // Cierra después de 3 segundos
  });


  return (
    <div className={styles.PageContainer}>
      <form onSubmit={onSubmit} className={styles.formContainer}>
        {errorMessage && (
          <p className={styles.error}>{errorMessage}</p>
        )}

        {/* usuario */}
        <label htmlFor="usuario" className={styles.label}>Usuario</label>
        <input
          type="text"
          className={styles.input}
          placeholder="Ingresa tu usuario"
          {...register("usuario", {
            required: "El usuario es obligatorio",
            minLength: { value: 2, message: "Mínimo 2 caracteres" }
          })}
        />
        {errors.usuario && <span>{errors.usuario.message}</span>}


        {/* contraseña */}
        <label htmlFor="contraseña" className={styles.label}>Contraseña</label>
        <input
          type="password"
          className={styles.input}
          placeholder="Ingresa tu contraseña"
          {...register("contraseña", { required: "La contraseña es obligatoria" })}
        />
        {errors.contraseña && <span>{errors.contraseña.message}</span>}


        <button type="submit" className={styles.button}>
          Iniciar Sesión
        </button>

        {/* olvidé contraseña */}
        <button
          type="button"
          className={styles.link}
          onClick={() => setShowModal(true)}
        >
          Olvidé Contraseña
        </button>
      </form>

      {/* Modal */}
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>Recuperar contraseña</h3>
             <form onSubmit={onRecover} className={styles.formContainer}>
              <label htmlFor="email" className={styles.label}>Correo electrónico</label>
              <input
                type="email"
                className={styles.input}
                placeholder="Ingresa tu correo"
                {...registerRecovery("email", { required: "El correo es obligatorio" })}
              />
              {recoveryErrors.email && <span>{recoveryErrors.email.message}</span>}

              <button type="submit" className={styles.button}>
                Enviar enlace
              </button>
              <button type="button" onClick={() => setShowModal(false)} className={styles.link}>
                Cancelar
              </button>
            </form>
            {successMessage && <p className={styles.success}>{successMessage}</p>}
          </div>
        </div>
      )}
    </div>
  );
}

export default Form;