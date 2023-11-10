"use client";

import React, { createContext, useContext, useState } from "react";

interface ISearchContext {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const searchContextDefaultValues: ISearchContext = {
  searchTerm: "",
  setSearchTerm: () => {},
};

const SearchContext = createContext<ISearchContext>(searchContextDefaultValues);

export const useSearch = () => useContext(SearchContext);

interface SearchContextProps {
  children: React.ReactNode;
}

export const SearchProvider: React.FC<SearchContextProps> = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
      {children}
    </SearchContext.Provider>
  );
};
