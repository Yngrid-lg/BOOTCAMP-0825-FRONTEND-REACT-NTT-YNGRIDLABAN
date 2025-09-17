import React from "react";
import styles from "./Category.module.css";

interface CategoriaProps {
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const Categoria: React.FC<CategoriaProps> = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <div className={styles.categoriaContainer}>
      {/* Botón "Todas las categorías" */}
      <button
        onClick={() => setSelectedCategory("")}
        className={`${styles.categoryButton} ${selectedCategory === "" ? styles.active : ""}`}
      >
        Todas las categorías
      </button>

      {/* Menú desplegable*/}
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className={styles.categorySelect}
      >
        <option value="">Selecciona una categoría</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Categoria;
