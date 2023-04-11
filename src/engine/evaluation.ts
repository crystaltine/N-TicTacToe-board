import {checkWin, canForceDraw} from "./checkGameResults";
import {getBestMoveForX, getBestMoveForO} from "./getBestEvaluations";
import {tryNextMoves} from "./searchContinuations";


// TODO - integrate implementation of ab pruning and fix 0 depth evals
// TODO - check if ab pruning works
// TODO - optimize ab pruning (check diagonals first?)

function abpruning(boardState: string[], player: string, depth: number, alpha: number, beta: number) {
    
    //add win conditions
    
    if (depth === 0){
        return 0.0;
        //implement 0-depth calculations
    }
    
    if (player === "X") {
        let nextMoves: string[][] = getNextMovesX(boardState);
        let value: number = -10000.0;
        nextMoves.forEach(function(nextPos){
            value = Math.max(value, abpruning(nextPos, "O", depth − 1, alpha, beta));
            if (value > beta){
                break;
            }
            alpha = Math.max(alpha, value);
        });
        return value;
    }
    else{
        let nextMoves: string[][] = getNextMovesO(boardState);
        let value: number = 10000.0;
        nextMoves.forEach(function(nextPos){
            value = Math.min(value, abpruning(nextPos, "X", depth − 1, alpha, beta));
            if(value < alpha){
                break;
            }
            beta = Math.min(beta, value);
        });
        return value;
    }
}

function getNextMovesX(boardState: string[]){
    let nextMoves: string[][];
    let nextMove: string[];
    for(let i = 0; i < boardState.length; i++){
        if(string[i] !== "X" && string[i] !== "O"){
            nextMove = [...boardState];
            nextMove[i] = "X";
            nextMoves.push(nextMove);
        }
    }
    return nextMoves;
}
function getNextMovesO(boardState: string[]){
    let nextMoves: string[][];
    let nextMove: string[];
    for(let i = 0; i < boardState.length; i++){
        if(string[i] !== "X" && string[i] !== "O"){
            nextMove = [...boardState];
            nextMove[i] = "O";
            nextMoves.push(nextMove);
        }
    }
    return nextMoves;
}

function getEvaluation(boardState: string[], player: string, winningLines: number[][]) {

    if (winningLines.length === 0) {
        return 0.0;
    }

    let winner = checkWin(boardState, winningLines);
    if (winner !== null) {
        return winner === "X"? 10000.0 + boardState.length: -10000.0 - boardState.length; // 10009 for 3x3, 10016 for 4x4, etc. so it can handle any size board
    }
    let allEvalContinuations: number[] = tryNextMoves(boardState, player, winningLines);

    let bestMove: number = (player === "X"? getBestMoveForX(allEvalContinuations) : getBestMoveForO(allEvalContinuations));

    if (bestMove < 0.0 && player === "X") {
        if (canForceDraw("X", boardState, winningLines)) {
            return 0.0;
        }
    } else if (bestMove > 0.0 && player === "O") {
        if (canForceDraw("O", boardState, winningLines)) {
            return 0.0;
        }
    }

    return bestMove;
}

export default getEvaluation;
