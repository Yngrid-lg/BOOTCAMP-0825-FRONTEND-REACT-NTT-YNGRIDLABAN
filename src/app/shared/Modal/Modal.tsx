import React from "react";
import type { ReactNode } from "react";
import styles from "./Modal.module.css";

interface ModalProps {
    isVisible: boolean;
    onClose: () => void;
    children: ReactNode;
}

function Modal({ isVisible, onClose, children }: ModalProps) {
    if (!isVisible) {
        return null;
    }

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
}

export default Modal;
