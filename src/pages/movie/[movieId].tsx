import Head from 'next/head'
import {useRouter} from 'next/router'
import {AppContext} from "@/context/app.context";
import {useContext, useEffect, useState} from "react";
import {ISearchResult} from "@/interfaces/interfaces";
import {getMovieData} from "@/API/ombdApi";

import styles from '../../components/movie/movie.module.scss'
import Image from "next/image";
import MovieCard from "@/components/movie/movieCard";

export default function FilmInfo() {
    const router = useRouter();
    const {movieId} = router.query
//todo write interface for currentMovie
    const [currentMovie, setCurrentMovie] = useState<IMovie | null>(null);
    // @ts-ignore
    const {visitedMoviePages, cacheVisitedMovie} = useContext(AppContext)


    useEffect(() => {
        if (typeof movieId === 'string') {
            const visitedMovie = visitedMoviePages.find((movie: IMovie) => movie.imdbID === movieId)

            if (visitedMovie && visitedMovie.Title) {
                setCurrentMovie(visitedMovie)
            } else {
                getMovieData(movieId).then(data => {
                    console.log(data)
                    cacheVisitedMovie(data)
                })
            }
        }
    }, [movieId, visitedMoviePages])

    if (!currentMovie) {
        return <>loading....</>
    }
    return (
        <main className={styles.container}>
            <Head>
                <title>{currentMovie.Title}</title>
            </Head>

            <MovieCard currentMovie={currentMovie} />

            <button
                tabIndex={0}
                aria-label="Go back"
                onClick={() => router.back()}
            >Click here to go back
            </button>
        </main>
    )
}

interface IMovie extends ISearchResult {
    Released: string,
    Runtime: string,
    Actors: string,
    Plot: string
}

