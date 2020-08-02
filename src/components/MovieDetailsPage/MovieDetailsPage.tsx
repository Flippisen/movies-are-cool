import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Movie, MovieDetails } from '../../models/movie';
import { apiUrl } from '../../services/api';
import './MovieDetailsPage.scss';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

export default () => {
    const [result, setResult] = useState<Movie | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(false);
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
                response.spokenLanguage,
                response.status,
                response.tagline
            );
            setResult(movieResult);
            setIsLoading(false);
            console.log(movieResult);
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
                    <div className='Title'>{result.title}</div>
                </div>
            }
        </div>
    </div>
}