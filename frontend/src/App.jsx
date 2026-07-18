import { useState } from 'react'
import './App.css'
import logo from "./assets/popcorn.png";
// import background from "./assets/wiwi.jpg";

function App() {
  const [movies, setMovies] = useState([]);

  const [newMovieTitle, setNewMovieTitle] = useState('')

  function addMovie(event) {
    event.preventDefault();

    if (newMovieTitle.trim() === '') {
      return;
    }

    const newMovie = {
      id: Date.now(),
      title: newMovieTitle,
      isCompleted: false
    };

    setMovies([...movies, newMovie]);
    setNewMovieTitle('');
  }

  function completeMovie(movieId) {
    const updatedMovies = movies.map((movie) => {
      if (movie.id === movieId) {
        return { ...movie, isCompleted: true };
      }

      return movie;
    });

    setMovies(updatedMovies);
  }

  function clearMovie() {
    setMovies([]);
  }

  function deleteMovie(movieId) {
    const updatedMovies = movies.filter(movie => movie.id !== movieId);
    setMovies(updatedMovies);
  }

  return (
    <>
      <div className="wallpaper">
        <div className="app">

          <header className="header">
            <img src={logo} alt="Logo" className="logo" />
            <div className='header-text'>
              <h1>BingeList</h1>
              <p>Never lose track of a great film.</p>
            </div>
          </header>

          <aside className="sidebar">
            <h2>Movie Tracker</h2>

            <div className='total'>
              <p>Total movies</p>
              <h4>{movies.length}</h4>
            </div>

          </aside>

          <main className="content">

            <section className="tool-bar">
              <form onSubmit={addMovie}>
                <input
                  value={newMovieTitle}
                  onChange={(event) => setNewMovieTitle(event.target.value)}
                  placeholder='Add new movie'
                />
                <button type='submit'>Add Movie</button>
                <button type='button' onClick={clearMovie}>
                  Clear All
                </button>
              </form>
            </section>

            <section className="movie-list">
              {movies.length === 0 ? (
                <p className='empty'>No movies yet.</p>
              ) :
                movies.map((movie) => (
                  <article className='movie-card' key={movie.id}>
                    <div>
                      <h2>{movie.title}</h2>
                      <p>Status: {movie.isCompleted ? "Watched" : "Not yet"} </p>
                    </div>

                    <div>
                      <button
                        className={movie.isCompleted ? "completed-btn" : ""}
                        onClick={() => completeMovie(movie.id)}
                      >
                        {movie.isCompleted ? (<><ion-icon name="checkmark-outline"></ion-icon> Watched</> ) : ("Mark as completed")}
                      </button>

                      <button onClick={() => deleteMovie(movie.id)}>
                        <ion-icon name="trash-outline"></ion-icon>
                      </button>
                    </div>

                  </article>
                ))}
            </section>

          </main>

        </div>
      </div>
    </>
  )
}

export default App
