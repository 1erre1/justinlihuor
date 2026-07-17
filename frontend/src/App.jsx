import { useState } from 'react'
import './App.css'
import logo from "./assets/popcorn.png";
import background from "./assets/wiwi.jpg";

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
    const updatedMovies = movies.map((movie) => {
      if (movie.id === movieId) {
        return { ...movie, status: "Trash" };
      }

      return movie;
    });

    setMovies(updatedMovies);
  }

  return (
    <>
      <div className="wallpaper">
        <div className="app">

          <header className="header">
            <img src={logo} alt="Logo" className="logo" />
            <div className='header-text'>
              <h1>Movie Tracker</h1>
              <p>Catchy line</p>
            </div>
          </header>

          <aside className="sidebar">
            <h2>Movie Tracker</h2>

            <h4>Dashboard</h4>

            <div className='total'>
              <h4>Total movies</h4>
              <p>{movies.length}</p>
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
                filteredMovies.map((movie) => (
                  <article className='movie-card' key={movie.id}>
                    <div>
                      <h2>{movie.title}</h2>
                      <p>Status: {movie.status}</p>
                    </div>

                    <button
                      className={movie.status === "Watched" ? "completed-btn" : ""}
                      onClick={() => completeMovie(movie.id)}
                    >
                      Status: {movie.isCompleted ? "Completed" : "Not yet"}
                    </button>

                    <button onClick={() => deleteMovie(movie.id)}>
                      🗑
                    </button>

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
