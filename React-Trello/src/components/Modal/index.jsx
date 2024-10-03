import { useState } from "react";
import style from "./index.module.css";
import Button from '../Button/index'
import { deleteData, putData, postData, dataFetcher } from "../../shared/DataFetcher/index";

export function Modal({ isEditTask, task, cerrarModal, tareas, setTareas }) {
    const [newTitle, setTitle] = useState(isEditTask ? task.title : '');
    const [newDescription, setDescription] = useState(isEditTask ? task.description : '');
    const [newAssignedTo, setAssignedTo] = useState(isEditTask ? task.assignedTo : 'Rodrigo Lujambio');
    const [newEndDate, setEndDate] = useState(isEditTask ? task.endDate : '');
    const [newStatus, setStatus] = useState(isEditTask ? task.status : 'Backlog');
    const [newPriority, setPriority] = useState(isEditTask ? task.priority : 'High');

    const jsonifyTask = () => {
        console.log(1);
        console.log(newTitle);
        console.log(newDescription);
        console.log(newAssignedTo);
        console.log(task.startDate);
        console.log(newEndDate);
        console.log(newStatus);
        console.log(newPriority);
        console.log(task.comments);
        console.log(task.id);

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

        try {
            console.log(2);
            console.log(newTask.id);
            console.log(newTask.title);
            console.log(newTask.description);
            console.log(newTask.assignedTo);
            console.log(newTask.startDate);
            console.log(newTask.endDate);
            console.log(newTask.status);
            console.log(newTask.comments);

            console.log("Nueva tarea: ", newTask);

            if (isEditTask) {
                await putData(`http://localhost:3000/api/tasks/${task.id}`, newTask);
                const updatedTasks = tareas.map(t => t.id === task.id ? newTask : t);
                setTareas(updatedTasks);
            } else {
                const response = await postData('http://localhost:3000/api/tasks', newTask);
                console.log("Tarea agregada:", response);
                setTareas((prevTasks) => [...prevTasks, response]);
            }

            cerrarModal();

        } catch (error) {
            console.error("Error al agregar la tarea:", error);
        }
    }

    const putTask = async (event) => {
        event.preventDefault();
        await putData('http://localhost:3000/api/tasks', task.id, jsonifyTask());
        console.log(await dataFetcher('http://localhost:3000/api/tasks'));
        renderizarTareas();
        cerrarModal();
    }


    return (
        <>
            <div className={`${style.modal} ${style.overlay}`}>
                <h2>{isEditTask ? `Editar tarea` : `Agregar tarea`}</h2>
                <form>
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

                    <Button text={isEditTask ? 'Editar' : 'Agregar'} onClick={handleSave} />
                    <Button text='Cancelar' onClick={cerrarModal} />

                </form>
            </div>
        </>
        
    )
}

export default Modal;