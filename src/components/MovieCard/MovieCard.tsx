import React from 'react';
import { Movie } from '../../models/movie';
import './MovieCard.scss';

type Props = {
    movie: Movie
};

export default (props: Props) => {
    const movie = props.movie;
    return (
        <div className='Card'>
            { movie.title }
            <div className='Poster'>

            </div>
            <div className='Details'>
                <div className='MovieTitle'></div>
                <div className='ReleaseYear'></div>
                <div className='Rating'></div>
            </div>
        </div>
    )
}