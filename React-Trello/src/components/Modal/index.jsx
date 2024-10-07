import { useState } from "react";
import style from "./index.module.css";
import Button from '../Button/index'
import { putData, postData } from "../../shared/DataFetcher/index";
import { useTareas } from "../../contexts/tasks";

export function Modal({ isEditTask, task, cerrarModal }) {
    const { setTareas } = useTareas();

    const [newTitle, setTitle] = useState(isEditTask ? task.title : '');
    const [newDescription, setDescription] = useState(isEditTask ? task.description : '');
    const [newAssignedTo, setAssignedTo] = useState(isEditTask ? task.assignedTo : 'Rodrigo Lujambio');
    const [newEndDate, setEndDate] = useState(isEditTask ? task.endDate : '');
    const [newStatus, setStatus] = useState(isEditTask ? task.status : 'Backlog');
    const [newPriority, setPriority] = useState(isEditTask ? task.priority : 'High');

    const jsonifyTask = () => {
        return {
            title: newTitle, 
            description: newDescription,
            assignedTo: newAssignedTo,
            startDate: task.startDate, 
            endDate: newEndDate,
            status: newStatus,
            priority: newPriority,
            comments: task.comments,
            id: task.id
        }
    }

    const handleSave = async (event) => {
        event.preventDefault();
        const newTask = jsonifyTask();

        console.log("Nueva tarea antes de enviar:", newTask);
        console.log("setTareas (desde Modal):", setTareas);  

        try {
            console.log("Nueva tarea: ", newTask);

            if (isEditTask) {
                if (task.id) {  
                    await putData(`http://localhost:3000/api/tasks/${task.id}`, newTask);
                    setTareas((prevTasks) => prevTasks.map(t => t.id === task.id ? newTask : t));
                    console.log("Tarea actualizada:", newTask);
                } else {
                    console.error("Error: La tarea no tiene un id válido.");
                }
            } else {
                const response = await postData('http://localhost:3000/api/tasks', newTask);
                if (response.id) {
                    console.log("Tarea agregada:", response);
                    setTareas((prevTasks) => [...prevTasks, response]);
                }
            }

            cerrarModal();
        } catch (error) {
            console.error("Error: ", error);
        }
    }

    return (
        <>
            <div className={`${style.modal} ${style.overlay}`}>
                <h2>{isEditTask ? `Editar tarea` : `Agregar tarea`}</h2>
                <form onSubmit={handleSave}>
                    <div>
                        <label>Título</label>
                        <div>
                            <input type="text" placeholder="Título de la tarea" value={newTitle} onChange={(e) => setTitle(e.target.value)}/>
                        </div>
                    </div>

                    <div>
                        <label>Descripción</label>
                        <div>
                            <textarea placeholder="Descripción de la tarea" value={newDescription} onChange={(e) => setDescription(e.target.value)}></textarea>
                        </div>
                    </div>

                    <div>
                        <label>Asignado</label>
                        <div>
                            <div>
                                <select value={newAssignedTo} onChange={(e) => setAssignedTo(e.target.value)}>
                                    <option value="Rodrigo Lujambio">Rodrigo Lujambio</option>
                                    <option value="Michel Sampil">Michel Sampil</option>
                                    <option value="Jose Abadie">Jose Abadie</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label>Prioridad</label>
                        <div>
                            <div>
                                <select value={newPriority} onChange={(e) => setPriority(e.target.value)}>
                                    <option value="High">High</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Low">Low</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label>Estado</label>
                        <div>
                            <div>
                                <select value={newStatus} onChange={(e) => setStatus(e.target.value)}>
                                    <option value="Backlog">Backlog</option>
                                    <option value="To Do">To Do</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Blocked">Blocked</option>
                                    <option value="Done">Done</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label>Fecha Límite</label>
                        <div>
                            <input type="date" value={newEndDate.split("/").reverse().join("-")} onChange={(e) => setEndDate(e.target.value)}/>
                        </div>
                    </div>

                    <Button text={isEditTask ? 'Editar' : 'Agregar'} type='submit' />
                    <Button text='Cancelar' onClick={cerrarModal} />

                </form>
            </div>
        </>
        
    )
}

export default Modal;