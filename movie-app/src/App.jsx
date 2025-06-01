import './App.css'

const Card = ({ title }) => {
  return (
    <div>
      <h2>{ title }</h2>
    </div>
  )
}

function App() {

  return (
    <>
      <h2>Movie Titles</h2>

      <Card title="Elementals" />
      <Card title="Frozen" />
      <Card title="Vivo" />
    </>
  )
}

export default App
