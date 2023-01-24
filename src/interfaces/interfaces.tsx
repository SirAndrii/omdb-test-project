export interface SearchResult {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
}
export interface MovieList {
    title: string;

    [movies: string]: SearchResult[] | string;
}
export interface MovieLists {
    movieLists: MovieList[];
}