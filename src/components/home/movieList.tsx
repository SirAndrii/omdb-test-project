import styles from "@/pages/home/home.module.scss";
import {MovieList as MovieListInterface, SearchResult} from "@/interfaces/interfaces";
import {useHorizontalScroll} from "@/components/useHorizontalScrol";
import Link from "next/link";


export default function MovieList({movieList}: MovieListInterface) {
    const containerRef = useHorizontalScroll();

    if (typeof movieList.movies === "string") {
        return movieList.movies
    }

    return (
        <div className={styles.wrapper}>
            <h2>{movieList.title}</h2>

            <section ref={containerRef}>
                {
                    movieList.movies.map((movie: SearchResult) =>
                        <div className={styles.item} key={movie.imdbID}>
                            <Link href={`movie/${movie.imdbID}`}>
                                <img src={movie.Poster}/>
                                <pre style={{display: 'none'}}>
                                  {JSON.stringify(movie, null, 2)}
                                 </pre>
                            </Link>
                        </div>
                    )
                }
            </section>

        </div>
    )

}