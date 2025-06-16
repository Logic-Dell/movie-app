import React from 'react'
import { useEffect, useState } from 'react';
import Search from './components/Search'
import Spinner from './components/Spinner';

// define the base url for the movie database API
const API_BASE_URL = 'https://api.themoviedb.org/3/';

// API key imported from environment variables (using Vite's import.meta.env)
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

// object to fetch request from the API
const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

const App = () => {
  // state to track user's search input
  const [search, setSearch] = useState('');

  // state to display error messages when fetching fails
  const [errorMesssage, setErrorMessage] = useState('');

  // state to store the list of movies fetched from the API
  const [movies, setMovies] = useState([]);

  // state to check loading
  const [isLoading, setIsLoading] = useState(false);

  // async function to fetch movies
  const fetchMovies = async () => {
    // set loading state to true before starting fetch
    setIsLoading(true);

    // clear any previous error message
    setErrorMessage('');

    try {
      // API endpoint with query for popular movies
      const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

      // make the API request
      const response = await fetch(endpoint, API_OPTIONS);

      // alert(response)

      // if response status is not OK throw an error
      if(!response.ok) {
        throw new Error("Failed to load movies");
      }

      // convert the response body to JSON
      const data = await response.json();

      // if the API returns an error structure
      if(data.Response == 'False') {
        // set an error message if available, or fallback to default
        setErrorMessage(data.Error || 'Failed to load movies');
        // clear any previously loaded movies
        setMovies([])
        return;
      }

      // if everything is okay, update the movies state with the results.
      setMovies(data.results || [])

    } catch(error) {
      // log any error to the console
      console.log(`Error fetching movies ${error}`)
      // update the error message state so it can be shown in the UI
      setErrorMessage('Error fetching movies. Please try again later!');
    } finally {
      // always stop the loading indicator after request finishes (success or fail)
      setIsLoading(false);
    }
  };

  // useEffect runs once when the component is mounted
  // here, it triggers the initial fetch of popular movies
  useEffect(() => {
    fetchMovies()
  }, []);

  return (
    <main>
      <div className='pattern'/>

      <div className='wrapper'>
        <header>
          <h1 className='text-4xl font-bold'>
            <img src="./hero-img.png" alt="Movies Poster" />
            Find <span className='text-gradient'>Movies</span> You'll Enjoy Without The Hassle
          </h1>

          <Search search={search} setSearch={setSearch} />

          <h1 className='text-white'>{search}</h1>
        </header>

        <section>
          <h2 className='mt-[50px]'>All Movies</h2>

          {/* condition to render loading state, error message, or movie list */}
          {isLoading ? (
            // show loading text while fetching data
            <Spinner />
          ) : errorMesssage ? (
            // show error message if fetching fails
            <p className='text-red-500'>{errorMesssage}</p>
          ) : (
            // show list of movies when data is loaded successfully
            <ul>
              {movies.map((movie) => (
                // display each movie title, using movie ID as the key
                <p key={movie.id} className='text-white'>{movie.title}</p>
              ))}
            </ul>
          )}
        </section>
      </div>

      
      
      
      
    </main>
  )
}

export default App