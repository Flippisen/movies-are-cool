import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MovieDetails } from '../../models/movie';
import MovieDetailsPage from './MovieDetailsPage';
import { MemoryRouter, Route } from 'react-router-dom';
import { apiUrl } from '../../services/api';

const testMovieDetails = {
    poster_path: 'posterPath.jpg',
    adult: false,
    overview: 'plot synopsis',
    release_date: '2020-07-29',
    genre_ids: [],
    id: 1,
    original_title: 'Original Title',
    original_language: 'en',
    title: 'Movie title',
    backdrop_path: 'backdropPath.jpg',
    popularity: 7,
    vote_count: 10,
    video: false,
    vote_average: 9.5,
    belongs_to_collection: undefined,
    budget: 1000,
    genres: [{
        id: '1',
        name: 'Fantasy'
    }, {
        id: '2',
        name: 'Sci-Fi'
    }],
    homepage: 'http://google.com',
    imdb_id: 'imdb-id',
    production_complete: [],
    revenue: 3000,
    runtime: '121',
    spoken_language: [],
    status: 'status',
    tagline: 'this is a tagline'
};


beforeEach(() => {
    jest.spyOn(window, 'fetch');
    window.fetch = jest.fn().mockImplementationOnce(async () => {
        return {
            ok: true,
            status: 200,
            json: async () => ({
                ...testMovieDetails,
            })
        };
    });

    render(
        <MemoryRouter initialEntries={['movies/123']}>
            <Route path='movies/:id'>
                <MovieDetailsPage></MovieDetailsPage>
            </Route>
        </MemoryRouter>
    )
})

test('calls get movie by id api', async () => {
    await waitFor(() => expect(window.fetch).toHaveBeenCalled());
    expect(window.fetch).toHaveBeenCalledWith(apiUrl(`/movie/123`), { method: 'GET' });
});

test('renders movie title', async () => {
    await waitFor(() => expect(window.fetch).toHaveBeenCalled());
    const movieTitle = screen.getByText(`Movie title (2020)`);
    expect(movieTitle).toBeVisible();
});

test('renders movie tagline', async () => {
    await waitFor(() => expect(window.fetch).toHaveBeenCalled());
    const movieTagline = screen.getByText(`this is a tagline`);
    expect(movieTagline).toBeVisible();
});

test('renders movie important details', async () => {
    await waitFor(() => expect(window.fetch).toHaveBeenCalled());
    const movieImportantDetails = screen.getByText(`Fantasy, Sci-Fi | 121 minutes | 29 July 2020`);
    expect(movieImportantDetails).toBeVisible();
});

test('renders movie poster', async () => {
    await waitFor(() => expect(window.fetch).toHaveBeenCalled());
    const moviePoster = screen.getByAltText('movie poster') as HTMLImageElement;
    expect(moviePoster).toBeVisible();
    expect(moviePoster.src).toBe('https://image.tmdb.org/t/p/w200/posterPath.jpg');
})

test('renders movie overview', async () => {
    await waitFor(() => expect(window.fetch).toHaveBeenCalled());
    const movieOverview = screen.getByText(`plot synopsis`);
    expect(movieOverview).toBeVisible();
});

test('renders movie budget', async () => {
    await waitFor(() => expect(window.fetch).toHaveBeenCalled());
    const movieBudget = screen.getByText(`$1,000`);
    expect(movieBudget).toBeVisible();
});

test('renders movie revenue', async () => {
    await waitFor(() => expect(window.fetch).toHaveBeenCalled());
    const movieRevenue = screen.getByText(`$3,000`);
    expect(movieRevenue).toBeVisible();
});

test('renders movie profit', async () => {
    await waitFor(() => expect(window.fetch).toHaveBeenCalled());
    const movieProfit = screen.getByText(`$2,000`);
    expect(movieProfit).toBeVisible();
});

test('renders negative movie profit', async () => {
    jest.spyOn(window, 'fetch');
    window.fetch = jest.fn().mockImplementationOnce(async () => {
        return {
            ok: true,
            status: 200,
            json: async () => ({
                ...testMovieDetails,
                revenue: 1000,
                budget: 5000
            })
        };
    });

    render(
        <MemoryRouter initialEntries={['movies/123']}>
            <Route path='movies/:id'>
                <MovieDetailsPage></MovieDetailsPage>
            </Route>
        </MemoryRouter>
    )
    await waitFor(() => expect(window.fetch).toHaveBeenCalled());
    const movieProfit = screen.getByText(`-$4,000`);
    expect(movieProfit).toBeVisible();
    expect(movieProfit).toHaveClass('NegativeProfit');
});

test('renders movie rating', async () => {
    await waitFor(() => expect(window.fetch).toHaveBeenCalled());
    const movieRating = screen.getByText(`9.5 (10)`);
    expect(movieRating).toBeVisible();
});

test('renders movie homepage', async () => {
    await waitFor(() => expect(window.fetch).toHaveBeenCalled());
    const movieHomepage = screen.getByText(`http://google.com`);
    expect(movieHomepage).toBeVisible();
});

test('renders movie status', async () => {
    await waitFor(() => expect(window.fetch).toHaveBeenCalled());
    const movieStatus = screen.getByText(`status`);
    expect(movieStatus).toBeVisible();
});