import * as process from "process";
import {instanceOf} from "prop-types";
import {SearchResult} from "@/interfaces/interfaces";

const apiURL: string = 'http://www.omdbapi.com/?apikey=' + process.env.NEXT_PUBLIC_OMDB_APIKEY ;


interface Search {
    Search: SearchResult[];
}

interface FalseResponse {
    Error: string;
    Response: Boolean;
}

export const getMovieData = (movieId: string | string[]): Promise<string | SearchResult | FalseResponse> =>
    fetch(`${apiURL}&i=${movieId}&plot=full`)
        .then((res: Response) => res.json())
        .then((data: SearchResult | FalseResponse | Error) => {
            if (data instanceof Error) {
                return data.message
            }
            if ("Response" in data && data.Response === false) {
                return data.Error
            }
            return data
        })


export const getTenMovies = (page = 1, search = 'star'): Promise<SearchResult[] | string> =>
    fetch(`${apiURL}&s=${search}}&page=${page}`)
        .then((res: Response) => res.json())
        .then((data: Search | FalseResponse | Error) => {
            if (data instanceof Error) {
                return data.message
            }
            if ("Response" in data && data.Response === false) {
                return data.Error
            }
            return data.Search
        })


