import React from 'react';
import { useSearchState } from '../../contexts/SearchContext';
import MovieCard from '../MovieCard/MovieCard';
import './MovieList.scss';

export default () => {
    const { searchResults } = useSearchState();

    return (
        <div className='Results'>
            {searchResults.map((movie, index) => {
                return <MovieCard movie={movie} key={index}></MovieCard>
            })}
        </div>
    )
}