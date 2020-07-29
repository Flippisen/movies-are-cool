import React from 'react';
import { render, screen } from '@testing-library/react';
import { Movie } from '../../models/movie';
import MovieCard from './MovieCard';
import { FavouriteProvider } from '../../contexts/FavouriteContext';
import { WatchLaterProvider } from '../../contexts/WatchLaterContext';

const testMovie = new Movie(
    'posterPath.jpg',
    false,
    'plot synopsis',
    '2020-07-29',
    [],
    1,
    'Original Title',
    'en',
    'Movie title',
    'backdropPath.jpg',
    7,
    10,
    false,
    9.5
);

const movieCardRender = () => {
    render(
        <FavouriteProvider>
            <WatchLaterProvider>
                <MovieCard movie={testMovie}></MovieCard>
            </WatchLaterProvider>
        </FavouriteProvider>
    )
}

test('renders movie title', () => {
    movieCardRender();
    const movieTitle = screen.getByText(testMovie.title);
    expect(movieTitle).toBeVisible();
});

test('renders movie poster', () => {
    movieCardRender();
    const moviePoster = screen.getByAltText('movie poster');
    expect(moviePoster).toBeVisible();
    expect(moviePoster.src).toBe('https://image.tmdb.org/t/p/w500/posterPath.jpg');
})

test('renders movie rating', () => {
    movieCardRender();
    const movieRating = screen.getByText(testMovie.voteAverage.toString());
    expect(movieRating).toBeVisible();
})

test('renders movie release year', () => {
    movieCardRender();
    const movieReleaseYear = screen.getByText(testMovie.releaseDate.getFullYear().toString());
    expect(movieReleaseYear).toBeVisible();
})

test('clicking on watch later button when movie is in watch later lists removes it from list', () => {})

test('clicking on watch later button when movie is not in watch later lists adds it to list', () => {})

test('clicking on favourites button when movie is in favourites lists removes it from list', () => {})

test('clicking on favourites button when movie is not in favourites lists adds it to list', () => {})

test('if movie is in favourites, favourites icon should have active class set', () => {});

test('if movie is not in favourites, favourites icon should not have active class set', () => {});

test('if movie is in watch later, watch later icon should be correct icon', () => {});

test('if movie is not in watch later, watch later icon should be correct icon', () => {});