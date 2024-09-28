    import { useState } from "react";
    import style from "./index.module.css";
    import Button from '../Button/index'
    import { deleteData, putData, postData, dataFetcher } from "../../shared/DataFetcher/index";

    export function Modal({ isEditTask, task, cerrarModal }) {
        const [newTitle, setTitle] = useState(task.title);
        const [newDescription, setDescription] = useState(task.description);
        const [newAssignedTo, setAssignedTo] = useState(task.assignedTo);
        const [newEndDate, setEndDate] = useState(task.endDate);
        const [newStatus, setStatus] = useState(task.status);
        const [newPriority, setPriority] = useState(task.priority);

        console.log(0);
        const jsonifyTask = () => {
            console.log(1);
            let jsonTask = {};
            jsonTask['assignedTo'] = newAssignedTo;
            jsonTask['comments'] = [];
            jsonTask['description'] = newDescription;
            jsonTask['endDate'] = newEndDate;
            jsonTask['priority'] = newPriority;
            jsonTask['startDate'] = null;
            jsonTask['status'] = newStatus;
            jsonTask['title'] = newTitle;
            console.log(2);

            console.log(jsonTask);

            return jsonTask;
        }

        const postTask = async (event) => {
            console.log(3);
            event.preventDefault();
            await postData('http://localhost:3000/api/tasks', jsonifyTask());
            console.log(await dataFetcher('http://localhost:3000/api/tasks'));
            console.log(4);
        }

        const putTask = async (event) => {
            console.log(5);
            event.preventDefault();
            await putData('http://localhost:3000/api/tasks', task.id, jsonifyTask());
            console.log(await dataFetcher('http://localhost:3000/api/tasks'));
            console.log(6);
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
                                        <option>High</option>
                                        <option>Medium</option>
                                        <option>Low</option>
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

                        <Button text={isEditTask ? 'Editar' : 'Agregar'} onClick={ isEditTask ? putTask : postTask} />
                        <Button text='Cancelar' onClick={cerrarModal} />

                    </form>
                </div>
            </>
            
        )
    }

    export default Modal;