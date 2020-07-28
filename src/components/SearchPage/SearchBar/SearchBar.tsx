import React from 'react';
import { useSearchState } from '../../../contexts/SearchContext';
import SearchIcon from '@material-ui/icons/Search';

export default () => {
    const { setSearchTerm, searchTerm } = useSearchState();

    const updateValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    }

    return (
        <div>
            <input value={searchTerm} onChange={updateValue} placeholder='Search...'></input>
            <SearchIcon></SearchIcon>
        </div>
    )
}