import React, { useState } from "react";
import style from './index.module.css';


const Task = ({ id, title, description, assignedTo, endDate, status, priority }) => {
    const [getTitle, setTitle] = useState(title);
    const [getDescription, setDescription] = useState(description);
    const [getAssignedTo, setAssignedTo] = useState(assignedTo);
    const [getEndDate, setEndDate] = useState(endDate);
    const [getStatus, setStatus] = useState(status);
    const [getPriority, setPriority] = useState(priority);


    return (
        <div className={style.task}>
            <p>{getTitle}</p>
        </div>
    )
} 

export default Task; 