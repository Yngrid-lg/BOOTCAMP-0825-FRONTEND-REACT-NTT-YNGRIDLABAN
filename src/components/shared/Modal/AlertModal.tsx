import React from 'react';
import styles from '../Modal/Alerta.module.css';

interface AlertModalProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

const AlertModal: React.FC<AlertModalProps> = ({ message, isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h5 className={styles.modalTitle}>Aviso</h5>
          <button className={styles.closeButton} onClick={onClose}>
            &times;
          </button>
        </div>
        <div className={styles.modalBody}>
          <p>{message}</p>
        </div>
        <div className={styles.modalFooter}>
          <button className={styles.okButton} onClick={onClose}>
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertModal;