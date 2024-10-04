import Styles from './index.module.css';
import { useState } from 'react';
import { Modal } from '../Modal';
import Task from '../Task';
import { deleteData } from "../../shared/DataFetcher/index";

function Card ({ status, data, setTareas }) {
    const [abrirModalEdit, setAbrirModalEdit] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);

    const abrirModal = (task) => {
        setCurrentTask(task);
        setAbrirModalEdit(true);
    }

    const cerrarModal = () => {
        setAbrirModalEdit(false);
        setCurrentTask(null);
    }

    const handleDelete = async (id) => {
        try {
            await deleteData('http://localhost:3000/api/tasks', id);
            setTareas((prevTasks) => prevTasks.filter(task => task.id !== id)); 
        } catch (error) {
            console.log('Error al eliminar la tarea:', error);
        }
    };

    return (
        <>
            <ul className={Styles.card}>
                <h3>{status}</h3>
                {data.map(task => (
                    <li key={task.id} onClick={() => abrirModal(task)}>
                        <Task 
                            id={task.id} 
                            title={task.title} 
                            description={task.description} 
                            assignedTo={task.assignedTo} 
                            endDate={task.endDate} 
                            status={task.status} 
                            priority={task.priority} 
                            onDelete={handleDelete}
                        />
                    </li>
                ))}
            </ul>

            {abrirModalEdit && (
                <Modal isEditTask={abrirModalEdit} task={currentTask} cerrarModal={cerrarModal}/>
            )}
        </>
    )
}

export default Card;