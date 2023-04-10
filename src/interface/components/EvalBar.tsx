import React from 'react';

interface EvalbarProps {
    value: number; // number (0.0 for tic tac toe) or M<mate in m moves> if win for either side
}

const EvalBar = (props: EvalbarProps) => {
    const evalStyleClass = props.value >= 0.0? "black-eval-number" : "white-eval-number"; // Try to get props.value to be +=intLimit if a win is possible
    // const evalDisplay = props.movesToWin !== undefined? "M" + props.movesToWin : Math.abs(props.value).toFixed(props.value >= 10.0? 0 : 1);

    let evalBarHeight;
    let evalDisplay;

    if (props.value >= 10000.0) {
        evalBarHeight = "100%";
        evalDisplay = (props.value === 10009.0? "1-0" : "M" + (9 - props.value%10000)); // If eval === +- 10009, then game is won, dont display M0 lol
    } else if (props.value <= -10000.0) {
        evalBarHeight = "0%";
        evalDisplay = (props.value === -10009.0? "0-1" : "M" + (9 + props.value%10000));
    } else {
        evalBarHeight = (0.9*Math.tanh(0.02*props.value*(Math.abs(props.value)+7))+1)/2 * 100 + "%";
        evalDisplay = Math.abs(props.value).toFixed(props.value >= 10.0? 0 : 1);
    }

    return (
        <div className="eval-bar">
            <div style={{
                height: evalBarHeight,
                position:"absolute",
                bottom:0,
                width:"100%",
                backgroundColor: "white",
                color:"black",
                fontSize:"12px",
                textAlign: "center",
                fontWeight: "700",
                transition:"1s",
                transitionTimingFunction: "cubic-bezier(0.12, 0, 0.39, 0)"}}></div>
            <span className={evalStyleClass}>{evalDisplay}</span>
        </div>
    );
};

export default EvalBar;