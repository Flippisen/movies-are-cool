import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NavBar from './NavBar';

beforeEach(() => {
    render(
        <NavBar></NavBar>
    );
});

test('when user clicks on search link, they are taken to the search page', () => {
    const searchDiv = screen.getByText('Search');
    fireEvent.click(searchDiv);
    expect(window.location).toEqual('/');
});

test('when user clicks on favourites link, they are taken to favourites page', () => {
    const favouritesDiv = screen.getByText('Favourites');
    fireEvent.click(favouritesDiv);
    expect(window.location).toEqual('/favourites');
});

test('when user clicks on watch later link, they are taken to watch later page', () => {
    const watchLaterDiv = screen.getByText('Watch Later');
    fireEvent.click(watchLaterDiv);
    expect(window.location).toEqual('/watch-later');
})