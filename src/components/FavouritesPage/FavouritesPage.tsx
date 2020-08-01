import React from 'react';
import { useFavouriteState } from '../../contexts/FavouriteContext';
import MovieList from '../MovieList/MovieList';

export default () => {
    const { favourites } = useFavouriteState();

    return <MovieList movies={favourites}></MovieList>
}