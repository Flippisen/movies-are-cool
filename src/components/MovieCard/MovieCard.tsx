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
import { Link } from 'react-router-dom';

type Props = {
    movie: Movie
};

export default (props: Props) => {
    const { setFavourites, favourites } = useFavouriteState();
    const { setWatchLaterList, watchLaterList } = useWatchLaterState();
    const [isFavourite, setIsFavourite] = useState(false);
    const [isOnWatchLater, setIsOnWatchLater] = useState(false);
    const movie = props.movie;

    const isMovieInList = (list: Movie[], movie: Movie) => {
        return !!list.find((x) => x.id === movie.id);
    }

    useEffect(() => {
        const isInFavouritesList = isMovieInList(favourites, movie);
        const isInWatchLaterList = isMovieInList(watchLaterList, movie);
        setIsFavourite(isInFavouritesList);
        setIsOnWatchLater(isInWatchLaterList);
    }, [favourites, watchLaterList, movie]);
    
    const removeFavourite = (movie: Movie) => {
        const idIndex = favourites.findIndex((item) => item.id === movie.id);
        if (idIndex < 0) {
            return;
        }
        favourites.splice(idIndex, 1);
        setFavourites([...favourites]);
    }

    const removeWatchLater = (movie: Movie) => {
        const idIndex = watchLaterList.findIndex((item) => item.id === movie.id);
        if (idIndex < 0) {
            return;
        }
        watchLaterList.splice(idIndex, 1);
        setWatchLaterList([...watchLaterList]);
    }

    const addFavourite = (movie: Movie) => {
        if (isMovieInList(favourites, movie)) {
            removeFavourite(movie);
            return;
        }
        setFavourites([...favourites, movie]);
    }

    const addWatchLater = (id: Movie) => {
        if (watchLaterList.includes(id)) {
            removeWatchLater(id);
            return;
        }
        setWatchLaterList([...watchLaterList, id]);
    }

    return (
        <div className='MovieCard'>
            <div className='CardContainer' data-testid='MovieCard' >
                <Link className='Card' to={`/movies/${movie.id}`}>
                    <div className='Poster'>
                        {
                            movie.backdropPath ?
                            <img src={`https://image.tmdb.org/t/p/w500/${movie.backdropPath}`} alt='movie backdrop'/> :
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
                            <div className={isFavourite ? 'Active' : ''} onClick={e => {addFavourite(movie); e.preventDefault()}} data-testid='favourite-icon'>
                                <FavouriteIcon className='FavouriteIcon'></FavouriteIcon>
                            </div>
                            <div className={isOnWatchLater ? 'Active' : ''} onClick={e => { addWatchLater(movie); e.preventDefault()}} data-testid='watch-later-icon'>
                                { !isOnWatchLater ? 
                                    <PlaylistAddIcon className='PlaylistAddIcon'></PlaylistAddIcon> :
                                    <PlaylistAddedIcon className='PlaylistAddIcon'></PlaylistAddedIcon>
                                }
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    )
}