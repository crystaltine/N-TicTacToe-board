import {checkWin, canForceDraw} from "./checkGameResults";
import {getBestMoveForX, getBestMoveForO} from "./getBestEvaluations";
import {tryNextMoves} from "./searchContinuations";


// TODO - integrate implementation of ab pruning
// TODO - check if ab pruning works
// TODO - optimize ab pruning (check diagonals first?)

function abpruning(boardState: string[], player: string, depth: number, alpha: number, beta: number) {
    
    let size: number = Math.sqrt(boardState.length);
    let lines: number[][] = zeroDepthEval(boardState, size);
    
    lines[0].forEach(function(score){
        if(score === size){
            return 10000 + boardState.length;
        }
    });
    
    lines[1].forEach(function(score){
        if(score === -1 * size){
            return -10000 - boardState.length;
        }
    });
    
    if (depth === 0){
        let score: number = 0;
        
        for(let i = 0; i < lines.length; i++){
        if(lines[0][i] === 0){
           score += Math.pow(2, lines[1][i]);
        }
        if(lines[1][i] === 0){
           score += Math.pow(2, lines[0][i]);
        }
    }
        return score;
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

function zeroDepthEval(boardState: string[], size: number){
    let lines: number[][];
    let linesX: number[] = Array(size * 2 + 2);
    let linesO: number[] = Array(size * 2 + 2);
    for(let i = 0; i < boardState.length; i++){
        if(boardState[i] === "X"){
           linesX[i % size] ++;
           linesX[i / size + size] ++;
           if(i % (size + 1) === 0){
               linesX[size*2 + 1] ++;
           }
           if(i % (size - 1) === 0 && i !== 0 && i !== boardState.length - 1){
               linesX[size*2 + 2] ++;
           }
        }
        if(boardState[i] === "O"){
           linesO[i % size] --;
           linesO[i / size + size] --;
           if(i % (size + 1) === 0){
               linesO[size*2 + 1] --;
           }
           if(i % (size - 1) === 0 && i !== 0 && i !== boardState.length - 1){
               linesO[size*2 + 2] --;
           }
        }
    }
    lines.push(linesX);
    lines.push(linesO);
    return lines;
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
