import Button from '../Button/index.jsx';
import Styles from './index.module.css';
import PropTypes from 'prop-types';

function Card ({ data }) {
    return (
        <ul className={Styles.card}>
            <h3>{data && data.length > 0 ? data[0].status : ''}</h3>
            {data.map(task => (
                    <li key={task.id}>
                        <p>{task.title}</p>
                        <Button />
                    </li>
            ))}
        </ul>
    )
}

Card.propTypes = {
    data: PropTypes.array.isRequired
}

export default Card;