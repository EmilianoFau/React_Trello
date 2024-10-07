import { dataFetcher } from './shared/DataFetcher/index.jsx';
import Card from './components/Card/index.jsx';
import './App.css'
import { useEffect, useState } from 'react';
import Button from './components/Button/index.jsx';
import Heading from './components/Heading/index.jsx';
import { Modal } from './components/Modal/index.jsx';
import { useTareas } from './contexts/tasks.jsx';
import { useTheme } from './contexts/theme.jsx';

function App() {
  const { tareas, setTareas } = useTareas();
  const { isDarkMode, toggleTheme } = useTheme();
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
  }, [setTareas]);

  const abrirModal = () => {
    setAbrirModalAgregar(true);
  }

  const cerrarModal = () => {
    setAbrirModalAgregar(false);
  }


  return (
    <div className={`app ${isDarkMode ? 'dark-mode' : ''}`}>
      <Heading text='Gestor de Tareas' />
      <Button 
        text={`Cambiar a ${isDarkMode ? 'modo claro' : 'modo oscuro'}`} 
        onClick={toggleTheme} 
        className={`toggle-theme-button ${isDarkMode ? 'dark-mode' : ''}`}
      />
      <div className='board'>
        <Card status='Backlog' data={tareas.filter(tarea => tarea.status === 'Backlog')} />
        <Card status='To Do' data={tareas.filter(tarea => tarea.status === 'To Do')} />
        <Card status='In Progress' data={tareas.filter(tarea => tarea.status === 'In Progress')} />
        <Card status='Blocked' data={tareas.filter(tarea => tarea.status === 'Blocked')} />
        <Card status='Done' data={tareas.filter(tarea => tarea.status === 'Done')} />
      </div>
      <Button text='Agregar tarea' onClick={abrirModal}/>

      {abrirModalAgregar && (
          <Modal 
            isEditTask={false} 
            task={emptyTask} 
            cerrarModal={cerrarModal} 
            />
      )}
    </div>
  )
}

export default App;
