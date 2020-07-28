import React from 'react';
import { Movie } from '../../models/movie';
import './MovieCard.scss';
import BrokenImageIcon from '@material-ui/icons/BrokenImage';
import StarRateIcon from '@material-ui/icons/StarRate';
import FavouriteIcon from '@material-ui/icons/Favorite';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import { useFavouriteState } from '../../contexts/FavouriteContext';
import { useWatchLaterState } from '../../contexts/WatchLaterContext';

type Props = {
    movie: Movie
};

export default (props: Props) => {
    const { setFavourites, favourites } = useFavouriteState();
    const { setWatchLaterList, watchLaterList } = useWatchLaterState();
    const movie = props.movie;

    const isActive = (id: number, array: number[]) => {
        return array.includes(id);
    }
    
    const removeFavourite = () => {

    }

    const removeWatchLater = () => {
        
    }

    const addFavourite = (id: number) => {
        setFavourites([...favourites, id]);
    }

    const addWatchLater = () => {
        
    }

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
                            <StarRateIcon className='StarIcon'></StarRateIcon>
                        </div>
                    </div>
                    <div className='ActionItems'>
                        <div className={isActive(movie.id, favourites) ? 'Active' : ''} onClick={e => addFavourite(movie.id)}>
                            <FavouriteIcon className='FavouriteIcon'></FavouriteIcon>
                        </div>
                        <div className={isActive(movie.id, watchLaterList) ? 'Active' : ''}>
                            <PlaylistAddIcon className='PlaylistAddIcon'></PlaylistAddIcon>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}