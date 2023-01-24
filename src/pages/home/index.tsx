/*import styles from '@/styles/Home.module.css'*/
import Head from "next/head"
import {getTenMovies} from "@/API/ombdApi";

import {IMovieList, IMovieLists, ISearchResult} from "@/interfaces/interfaces";
import MovieList from "@/components/home/movieList";

export default function ListMovies({movieLists}: IMovieLists) {

    return (
        <>
            <Head>
                <title>Netflix Clone</title>
                <meta name="description" content="Generated by create next app"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main>
                <h1>Challenge project</h1>
                {movieLists.map(
                    (movieList: IMovieList, index: number) =>
                        <MovieList key={index} title={movieList.title} movies={movieList.movies}/>
                )}
            </main>
        </>
    )
}


export async function getStaticProps() {
    const tenMoviesStar: ISearchResult[] | string = await getTenMovies(1, 'star')
    const tenMoviesCat: ISearchResult[] | string = await getTenMovies(1, 'cat')

    const MoviesAboutStar: IMovieList = {
        title: 'Star',
        movies: tenMoviesStar
    }

    const MoviesAboutCat: IMovieList = {
        title: 'Cat',
        movies: tenMoviesCat
    }

    return {
        props: {
            movieLists: [
                MoviesAboutStar,
                MoviesAboutCat
            ]
        },
        revalidate: 3600 // revalidate if there are requests
    };
}
