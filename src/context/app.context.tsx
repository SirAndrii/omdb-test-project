import {createContext, useState} from "react";
import {ISearchResult} from "@/interfaces/interfaces";

export const AppContext = createContext({})

export const AppContextProvider = ({children}) => {
    const [visitedMoviePages, setVisitedMoviePages] = useState<ISearchResult[]>([]);

    const cacheVisitedMovie = (newMovie: ISearchResult) => {
        setVisitedMoviePages([...visitedMoviePages, newMovie])
    }

    return (
        <AppContext.Provider
            value={{visitedMoviePages, cacheVisitedMovie}}
        >
            {children}
        </AppContext.Provider>
    )
}



