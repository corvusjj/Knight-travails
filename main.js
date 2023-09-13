const visitedSquares = [];

const knightMoves = (x,y, fn) => {
    //  top and right directions
    fn(x-1, y+2);
    fn(x+1, y+2);
    fn(x+2, y+1);
    fn(x+2, y-1);

    //  bottom and left directions
    fn(x+1, y-2);
    fn(x-1, y-2);
    fn(x-2, y-1);
    fn(x-2, y+1);
}

const discoverSquares = (x, y) => {
    if (x < 0 || x > 7) return;
    if (y < 0 || y > 7) return;
    
    // prevent repeating squares to visitedSquares array.
    let alreadyVisited = false;

    for (const square of visitedSquares) {
        if (square.toString() === [x,y].toString()) {
            alreadyVisited = true;
            break;
        }
    }

    if (alreadyVisited === true) return;
    visitedSquares.push([x,y]);
}

const travelKnight = (x,y) => {
    knightMoves(x,y, discoverSquares);
}

travelKnight(0, 6);
travelKnight(3, 3);
console.log(visitedSquares);