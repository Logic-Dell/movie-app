import React from 'react'
import { useEffect, useState } from 'react';
import Search from './components/Search'
import Spinner from './components/Spinner';
import MovieCard from './components/MovieCard';
import { useDebounce } from 'react-use'

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

  // state to store the debounced version of the user's search input to limit API calls while typing
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // Debounce search term to prevent making too many API requests
  // by waiting for the user to stop typing after 500ms
  useDebounce(() => setDebouncedSearch(search), 500, [search])

  // async function to fetch movies
  const fetchMovies = async (query = '') => {
    // set loading state to true before starting fetch
    setIsLoading(true);

    // clear any previous error message
    setErrorMessage('');

    try {
      // set the API endpoint: use search endpoint if a query is provided, otherwise fetch popular movies by default
      const endpoint = query ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}` : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

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

  
  useEffect(() => {
    fetchMovies(debouncedSearch)
  }, [debouncedSearch]);

  return (
    <main>
      <div className='pattern'/>

      <div className='wrapper'>
        <header>
          <h1 className='text-4xl font-bold'>
            <img src="./hero-img.png" alt="Movies Poster" />
            Find <span className='text-gradient'>Movies</span> You'll Enjoy Without The Hassle
          </h1>

          {/* Render the search input component with search state props */}
          <Search search={search} setSearch={setSearch} />

          {/* <h1 className='text-white'>{search}</h1> */}
        </header>

        <section className='all-movies'>
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
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}
        </section>
      </div>

      
      
      
      
    </main>
  )
}

export default App