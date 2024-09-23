import { useState } from "react";

export function Modal({ isEditTask, title, description, assignedTo, endDate, status, priority }) {
    const [newTitle, setTitle] = useState(title);
    const [newDescription, setDescription] = useState(description);
    const [newAssignedTo, setAssignedTo] = useState(assignedTo);
    const [newEndDate, setEndDate] = useState(endDate);
    const [newStatus, setStatus] = useState(status);
    const [newPriority, setPriority] = useState(priority);


    return (
        <>
            <h2>{isEditTask ? `Editar tarea` : `Agregar tarea`}</h2>
            <form>
                <div>
                    <label>Título</label>
                    <div>
                        <input type="text" placeholder="Título de la tarea" value={newTitle}/>
                    </div>
                </div>

                <div>
                    <label>Descripción</label>
                    <div>
                        <textarea placeholder="Descripción de la tarea" value={newDescription}></textarea>
                    </div>
                </div>

                <div>
                    <label>Asignado</label>
                    <div>
                        <div value={newAssignedTo}>
                            <select id="edit-task-assigned">
                                <option>Rodrigo Lujambio</option>
                                <option>Michel Sampil</option>
                                <option>Jose Abadie</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div>
                    <label>Prioridad</label>
                    <div>
                        <div>
                            <select value={newPriority}>
                                <option>Alta</option>
                                <option>Media</option>
                                <option>Baja</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div>
                    <label>Estado</label>
                    <div>
                        <div>
                            <select value={newStatus}>
                                <option value="backlog">Backlog</option>
                                <option value="to-do">To Do</option>
                                <option value="in-progress">In Progress</option>
                                <option value="blocked">Blocked</option>
                                <option value="done">Done</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div>
                    <label>Fecha Límite</label>
                    <div>
                        <input type="date" value={newEndDate}/>
                    </div>
                </div>
            </form>
        </>
        
    )
}