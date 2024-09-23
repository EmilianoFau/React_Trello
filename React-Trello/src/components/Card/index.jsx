import React from 'react';
import Button from '../Button/index.jsx';
import Styles from './index.module.css';

function Card ({ data }) {
    return (
        <ul className={Styles.card}>
            <h3>{data[0].status}</h3>
            {data.map(task => (
                    <li key={task.id}>
                        <p>{task.title}</p>
                        <Button />
                    </li>
            ))};
        </ul>
    )
}

export default Card;