import { ApiMethods, makeApiCall } from './api'
import { Movie } from '../models/movie';

export const searchMovies = async (searchTerm: string, pageNumber: number, signal?: AbortSignal) => {
    const result = await makeApiCall('/search/movie', ApiMethods.GET, { query: searchTerm, page: pageNumber }, signal);

    return {
        results: result['results'].map(Movie.fromResponse),
        maxPages: result['total_pages'],
        totalResults: result['total_results']
    }
}