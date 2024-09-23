import React from 'react';
import Button from '../Button/index.jsx';
import Styles from './index.module.css';

function Card ({ status, data }) {
    return (
        <ul>
            {data
                .filter(task => task.status === status)
                .map(task => (
                    <li key={task.id}>
                        <p>{task.title}</p>
                        <Button />
                    </li>
            ))};
        </ul>
    )
}

export default Card;