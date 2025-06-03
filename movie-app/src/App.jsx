import { useState } from "react"

const Card = ({ title }) => {
  const [hasLiked, setHasLiked] = useState(false);
  return (
    <div className='card'>
      <h2>{ title }</h2>

      <button onClick={() => setHasLiked(true)}>
        {hasLiked ? 'Liked' : 'Like'}
      </button>
    </div>
  )
}

function App() {

  return (
    <>
      <div className='card-container'>
        <Card title="Elementals" />
        <Card title="Frozen" />
        <Card title="Vivo" />
      </div>
    </>
  )
}

export default App
