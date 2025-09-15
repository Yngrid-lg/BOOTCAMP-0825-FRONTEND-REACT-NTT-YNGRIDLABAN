import React from "react";
import styles from "../SearchBox/Search.module.css"

type SearchProps = {
  search: string;
  setSearch: (value: string) => void;
};

function SearchBox({ search, setSearch }: SearchProps) {
  
  
  return (
    <input
      type="text"
      placeholder="Buscar productos..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className={styles.search}
    />
  );
}

export default SearchBox;
