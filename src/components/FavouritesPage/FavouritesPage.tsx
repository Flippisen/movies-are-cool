import React from 'react';
import { useFavouriteState } from '../../contexts/FavouriteContext';
import MovieList from '../MovieList/MovieList';
import './FavouritesPage.scss';

export default () => {
    const { favourites } = useFavouriteState();

    return (
        favourites.length > 0 ?
            <MovieList movies={favourites}></MovieList> :
            <div className='NoItems'>You have not added anything to your favourites yet!</div>
    )
}