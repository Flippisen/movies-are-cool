import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { GenreProvider } from '../../contexts/GenreContext';
import GenrePage from './GenrePage';
import { selectMaterialUiSelectOption } from '../../../test/MaterialTestUtils';
import userEvent from '@testing-library/user-event';


beforeEach(() => {
    jest.spyOn(window, 'fetch');

    window.fetch = jest.fn().mockImplementationOnce(() => {
        return {
            ok: true,
            status: 200,
            json: async () => ({
                genres: [{
                    id: 1,
                    name: 'test-genre'
                }]
            })
        }
    });

    render(<GenreProvider><GenrePage></GenrePage></GenreProvider>)
});

test('When genre list is updated, fetch request should be made', async () => {
    window.fetch = (window.fetch as jest.Mock).mockImplementationOnce(() => {
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


    await waitFor(() => expect(window.fetch).toHaveBeenCalled());
    const genreDropdown = screen.getByTestId('genre-dropdown-input');
    if (!genreDropdown) {
        throw new Error('test failed');
    }

    selectMaterialUiSelectOption(genreDropdown, 'test-genre');


    await waitFor(() => expect(window.fetch).toHaveBeenCalledTimes(2));
});

test('Clicking on next and previous page buttons should call fetch', async () => {
    window.fetch = (window.fetch as jest.Mock).mockImplementation(() => {
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

    await waitFor(() => expect(window.fetch).toHaveBeenCalled());
    const genreDropdown = screen.getByTestId('genre-dropdown-input');
    if (!genreDropdown) {
        throw new Error('test failed');
    }

    selectMaterialUiSelectOption(genreDropdown, 'test-genre');


    await waitFor(() => expect(window.fetch).toHaveBeenCalledTimes(2));
    const nextPageIcon = screen.getByLabelText('Go to next page');
    fireEvent.click(nextPageIcon);
    await waitFor(() => expect(window.fetch).toHaveBeenCalledTimes(3));
    const previousPageIcon = screen.getByLabelText('Go to previous page');
    fireEvent.click(previousPageIcon);
    await waitFor(() => expect(window.fetch).toHaveBeenCalledTimes(4));
});

test('When sort type is updated, fetch request should be made', async () => {
    window.fetch = (window.fetch as jest.Mock).mockImplementation(() => {
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


    await waitFor(() => expect(window.fetch).toHaveBeenCalled());
    const genreDropdown = screen.getByTestId('genre-dropdown-input');
    if (!genreDropdown) {
        throw new Error('test failed');
    }

    selectMaterialUiSelectOption(genreDropdown, 'test-genre');
    userEvent.click(screen.getByRole('presentation').children[0]);

    await waitFor(() => expect(window.fetch).toHaveBeenCalledTimes(2));
    
    const sortDropdown = screen.getByTestId('sort-dropdown-input');
    if (!sortDropdown) {
        throw new Error('test failed');
    }


    selectMaterialUiSelectOption(sortDropdown, 'Release Date Desc');
    await waitFor(() => expect(window.fetch).toHaveBeenCalledTimes(3));
});