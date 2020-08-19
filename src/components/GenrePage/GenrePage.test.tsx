import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { GenreProvider } from '../../contexts/GenreContext';
import GenrePage from './GenrePage';
import { selectMaterialUiSelectOption } from '../../../test/MaterialTestUtils';


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

// test('Clicking on next page button should fetch more data', async () => {
//     window.fetch = (window.fetch as jest.Mock).mockImplementation(() => {
//         return {
//             ok: true,
//             status: 200,
//             json: async () => ({
//                 'total_results': 10,
//                 'total_pages': 3,
//                 results: []
//             })
//         }
//     });

//     await waitFor(() => expect(window.fetch).toHaveBeenCalled());
//     const genreDropdown = screen.getByTestId('genre-dropdown-input');
//     if (!genreDropdown) {
//         throw new Error('test failed');
//     }

//     selectMaterialUiSelectOption(genreDropdown, 'test-genre');


//     await waitFor(() => expect(window.fetch).toHaveBeenCalledTimes(2));
//     const nextPageIcon = screen.getByRole('Go to next page');
//     fireEvent.click(nextPageIcon);
//     await waitFor(() => expect(window.fetch).toHaveBeenCalledTimes(3));
// });

// test('Clicking on previous page button should not call fetch', async () => {
//     window.fetch = (window.fetch as jest.Mock).mockImplementation(() => {
//         return {
//             ok: true,
//             status: 200,
//             json: async () => ({
//                 'total_results': 10,
//                 'total_pages': 3,
//                 results: []
//             })
//         }
//     });

//     await waitFor(() => expect(window.fetch).toHaveBeenCalled());
//     const genreDropdown = screen.getByTestId('genre-dropdown');
//     fireEvent.click(genreDropdown);
//     const firstGenreInDropdown = genreDropdown.firstChild;
//     if (!firstGenreInDropdown) {
//         throw new Error('Test failed');
//     }
//     fireEvent.click(firstGenreInDropdown);
//     await waitFor(() => expect(window.fetch).toHaveBeenCalled());
//     const nextPageIcon = screen.getByRole('Go to next page');
//     fireEvent.click(nextPageIcon);
//     await waitFor(() => expect(window.fetch).toHaveBeenCalled());

//     const previousPageIcon = screen.getByAltText('Go to previous page');
//     fireEvent.click(previousPageIcon);
//     await waitFor(() => expect(window.fetch).not.toHaveBeenCalled());
// });