import { useState } from 'react'
import './App.css'
import logo from "./assets/brack.png";
// import background from "./assets/back.jpg";

function App() {
  const [movies, setMovies] = useState([

  ]);

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
        return { ...movie, isCompleted: true }
      }

      return movie;
    })
    setMovies(updatedMovies)
  }

  function clearMovie() {
    setMovies([]);
  }

  return (
    <>
      {/* <div
        className="app"
        style={{
          backgroundImage: `url(${background})`,
        }}> */}
      <main className='main'>
        <div className='box'>
          <img src={logo} alt="Logo" />
          <div className='header-text'>
            <h1>Name</h1>
            <p>Catchy line</p>
          </div>
        </div>

        <div className='box'>
          <h4>Total movies: {movies.length}</h4>
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

          <section className='movie-list'>
            {movies.length === 0 ? (
              <p className='empty'>No movies yet.</p>
            ) :
              movies.map((movie) => (
                <article className='movie-card' key={movie.id}>
                  <div>
                    <h2>{movie.title}</h2>
                    <p>Status: {movie.isCompleted ? 'Completed' : 'Not yet'}</p>
                  </div>

                  <button onClick={() => completeMovie(movie.id)}>
                    {movie.isCompleted ? "Done" : "Mark as completed"}
                  </button>

                </article>
              ))}
          </section>
        </div>
      </main>
      {/* </div> */}
    </>
  )
}

export default App
