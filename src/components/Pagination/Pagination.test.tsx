import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Pagination from './Pagination';


test('Next page button should be disabled if there are no other pages', async () => {
    render(<Pagination currentPage={1} maxPages={1}></Pagination>)

    const nextPageIcon = screen.getByAltText('Next page');
    expect(nextPageIcon).toHaveClass('disabled');
});

test('Previous page button should be disabled if there are no other pages', async () => {
    render(<Pagination currentPage={1} maxPages={1}></Pagination>)

    const previousPageIcon = screen.getByAltText('Previous page');
    expect(previousPageIcon).toHaveClass('disabled');
});

test('Next page button should not be disabled if there are more pages', async () => {
    render(<Pagination currentPage={1} maxPages={2}></Pagination>)

    const nextPageIcon = screen.getByAltText('Next page');
    expect(nextPageIcon).not.toHaveClass('disabled');
});

test('Previous page button should not be disabled if there are previous pages', async () => {
    render(<Pagination currentPage={2} maxPages={2}></Pagination>)

    const previousPageIcon = screen.getByAltText('Previous page');
    expect(previousPageIcon).not.toHaveClass('disabled');
});