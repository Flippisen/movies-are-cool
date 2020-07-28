import React from 'react';
import { Movie } from '../../models/movie';
import './MovieCard.scss';
import BrokenImageIcon from '@material-ui/icons/BrokenImage';

type Props = {
    movie: Movie
};

export default (props: Props) => {
    const movie = props.movie;
    
    return (
        <div className='CardContainer'>
            <div className='Card'>
                <div className='Poster'>
                    {
                        movie.poster_path ?
                        <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} /> :
                        <BrokenImageIcon></BrokenImageIcon>
                    }
                </div>
                <div className='Details'>
                    <div className='MovieTitle'></div>
                    <div className='ReleaseYear'></div>
                    <div className='Rating'></div>
                </div>
            </div>
        </div>
    )
}