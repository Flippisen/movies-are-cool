import React from 'react';
import { Movie } from '../../models/movie';
import './MovieCard.scss';
import BrokenImageIcon from '@material-ui/icons/BrokenImage';
import StarRateIcon from '@material-ui/icons/StarRate';
import FavouriteOutlineIcon from '@material-ui/icons/FavoriteBorderOutlined';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';

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
                        movie.posterPath ?
                        <img src={`https://image.tmdb.org/t/p/w500/${movie.posterPath}`} /> :
                        <BrokenImageIcon></BrokenImageIcon>
                    }
                </div>
                <div className='Details'>
                    <div className='MovieTitle'>
                        {movie.title}
                    </div>
                    <div className='MinorDetails'>
                        <div className='ReleaseYear'>
                            {isNaN(movie.releaseDate.getFullYear()) ? 'N/A' : movie.releaseDate.getFullYear()}
                        </div>
                        <div className='Rating'>
                            {movie.voteAverage}
                            <StarRateIcon></StarRateIcon>
                        </div>
                    </div>
                    <div className='ActionItems'>
                        <FavouriteOutlineIcon></FavouriteOutlineIcon>
                        <PlaylistAddIcon></PlaylistAddIcon>
                    </div>
                </div>
            </div>
        </div>
    )
}