import React from 'react';
import Button from '../Button/index.jsx';
import Styles from './index.module.css';

export function Card ({ type, data }) {
    return (
        <ul>
            {data
                .filter(task => task.type === type)
                .map(task => (
                    <li key={task.id}>
                        <p>{task.title}</p>
                        <Button />
                    </li>
            ))};
        </ul>
    )
}