import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import getEvaluation from '../engine/evaluation';
import getWinningLines from '../engine/generateLinesToCheck';
import { canForceDraw, checkWin } from '../engine/checkGameResults';


function arraysEqual(a: Array<any>, b: Array<any>) {
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) {
            return false;
        }
    }
    return true;
}
function deepArraysEqual(a: Array<any>, b: Array<any>) {
    for (let i = 0; i < a.length; i++) {
        if (!arraysEqual(a[i], b[i])) {
            return false;
        }
    }
    return true;
}

const startingBoard = ["", "", "", "", "", "", "", "", ""];
const winInOneMoveBoard = ["X", "X", "", "", "O", "O", "", "", ""];
const blackBlundersSecondMove = ["", "", "", "", "X", "O", "", "", ""];
const blackWinsInTwoMoves = ["X", "X", "O", "X", "", "", "O", "", "O"];

const winningLinesFor3x3 = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [0, 4, 8]
];

const winningLinesFor3x3WinconIs2 = [
    [0, 1], [1, 2],
    [3, 4], [4, 5],
    [6, 7], [7, 8],

    [0, 3], [3, 6],
    [1, 4], [4, 7],
    [2, 5], [5, 8],

    [1, 3], [2, 4], [0, 4], [1, 5],
    [4, 6], [5, 7], [3, 7], [4, 8]
];

describe('Testing Evaluation function for 3x3 board', () => {
    test('Evaluation for empty 3x3 board should be 0.0', () => {
        expect(getEvaluation(startingBoard, "X", winningLinesFor3x3)).toBe(0.0);
    });
});

describe('Testing Evaluation function for win in 1 move', () => {
    test('Evaluation should me M1 for X(white) (10008)', () => {
        expect(getEvaluation(winInOneMoveBoard, "X", winningLinesFor3x3)).toBe(10008.0);
    });
});

describe('Testing Evaluation function for black losing on move 2', () => {
    test('Evaluation should be M5 for X(white) (10004)', () => {
        expect(getEvaluation(blackBlundersSecondMove, "X", winningLinesFor3x3)).toBe(10004.0);
    });
});

describe('Testing Evaluation function for black winning in 2', () => {
    test('Evaluation should be M2 for O(black) (-10007)', () => {
        expect(getEvaluation(blackWinsInTwoMoves, "X", winningLinesFor3x3)).toBe(-10007.0);
    });
});


describe('Testing getWinningLines for a 3x3 board with connect 3 (default tictactoe)', () => {
    test('Winning lines for 3x3-3 dont match', () => {
        let equal = deepArraysEqual(getWinningLines(3, 3), winningLinesFor3x3);
        expect(equal).toBe(true);
    });
});

describe('Testing getWinningLines for a 3x3 board with connect 2 - 20 lines', () => {
    test('Winning lines for 3x3-2 dont match', () => {
        let equal = deepArraysEqual(getWinningLines(3, 2), winningLinesFor3x3WinconIs2);
        expect(equal).toBe(true);
    });
});

describe('Test force draw for O in a drawn 3x3-3 terminal position', () => {
    test('O should be able to force draw.', () => {
        expect(canForceDraw("O", ["X", "O", "X", "X", "O", "O", "O", "X", "X"], getWinningLines(3, 3))).toBe(true);
    });
});

describe('Test force draw when black has M2', () => {
    test('X cant force draw here', () => {
        expect(canForceDraw("X", blackWinsInTwoMoves, getWinningLines(3, 3))).toBe(false);
    });
});

describe('Test force draw for X when they have a diagonal in 3x3-3 (yes this is technically a win but just test the function)', () => {
    test('X should be able to force draw.', () => {
        expect(canForceDraw("X", ["X", "O", "O", "", "X", "O", "", "", "X"], getWinningLines(3, 3))).toBe(true);
    });
});

describe('Test winner in the prev position (x has diag), 3x3-3', () => {
    test('Winner should be x.', () => {
        expect(checkWin(["X", "O", "O", "", "X", "O", "", "", "X"], getWinningLines(3, 3))).toBe("X");
    });
});

describe('Test winner in a horizontal winning position for O', () => {
    test('Winner should be O.', () => {
        expect(checkWin(["O", "O", "O", "X", "X", "", "", "X", ""], getWinningLines(3, 3))).toBe("O");
    });
});

describe('Test winner function on empty board 3x3-3', () => {
    test('Winner should be null.', () => {
        expect(checkWin(["", "", "", "", "", "", "", "", ""], getWinningLines(3, 3))).toBe(null);
    });
});

describe('Test winner function for a child of boardState from test \'black wins in 2 moves\'', () => {
    test('Winner should be null.', () => {
        expect(checkWin(["X", "X", "O", "X", "O", "", "O", "X", "O"], getWinningLines(3, 3))).toBe("O");
    });
});