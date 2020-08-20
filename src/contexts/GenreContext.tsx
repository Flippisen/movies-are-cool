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
    maxPages: number | undefined;
    setMaxPages: React.Dispatch<React.SetStateAction<number | undefined>>;
    movieResults: Movie[];
    setMovieResults: React.Dispatch<React.SetStateAction<Movie[]>>;
    selectedSortValue: string;
    setSelectedSortValue: React.Dispatch<React.SetStateAction<string>>;
}

type GenreProviderProps = { children: React.ReactNode }

const GenreContext = React.createContext<State | undefined>(undefined);

export const GenreProvider = ({ children }: GenreProviderProps) => {
    const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [maxPages, setMaxPages] = useState<number | undefined>(undefined);
    const [movieResults, setMovieResults] = useState<Movie[]>([]);
    const [genreList, setGenreList] = useState<Genre[] | undefined>(undefined);
    // TODO: don't hard code default
    const [selectedSortValue, setSelectedSortValue] = useState<string>('popularity.desc');

    return <GenreContext.Provider value={{ 
        selectedGenres,
        setSelectedGenres, 
        currentPage, 
        setCurrentPage, 
        movieResults, 
        setMovieResults, 
        genreList, 
        setGenreList,
        maxPages, 
        setMaxPages,
        selectedSortValue,
        setSelectedSortValue
    }}>
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