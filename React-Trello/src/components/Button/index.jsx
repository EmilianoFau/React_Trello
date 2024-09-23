import React from "react";
import Styles from './index.module.css';

const Button = ( {text, onClick} ) => {
    return (
        <button>{text}</button>
    );
}

export default Button;