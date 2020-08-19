import React, { useState, useEffect } from 'react';
import { useGenreState } from '../../contexts/GenreContext';
import './GenrePage.scss';
import GenreDropdown from './GenreDropdown/GenreDropdown';
import { makeApiCall, ApiMethods } from '../../services/api';
import { Movie } from '../../models/movie';
import Loading from '../Loading/Loading';
import MovieList from '../MovieList/MovieList';
import Pagination from '../Pagination/Pagination';

export default () => {
    const { selectedGenres, movieResults, setMovieResults, currentPage, setCurrentPage, maxPages, setMaxPages } = useGenreState();
    const [isLoading, setIsLoading] = useState(false);
    
    const onSelectedGenreChangeGetNewResults = (selectedGenres: number[]) => {
        console.log(selectedGenres);
        if (!selectedGenres || selectedGenres.length === 0) {
            setMovieResults([]);
            setCurrentPage(1);
            setMaxPages(undefined)
            return;
        }
        const getListOfGenres = async () => {
            setIsLoading(true);
            const response = await makeApiCall('/discover/movie', ApiMethods.GET, { 'with_genres': selectedGenres.join(',')});
            const newResults = response['results'].map(Movie.fromResponse)
            const maxPages = response['total_pages'];
            setMovieResults(newResults);
            setMaxPages(maxPages);
            setIsLoading(false);
        }
        getListOfGenres();
    }

    useEffect(() => {
        onSelectedGenreChangeGetNewResults(selectedGenres);
    }, [selectedGenres, currentPage]);

    return <div className='genre-page'>
        <div className='header-row'>
            <GenreDropdown></GenreDropdown>
        </div>
        <div>
            {isLoading ? 
                <Loading></Loading> :
                <MovieList movies={movieResults}></MovieList>
            }
        </div>
        <div className='footer'>
            { maxPages && <Pagination currentPage={currentPage} maxPages={maxPages} setCurrentPage={setCurrentPage}></Pagination> }
        </div>
    </div>
}