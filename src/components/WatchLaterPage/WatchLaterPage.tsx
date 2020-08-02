import React from 'react';
import MovieList from '../MovieList/MovieList';
import './WatchLaterPage.scss';
import { useWatchLaterState } from '../../contexts/WatchLaterContext';

export default () => {
    const { watchLaterList } = useWatchLaterState();

    return (
        watchLaterList.length > 0 ?
            <MovieList movies={watchLaterList}></MovieList> :
            <div className='NoItems'>You have not added anything to your watch later list yet!</div>
    )
}