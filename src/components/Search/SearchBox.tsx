import React from "react";

type SearchProps = {
  search: string;
  setSearch: (value: string) => void;
};

function Search({ search, setSearch }: SearchProps) {
  return (
    <input
      type="text"
      placeholder="Buscar productos..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
}

export default Search;
