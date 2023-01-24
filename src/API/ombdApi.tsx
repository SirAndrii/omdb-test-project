import * as process from "process";
import {instanceOf} from "prop-types";
import {ISearchResult} from "@/interfaces/interfaces";

const apiURL: string = 'http://www.omdbapi.com/?apikey=' + process.env.NEXT_PUBLIC_OMDB_APIKEY ;


interface ISearch {
    Search: ISearchResult[];
}

interface IFalseResponse {
    Error: string;
    Response: Boolean;
}

export const getMovieData = (movieId: string): Promise<string | ISearchResult | IFalseResponse> =>
    fetch(`${apiURL}&i=${movieId}&plot=full`)
        .then((res: Response) => res.json())
        .then((data: ISearchResult | IFalseResponse | Error) => {
            if (data instanceof Error) {
                return data.message
            }
            if ("Response" in data && data.Response === false) {
                return data.Error
            }
            return data
        })


export const getTenMovies = (page = 1, search = 'star'): Promise<ISearchResult[] | string> =>
    fetch(`${apiURL}&s=${search}}&page=${page}`)
        .then((res: Response) => res.json())
        .then((data: ISearch | IFalseResponse | Error) => {
            if (data instanceof Error) {
                return data.message
            }
            if ("Response" in data && data.Response === false) {
                return data.Error
            }
            return data.Search
        })


