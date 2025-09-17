import React from "react";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p>© 2025 My Market. Todos los derechos reservados.</p>
        <div className={styles.links}>
          <a>Sobre Nosotros</a>
          <a>Contacto</a>
          <a>Términos y Condiciones</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
