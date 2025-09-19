import { useForm } from "react-hook-form";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../Services/authService";
import { AuthContext } from "../../context/AuthContext";
import styles from "./Form.module.css";

type FormData = { username: string; password: string };

interface FormProps {
  onOpenRecovery: () => void;
  onLoginSuccess?: () => void;
}
function Form({ onOpenRecovery, onLoginSuccess }: FormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [errorMessage, setErrorMessage] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async ({ username, password }) => {
    if (!username.trim() || !password.trim()) {
      return setErrorMessage("No se permiten campos vacíos");
    }

    try {
      const data = await loginUser(username, password);

      const fullName = `${data.firstName} ${data.lastName}`;

      login(fullName, data.token, () => {
        if (onLoginSuccess) onLoginSuccess();
        navigate("/home");
      });

    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message || "Algo salió mal, inténtelo más tarde");
      }
    }
  });

  return (
    <div className={styles.PageContainer}>
      <form onSubmit={onSubmit} className={styles.formContainer}>
        <h2 className={styles.formTitle}>Inicia sesión</h2>
        <p className={styles.formSubtitle}>
          Bienvenido, por favor ingresa tus credenciales
        </p>

        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}

        <label>Usuario</label>
        <input
          placeholder="Ingresa tu usuario"
          {...register("username", { required: true })}
        />
        {errors.username && (
          <span className={styles.errorMessage}>El usuario es obligatorio</span>
        )}

        <label>Contraseña</label>
        <input
          type="password"
          placeholder="Ingresa tu contraseña"
          {...register("password", { required: true })}
        />
        {errors.password && (
          <span className={styles.errorMessage}>
            La contraseña es obligatoria
          </span>
        )}

        <button type="submit" className={styles.button}>
          Iniciar Sesión
        </button>

        <button
          type="button"
          className={styles.linkButton}
          onClick={onOpenRecovery}
        >
          Olvidé contraseña
        </button>
      </form>
    </div>
  );
}

export default Form;
