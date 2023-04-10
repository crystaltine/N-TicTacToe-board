function allEqual(list: string[], indiciesToCheck: number[]) {
    let value = list[indiciesToCheck[0]];
    return indiciesToCheck.every((indexToCheck) => list[indexToCheck] === value);
}

function existsIn(list: string[], indiciesToCheck: number[], value: string) {
    return indiciesToCheck.some((indexToCheck) => list[indexToCheck] === value);
}

function checkWin(boardState: string[], winningLines: number[][]) {
    let winner;
    winningLines.forEach((line) => {
        if (boardState[line[0]] !== "" && allEqual(boardState, line)) {
            winner = boardState[line[0]];
            return winner
        }
    });
    return (winner === undefined? null : winner);
}

// OPTIMIZABLE: instead of checking all winning lines, functionally check surrounding lines given the last move
function canForceDraw(player: string, boardState: string[], winningLines: number[][]) {
    let drawable: boolean = true;
    winningLines.forEach((line) => {
        if (!existsIn(boardState, line, player)) {
            drawable = false;
            return
        }
    });
    return drawable;
}

export { checkWin, canForceDraw };