import React, { useState, useEffect } from 'react';
import { apiUrl } from '../../services/api';
import { useSearchState } from '../../contexts/SearchContext';
import SearchBar from './SearchBar/SearchBar';
import { useDebounce } from '../../hooks/useDebounce';
import MovieCard from '../MovieCard/MovieCard';
import './SearchPage.scss';
import SearchResults from './SearchResults/SearchResults';
import { Movie } from '../../models/movie';

export default () => {
    const [page, setPage] = useState(1);
    const [numPages, setNumPages] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const { setSearchResults, searchTerm } = useSearchState();
    const debouncedSearchTerm = useDebounce<string>(searchTerm, 150);

    useEffect(() => {
        const getSearchResults = async () => {
            setPage(1);
            if (debouncedSearchTerm === '') {
                setSearchResults([]);
                setNumPages(1);
                setTotalResults(0);
                return;
            }
            const results = await fetch(
                apiUrl('/search/movie', { query: debouncedSearchTerm, page: page}),
                {
                    method: 'GET'
                }
            );
            const response = await results.json();
            setNumPages(response['total_pages']);
            console.log(response['total_results']);
            setTotalResults(response['total_results']);
            setSearchResults(response['results'].map((result: any) => new Movie(
                result.poster_path,
                result.adult,
                result.overview,
                result.release_date,
                result.genre_ids,
                result.id,
                result.original_title,
                result.original_language,
                result.title,
                result.backdrop_path,
                result.popularity,
                result.vote_count,
                result.video,
                result.vote_average
            )));
            setIsLoading(false);
        }
        getSearchResults();
    }, [page, debouncedSearchTerm]);

    return (
        <div>
            <SearchBar></SearchBar>
            <SearchResults></SearchResults>
        </div>
    )
}