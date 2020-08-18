import React, { useState } from 'react';
import { Movie } from '../models/movie';
import { Genre } from '../models/genre';

type State = {
    selectedGenres: number[];
    setSelectedGenres: React.Dispatch<React.SetStateAction<number[]>>;
    genreList: Genre[] | undefined;
    setGenreList: React.Dispatch<React.SetStateAction<Genre[] | undefined>>;
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    movieResults: Movie[];
    setMovieResults: React.Dispatch<React.SetStateAction<Movie[]>>;
}

type GenreProviderProps = { children: React.ReactNode }

const GenreContext = React.createContext<State | undefined>(undefined);

export const GenreProvider = ({ children }: GenreProviderProps) => {
    const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [movieResults, setMovieResults] = useState<Movie[]>([]);
    const [genreList, setGenreList] = useState<Genre[] | undefined>(undefined);

    return <GenreContext.Provider value={{ selectedGenres, setSelectedGenres, currentPage, setCurrentPage, movieResults, setMovieResults, genreList, setGenreList }}>
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