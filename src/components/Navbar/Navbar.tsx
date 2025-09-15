import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import { ModulesRoutes } from "../../router/modules-routes";
import SearchBox from "../SearchBox/SearchBox";
import { useLocalStorage } from "../../shared/hooks/useLocalStorage";

interface NavbarProps {
  search: string;
  setSearch: (value: string) => void;
  cartCount: number;
}

function Navbar({ search, setSearch, cartCount }: NavbarProps) {
  const navigate = useNavigate();
  const [userFullName, setUserFullName] = useLocalStorage("userFullName", "");
  const [isLoggedIn, setIsLoggedIn] = useLocalStorage("isLoggedIn", false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userFullName");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("carrito");
    setUserFullName("");
    setIsLoggedIn(false);
    navigate(ModulesRoutes.Login);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.user}>
        {isLoggedIn ? `Hola, ${userFullName}` : "No has iniciado sesión"}
      </div>

      <div className={styles.search}>
        <SearchBox search={search} setSearch={setSearch} />
      </div>

      <div className={styles.links}>
        <Link to={ModulesRoutes.HomePage}>Inicio</Link>
        <Link to={ModulesRoutes.CarritoPage}>🛒 Carrito ({cartCount})</Link>
      </div>

      {isLoggedIn && (
        <button onClick={handleLogout} className={styles.logout}>
          Salir
        </button>
      )}
    </nav>
  );
}

export default Navbar;
