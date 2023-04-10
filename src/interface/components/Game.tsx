import React from 'react';
import ajax from 'jquery';
import GameGrid from './GameGrid';
import EvalBar from './EvalBar';
import getEvaluation from '../../engine/evaluation';

interface GameProps {
    gridSize: number;
}

// 4x4 Tic Tac Toe
const Game = (props: GameProps) => {

    const [grid, setGrid] = React.useState<string[]>(Array(props.gridSize).fill(""));
    const [currPlayer, setCurrPlayer] = React.useState<string>("X");

    const [evaluation, setEvaluation] = React.useState<number>(0.0);

    const getEvalAfterMove = (board: string[], nextPlayer: string) => {
        setEvaluation(getEvaluation(board, nextPlayer));
    };

    return (
        <div>
            <div className="grid-wrapper">
                <GameGrid grid={grid} setGrid={setGrid} nextPlayer={currPlayer} setPlayer={setCurrPlayer} handleMove={getEvalAfterMove}/>
                <EvalBar value={evaluation}/>
            </div>
        </div>
    );
};

export default Game;