import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import getEvaluation from '../engine/evaluation';

let startingBoard = ["", "", "", "", "", "", "", "", ""];
let winInOneMoveBoard = ["X", "X", "", "", "O", "O", "", "", ""];
let blackBlundersSecondMove = ["", "", "", "", "X", "O", "", "", ""];
let blackWinsInTwoMoves = ["X", "X", "O", "X", "", "", "O", "", "O"];

describe('Testing Evaluation function for 3x3 board', () => {
    test('Evaluation for empty 3x3 board should be 0.0', () => {
        expect(getEvaluation(startingBoard, "X")).toBe(0.0);
    });
});

describe('Testing Evaluation function for win in 1 move', () => {
    test('Evaluation should me M1 for X(white) (10008)', () => {
        expect(getEvaluation(winInOneMoveBoard, "X")).toBe(10008.0);
    });
});

describe('Testing Evaluation function for black losing on move 2', () => {
    test('Evaluation should be M5 for X(white) (10004)', () => {
        expect(getEvaluation(blackBlundersSecondMove, "X")).toBe(10004.0);
    });
});

describe('Testing Evaluation function for black winning in 2', () => {
    test('Evaluation should be M2 for O(black) (-10007)', () => {
        expect(getEvaluation(blackWinsInTwoMoves, "X")).toBe(-10007.0);
    });
});