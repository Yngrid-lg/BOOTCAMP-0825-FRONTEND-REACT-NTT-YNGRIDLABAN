import { useEffect, useState, useMemo } from "react";
import styles from "./Home.module.css";
import { usePagination } from "../../shared/hooks/usePagination";
import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";
import Agregar from "../../components/Button/Agregar";
import Categoria from "../../components/SearchBox/Categoria";
import Footer from "../../components/Footer/Footer";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  thumbnail: string;
  category: string;
  quantity?: number;
};

type ApiResponse = {
  products: Product[];
};

function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0);
  const itemsPerPage = 3;

  // Inicializar contador desde localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem("carrito");
    const cart = storedCart ? JSON.parse(storedCart) : [];
    const totalQuantity = cart.reduce(
      (sum: number, item: any) => sum + (item.quantity || 1),
      0
    );
    setCartCount(totalQuantity);
  }, []);

  // Función que se pasa a Agregar para actualizar contador
  const updateCartCount = () => {
    const storedCart = localStorage.getItem("carrito");
    const cart = storedCart ? JSON.parse(storedCart) : [];
    const totalQuantity = cart.reduce(
      (sum: number, item: any) => sum + (item.quantity || 1),
      0
    );
    setCartCount(totalQuantity);
  };

  // Traer productos desde API
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch("https://dummyjson.com/products");
        const data: ApiResponse = await res.json();
        setProducts(data.products);
        const uniqueCategories = [
          ...new Set(data.products.map((p) => p.category)),
        ];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Filtrado
  const filteredProducts = useMemo(() => {
    let results = products;
    if (search.length >= 3)
      results = results.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    if (selectedCategory)
      results = results.filter((p) => p.category === selectedCategory);
    return results;
  }, [products, search, selectedCategory]);

  // Paginación
  const { currentItems, currentPage, totalPages, goToPage } = usePagination(
    filteredProducts,
    itemsPerPage
  );
  useEffect(() => {
    goToPage(1);
  }, [filteredProducts]);

  return (
    <div className={styles.pageContainer}>
      <Header />
      <Navbar search={search} setSearch={setSearch} cartCount={cartCount} />

      <Categoria
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {loading ? (
        <p>Cargando productos...</p>
      ) : currentItems.length === 0 ? (
        <p>No se encontraron productos.</p>
      ) : (
        <div className={styles.productsGrid}>
          {currentItems.map((product) => (
            <div key={product.id} className={styles.productCard}>
              <img src={product.thumbnail} alt={product.title} />
              <h3>{product.title}</h3>
              <h5>{product.description}</h5>
              <h5>Categoría: {product.category}</h5>
              <h5>Precio: S/{product.price}</h5>
              <Agregar product={product} onAdd={updateCartCount} />
            </div>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            disabled={currentPage === 1}
            onClick={() => goToPage(currentPage - 1)}
          >
            {"<"} Anterior
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => goToPage(i + 1)}
              className={currentPage === i + 1 ? styles.active : ""}
            >
              {i + 1}
            </button>
          ))}
          <button
            disabled={currentPage === totalPages}
            onClick={() => goToPage(currentPage + 1)}
          >
            Siguiente {">"}
          </button>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default HomePage;
