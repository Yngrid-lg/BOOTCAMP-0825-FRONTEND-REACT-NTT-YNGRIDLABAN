import { useEffect, useState, useMemo } from "react";
import styles from "./Home.module.css";
import { usePagination } from "../../components/shared/hooks/usePagination";
import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";
import Categoria from "../../components/shared/Category/Category";
import Footer from "../../components/Footer/Footer";
import Add from "../../components/Button/AddCar";


export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  thumbnail: string;
  category: string;
  quantity?: number;
  stock: number;
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
  const itemsPerPage = 4;

  // Inicializar contador 
  useEffect(() => {
    const storedCart = localStorage.getItem("carrito");
    const cart = storedCart ? JSON.parse(storedCart) : [];
    const uniqueProductsCount = cart.length;
    setCartCount(uniqueProductsCount);
  }, []);


  const updateCartCount = () => {
    const storedCart = localStorage.getItem("carrito");
    const cart = storedCart ? JSON.parse(storedCart) : [];
    setCartCount(cart.length);
  };

  // LLama productos y categorías de las APIs 
  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          fetch("https://dummyjson.com/products"),
          fetch("https://dummyjson.com/products/category-list"),
        ]);

        const productsData: ApiResponse = await productsRes.json();
        const categoriesData: string[] = await categoriesRes.json();

        setProducts(productsData.products);
        setCategories(categoriesData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllData();
  }, []);

  // Filtrado de productos
  const filteredProducts = useMemo(() => {
    let results = products;
    if (search.length >= 3) /*se realizará la busqueda ingresando como minimo tres caracteres*/
      results = results.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    if (selectedCategory)
      results = results.filter((p) => p.category === selectedCategory);
    return results;
  }, [products, search, selectedCategory]);

  //paginación
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

      <div className={styles.mainContent}>
        <Categoria
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        {search.length > 0 && search.length < 3 && (
          <p className={styles.searchMessage}>
            Debes ingresar al menos 3 caracteres para buscar los productos
          </p>
        )}

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
                <Add product={product} onAdd={updateCartCount} />
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
      </div>

      <Footer />
    </div>
  );
}

export default HomePage;