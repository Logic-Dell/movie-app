import React from 'react'
import { useState } from 'react';
import Search from './components/Search'

const App = () => {
  const [search, setSearch] = useState('');

  return (
    <main>
      <div className='pattern'/>

      <div className='wrapper'>
        <header>
          <h1 className='text-4xl font-bold'>
            <img src="./hero-img.png" alt="Movies Poster" />
            Find <span className='text-gradient'>Movies</span> You'll Enjoy Without The Hassle
          </h1>
        </header>
      </div>

      <Search search={search} setSearch={setSearch} />
      
      <h1 className='text-white'>{search}</h1>
      
    </main>
  )
}

export default App