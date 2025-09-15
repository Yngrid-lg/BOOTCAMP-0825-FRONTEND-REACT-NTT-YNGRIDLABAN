import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import { ModulesRoutes } from "../../router/modules-routes";

function Navbar() {
  const navigate = useNavigate();

  const user = localStorage.getItem("user");

  const handleLogout = () => {
    // Limpiar sesión
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("carrito");

    // Redirigir al login
    navigate(ModulesRoutes.Login);
  };

  return (
    <nav className={styles.navbar}>

      {/* Parte central: Links */}
      <div className={styles.links}>
        <Link to={ModulesRoutes.CarritoPage}>Carrito</Link>
      </div>

      {/* Parte derecha: Usuario + Logout */}
      <div className={styles.right}>
        {user && <span className={styles.user}>Hola, {user}</span>}
        <button onClick={handleLogout} className={styles.logout} aria-label="Cerrar sesión">
          Salir
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
