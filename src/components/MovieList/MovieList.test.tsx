import React from 'react';
import { render, screen } from '@testing-library/react';
import { Movie } from '../../models/movie';
import MovieList from './MovieList';
import { FavouriteProvider } from '../../contexts/FavouriteContext';
import { WatchLaterProvider } from '../../contexts/WatchLaterContext';

test('If movies are passed to the movie list component then it should have movie cards displayed', () => {
    const movieList = [
        new Movie(
            'poster-path',
            false,
            'overview',
            '2020-07-29',
            [],
            1,
            'original-title',
            'en',
            'title',
            'bakcdro-path',
            10,
            10,
            false,
            7.9
        )
    ]

    render(
        <FavouriteProvider>
            <WatchLaterProvider>
                <MovieList movies={movieList}></MovieList>
            </WatchLaterProvider>
        </FavouriteProvider>
    )

    const cards = screen.getAllByTestId('MovieCard');
    expect(cards).toHaveLength(1);
})

test('If no movies are passed to the movie list componet, no movie cards should be shown', () => {
    const movieList = [
    ]

    render(
        <FavouriteProvider>
            <WatchLaterProvider>
                <MovieList movies={movieList}></MovieList>
            </WatchLaterProvider>
        </FavouriteProvider>
    )

    const cards = screen.queryAllByTestId('MovieCard');
    expect(cards).toHaveLength(0);
})