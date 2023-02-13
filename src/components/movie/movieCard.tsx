import styles from "@/components/movie/movie.module.scss";

export default function MovieCard({currentMovie}) {
    return (
        <section className={styles.mainContent}
                 style={{backgroundImage: currentMovie?.Poster ? `url('${currentMovie.Poster}')` : 'grey'}}
                 aria-labelledby="main-content-label">
            <div className={styles.leftCol}>
                <img src={currentMovie.Poster} alt={`Movie Poster ${currentMovie.Title}`}/>
            </div>
            <div className={styles.rightCol}>
                <h1 id="main-content-label">{currentMovie.Title}</h1>

                <p>
                    <strong>Released:</strong> {currentMovie.Released} | <strong>Runtime:</strong> {currentMovie.Runtime}
                </p>
                <p><strong>Actors:</strong> {currentMovie.Actors}</p>
                <p><strong>Plot:</strong> {currentMovie.Plot}</p>

            </div>

        </section>
    )
}