import React from 'react';
import './square.scss';

export default function Square(props) {
    const { value } = props;
    return (
        <label className="square"
            row={props.row}
            col={props.col}
            onClick={props.onClick}
        >
            {value}
        </label>
    )
}