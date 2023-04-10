import {checkWin, canForceDraw} from "./checkGameResults";
import {getBestMoveForX, getBestMoveForO} from "./getBestEvaluations";
import {tryNextMoves} from "./searchContinuations";

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

export default getEvaluation;