import {createContext, useState} from "react";
import {SearchResult} from "@/interfaces/interfaces";


export const AppContext = createContext({})

export const AppContextProvider = ({ children}) => {
const [visitedMoviePages, setVisitedMoviePages] = useState<SearchResult[]>([]);

const cacheVisitedMovie = (newMovie: SearchResult) => {
    setVisitedMoviePages([...visitedMoviePages, newMovie])
}

    return <AppContext.Provider
        value={{visitedMoviePages, cacheVisitedMovie }}
    >{children}</AppContext.Provider>
}



