function getBestMoveForX(list: Array<number>) {
    //get maximum in list
    if (list.length === 0) {
        return 0.0;
    }
    let bestEval = list[0];
    let bestIndex = 0;
    for (let i = 1; i < list.length; i++) {
        if (list[i] > bestEval) {
            bestEval = list[i];
            bestIndex = i;
        }
    }
    return list[bestIndex];
}

function getBestMoveForO(list: Array<number>) {
    //get minimum in list
    if (list.length === 0) {
        return 0.0;
    }
    let bestEval = list[0];
    let bestIndex = 0;
    for (let i = 1; i < list.length; i++) {
        if (list[i] < bestEval) {
            bestEval = list[i];
            bestIndex = i;
        }
    }
    return list[bestIndex];
}

export { getBestMoveForX, getBestMoveForO };