import React, { useEffect, useState } from 'react';
import { Movie } from '../../models/movie';
import './MovieCard.scss';
import BrokenImageIcon from '@material-ui/icons/BrokenImage';
import StarRateIcon from '@material-ui/icons/StarRate';
import FavouriteIcon from '@material-ui/icons/Favorite';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import PlaylistAddedIcon from '@material-ui/icons/PlaylistAddCheck';
import { useFavouriteState } from '../../contexts/FavouriteContext';
import { useWatchLaterState } from '../../contexts/WatchLaterContext';

type Props = {
    movie: Movie
};

export default (props: Props) => {
    const { setFavourites, favourites } = useFavouriteState();
    const { setWatchLaterList, watchLaterList } = useWatchLaterState();
    const [isFavourite, setIsFavourite] = useState(false);
    const [isOnWatchLater, setIsOnWatchLater] = useState(false);
    const movie = props.movie;

    useEffect(() => {
        setIsFavourite(favourites.includes(movie.id));
        setIsOnWatchLater(watchLaterList.includes(movie.id));
    }, [favourites, watchLaterList, movie.id]);
    
    const removeFavourite = (id: number) => {
        const idIndex = favourites.findIndex((item) => item === id);
        if (idIndex < 0) {
            return;
        }
        favourites.splice(idIndex, 1);
        setFavourites([...favourites]);
    }

    const removeWatchLater = (id: number) => {
        const idIndex = watchLaterList.findIndex((item) => item === id);
        if (idIndex < 0) {
            return;
        }
        watchLaterList.splice(idIndex, 1);
        setWatchLaterList([...watchLaterList]);
    }

    const addFavourite = (id: number) => {
        if (favourites.includes(id)) {
            removeFavourite(id);
            return;
        }
        setFavourites([...favourites, id]);
    }

    const addWatchLater = (id: number) => {
        if (watchLaterList.includes(id)) {
            removeWatchLater(id);
            return;
        }
        setWatchLaterList([...watchLaterList, id]);
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
                        {isFavourite}
                        <div className={isFavourite ? 'Active' : ''} onClick={e => addFavourite(movie.id)}>
                            <FavouriteIcon className='FavouriteIcon'></FavouriteIcon>
                        </div>
                        <div className={isOnWatchLater ? 'Active' : ''} onClick={e => addWatchLater(movie.id)}>
                            { !isOnWatchLater ? 
                                <PlaylistAddIcon className='PlaylistAddIcon'></PlaylistAddIcon> :
                                <PlaylistAddedIcon className='PlaylistAddIcon'></PlaylistAddedIcon>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}