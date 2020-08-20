export class SortOption {
    public id: string;
    public displayValue: string;

    constructor(id: string, displayValue: string) {
        this.id = id;
        this.displayValue = displayValue;
    }
}

export const sortOptions: SortOption[] = [
    new SortOption('popularity.asc', 'Popularity Asc'),
    new SortOption('popularity.desc', 'Popularity Desc'),
    new SortOption('release_date.asc', 'Release Date Asc'),
    new SortOption('release_date.desc', 'Release Date Desc'),
    new SortOption('revenue.asc', 'Revenue Asc'),
    new SortOption('revenue.desc', 'Revenue Desc'),

]