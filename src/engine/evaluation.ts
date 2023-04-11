import {checkWin, canForceDraw} from "./checkGameResults";
import {getBestMoveForX, getBestMoveForO} from "./getBestEvaluations";
import {tryNextMoves} from "./searchContinuations";


// TODO - AB pruning for evals generated in trynextmoves


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