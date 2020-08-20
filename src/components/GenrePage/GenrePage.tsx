import React, { useState, useEffect } from 'react';
import { useGenreState } from '../../contexts/GenreContext';
import './GenrePage.scss';
import GenreDropdown from './GenreDropdown/GenreDropdown';
import { makeApiCall, ApiMethods } from '../../services/api';
import { Movie } from '../../models/movie';
import Loading from '../Loading/Loading';
import MovieList from '../MovieList/MovieList';
import Pagination from '../Pagination/Pagination';
import SortDropdown from './SortDropdown/SortDropdown';
import { discoverMovieGenres } from '../../services/discover';

export default () => {
    const { selectedGenres, movieResults, setMovieResults, currentPage, setCurrentPage, maxPages, setMaxPages, selectedSortValue } = useGenreState();
    const [isLoading, setIsLoading] = useState(false);
    
    const onGenreOrSortChangeGetNewResults = (selectedGenres: number[], currentPage: number, selectedSortValue: string) => {
        if (!selectedGenres || selectedGenres.length === 0) {
            setMovieResults([]);
            setCurrentPage(1);
            setMaxPages(undefined)
            return;
        }
        const getListOfGenres = async () => {
            setIsLoading(true);
            const { results, maxPages } = await discoverMovieGenres(selectedGenres, selectedSortValue, currentPage);
            setMovieResults(results);
            setMaxPages(maxPages);
            setIsLoading(false);
        }
        getListOfGenres();
    }

    const resetPagesOnSortOrGenreChange = () => {
        setMaxPages(undefined);
        setCurrentPage(1);
    }

    useEffect(() => {
        resetPagesOnSortOrGenreChange();
    }, [selectedSortValue, selectedGenres])

    useEffect(() => {
        onGenreOrSortChangeGetNewResults(selectedGenres, currentPage, selectedSortValue);
    }, [selectedGenres, currentPage, selectedSortValue]);

    return <div className='genre-page'>
        <div className='header-row'>
            <GenreDropdown></GenreDropdown>
            <SortDropdown></SortDropdown>
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