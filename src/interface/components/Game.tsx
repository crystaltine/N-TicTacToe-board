import React from 'react';
import ajax from 'jquery';
import GameGrid from './GameGrid';
import EvalBar from './EvalBar';
import getEvaluation from '../../engine/evaluation';
import getWinningLines from '../../engine/generateLinesToCheck';

interface GameProps {
    gridSize: number;
    winconLength: number;
}

// 4x4 Tic Tac Toe
const Game = (props: GameProps) => {

    const [grid, setGrid] = React.useState<string[]>(Array(props.gridSize).fill(""));
    const [currPlayer, setCurrPlayer] = React.useState<string>("X");

    const [evaluation, setEvaluation] = React.useState<number>(0.0);

    const winningLines = getWinningLines(Math.sqrt(props.gridSize), props.winconLength);
    console.log(winningLines);

    const getEvalAfterMove = (board: string[], nextPlayer: string) => {
        setEvaluation(getEvaluation(board, nextPlayer, winningLines));
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