import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import { ModulesRoutes } from "../../router/appRoutes";
import SearchBox from "../SearchBox/SearchBox";
import { AuthContext } from "../../context/AuthContext";

interface NavbarProps {
  search: string;
  setSearch: (value: string) => void;
  cartCount: number;
}

function Navbar({ search, setSearch, cartCount }: NavbarProps) {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout(); navigate(ModulesRoutes.Login);
  };

  return (
    <nav className={styles.navbar}>
      {/* Saludo al usuario */}
      <div className={styles.user}>
        {user ? `Hola, ${user}` : "No has iniciado sesión"}
      </div>

      {/* Barra de búsqueda */}
      <div className={styles.search}>
        <SearchBox search={search} setSearch={setSearch} />
      </div>

      {/* Enlaces de navegación */}
      <div className={styles.links}>
        <Link to={ModulesRoutes.HomePage}>Inicio</Link>
        <Link to={ModulesRoutes.CarritoPage}>🛒 Carrito ({cartCount})</Link>
      </div>

      {/* Botón de logout */}
      {user && (
        <button onClick={handleLogout} className={styles.logout}>
          Salir
        </button>
      )}
    </nav>
  );
}

export default Navbar;
