"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var winningLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
function getBestMoveForX(list) {
    //get maximum in list
    if (list.length === 0) {
        return 0.0;
    }
    var bestEval = list[0];
    var bestIndex = 0;
    for (var i = 1; i < list.length; i++) {
        if (list[i] > bestEval) {
            bestEval = list[i];
            bestIndex = i;
        }
    }
    return list[bestIndex];
}
function getBestMoveForO(list) {
    //get minimum in list
    if (list.length === 0) {
        return 0.0;
    }
    var bestEval = list[0];
    var bestIndex = 0;
    for (var i = 1; i < list.length; i++) {
        if (list[i] < bestEval) {
            bestEval = list[i];
            bestIndex = i;
        }
    }
    return list[bestIndex];
}
function checkWin(boardState) {
    for (var i = 0; i < winningLines.length; i++) {
        var _a = winningLines[i], a = _a[0], b = _a[1], c = _a[2];
        if (boardState[a] !== "" && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            return boardState[a];
        }
    }
    return null;
}
function canForceDraw(player, boardState) {
    for (var i = 0; i < winningLines.length; i++) {
        var _a = winningLines[i], a = _a[0], b = _a[1], c = _a[2];
        // For the row, if none of them are occupied by the player, then the game might still be winnable for the other player; return false
        if (!(boardState[a] === player || player === boardState[b] || player === boardState[c])) {
            return false;
        }
    }
    return true;
}
function tryNextMoves(boardState, nextPlayer) {
    var allEvalContinuations = []; // An array of arrays [evaluation, index of move]
    for (var i = 0; i < boardState.length; i++) {
        if (boardState[i] === "") {
            boardState[i] = nextPlayer;
            var nextEvaluation = getEvaluation(boardState, nextPlayer === "X" ? "O" : "X");
            if (nextEvaluation >= 10000.0) {
                allEvalContinuations.push(nextEvaluation - 1);
            }
            else if (nextEvaluation <= -10000.0) {
                allEvalContinuations.push(nextEvaluation + 1);
            }
            else {
                allEvalContinuations.push(nextEvaluation);
            }
            boardState[i] = "";
        }
    }
    return allEvalContinuations;
}
function getEvaluation(boardState, player) {
    var winner = checkWin(boardState);
    if (winner !== null) {
        return winner === "X" ? 10009.0 : -10009.0;
    }
    var allEvalContinuations = tryNextMoves(boardState, player);
    var bestMove = (player === "X" ? getBestMoveForX(allEvalContinuations) : getBestMoveForO(allEvalContinuations));
    if (bestMove < 0.0 && player === "X") {
        if (canForceDraw("X", boardState)) {
            return 0.0;
        }
    }
    else if (bestMove > 0.0 && player === "O") {
        if (canForceDraw("O", boardState)) {
            return 0.0;
        }
    }
    return bestMove;
}
/* TESTS */
var board = ["X", "O", "O", "X", "X", "", "X", "", "O"];
var nextPlayer = "O";
var value = getEvaluation(board, nextPlayer);
console.log(checkWin(board));
console.log("grr: " + value);
exports.default = getEvaluation;
