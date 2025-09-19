import { useEffect, useState, useMemo } from "react";
import Header from "../../../components/Header/Header";
import Navbar from "../../../components/Navbar/Navbar";
import Categoria from "../../../components/Category/Category";
import Footer from "../../../components/Footer/Footer";
import ProductCard from "../../../components/Product/ProductCard";
import Pagination from "../../../components/Pagination/Pagination";
import { usePagination } from "../../shared/hooks/usePagination";
import { productService } from "../../../Services/productService";
import type { Product } from "../../domain/product";
import { useCart } from "../../../context/CartContext";

import styles from "./Home.module.css";

function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 4;

  const { cart, addItem } = useCart();

  // LLama productos y categorías del service
  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      try {
        const [productsData, categoriesData] = await Promise.all([
          productService.getProducts(),
          productService.getCategories(),
        ]);
        setProducts(productsData);
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
    if (search.length >= 3)
      results = results.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    if (selectedCategory) results = results.filter((p) => p.category === selectedCategory);
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
      <Navbar search={search} setSearch={setSearch} cartCount={cart.length} />

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
              <ProductCard
                key={product.id}
                product={product}
                onAdd={() =>
                  addItem({
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    thumbnail: product.thumbnail,
                    stock: product.stock,
                    quantity: 1,
                    description: product.description,
                    category: product.category,
                  })
                }
              />
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <Pagination currentPage={currentPage} totalPages={totalPages} goToPage={goToPage} />
        )}
      </div>
      <Footer />
    </div>
  );
}

export default HomePage;
