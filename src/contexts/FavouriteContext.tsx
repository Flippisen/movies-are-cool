import { useState, useEffect } from "react";

import React from 'react'

type State = {
    favourites: number[];
    setFavourites: React.Dispatch<React.SetStateAction<number[]>>;
}

type FavouriteProviderProps = {children: React.ReactNode}

const FavouriteContext = React.createContext<State | undefined>(undefined);

const localStorageKey = 'favourites';

export const FavouriteProvider = ({children}: FavouriteProviderProps) => {
    const startValue = localStorage.getItem(localStorageKey);
    const [favourites, setFavourites] = useState<number[]>(startValue ? JSON.parse(startValue) : []);

    useEffect(() => {
        localStorage.setItem(localStorageKey, JSON.stringify(favourites));
    }, [favourites]);

    return <FavouriteContext.Provider value={{favourites, setFavourites}}>
        {children}
    </FavouriteContext.Provider>
}

export const useFavouriteState = () => {
    const context = React.useContext<State | undefined>(FavouriteContext);
    if (context === undefined) {
        throw new Error('useFavouriteState must be used within a FavouriteProvider');
    }
    return context
}