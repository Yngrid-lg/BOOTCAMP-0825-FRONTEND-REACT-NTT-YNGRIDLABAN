import React from "react";
import styles from "../SearchBox/Search.module.css";

interface SearchBoxProps {
  search: string;
  setSearch: (value: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ search, setSearch }) => {
  const handleClear = () => {
    setSearch("");
  };

  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        placeholder="Buscar productos..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={styles.search}
      />
      {search.length > 0 && (
        <button onClick={handleClear} className={styles.clearButton}>
          &times;
        </button>
      )}
    </div>
  );
};

export default SearchBox;
