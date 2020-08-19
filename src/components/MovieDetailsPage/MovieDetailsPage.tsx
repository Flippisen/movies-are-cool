import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { MovieDetails } from '../../models/movie';
import { makeApiCall, ApiMethods } from '../../services/api';
import './MovieDetailsPage.scss';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import format from 'date-fns/format';
import Loading from '../Loading/Loading';
import MovieDetail from './MovieDetail/MovieDetail';

export default () => {
    const [result, setResult] = useState<MovieDetails | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(false);
    const [details, setDetails] = useState<{ [key: string]: JSX.Element}>({});
    const { id } = useParams();

    const getMovieDetailSections = (movieDetails: MovieDetails) => {
        return {
            Overview: <div>{movieDetails.overview}</div>,
            Budget: <div>{`$${movieDetails.budget.toLocaleString()}`}</div>,
            Revenue: <div>{`$${movieDetails.revenue.toLocaleString()}`}</div>,
            Profit: <div className={movieDetails.profit < 0 ? 'NegativeProfit' : ''}>
                    {
                        movieDetails.profit < 0 ?
                            `-$${(Math.abs(movieDetails.profit)).toLocaleString()}` : `$${(Math.abs(movieDetails.profit)).toLocaleString()}`
                    }
                </div>,
            Rating: <div>{`${movieDetails.voteAverage} (${movieDetails.voteCount.toLocaleString()})`}</div>,
            Homepage: <a href={movieDetails.homepage}>{movieDetails.homepage}</a>,
            Status: <div>{movieDetails.status}</div>
        }
    }

    useEffect(() => {
        const getMovieById = async () => {
            setIsLoading(true);
            const response = await makeApiCall(`/movie/${id}`, ApiMethods.GET);
            const movieResult = MovieDetails.fromResponse(response);
            setResult(movieResult);
            setIsLoading(false);
            setDetails(getMovieDetailSections(movieResult));
        }
        getMovieById();
    }, [id])

    const movieDetailsDiv = (result: MovieDetails) => {
        return <div className='Card'>
            <div className='Title'>{result.title} ({result.releaseDate.getFullYear()})</div>
            <div className='Tagline'>{result.tagline}</div>
            <div className='ImportantDetails'>
                {result.genres.map(x => x.name).join(', ')} | {result.runtime} minutes | {format(result.releaseDate, 'd LLLL yyyy')}
            </div>
            <div className='Details'>
                <div className='Poster'>
                    <img src={`https://image.tmdb.org/t/p/w200/${result.posterPath}`} alt='movie poster' />
                </div>
                <div className='TextDetails'>
                    {
                        Object.keys(details).map(detail => {
                            return <MovieDetail label={detail} value={details[detail]}></MovieDetail>
                        })
                    }
                </div>
            </div>
        </div>
    }

    return <div className='MovieDetails'>
        <div className='BackButtonContainer'>
            <div onClick={e => window.history.back()} className='BackButtonLink'>
                <ArrowBackIcon></ArrowBackIcon>
            </div>
        </div>
        { !isLoading ? 
            <div className='Container'>
                { result && movieDetailsDiv(result) }
            </div>
            :
            <Loading></Loading>
        }
    </div>
}