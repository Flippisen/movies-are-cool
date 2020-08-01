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
    const [watchLaterList, setWatchLaterList] = useState<Movie[]>(startValue || []);

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