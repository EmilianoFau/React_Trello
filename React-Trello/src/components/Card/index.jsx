import Styles from './index.module.css';
import { useState, useRef } from 'react';
import { Modal } from '../Modal';
import Task from '../Task';

function Card ({ status, data }) {
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

    return (
        <>
            <ul className={Styles.card}>
                <h3>{status}</h3>
                {data.map(task => (
                    <li key={task.id} onClick={() => abrirModal(task)}>
                        <Task id={task.id} title={task.title} description={task.description} assignedTo={task.assignedTo} endDate={task.endDate} status={task.status} priority={task.priority}/>
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