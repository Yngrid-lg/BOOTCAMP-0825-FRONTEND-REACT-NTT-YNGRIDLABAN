import React from "react";
import styles from "./Header.module.css";
import Categoria from "../Button/categoria";
import Search from "../Search/SearchBox";


type HeaderProps = {
  search: string;
  setSearch: (value: string) => void;
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
};

function Footer({
  search,
  setSearch,
  categories,
  selectedCategory,
  setSelectedCategory,
}: HeaderProps) {

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>🛒 MyMarket</h1>
      <div className={styles.logo}>
      </div>
      
      {/* Botón de categorías */}
      <Categoria
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* Buscador */}
      <div className={styles.search}>
        <Search search={search} setSearch={setSearch} />
      </div>


    </header>
  );
}

export default Footer;

