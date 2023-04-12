function staticEval(boardState: string[], size: number){
    let lines: number[][] = [];
    let linesX: number[] = Array(size * 2 + 2);
    let linesO: number[] = Array(size * 2 + 2);
    for(let i = 0; i < boardState.length; i++){
        if(boardState[i] === "X"){
           linesX[i % size] ++;
           linesX[i / size + size] ++;
           if(i % (size + 1) === 0){
               linesX[size*2 + 1] ++;
           }
           if(i % (size - 1) === 0 && i !== 0 && i !== boardState.length - 1){
               linesX[size*2 + 2] ++;
           }
        }
        if(boardState[i] === "O"){
           linesO[i % size] --;
           linesO[i / size + size] --;
           if(i % (size + 1) === 0){
               linesO[size*2 + 1] --;
           }
           if(i % (size - 1) === 0 && i !== 0 && i !== boardState.length - 1){
               linesO[size*2 + 2] --;
           }
        }
    }
    lines.push(linesX);
    lines.push(linesO);
    return lines;
}

export default staticEval;