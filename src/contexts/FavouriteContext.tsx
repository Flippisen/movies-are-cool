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
    const startValue = localStorage.getItem(localStorageKey);
    const [favourites, setFavourites] = useState<Movie[]>(startValue ? JSON.parse(startValue) : []);

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