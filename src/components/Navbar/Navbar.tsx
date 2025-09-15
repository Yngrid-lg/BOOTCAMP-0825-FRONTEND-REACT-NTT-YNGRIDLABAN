import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import { ModulesRoutes } from "../../router/modules-routes";
import SearchBox from "../SearchBox/SearchBox"

function Navbar({ search, setSearch }: { search: string; setSearch: (value: string) => void }) {
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

      {/*usuario*/}
      <div className={styles.user}>
        {user && <span>Hola, {user}</span>}
      </div>

      <div className={styles.search}>
        <SearchBox search={search} setSearch={setSearch} />
      </div>

      {/* Links */}
      <div className={styles.links}>
        <Link to={ModulesRoutes.HomePage}>Inicio</Link>
        <Link to={ModulesRoutes.CarritoPage}>Carrito</Link>
      </div>

      {/* Logout */}
      <button onClick={handleLogout} className={styles.logout} aria-label="Cerrar sesión">
        Salir
      </button>
    </nav>
  );
}

export default Navbar;
