import React, { useState, useEffect } from "react";
import Styles from './index.module.css';
import Lottie from 'lottie-react';
import deleteIcon from '../../assets/deleteIcon.json';
import { useTheme } from "../../contexts/theme";

const Task = ({ id, title, description, assignedTo, endDate, status, priority, onDelete }) => {
    const { isDarkMode } = useTheme();
    const [getTitle, setTitle] = useState(title);

    useEffect(() => {
        setTitle(title);
    }, [title]);

    const handleDeleteClick = (event) => {
        event.stopPropagation(); 
        onDelete(id);
    }
    return (
        <div className={`${Styles.task} ${isDarkMode ? Styles['dark-mode'] : ''}`}>
            <p>{getTitle}</p>
            <Lottie animationData={deleteIcon} onClick={handleDeleteClick} className={Styles.deleteIcon} />
        </div>
    )
} 

export default Task; 