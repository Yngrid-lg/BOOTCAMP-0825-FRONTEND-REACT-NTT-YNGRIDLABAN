import { useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "./Modal";
import styles from "./Recovery.module.css";

interface RecoveryData {
  email: string;
}
interface RecoveryModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const RECOVERY_MODAL_TIMEOUT = 3000; // sin número mágico

function RecoveryModal({ isVisible, onClose }: RecoveryModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RecoveryData>();
  const [successMessage, setSuccessMessage] = useState("");

  const handleCloseModal = () => {
    reset();
    setSuccessMessage("");
    onClose();
  };

  const onRecover = handleSubmit((data) => {
    setSuccessMessage(`Se envió un link de recuperación a ${data.email}`);
    setTimeout(() => {
      onClose();
      setSuccessMessage("");
      reset();
    }, RECOVERY_MODAL_TIMEOUT);
  });

  return (
    <Modal isVisible={isVisible} onClose={onClose}>
      <div className={styles.modalContainer}>
        <h3>Recuperar contraseña</h3>
        <form onSubmit={onRecover}>
          <label>Correo electrónico</label>
          <input
            type="email"
            {...register("email", {
              required: "El correo es obligatorio",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Ingresa un correo válido",
              },
            })}
          />
          {errors.email && (
            <span className={styles.errorMessage}>{errors.email.message}</span>
          )}
          <button type="submit" className={styles.button}>
            Enviar enlace
          </button>
          <button type="button" className={styles.linkButton} onClick={handleCloseModal}>
            Cancelar
          </button>
        </form>
        {successMessage && (
          <p className={styles.successMessage}>{successMessage}</p>
        )}
      </div>
    </Modal>
  );
}

export default RecoveryModal;
