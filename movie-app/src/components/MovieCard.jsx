import React from 'react'


const MovieCard = ({ movie: { title, vote_average, release_date, poster_path, original_language } }) => {
  return (
    // UI for movie card
    <div className='movie-card'>
        {/* display movie poster if it exists, if not display no-movie image */}
        <img src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : '/no-movie.png'} alt={title} />
        
        <div className='mt-4'>
            {/* display title of movie */}
            <h3>{title}</h3>

            <div className='content'>
                {/* display movie rating */}
                <div className='rating'>
                    <img src="star.svg" alt="star icon" />
                    {/* if movie rating exist round to the 1 decimal place, if not display N/A */}
                    <p>{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
                </div>

                {/* for separation */}
                <span>•</span>
                {/* display movie language */}
                <p className='lang'>{original_language}</p>
                {/* for separation */}
                <span>•</span>
                {/* display year movie was release */}
                <p className='year'>
                    {/* if movie release date exist display only the year, if not display N/A */}
                    {release_date ? release_date.split('-')[0] : 'N/A'}
                </p>

            </div>
        </div>
    </div>
  )
}

export default MovieCard