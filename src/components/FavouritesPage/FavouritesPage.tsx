import React from 'react';
import { useFavouriteState } from '../../contexts/FavouriteContext';
import MovieList from '../MovieList/MovieList';

export default () => {
    const { favourites } = useFavouriteState(); 

    console.log('Hello');
    console.log(favourites);

    return <MovieList movies={favourites}></MovieList>
}