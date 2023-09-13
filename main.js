class chessGraph {
    constructor() {
        this.visitedSquares = new Map();
        this.currentLevel = [];
        this.found = false;
        this.targetSquare = '';
    }

    //  vertex
    addSquare(s) {
        this.visitedSquares.set(s, []);
    }

    //  connection between squares, first index will be the parent
    addEdge(s1, s2) {
        this.visitedSquares.get(s1).push(s2);
        this.visitedSquares.get(s2).push(s1);
    }

    knightMoves(x, y, fn) {
        //  top and right directions
        fn(x-1, y+2, `${x}${y}`);
        fn(x+1, y+2, `${x}${y}`);
        fn(x+2, y+1, `${x}${y}`);
        fn(x+2, y-1, `${x}${y}`);
    
        //  bottom and left directions
        fn(x+1, y-2, `${x}${y}`);
        fn(x-1, y-2, `${x}${y}`);
        fn(x-2, y-1, `${x}${y}`);
        fn(x-2, y+1, `${x}${y}`);
    }

    //  method for seeking the 8 squares the knight can move, adding those
    //  squares the knight haven't visited yet.
    discoverSquares = (x, y, parent) => {
        if (x < 0 || x > 7) return;
        if (y < 0 || y > 7) return;
        x = `${x}`;
        y = `${y}`;

        if (this.targetSquare === x+y) return this.found = true;

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
        this.addEdge(x+y, parent);
        this.currentLevel.push(x+y);
    }

    travelKnight(x,y) {
        this.addSquare(`${x}${y}`);
        this.knightMoves(x,y, this.discoverSquares);  //  1st level order knight moves
        if (this.found === true) return console.log('found');

        const nextLevelOrder = () => {
            //  copy the current visited squares array and reset for the next level order
            const nextSquares = [...this.currentLevel];
            this.currentLevel.length = 0;

            //  seek other unvisited squares from the current level order
            let i = 0;
            while(i < nextSquares.length) {
                if (this.found === true) return console.log('found');

                const x = parseInt(nextSquares[i][0]);
                const y = parseInt(nextSquares[i][1]);

                console.log(x,y);
                this.knightMoves(x,y, this.discoverSquares);
                i++;
            }

            //  if the current level order don't have the target square, run the next level order.
            nextLevelOrder();
        }
   
        return nextLevelOrder();
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

board.targetSquare = '75';
board.travelKnight(3, 3);
board.printGraph();
