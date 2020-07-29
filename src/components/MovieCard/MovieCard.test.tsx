import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
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


beforeEach(() => {
    localStorage.clear();
    render(
        <FavouriteProvider>
            <WatchLaterProvider>
                <MovieCard movie={testMovie}></MovieCard>
            </WatchLaterProvider>
        </FavouriteProvider>
    )
})

test('renders movie title', () => {
    const movieTitle = screen.getByText(testMovie.title);
    expect(movieTitle).toBeVisible();
});

test('renders movie poster', () => {
    const moviePoster = screen.getByAltText('movie poster');
    expect(moviePoster).toBeVisible();
    expect(moviePoster.src).toBe('https://image.tmdb.org/t/p/w500/posterPath.jpg');
})

test('renders movie rating', () => {
    const movieRating = screen.getByText(testMovie.voteAverage.toString());
    expect(movieRating).toBeVisible();
})

test('renders movie release year', () => {
    const movieReleaseYear = screen.getByText(testMovie.releaseDate.getFullYear().toString());
    expect(movieReleaseYear).toBeVisible();
})

test('After clicking favourites icon, favourites icon should have active class set', () => {
    const favouriteIcon = screen.getByTestId('favourite-icon');
    fireEvent.click(favouriteIcon);
    expect(favouriteIcon).toBeVisible();
    expect(favouriteIcon).toHaveClass('Active');
});

test('if movie is not in favourites, favourites icon should not have active class set', () => {
    const favouriteIcon = screen.getByTestId('favourite-icon');
    expect(favouriteIcon).toBeVisible();
    expect(favouriteIcon).not.toHaveClass('Active');
});

test('After clicking favourites icon twice, favourites icon should not have active class set', () => {
    const favouriteIcon = screen.getByTestId('favourite-icon');
    fireEvent.click(favouriteIcon);
    fireEvent.click(favouriteIcon);
    expect(favouriteIcon).toBeVisible();
    expect(favouriteIcon).not.toHaveClass('Active');
});

test('After clicking watch later icon, watch later icon should have active class set', () => {
    const watchLaterIcon = screen.getByTestId('watch-later-icon');
    fireEvent.click(watchLaterIcon);
    expect(watchLaterIcon).toBeVisible();
    expect(watchLaterIcon).toHaveClass('Active');
});

test('if movie is not in watch later, watch later icon should not have active class set', () => {
    const watchLaterIcon = screen.getByTestId('watch-later-icon');
    expect(watchLaterIcon).toBeVisible();
    expect(watchLaterIcon).not.toHaveClass('Active');
});

test('After clicking watch later icon twice, watch later icon should not have active class set', () => {
    const watchLaterIcon = screen.getByTestId('watch-later-icon');
    fireEvent.click(watchLaterIcon);
    fireEvent.click(watchLaterIcon);
    expect(watchLaterIcon).toBeVisible();
    expect(watchLaterIcon).not.toHaveClass('Active');
});