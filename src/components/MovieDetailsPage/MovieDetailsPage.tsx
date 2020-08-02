import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import { Movie, MovieDetails } from '../../models/movie';
import { apiUrl } from '../../services/api';
import './MovieDetailsPage.scss';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import format from 'date-fns/format';

export default () => {
    const [result, setResult] = useState<MovieDetails | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(false);
    const [details, setDetails] = useState<{ [key: string]: JSX.Element}>({});
    const { id } = useParams();

    useEffect(() => {
        const getMovieById = async () => {
            setIsLoading(true);
            const result = await fetch(
                apiUrl(`/movie/${id}`),
                {
                    method: 'GET'
                }
            )
            const response = await result.json();
            const movieResult = new MovieDetails(
                response.poster_path,
                response.adult,
                response.overview,
                response.release_date,
                response.genre_ids,
                response.id,
                response.original_title,
                response.original_language,
                response.title,
                response.backdrop_path,
                response.popularity,
                response.vote_count,
                response.video,
                response.vote_average,
                response.belongs_to_collection,
                response.budget,
                response.genres,
                response.homepage,
                response.imdb_id,
                response.production_companies,
                response.revenue,
                response.runtime,
                response.spoken_language,
                response.status,
                response.tagline
            );
            setResult(movieResult);
            setIsLoading(false);
            const profit = movieResult.revenue - movieResult.budget;
            setDetails({
                Overview: <div>{movieResult.overview}</div>,
                Budget: <div>{`$${movieResult.budget.toLocaleString()}`}</div>,
                Revenue: <div>{`$${movieResult.revenue.toLocaleString()}`}</div>,
                Profit: <div className={profit < 0 ? 'NegativeProfit' : ''}>
                    {
                        profit < 0 ?
                            `-$${(Math.abs(profit)).toLocaleString()}` : `$${(Math.abs(profit)).toLocaleString()}`
                    }
                </div>,
                Rating: <div>{`${movieResult.voteAverage} (${movieResult.voteCount.toLocaleString()})`}</div>,
                Homepage: <a href={movieResult.homepage}>{movieResult.homepage}</a>,
                Status: <div>{movieResult.status}</div>
            });
        }
        getMovieById();
    }, [id])

    return <div className='MovieDetails'>
        <div className='BackButtonContainer'>
            <div onClick={e => window.history.back()} className='BackButtonLink'>
                <ArrowBackIcon></ArrowBackIcon>
            </div>
        </div>
        <div className='Container'>
            { result &&
                <div className='Card'>
                    <div className='Title'>{result.title} ({result.releaseDate.getFullYear()})</div>
                    <div className='Tagline'>{result.tagline}</div>
                    <div className='ImportantDetails'>
                        { result.genres.map(x => x.name).join(', ')} | { result.runtime } minutes | {format(result.releaseDate, 'd LLLL yyyy')}
                    </div>
                    <div className='Details'>
                        <div className='Poster'>
                            <img src={`https://image.tmdb.org/t/p/w200/${result.posterPath}`} alt='movie poster' />
                        </div>
                        <div className='TextDetails'>
                            {
                                Object.keys(details).map(detail => {
                                    return <div className='Detail' key={detail}>
                                        <div className='DetailLabel'>
                                            {detail}:
                                        </div>
                                        <div className='DetailValue'>
                                            {details[detail]}
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                    </div>
                </div>
            }
        </div>
    </div>
}