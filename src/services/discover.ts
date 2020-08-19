import { ApiMethods, makeApiCall } from './api';
import { Movie } from '../models/movie';

export const discoverMovieGenres = async (genres: number[], sortValue: string, pageNumber: number) => {
    const response = await makeApiCall('/discover/movie', ApiMethods.GET,
        {
            'with_genres': genres.join(','),
            'sort_by': sortValue,
            'page': pageNumber
        });

    return {
        results: response['results'].map(Movie.fromResponse),
        maxPages: response['total_pages']
    }
}