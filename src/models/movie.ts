export class Movie {
    public posterPath: string;
    public adult: boolean;
    public overview: string;
    public releaseDate: Date;
    public genreIds: number[];
    public id: number;
    public originalTitle: string;
    public originalLanguage: string;
    public title: string;
    public backdropPath: string;
    public popularity: number;
    public voteCount: number;
    public video: boolean;
    public voteAverage: number;

    constructor(
        posterPath: string,
        adult: boolean,
        overview: string,
        releaseDate: string,
        genreIds: number[],
        id: number,
        originalTitle: string,
        originalLanguage: string,
        title: string,
        backdropPath: string,
        popularity: number,
        voteCount: number,
        video: boolean,
        voteAverage: number
    ) {
        this.posterPath = posterPath;
        this.adult = adult;
        this.overview = overview;
        this.releaseDate = new Date(releaseDate);
        this.genreIds = genreIds;
        this.id = id;
        this.originalTitle = originalTitle;
        this.originalLanguage = originalLanguage;
        this.title = title;
        this.backdropPath = backdropPath;
        this.popularity = popularity;
        this.voteCount = voteCount;
        this.video = video;
        this.voteAverage = voteAverage;
    }
}