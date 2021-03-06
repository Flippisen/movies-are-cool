import React, { useState, useEffect, useRef } from 'react';
import { apiUrl } from '../../services/api';
import { useSearchState } from '../../contexts/SearchContext';
import SearchBar from './SearchBar/SearchBar';
import { useDebounce } from '../../hooks/useDebounce';
import './SearchPage.scss';
import { Movie } from '../../models/movie';
import MovieList from '../MovieList/MovieList';

export default () => {
    const [page, setPage] = useState(1);
    const [numPages, setNumPages] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const { setSearchResults, searchTerm, searchResults } = useSearchState();
    const debouncedSearchTerm = useDebounce<string>(searchTerm, 150);
    const isInitialMount = useRef(true);

    useEffect(() => {
        setSearchResults([]);
        setNumPages(1);
        setTotalResults(0);
    }, [searchTerm])

    useEffect(() => {
        if(isInitialMount.current) {
            isInitialMount.current = false;
            setSearchResults(searchResults);
            return;
        }
        if (debouncedSearchTerm === '') {
            return;
        }
        const abortController = new AbortController();
        let cancelled = false;
        const getSearchResults = async () => {
            setIsLoading(true);
            const results = await fetch(
                apiUrl('/search/movie', { query: debouncedSearchTerm, page: page}),
                {
                    method: 'GET',
                    signal: abortController.signal
                }
            );
            const response = await results.json();
            if (!cancelled) {
                setNumPages(response['total_pages']);
                setTotalResults(response['total_results']);
                const newResults = response['results'].map((result: any) => new Movie(
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
                ))
                setSearchResults([...searchResults, ...newResults]);
                setIsLoading(false);
            }

        }
        getSearchResults();
        return () => {
            cancelled = true;
            abortController.abort()
        }
    }, [page, debouncedSearchTerm]);

    const loadingDiv = () => {
        return <div className='Loading'>Loading...</div>
    }

    const searchResultsDiv = () => {
        return (
            <div>
                <MovieList movies={searchResults}></MovieList>
                { 
                    totalResults > 0 && totalResults !== searchResults.length &&
                    <div className='ButtonContainer'>
                        <div className='Button LoadMore' onClick={e => setPage(page + 1)}>
                            Load more
                                </div>
                    </div>
                }
            </div>
        )
    }

    return (
        <div>
            <SearchBar></SearchBar>
            {
                isLoading ?
                    loadingDiv() :
                    searchResultsDiv()
            }

        </div>
    )
}