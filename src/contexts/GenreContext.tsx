import React, { useState } from 'react';
import { Movie } from '../models/movie';

type State = {
    selectedGenres: string[];
    setSelectedGenres: React.Dispatch<React.SetStateAction<string[]>>;
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    movieResults: Movie[];
    setMovieResults: React.Dispatch<React.SetStateAction<Movie[]>>;
}

type GenreProviderProps = { children: React.ReactNode }

const GenreContext = React.createContext<State | undefined>(undefined);

export const GenreProvider = ({ children }: GenreProviderProps) => {
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [movieResults, setMovieResults] = useState<Movie[]>([]);

    return <GenreContext.Provider value={{ selectedGenres, setSelectedGenres, currentPage, setCurrentPage, movieResults, setMovieResults }}>
        {children}
    </GenreContext.Provider>
}

export const useGenreState = () => {
    const context = React.useContext<State | undefined>(GenreContext);
    if (context === undefined) {
        throw new Error('useGenreState must be used within a GenreProvider');
    }
    return context
}