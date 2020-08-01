import { useState, useEffect } from "react";

import React from 'react'
import { Movie } from '../models/movie';

type State = {
    favourites: Movie[];
    setFavourites: React.Dispatch<React.SetStateAction<Movie[]>>;
}

type FavouriteProviderProps = {children: React.ReactNode}

const FavouriteContext = React.createContext<State | undefined>(undefined);

const localStorageKey = 'favourites';

export const FavouriteProvider = ({children}: FavouriteProviderProps) => {
    // This could be improved by setting it using movie db api instead
    let localStorageValue = localStorage.getItem(localStorageKey);
    let startValue: Movie[] = [];
    if (localStorageValue) {
        const movieList = JSON.parse(localStorageValue);

        startValue = movieList.map((x: any) => new Movie(
            x.poster_path,
            x.adult,
            x.overview,
            x.release_date,
            x.genre_ids,
            x.id,
            x.original_title,
            x.original_language,
            x.title,
            x.backdrop_path,
            x.popularity,
            x.vote_count,
            x.video,
            x.vote_average
        ))
    }
    const [favourites, setFavourites] = useState<Movie[]>(startValue || []);

    useEffect(() => {
        localStorage.setItem(localStorageKey, JSON.stringify(favourites));
    }, [favourites]);

    return <FavouriteContext.Provider value={{favourites, setFavourites}}>
        {children}
    </FavouriteContext.Provider>;
}

export const useFavouriteState = () => {
    const context = React.useContext<State | undefined>(FavouriteContext);
    if (context === undefined) {
        throw new Error('useFavouriteState must be used within a FavouriteProvider');
    }
    return context;
}