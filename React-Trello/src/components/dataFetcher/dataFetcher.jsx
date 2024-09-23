import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import style from './dataFetcher.module.css';

export function DataFetcher({ url }) {
    const [datos, setDatos] = useState([]);

    useEffect(() => {
        const obtenerDatos = async () => {
            try {
                const respuesta = await fetch(url);
                const datos = await respuesta.json();
                setDatos(datos);
            } catch (error) {
                console.error("Error al hacer fetch: ", error);
            }
        };
        obtenerDatos();
    }, []);

    return (
        <div>
            {datos.map((task) => (
                <li key={task.id} className={style.listItem}>
                    <span className={style.userSpan}><strong>Título:</strong> {task.title}</span>
                    <span className={style.userSpan}><strong>Descripción:</strong> {task.description}</span>
                    <span className={style.userSpan}><strong>Asignado a:</strong> {task.assignedTo}</span>
                    <span className={style.userSpan}><strong>Estado:</strong> {task.status}</span>
                    <span className={style.userSpan}><strong>Plazo:</strong> {task.endDate}</span>
                </li>
            ))}
        </div>
    );
};

DataFetcher.propTypes = {
    url: PropTypes.string.isRequired,
}

export default DataFetcher;