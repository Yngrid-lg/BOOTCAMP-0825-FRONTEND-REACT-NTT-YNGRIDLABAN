import { useLocalStorage } from "../shared/hooks/useLocalStorage";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import { ModulesRoutes } from "../../router/modules-routes";
import SearchBox from "../SearchBox/SearchBox";

interface NavbarProps {
  search: string;
  setSearch: (value: string) => void;
  cartCount: number;
}

function Navbar({ search, setSearch, cartCount }: NavbarProps) {
  const navigate = useNavigate();

 
  const [userFullName, setUserFullName] = useLocalStorage("userFullName", "");
  const [isLoggedIn, setIsLoggedIn] = useLocalStorage("isLoggedIn", false);

  // Función de logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("carrito");
    localStorage.removeItem("userFullName");
    localStorage.removeItem("isLoggedIn");

    setUserFullName("");
    setIsLoggedIn(false);

    navigate(ModulesRoutes.Login);
  };

  return (
    <nav className={styles.navbar}>
      {/* Saludo al usuario */}
      <div className={styles.user}>
        {isLoggedIn ? `Hola, ${userFullName}` : "No has iniciado sesión"}
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
      {isLoggedIn && (
        <button onClick={handleLogout} className={styles.logout}>
          Salir
        </button>
      )}
    </nav>
  );
}

export default Navbar;
