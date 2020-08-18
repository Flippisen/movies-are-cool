import React, { useState } from 'react';
import { useGenreState } from '../../contexts/GenreContext';
import './GenrePage.scss';
import GenreDropdown from './GenreDropdown/GenreDropdown';

export default () => {
    const { genreList, setGenreList, selectedGenres, setSelectedGenres } = useGenreState();
    const [isLoading, setIsLoading] = useState(false);

    return <div className='genre-page'>
        <div className='header-row'>
            <GenreDropdown></GenreDropdown>
        </div>
    </div>
}