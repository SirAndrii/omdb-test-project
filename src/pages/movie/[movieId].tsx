import Head from 'next/head'
import {useRouter} from 'next/router'
import {AppContext} from "@/context/app.context";
import {useContext, useEffect, useState} from "react";
import {SearchResult} from "@/interfaces/interfaces";
import {getMovieData} from "@/API/ombdApi";

import styles from './movie.module.scss'

interface IMovie extends SearchResult {
    Released: string,
    Runtime: string,
    Actors: string,
    Plot: string
}

export default function FilmInfo() {
    const router = useRouter();
    const {movieId} = router.query

    const [currentMovie, setCurrentMovie] = useState<IMovie | null>(null);
    const {visitedMoviePages, cacheVisitedMovie} = useContext(AppContext)


    useEffect(() => {
        const visitedMovie = visitedMoviePages.find(movie => movie?.imdbID === movieId)

        if (visitedMovie && visitedMovie.Title) {
            setCurrentMovie(visitedMovie)
        } else {
            getMovieData(movieId).then(data => {
                console.log(data)
                cacheVisitedMovie(data)
            })
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

            <section className={styles.mainContent} aria-labelledby="main-content-label">
                <div className={styles.leftCol}>
                    <img src={currentMovie.Poster} alt={`Movie Poster ${currentMovie.Title}`}/>
                </div>
                <div className={styles.rightCol}>
                        <h1 id="main-content-label">{currentMovie.Title}</h1>

                        <p><strong>Released:</strong> {currentMovie.Released} | <strong>Runtime:</strong> {currentMovie.Runtime} </p>
                        <p><strong>Actors:</strong> {currentMovie.Actors}</p>
                        <p><strong>Plot:</strong> {currentMovie.Plot}</p>

                    <button
                        tabIndex={0}
                        aria-label="Go back"
                        onClick={() => router.back()}
                    >Click here to go back</button>
                </div>

            </section>

        </main>
    )
}

