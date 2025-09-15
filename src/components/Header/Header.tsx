import React from "react";
import styles from "./Header.module.css";
import Search from "../Search/SearchBox";


type HeaderProps = {
  search: string;
  setSearch: (value: string) => void;
};

function Header({
  search,
  setSearch,

}: HeaderProps) {

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>🛒 MyMarket</h1>
      <div className={styles.logo}>
      </div>
 

      {/* Buscador */}
      <div className={styles.search}>
        <Search search={search} setSearch={setSearch} />
      </div>


    </header>
  );
}

export default Header;

