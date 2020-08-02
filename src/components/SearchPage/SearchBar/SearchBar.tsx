import React from 'react';
import { useSearchState } from '../../../contexts/SearchContext';
import SearchIcon from '@material-ui/icons/Search';
import './SearchBar.scss';

export default () => {
    const { setSearchTerm, searchTerm } = useSearchState();

    const updateValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    }

    return (
        <div className='SearchBarContainer'>
            <div className='SearchBar'>
                <input value={searchTerm} onChange={updateValue} placeholder='Search...'></input>
                <SearchIcon></SearchIcon>
            </div>
        </div>
    )
}