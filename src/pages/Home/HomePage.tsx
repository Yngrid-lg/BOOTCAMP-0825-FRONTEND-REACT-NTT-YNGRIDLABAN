import { useEffect, useState } from "react";
import styles from "./Home.module.css";
import { usePagination } from "../../shared/hooks/usePagination";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  thumbnail: string;
};

function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const itemsPerPage = 4; //cantidad de productos por pagina
  const { currentItems, currentPage, totalPages, goToPage } = usePagination(
    products,
    itemsPerPage
  );

  // llamamos a la API de productos
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://dummyjson.com/products#products-all");
        const data = await res.json();
        setProducts(data.products); // data.products es el array real
      } catch (error) {
        console.error("Error al traer productos:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className={styles.pageContainer}>
      <h1>Productos</h1>

      <div className={styles.productsGrid}>
        {currentItems.map((product) => (
          <div key={product.id} className={styles.productCard}>
            <img src={product.thumbnail} alt={product.title} />
            <h3>{product.title}</h3>
            <p>{product.price} $</p>
            <p>{product.description}</p>
          </div>
        ))}
      </div>

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
            className={currentPage === i + 1 ? styles.activePage : ""}
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
    </div>
  );
}

export default HomePage;
