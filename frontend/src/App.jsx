import { useState, useEffect } from 'react'
import './App.css'
import logo from "./assets/popcorn.png";
// import background from "./assets/wiwi.jpg";

const API_URL = "http://localhost:3000/api/movies";

function App() {
  const [movies, setMovies] = useState([]);

  const [newMovieTitle, setNewMovieTitle] = useState('')
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  async function loadMovies() {
    try {
      setError('');
      setIsLoading(true);
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Could not load');
      const data = await response.json();
      setMovies(data);
    } catch (err) {
      setError('Could not load movies from the backend.');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadMovies();
  }, []);

  async function addMovie(event) {
    event.preventDefault();
    if (newMovieTitle.trim() === '') return;
    try {
      setIsSaving(true);
      setError('');
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newMovieTitle.trim() })
      });
      if (!response.ok) throw new Error('Could not add');
      setNewMovieTitle('');
      await loadMovies();
    } catch (err) {
      setError('Could not add the movie');
    } finally {
      setIsSaving(false);
    }
  }

  async function completeMovie(movie) {
    try {
      setError('');
      const response = await fetch(`${API_URL}/${movie._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: true })
      });
      if (!response.ok) throw new Error('Could not update');
      await loadMovies();
    } catch (err) {
      setError('Could not update the movie.');
    }
  }

  async function deleteMovie(movieId) {
    try {
      setError('');
      const response = await fetch(`${API_URL}/${movieId}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Could not delete');
      await loadMovies();
    } catch (err) {
      setError('Could not delete the movie.');
    }
  }

  if (isLoading) {
    return <p className="message">Loading movies...</p>;
  }

  // function completeMovie(movieId) {
  //   const updatedMovies = movies.map((movie) => {
  //     if (movie.id === movieId) {
  //       return { ...movie, isCompleted: true };
  //     }

  //     return movie;
  //   });

  //   setMovies(updatedMovies);
  // }

  function clearMovie() {
    setMovies([]);
  }

  // function deleteMovie(movieId) {
  //   const updatedMovies = movies.filter(movie => movie.id !== movieId);
  //   setMovies(updatedMovies);
  // }

  // useEffect(() => {
  //   fetch("http://localhost:3000/api/movies")
  //     .then(res => res.json())
  //     .then(data => setMovies(data));
  // }, []);

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
                  <article className='movie-card' key={movie._id}>
                    <div>
                      <h2>{movie.title}</h2>
                      <p>Status: {movie.completed ? "Watched" : "Not yet"} </p>
                    </div>

                    <div>
                      <button
                        className={movie.completed ? "completed-btn" : ""}
                        onClick={() => completeMovie(movie._id)}
                      >
                        {movie.completed ? (<><ion-icon name="checkmark-outline"></ion-icon> Watched</>) : ("Mark as completed")}
                      </button>

                      <button onClick={() => deleteMovie(movie._id)}>
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
