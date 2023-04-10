import React from 'react';
import Square from './Square';
import './GridStyles.css'

import useState from 'react';

interface GridProps {
    grid: string[];
    nextPlayer: string;
    handleMove: (board: string[], nextPlayer: string) => void;
    setGrid: React.Dispatch<React.SetStateAction<string[]>>;
    setPlayer: React.Dispatch<React.SetStateAction<string>>;
}

// TODO 

const GameGrid = (props: GridProps) => {

    function handleClick(index: number) {
        let newGrid = props.grid.slice();
        
        if (newGrid[index] === "") {
            newGrid[index] = props.nextPlayer;
            let newPlayer = props.nextPlayer === "X"? "O" : "X";

            console.log("handling move with grid: " + newGrid + " and next player: " + newPlayer);
            props.handleMove(newGrid, newPlayer);

            props.setGrid(newGrid);
            props.setPlayer(newPlayer);
            return;
        }
        console.log("fdfsdfsdf")
        /* DELETING MOVES
        props.setPlayer(newGrid[index]);
        newGrid[index] = "";
        props.setGrid(newGrid);

        console.log(props.grid);
        console.log(props.nextPlayer);

        props.handleMove();
        */
    }


    // Turn grid (1d array) into 2d array
    const grid_side_length = Math.sqrt(props.grid.length);

    let grid_split: Array<string[]> = [];
    let splitIndex = grid_side_length;

    while (splitIndex <= props.grid.length) {
        grid_split.push(props.grid.slice(splitIndex - grid_side_length, splitIndex));
        splitIndex += grid_side_length;
    }

    return (
        <div className="grid">

            {grid_split.map((row, index) => {
                return (
                    <div key = {index} className="board-row">
                        {row.map((cell, index2) => {
                            return (
                                <Square value={cell} handleClick={() => handleClick(index*grid_side_length+index2)} id={crypto.randomUUID()}/>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
};

export default GameGrid;