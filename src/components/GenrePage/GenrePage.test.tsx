import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { GenreProvider } from '../../contexts/GenreContext';
import GenrePage from './GenrePage';

beforeEach(() => {
    jest.spyOn(window, 'fetch');

    render(<GenreProvider><GenrePage></GenrePage></GenreProvider>)
});

test('When genre list is updated, fetch request should be made', async () => {
    window.fetch = jest.fn().mockImplementationOnce(() => {
        return {
            ok: true,
            status: 200,
            json: async () => ({
                'total_results': 0,
                'total_pages': 0,
                results: []
            })
        }
    })


    const genreDropdown = screen.getByPlaceholderText('Select genres...');
    fireEvent.click(genreDropdown);
    const firstGenreInDropdown = genreDropdown.firstChild;
    if (!firstGenreInDropdown) {
        throw new Error('Test failed');
    }
    fireEvent.click(firstGenreInDropdown);
    await waitFor(() => expect(window.fetch).toHaveBeenCalled());
});

test('Clicking on next page button should fetch more data', async () => {
    window.fetch = jest.fn().mockImplementation(() => {
        return {
            ok: true,
            status: 200,
            json: async () => ({
                'total_results': 10,
                'total_pages': 3,
                results: []
            })
        }
    });

    const nextPageIcon = screen.getByAltText('Next page');
    fireEvent.click(nextPageIcon);
    await waitFor(() => expect(window.fetch).toHaveBeenCalled());
});

test('Clicking on previous page button should not call fetch', async () => {
    window.fetch = jest.fn().mockImplementation(() => {
        return {
            ok: true,
            status: 200,
            json: async () => ({
                'total_results': 10,
                'total_pages': 3,
                results: []
            })
        }
    });

    const nextPageIcon = screen.getByAltText('Next page');
    fireEvent.click(nextPageIcon);
    await waitFor(() => expect(window.fetch).toHaveBeenCalled());

    const previousPageIcon = screen.getByAltText('Previous page');
    fireEvent.click(previousPageIcon);
    await waitFor(() => expect(window.fetch).not.toHaveBeenCalled());
});