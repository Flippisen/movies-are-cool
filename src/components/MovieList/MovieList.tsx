import React from 'react';
import { useSearchState } from '../../contexts/SearchContext';
import MovieCard from '../MovieCard/MovieCard';
import './MovieList.scss';
import { Movie } from '../../models/movie';

type Props = {
    movies: Movie[];
}

export default (props: Props) => {
    const movies = props.movies;

    return (
        <div className='Results'>
            {movies.map((movie, index) => {
                return <MovieCard movie={movie} key={index}></MovieCard>
            })}
        </div>
    )
}