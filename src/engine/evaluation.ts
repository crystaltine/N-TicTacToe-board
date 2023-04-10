const winningLines: number[][] = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function getBestMoveForX(list: Array<number>) {
    //get maximum in list
    if (list.length === 0) {
        return 0.0;
    }
    let bestEval = list[0];
    let bestIndex = 0;
    for (let i = 1; i < list.length; i++) {
        if (list[i] > bestEval) {
            bestEval = list[i];
            bestIndex = i;
        }
    }
    return list[bestIndex];
}

function getBestMoveForO(list: Array<number>) {
    //get minimum in list
    if (list.length === 0) {
        return 0.0;
    }
    let bestEval = list[0];
    let bestIndex = 0;
    for (let i = 1; i < list.length; i++) {
        if (list[i] < bestEval) {
            bestEval = list[i];
            bestIndex = i;
        }
    }
    return list[bestIndex];
}
  


function checkWin(boardState: string[]) {
    for (let i = 0; i < winningLines.length; i++) {
        const [a, b, c] = winningLines[i];
        if (boardState[a] !== "" && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            return boardState[a];
        }
    }
    return null;
}

function canForceDraw(player: string, boardState: string[]) {
    for (let i = 0; i < winningLines.length; i++) {
        const [a, b, c] = winningLines[i];
        
        // For the row, if none of them are occupied by the player, then the game might still be winnable for the other player; return false
        if (!(boardState[a] === player || player === boardState[b] || player === boardState[c])) {
            return false;
        }
    }
    return true;
}

function tryNextMoves(boardState: string[], nextPlayer: string) {
    let allEvalContinuations: number[] = []; // An array of arrays [evaluation, index of move]

    for (let i = 0; i < boardState.length; i++) {
        if (boardState[i] === "") {
            boardState[i] = nextPlayer;
            let nextEvaluation: number = getEvaluation(boardState, nextPlayer === "X"? "O" : "X");

            if (nextEvaluation >= 10000.0) {
                allEvalContinuations.push(nextEvaluation-1);
            } else if (nextEvaluation <= -10000.0) {
                allEvalContinuations.push(nextEvaluation+1);
            } else {
                allEvalContinuations.push(nextEvaluation);
            }
            boardState[i] = "";
        }
    }

    return allEvalContinuations;
}

function getEvaluation(boardState: string[], player: string) {
    let winner = checkWin(boardState);
    if (winner !== null) {
        return winner === "X"? 10009.0 : -10009.0;
    }

    let allEvalContinuations: number[] = tryNextMoves(boardState, player);

    let bestMove: number = (player === "X"? getBestMoveForX(allEvalContinuations) : getBestMoveForO(allEvalContinuations));

    if (bestMove < 0.0 && player === "X") {
        if (canForceDraw("X", boardState)) {
            return 0.0;
        }
    } else if (bestMove > 0.0 && player === "O") {
        if (canForceDraw("O", boardState)) {
            return 0.0;
        }
    }

    return bestMove;
}

/* TESTS 

let board = ["", "", "", "", "X", "", "", "", ""];
let nextPlayer = "O";

let value = getEvaluation(board, nextPlayer);
console.log("grr: " + value)

*/


export default getEvaluation;