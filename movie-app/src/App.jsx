import React from 'react'
import { useState } from 'react';
import Search from './components/Search'

const App = () => {
  const [search, setSearch] = useState('I am batman');

  return (
    <main>
      <div className='pattern'/>

      <div className='wrapper'>
        <header>
          <h1 className='text-4xl font-bold'>
            Find <span className='text-gradient'>Movies</span> You'll Enjoy Without The Hassle
          </h1>
        </header>
      </div>

      <Search search={search} setSearch={setSearch} />
      
    </main>
  )
}

export default App