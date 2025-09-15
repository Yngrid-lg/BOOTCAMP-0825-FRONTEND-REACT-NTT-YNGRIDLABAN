import { useEffect, useState, useMemo } from "react";
import styles from "./Home.module.css";
import { usePagination } from "../../shared/hooks/usePagination";
import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";
import Agregar from "../../components/Button/Agregar";


type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  thumbnail: string;
  category: string;
};

type ApiResponse = {
  products: Product[];
};

function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [loading, setLoading] = useState(true);

  const itemsPerPage = 3; // productos por página

  // Traer productos desde la API
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch("https://dummyjson.com/products");
        const data: ApiResponse = await res.json();
        setProducts(data.products);

        // Extraer categorías únicas
        const uniqueCategories = [...new Set(data.products.map((p) => p.category))];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error al traer productos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filtrado de productos con useMemo para optimizar
  const filteredProducts = useMemo(() => {
    let results = products;

    if (search.length >= 3) {
      results = results.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (selectedCategory) {
      results = results.filter((p) => p.category === selectedCategory);
    }

    return results;
  }, [products, search, selectedCategory]);

  // Paginación
  const { currentItems, currentPage, totalPages, goToPage } = usePagination(
    filteredProducts,
    itemsPerPage
  );

  // Reiniciar a la primera página si cambian filtros
  useEffect(() => {
    goToPage(1);
  }, [filteredProducts]);

  return (

    <div className={styles.pageContainer}>
      {/* Header con búsqueda */}
      <Header/>

      {/* Navbar con carrito y logout */}
      <Navbar/>

      {/* Categorías */}
      <div className={styles.categories}>
        <button
          className={!selectedCategory ? styles.active : ""}
          onClick={() => setSelectedCategory("")}
        >
          Todas
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={selectedCategory === cat ? styles.active : ""}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Lista de productos */}
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
              <strong>Categoría: {product.category}</strong>
              <strong>Precio: S/{product.price} un</strong>
              <Agregar product={product} />
              
            </div>
          ))}
        </div>
      )}

      {/* Paginación */}
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
    </div>
  );
}

export default HomePage;
