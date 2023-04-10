const winningLines: number[][] = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6]
];

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

export { checkWin, canForceDraw };