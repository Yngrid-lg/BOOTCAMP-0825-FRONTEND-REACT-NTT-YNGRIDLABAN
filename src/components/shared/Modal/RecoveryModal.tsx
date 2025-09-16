import React, { useState } from "react";
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

function RecoveryModal({ isVisible, onClose }: RecoveryModalProps) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<RecoveryData>();
  const [successMessage, setSuccessMessage] = useState("");
  // 🔹 Constante en lugar de un "número mágico"
  const MODAL_TIMEOUT_MS = 3000;

  const onRecover = handleSubmit((data) => {
    // Aquí iría tu llamada al servicio para enviar el correo
    setSuccessMessage(`Se envió un link de recuperación a ${data.email}`);
    setTimeout(() => {
      onClose();
      setSuccessMessage("");
      reset();
    }, MODAL_TIMEOUT_MS);
  });

  return (
    <Modal isVisible={isVisible} onClose={onClose}>
      <div className={styles.modalContainer}>
        <h3>Recuperar contraseña</h3>
        <form onSubmit={onRecover}>
          <label>Correo electrónico</label>
          <input
            type="email"
            placeholder="Ingresa tu correo"
            {...register("email", {
              required: "El correo es obligatorio",
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Ingresa un correo válido" }
            })}
          />
          {errors.email && <span className={styles.errorMessage}>{errors.email.message}</span>}
          <button type="submit" className={styles.button}>Enviar enlace</button>
          <button type="button" className={styles.linkButton} onClick={onClose}>Cancelar</button>
        </form>
        {successMessage && <p className={styles.successMessage}>{successMessage}</p>}
      </div>
    </Modal>
  );
}

export default RecoveryModal;