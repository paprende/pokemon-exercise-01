import PokemonApp from './components/pokemon-app'
import './App.css'

function App() {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <PokemonApp></PokemonApp>
        </div>
      </div>
    </div>
  )
}

export default App