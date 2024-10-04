import { dataFetcher } from './shared/DataFetcher/index.jsx';
import Card from './components/Card/index.jsx';
import './App.css'
import { useEffect, useState } from 'react';
import Button from './components/Button/index.jsx';
import Heading from './components/Heading/index.jsx';
import { Modal } from './components/Modal/index.jsx';

function App() {
  const [tareas, setTareas] = useState([]);
  const [abrirModalAgregar, setAbrirModalAgregar] = useState(false);

  const emptyTask = {
    title: '',
    description: '',
    assignedTo: '',
    endDate: '',
    status: '',
    priority: '',
  }

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

  const abrirModal = () => {
    setAbrirModalAgregar(true);
  }

  const cerrarModal = () => {
    setAbrirModalAgregar(false);
  }


  return (
    <div className='app'>
      <Heading text='Gestor de Tareas' />
      <div className='board'>
        <Card status='Backlog' data={tareas.filter(tarea => tarea.status === 'Backlog')} setTareas={setTareas} />
        <Card status='To Do' data={tareas.filter(tarea => tarea.status === 'To Do')} setTareas={setTareas} />
        <Card status='In Progress' data={tareas.filter(tarea => tarea.status === 'In Progress')} setTareas={setTareas} />
        <Card status='Blocked' data={tareas.filter(tarea => tarea.status === 'Blocked')} setTareas={setTareas} />
        <Card status='Done' data={tareas.filter(tarea => tarea.status === 'Done')} setTareas={setTareas} />
      </div>
      <Button text='Agregar tarea' onClick={abrirModal}/>

      {abrirModalAgregar && (
          <Modal 
            isEditTask={false} 
            task={emptyTask} 
            cerrarModal={cerrarModal} 
            setTareas={setTareas}
            />
      )}
    </div>
  )
}

export default App;
