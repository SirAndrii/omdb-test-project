export interface ISearchResult {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
}
export interface IMovieList {
    title: string;
    movies: ISearchResult[] | string;
}
export interface IMovieLists {
    movieLists: IMovieList[];
}