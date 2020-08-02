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

export class MovieDetails extends Movie {
    public belongsToCollection: any | undefined;
    public budget: number;
    public genres: Genre[];
    public homepage: string;
    public imdbId: string;
    public productionCompanies: ProductionCompany[];
    public revenue: number;
    public runtime: string | undefined;
    public spokenLanguage: SpokenLanguage[];
    public status: string; // Enum
    public tagline: string | undefined; 

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
        voteAverage: number,
        belongsToCollection: any | undefined,
        budget: number,
        genres: Genre[],
        homepage: string,
        imdbId: string,
        productionCompanies: ProductionCompany[],
        revenue: number,
        runtime: string | undefined,
        spokenLanguage: SpokenLanguage[],
        status: string,
        tagline: string | undefined
    ) {
        super(
            posterPath,
            adult,
            overview,
            releaseDate,
            genreIds,
            id,
            originalTitle,
            originalLanguage,
            title,
            backdropPath,
            popularity,
            voteCount,
            video,
            voteAverage
        );
        this.belongsToCollection = belongsToCollection;
        this.budget = budget;
        this.genres = genres;
        this.homepage = homepage;
        this.imdbId = imdbId;
        this.productionCompanies = productionCompanies;
        this.revenue = revenue;
        this.runtime = runtime;
        this.spokenLanguage = spokenLanguage;
        this.status = status;
        this.tagline = tagline;
    }
}

interface SpokenLanguage {
    iso_639_1: string;
    name: string;
}

interface ProductionCompany {
    name: string;
    id: string;
    logoPath: string | undefined;
    originCountry: string
}

interface Genre {
    id: string;
    name: string;
}