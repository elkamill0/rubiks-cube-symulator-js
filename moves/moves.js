const moveNames = [
    "R", "Rp", "R2",
    "L", "Lp", "L2",
    "U", "Up", "U2",
    "D", "Dp", "D2",
    "F", "Fp", "F2",
    "B", "Bp", "B2",
    "E", "Ep", "E2",
    "M", "Mp", "M2",
    "S", "Sp", "S2",
    "r", "rp", "r2",
    "l", "lp", "l2",
    "u", "up", "u2",
    "d", "dp", "d2",
    "f", "fp", "f2",
    "b", "bp", "b2",
    "y", "yp", "y2",
    "x", "xp", "x2",
    "z", "zp", "z2",
];

class Moves extends MovesCorners {
    constructor(corners, edges, centers, y_rotate) {
        super(corners);
        this.edges   = edges;
        this.centers = centers;
        this.y_rotate = y_rotate;
    }
}

// Kopiuj metody pomocnicze z każdej klasy
[MovesEdges, MovesCenters, MovesUtils].forEach(cls => {
    Object.getOwnPropertyNames(cls.prototype).forEach(name => {
        if (name !== 'constructor') {
            Moves.prototype[name] = cls.prototype[name];
        }
    });
});

// Dynamicznie tworzymy metody tak jak w Pythonie (MRO: Corners → Edges → Centers → Utils)
moveNames.forEach(name => {
    Moves.prototype[name] = function () {
        MovesCorners.prototype[name].call(this);
        MovesEdges.prototype[name].call(this);
        MovesCenters.prototype[name].call(this);
        MovesUtils.prototype[name].call(this);
    };
});


const simpleMoves = [
    "R", "Rp", "R2", "L", "Lp", "L2",
    "U", "Up", "U2", "D", "Dp", "D2",
    "F", "Fp", "F2", "B", "Bp", "B2",
    "E", "Ep", "E2", "M", "Mp", "M2",
    "S", "Sp", "S2",
];

const compoundMoves = [
    "r", "rp", "r2", "l", "lp", "l2",
    "u", "up", "u2", "d", "dp", "d2",
    "f", "fp", "f2", "b", "bp", "b2",
    "x", "xp", "x2", "y", "yp", "y2",
    "z", "zp", "z2",
];

// Proste ruchy — każda klasa obsługuje swoją część
simpleMoves.forEach(name => {
    Moves.prototype[name] = function() {
        MovesCorners.prototype[name].call(this);
        MovesEdges.prototype[name].call(this);
        MovesCenters.prototype[name].call(this);
        MovesUtils.prototype[name].call(this);
    };
});

// Złożone ruchy — wywołaj tylko raz z jednej klasy (MovesEdges ma pełną implementację)
compoundMoves.forEach(name => {
    Moves.prototype[name] = function() {
        MovesCorners.prototype[name].call(this);
        MovesEdges.prototype[name].call(this);
        MovesCenters.prototype[name].call(this);
        MovesUtils.prototype[name].call(this);
    };
});