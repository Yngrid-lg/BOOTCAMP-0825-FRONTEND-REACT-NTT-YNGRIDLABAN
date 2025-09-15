import React from "react";
import styles from "./Categoria.module.css";

type Props = {
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
};

export default function Categories({ categories, selectedCategory, setSelectedCategory }: Props) {
  return (
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
          className={selectedCategory === cat ? styles.active : ""}
          onClick={() => setSelectedCategory(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
