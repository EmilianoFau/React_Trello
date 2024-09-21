import React from 'react';
import Styles from './index.module.css';

export function Card ({ type, data }) {
    return (
        <ul>
            {data
                .filter(task => task.type === type)
                .map(task => (
                    <li key={task.id}>
                        <p>{task.title}</p>
                    </li>
            ))};
        </ul>
    )
}