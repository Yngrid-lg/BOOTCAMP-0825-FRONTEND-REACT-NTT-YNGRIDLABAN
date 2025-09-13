import { useForm } from 'react-hook-form'
import styles from "./Form.module.css"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type FormData = {
  usuario: string;
  contraseña: string;
};

function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [errorMessage, setErrorMessage] = useState("");
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
      console.log("Usuario logueado:", dataApi);

      // Guardar usuario en localStorage
      localStorage.setItem("user", JSON.stringify(dataApi));

      // Redirigir al Home
      navigate("/home");
    } catch (err) {
      setErrorMessage("Algo salió mal, inténtelo más tarde");
    }
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
          {...register("usuario", { required: true, minLength: 2 })}
        />
        {errors.usuario && <span>Es necesario ingresar esta información</span>}

        {/* contraseña */}
        <label htmlFor="contraseña" className={styles.label}>Contraseña</label>
        <input
          type="password"
          className={styles.input}
          placeholder="Ingresa tu contraseña"
          {...register("contraseña", { required: true })}
        />
        {errors.contraseña && <span>Es necesario ingresar esta información</span>}

        <button type="submit" className={styles.button}>
          Iniciar Sesión
        </button>

        {/* olvidé contraseña */}
        <button
          type="button"
          className={styles.link}
          onClick={() => alert("¿Deseas cambiar la contraseña?")}
        >
          Olvidé Contraseña
        </button>
      </form>
    </div>
  );
}

export default LoginPage
