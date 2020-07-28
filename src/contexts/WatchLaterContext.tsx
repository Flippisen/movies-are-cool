import { useState } from "react";

import React from 'react'

type State = {
    watchLaterList: number[];
    setWatchLaterList: React.Dispatch<React.SetStateAction<number[]>>;
}

type WatchLaterProviderProps = {children: React.ReactNode}

const WatchLaterContext = React.createContext<State | undefined>(undefined);

export const WatchLaterProvider = ({children}: WatchLaterProviderProps) => {
    const [watchLaterList, setWatchLaterList] = useState<number[]>([]);

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