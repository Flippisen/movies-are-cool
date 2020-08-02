
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { SearchProvider } from '../../contexts/SearchContext';
import SearchPage from './SearchPage';

beforeEach(() => {
    jest.spyOn(window, 'fetch');

    render(<SearchProvider><SearchPage></SearchPage></SearchProvider>)
})

test('When search term is entered, fetch request should be made', async () => {
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


    const searchBar = screen.getByPlaceholderText('Search...');
    fireEvent.change(searchBar, { target: { value: 'Mad max' }});
    await waitFor(() => expect(window.fetch).toHaveBeenCalled());
});

test('Clicking on load more button should fetch more data', async () => {
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

    const searchBar = screen.getByPlaceholderText('Search...');
    fireEvent.change(searchBar, { target: { value: 'Mad max' } });
    await waitFor(() => expect(window.fetch).toHaveBeenCalled());

    const loadMore = screen.getByText('Load more');
    fireEvent.click(loadMore)
    await waitFor(() => expect(window.fetch).toHaveBeenCalled());
});

test('it should only display load more button when there are more results to load', async () => {
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


    const searchBar = screen.getByPlaceholderText('Search...');
    fireEvent.change(searchBar, { target: { value: 'Mad max' } });
    await waitFor(() => expect(window.fetch).toHaveBeenCalled());

    const loadMoreButton = screen.queryByText('Load more');
    expect(loadMoreButton).toBeNull();
});

test('if there are no more results to load, then load more button should not be displayed', async () => {
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

    const searchBar = screen.getByPlaceholderText('Search...');
    fireEvent.change(searchBar, { target: { value: 'Mad max' } });
    await waitFor(() => expect(window.fetch).toHaveBeenCalled());

    const loadMore = screen.getByText('Load more');
    expect(loadMore).not.toBeNull();
})