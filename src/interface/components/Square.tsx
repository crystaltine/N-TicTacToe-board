import React from 'react';
import './GridStyles.css'

interface SquareProps {
    value: string;
    handleClick: () => void;
}

const Square = (props: SquareProps) => {

    let cellClass: string = props.value === "X"? "cell-x" : props.value === "O"? "cell-o" : "cell-empty";

    return (
        <div className={cellClass} onClick={props.handleClick}>
        </div>
    );
};

export default Square;