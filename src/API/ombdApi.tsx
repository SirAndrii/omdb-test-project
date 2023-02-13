import * as process from "process";
import {instanceOf} from "prop-types";
import {ISearchResult} from "@/interfaces/interfaces";

const apiURL: string = 'https://www.omdbapi.com/?apikey=' + process.env.NEXT_PUBLIC_OMDB_APIKEY;


interface ISearch {
    Search: ISearchResult[];
}

interface IFalseResponse {
    Error: string;
    Response: Boolean;
}

const init = {
    mode: '*cors',
    headers: {
        'Content-Type': 'application/json'
    }
}
/**
 * @desc A function API that returns movie information by querying the Open Movie Database API.
 * @param {string} movie - The NAME or IMDB ID of the movie to retrieve information for.
 * @returns {Promise<string | ISearchResult>} - Returns a promise that resolves to either a string containing the error message or an object of type ISearchResult containing the movie information.
 * @throws {Error} - Throws an error if the movie information could not be retrieved or if the response from the API is an error.
 */
export const getMovieData = async (movie: string): Promise <string | ISearchResult> => {
    try {
        const regexId = /tt\d{4,10}/;
        const movieQuery = ( regexId.test(movie) ? 'i=' : 't=') + movie

        const res = await fetch(`${apiURL}&${movieQuery}&plot=full`);
        const data = await res.json();

        if (data instanceof Error)
            throw new Error(data.message);

        if ("Response" in data && data.Response === false)
            throw new Error(data.Error);

        return data as ISearchResult;

    } catch (error:any) {
        //error can be unknown in Typescript 4.
        return error.message;
    }
}


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
            return (data as ISearch).Search
        })


