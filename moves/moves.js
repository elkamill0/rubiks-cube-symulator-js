// Lista wszystkich ruchów
const moveNames = [
    "R", "Rp", "R2",
    "L", "Lp", "L2",
    "U", "Up", "U2",
    "D", "Dp", "D2",
    "F", "Fp", "F2",
    "B", "Bp", "B2",
    "y", "yp", "y2",
    "x"
];

class Moves extends MovesCorners {
    constructor(corners, edges, centers) {
        super(corners);
        this.edges = edges;
        this.centers = centers;
    }
}

// przypisanie metod z MovesEdges i MovesCenters
Object.getOwnPropertyNames(MovesEdges.prototype).forEach(name => {
    if (name !== 'constructor') Moves.prototype[name] = MovesEdges.prototype[name];
});
Object.getOwnPropertyNames(MovesCenters.prototype).forEach(name => {
    if (name !== 'constructor') Moves.prototype[name] = MovesCenters.prototype[name];
});

// Dynamiczne przypisanie wszystkich ruchów do prototypu Moves
moveNames.forEach(moveName => {
    Moves.prototype[moveName] = function() {
        if (MovesCorners.prototype[moveName]) MovesCorners.prototype[moveName].call(this);
        if (MovesEdges.prototype[moveName]) MovesEdges.prototype[moveName].call(this);
        if (MovesCenters.prototype[moveName]) MovesCenters.prototype[moveName].call(this);
    };
});
