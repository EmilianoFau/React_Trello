import DataFetcher from './components/dataFetcher/dataFetcher.jsx';
import './App.css'

function App() {

  return (
    <div className='app'>
      <DataFetcher url="http://localhost:3000/api/tasks"/>
    </div>
  )
}

export default App
