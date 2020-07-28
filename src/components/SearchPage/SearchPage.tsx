import React, { useState, useEffect } from 'react';
import { apiUrl } from '../../services/api';
import { useSearchState } from '../../contexts/SearchContext';
import SearchBar from './SearchBar/SearchBar';
import { useDebounce } from '../../hooks/useDebounce';

export default () => {
    const [page, setPage] = useState(1);
    const [numPages, setNumPages] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const { setSearchResults, searchTerm } = useSearchState();
    const debouncedSearchTerm = useDebounce<string>(searchTerm, 150);

    useEffect(() => {
        const getSearchResults = async () => {
            if (debouncedSearchTerm === '') {
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
            setTotalResults(response['total_results']);
            setSearchResults(response['results']);
            setIsLoading(false);
        }
        getSearchResults();
    }, [page, debouncedSearchTerm]);

    return (
        <div>
            <SearchBar></SearchBar>
        </div>
    )
}