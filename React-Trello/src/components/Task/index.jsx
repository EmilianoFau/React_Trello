import React, { useState } from "react";
import style from './index.module.css';
import Lottie from 'lottie-react';
import deleteIcon from '../../assets/deleteIcon.json';

const Task = ({ id, title, description, assignedTo, endDate, status, priority, onDelete }) => {
    const [getTitle, setTitle] = useState(title);
    const [getDescription, setDescription] = useState(description);
    const [getAssignedTo, setAssignedTo] = useState(assignedTo);
    const [getEndDate, setEndDate] = useState(endDate);
    const [getStatus, setStatus] = useState(status);
    const [getPriority, setPriority] = useState(priority);

    const handleDeleteClick = (event) => {
        event.stopPropagation(); 
        onDelete(id);
    }
    return (
        <div className={style.task}>
            <p>{getTitle}</p>
            <Lottie animationData={deleteIcon} onClick={handleDeleteClick} />
        </div>
    )
} 

export default Task; 