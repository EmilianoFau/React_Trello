import React from 'react';
import Styles from './index.module.css';

export function Card ({ type, data }) {
    return (
        <ul>
            {data.map(task => (
                if(task.type === type) {
                    <li key={task.id}>
                        <p>{task.title}</p>
                    </li>
                }
            ))};
        </ul>
    )
}