import { useState } from "react";

import React from 'react'
import { Movie } from "../models/movie";

type State = {
    searchTerm: string;
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
    searchResults: Movie[];
    setSearchResults: React.Dispatch<React.SetStateAction<Movie[]>>;
}

type SearchProviderProps = {children: React.ReactNode}

const SearchContext = React.createContext<State | undefined>(undefined);

export const SearchProvider = ({children}: SearchProviderProps) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<Movie[]>([]);

    return <SearchContext.Provider value={{searchTerm, setSearchTerm, searchResults, setSearchResults}}>
        {children}
    </SearchContext.Provider>
}

export const useSearchState = () => {
    const context = React.useContext<State | undefined>(SearchContext);
    if (context === undefined) {
        throw new Error('useSearchState must be used within a SearchProvider');
    }
    return context
}