import React, { useState, useEffect } from 'react';
import { apiUrl } from '../../services/api';

export default () => {
    const [page, setPage] = useState(1);
    const [numPages, setNumPages] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getSearchResults = async () => {
            const results = await fetch(
                apiUrl('/search/movie', { query: 'mad max', page: page}),
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
    }, [page]);

    return (
        <div></div>
    )
}