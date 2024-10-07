import React from "react";
import Styles from './index.module.css';
import { useTheme } from '../../contexts/theme';

const Button = ( {text, onClick} ) => {
    const { isDarkMode } = useTheme();

    return (
        <button onClick={onClick} className={`${isDarkMode ? Styles['dark-mode'] : ''}`}>{text}</button>
    );
}

export default Button;