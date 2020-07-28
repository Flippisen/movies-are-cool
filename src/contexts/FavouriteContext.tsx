import { useState } from "react";

import React from 'react'

type State = {
    favourites: number[];
    setFavourites: React.Dispatch<React.SetStateAction<number[]>>;
}

type FavouriteProviderProps = {children: React.ReactNode}

const FavouriteContext = React.createContext<State | undefined>(undefined);

export const FavouriteProvider = ({children}: FavouriteProviderProps) => {
    const [favourites, setFavourites] = useState<number[]>([]);

    return <FavouriteContext.Provider value={{favourites, setFavourites}}>
        {children}
    </FavouriteContext.Provider>
}

export const useSearchState = () => {
    const context = React.useContext<State | undefined>(FavouriteContext);
    if (context === undefined) {
        throw new Error('useSearchState must be used within a FavouriteProvider');
    }
    return context
}