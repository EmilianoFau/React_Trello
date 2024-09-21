import Card from './components/Card/index.jsx';
import { Suspense } from 'react';
import { fetchData } from './fetchData.jsx';
import './App.css'


const apiData = fetchData("http://localhost:3000/api/tasks");

function App() {
  const data = apiData.read();

  return (
    <div className='app'>
      <Suspense fallback={<div>Loading...</div>}>
        <Card type="backlog" data={data} />
      </Suspense>
    </div>
  )
}

export default App
