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
      <div className='heading'>componente Gestor de tareas</div>
      <div className='board'>
        <Card status='Backlog' data={tareas.filter(tarea => tarea.status === 'Backlog')} />
        <Card status='To Do' data={tareas.filter(tarea => tarea.status === 'To Do')} />
        <Card status='In Progress' data={tareas.filter(tarea => tarea.status === 'In Progress')} />
        <Card status='Blocked' data={tareas.filter(tarea => tarea.status === 'Blocked')} />
        <Card status='Done' data={tareas.filter(tarea => tarea.status === 'Done')} />
      </div>
    </div>
  )
}

export default App;
