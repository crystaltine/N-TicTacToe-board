import getEvaluation from './evaluation';

let board = ["X", "X", "", "", "O", "", "O", "", ""];
let nextPlayer = "X";

let value = getEvaluation(board, nextPlayer);
console.log(value)