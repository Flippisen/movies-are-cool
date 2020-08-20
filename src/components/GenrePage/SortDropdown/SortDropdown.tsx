import React from 'react';
import { Select, Input, MenuItem } from '@material-ui/core';
import { sortOptions, SortOption } from './SortOptions';
import { useGenreState } from '../../../contexts/GenreContext';

// TODO: this could be made more generic if it were to be used in other components
export default () => {
    const { selectedSortValue, setSelectedSortValue } = useGenreState();
    
    const updateSelectedSortValue = (event: React.ChangeEvent<{ value: unknown }>) => {
        setSelectedSortValue(event.target.value as string);
    }

    return <div>
        <Select
            labelId="sort-dropdown-label"
            id="sort-dropdown"
            value={selectedSortValue}
            onChange={updateSelectedSortValue}
            input={<Input data-testid='sort-dropdown-input' />}

        >
            {sortOptions && sortOptions.map((option: SortOption) => (
                <MenuItem key={option.id} value={option.id}>
                    {option.displayValue}
                </MenuItem>
            ))}
        </Select>
    </div>
}