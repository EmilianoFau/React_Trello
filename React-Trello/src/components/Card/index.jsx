import Styles from './index.module.css';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from '../Modal';

function Card ({ status, data }) {
    const [abrirModalEdit, setAbrirModalEdit] = useState(false);

    const abrirModal = () => {
        setAbrirModalEdit(true);
    }

    const cerrarModal = () => {
        setAbrirModalEdit(false);
    }

    return (
        <>
            <ul className={Styles.card}>
                <h3>{status}</h3>
                {data.map(task => (
                    <li key={task.id} onClick={abrirModal}>
                        <p>{task.title}</p>
                    </li>
                ))}
            </ul>

            {abrirModalEdit && (
                <Modal/>
            )}
        </>
    )
}

Card.propTypes = {
    data: PropTypes.array.isRequired,
    status: PropTypes.string.isRequired
}

export default Card;