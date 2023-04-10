import getEvaluation from "./evaluation";

export function tryNextMoves(boardState: string[], nextPlayer: string) {
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