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

test('renders movie title', () => {
    const { getByText } = render(
        <FavouriteProvider>
            <WatchLaterProvider>
                <MovieCard movie={testMovie}></MovieCard>
            </WatchLaterProvider>
        </FavouriteProvider>
    )
    const movieTitle = screen.getByText(testMovie.title);
    console.log(movieTitle);
    expect(movieTitle).toBeInTheDocument();
});

test('renders movie poster', () => {})

test('renders movie rating', () => {})

test('renders movie release year', () => {})

test('clicking on watch later button when movie is in watch later lists removes it from list', () => {})

test('clicking on watch later button when movie is not in watch later lists adds it to list', () => {})

test('clicking on favourites button when movie is in favourites lists removes it from list', () => {})

test('clicking on favourites button when movie is not in favourites lists adds it to list', () => {})

test('if movie is in favourites, favourites icon should have active class set', () => {});

test('if movie is not in favourites, favourites icon should not have active class set', () => {});

test('if movie is in watch later, watch later icon should be correct icon', () => {});

test('if movie is not in watch later, watch later icon should be correct icon', () => {});