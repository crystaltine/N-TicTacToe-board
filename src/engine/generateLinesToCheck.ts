/*
Example: 

3x3 board with connect 3 should have 8 lines to check:
0 1 2 Row
3 4 5 Row
6 7 8 Row
0 3 6 Col
1 4 7 Col
2 5 8 Col
0 4 8 Diag
2 4 6 Diag

4x4 board with connect 4 should have 12 lines to check:
0 1 2 3 Row
4 5 6 7 Row 
8 9 10 11 Row
12 13 14 15 Row
0 4 8 12 Col
1 5 9 13 Col 
2 6 10 14 Col
3 7 11 15 Col
0 5 10 15 Diag
3 6 9 12 Diag

3x3 board with connect 2 should have 20 lines to check:
0 1 Row 0 3 Col
1 2 Row 1 4 Col
3 4 Row 2 5 Col
4 5 Row 3 6 Col
6 7 Row 4 7 Col
7 8 Row 5 8 Col

0 4 Diag 1 3 Diag
1 5 Diag 2 4 Diag
3 7 Diag 4 6 Diag
4 8 Diag 5 7 Diag
*/

export default function getWinningLines(boardSize: number, winconLength: number) {
    let rows: number[][] = [];
    let cols: number[][] = [];
    let diag: number[][] = [];
    for (let i = 0; i < boardSize; i++) {

        for (let j = 0; j < boardSize - winconLength + 1; j++) {
            // Rows
            let currRow: number[] = [];
            for (let k = j; k < j + winconLength; k++) {
                currRow.push(i * boardSize + k);
            }
            rows.push(currRow);

            // Columns
            let currCol: number[] = [];
            for (let k = j; k < j + winconLength; k++) {
                currCol.push(i + k * boardSize);
            }
            cols.push(currCol);
        }
        // Diagonals

        if (i < boardSize - winconLength + 1) {
            // Top right to bottom left
            for (let j = i * boardSize + winconLength - 1; j < i * boardSize + boardSize; j++) {
                let currDiag: number[] = [];

                for (let k = 0; k < winconLength; k++) {
                    currDiag.push(j + k * (boardSize - 1));
                }

                diag.push(currDiag);
            }
            // Top left to bottom right
            for (let j = i * boardSize; j < i * boardSize + boardSize - winconLength + 1; j++) {
                let currDiag: number[] = [];

                for (let k = 0; k < winconLength; k++) {
                    currDiag.push(j + k * (boardSize + 1));
                }

                diag.push(currDiag);
            }
        }
    }
    return [...rows, ...cols, ...diag];
}