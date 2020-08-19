import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ApiMethods, makeApiCall } from '../../services/api';
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

    const resetSearchResults = useCallback(() => {
        setSearchResults([]);
        setNumPages(1);
        setTotalResults(0);
    }, [setSearchResults]);

    const isFirstMount = () => {
        return isInitialMount.current;
    }

    useEffect(() => {
        resetSearchResults();
    }, [searchTerm, resetSearchResults])

    useEffect(() => {
        const loadCachedResults = () => {
            isInitialMount.current = false;
            setSearchResults(searchResults);
        }

        const setStateBasedOnResponse = (response: any) => {
            setNumPages(response['total_pages']);
            setTotalResults(response['total_results']);
            const newResults = response['results'].map(Movie.fromResponse)
            setSearchResults([...searchResults, ...newResults]);
            setIsLoading(false);
        }

        if (isFirstMount()) {
            loadCachedResults();
            return;
        }
        if (debouncedSearchTerm === '') {
            return;
        }
        const abortController = new AbortController();
        let cancelled = false;
        const getSearchResults = async () => {
            setIsLoading(true);
            const response = await makeApiCall('/search/movie', ApiMethods.GET, { query: debouncedSearchTerm, page: page }, abortController.signal);
            if (!cancelled) {
                setStateBasedOnResponse(response);
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