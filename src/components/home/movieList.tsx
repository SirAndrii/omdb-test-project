import styles from "@/pages/home/home.module.scss";
import {IMovieList, ISearchResult} from "@/interfaces/interfaces";
import {useHorizontalScroll} from "@/components/useHorizontalScrol";
import Link from "next/link";


export default function MovieList(props: IMovieList) {
    const containerRef = useHorizontalScroll();
    const {movies, title} = props;

    if (typeof movies === "string") {
        return <>movies</>
    }

    return (
        <div className={styles.wrapper}>
            <h2 aria-hidden={true}>{title}</h2>

            <section
                ref={containerRef}
                aria-label={`${movies.length} movies about ${title}`}
            >
                {
                    movies.map((movie: ISearchResult) =>
                        <div
                            key={movie.imdbID}
                            className={styles.item}
                        >
                            <Link
                                tabIndex={0}
                                href={`movie/${movie.imdbID}`}
                                title={movie.Title}
                            >
                                <img src={movie.Poster}/>
                            </Link>
                        </div>
                    )
                }
            </section>

        </div>
    )

}