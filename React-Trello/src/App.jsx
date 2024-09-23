import { dataFetcher } from './assets/dataFetcher/dataFetcher.jsx';
import Card from './components/Card/index.jsx';
import './App.css'
import { useEffect, useState } from 'react';

function App() {
  const [tareas, setTareas] = useState([]);

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const datos = await dataFetcher('http://localhost:3000/api/tasks');
        setTareas(datos);
        console.log(datos);
      } catch (e) {
        console.error(e);
      }
    };

    fetchDatos();
  }, []);

  return (
    <div className='app'>
      <Card type="backlog" data={tareas} />
    </div>
  )
}

export default App
