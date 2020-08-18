import React, { useEffect, useState } from 'react';
import { useGenreState } from '../../contexts/GenreContext';
import { makeApiCall, ApiMethods } from '../../services/api';
import Select from '@material-ui/core/Select';
import { Input, MenuItem } from '@material-ui/core';
import './GenrePage.scss';

export default () => {
    const { genreList, setGenreList, selectedGenres, setSelectedGenres } = useGenreState();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (genreList && genreList.length > 0) {
            return;
        }
        const getListOfGenres = async () => {
            setIsLoading(true);
            const response = await makeApiCall('/genre/movie/list', ApiMethods.GET);
            setGenreList(response['genres']);
            setIsLoading(false);
        }
        getListOfGenres();
    }, [])

    const onSelectedGenreChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setSelectedGenres(event.target.value as number[]);
    }

    const genreListSelect = () => {
        return <Select
            labelId="genre-dropdown-label"
            id="genre-dropdown"
            multiple
            value={selectedGenres}
            onChange={onSelectedGenreChange}
            input={<Input />}
            data-testid='genre-dropdown'
        >
            {genreList && genreList.map((genre) => (
                <MenuItem key={genre.id} value={genre.id}>
                    {genre.name}
                </MenuItem>
            ))}
        </Select>
    }

    return <div className='genre-page'>
        <div className='header-row'>
            {!isLoading && genreListSelect()}
        </div>
    </div>
}