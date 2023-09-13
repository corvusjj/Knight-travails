class chessGraph {
    constructor() {
        this.visitedSquares = new Map();
        this.currentLevel = [];
    }

    //  vertex
    addSquare(s) {
        this.visitedSquares.set(s, []);
    }

    //  connection between squares
    addEdge(s1, s2) {
        this.visitedSquares.get(s1).push(s2);
        this.visitedSquares.get(s2).push(s1);
    }

    knightMoves(x,y, fn) {
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

    discoverSquares = (x, y) => {
        if (x < 0 || x > 7) return;
        if (y < 0 || y > 7) return;
        x = `${x}`;
        y = `${y}`;

        // prevent repeating squares to visitedSquares array.
        let alreadyVisited = false;
        const getSquares = this.visitedSquares.keys();

        for (const square of getSquares) {
            if (square === x+y) {
                alreadyVisited = true;
                break;
            }
        }
    
        if (alreadyVisited === true) return;
        this.addSquare(x+y);
    }

    travelKnight(x,y) {
        this.knightMoves(x,y, this.discoverSquares);
    }

    printGraph() {
        const getKeys = this.visitedSquares.keys();

        for (const i of getKeys) {
            const getValues = this.visitedSquares.get(i);
            let conc = '';

            getValues.forEach(v => {
                conc += v + ' ';
            });

            console.log(i + '->' + conc);
        }
    }
}

const board = new chessGraph();

board.travelKnight(0, 6);
board.travelKnight(3, 3);
board.printGraph();

