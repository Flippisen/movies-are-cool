import { useState, useEffect } from "react";

import React from 'react'
import { Movie } from '../models/movie';

type State = {
    watchLaterList: Movie[];
    setWatchLaterList: React.Dispatch<React.SetStateAction<Movie[]>>;
}

type WatchLaterProviderProps = {children: React.ReactNode}

const WatchLaterContext = React.createContext<State | undefined>(undefined);

const localStorageKey = 'watchLaterList';

export const WatchLaterProvider = ({children}: WatchLaterProviderProps) => {
    const startValue = localStorage.getItem(localStorageKey);
    const [watchLaterList, setWatchLaterList] = useState<Movie[]>(startValue ? JSON.parse(startValue) : []);

    useEffect(() => {
        localStorage.setItem(localStorageKey, JSON.stringify(watchLaterList));
    }, [watchLaterList]);

    return <WatchLaterContext.Provider value={{watchLaterList, setWatchLaterList}}>
        {children}
    </WatchLaterContext.Provider>
}

export const useWatchLaterState = () => {
    const context = React.useContext<State | undefined>(WatchLaterContext);
    if (context === undefined) {
        throw new Error('useWatchLaterState must be used within a WatchLaterProvider');
    }
    return context;
}