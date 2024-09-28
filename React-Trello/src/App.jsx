import { dataFetcher } from './shared/DataFetcher/index.jsx';
import Card from './components/Card/index.jsx';
import './App.css'
import { useEffect, useState } from 'react';
import Button from './components/Button/index.jsx';
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
      <div className='heading'>componente Gestor de tareas</div>
      <div className='board'>
        <Card status='Backlog' data={tareas.filter(tarea => tarea.status === 'Backlog')} />
        <Card status='To Do' data={tareas.filter(tarea => tarea.status === 'To Do')} />
        <Card status='In Progress' data={tareas.filter(tarea => tarea.status === 'In Progress')} />
        <Card status='Blocked' data={tareas.filter(tarea => tarea.status === 'Blocked')} />
        <Card status='Done' data={tareas.filter(tarea => tarea.status === 'Done')} />
      </div>
      <Button text='Agregar tarea' onClick={abrirModal}/>

      {abrirModalAgregar && (
          <Modal isEditTask={false} task={emptyTask} cerrarModal={cerrarModal}/>
      )}
    </div>
  )
}

export default App;
