class Moves extends MovesCorners {
    constructor(corners, edges, centers, y_rotate) {
        super(corners);
        this.edges   = edges;
        this.centers = centers;
        this.y_rotate = y_rotate;
    }
}

[MovesEdges, MovesCenters, MovesUtils].forEach(cls => {
    Object.getOwnPropertyNames(cls.prototype).forEach(name => {
        if (name !== 'constructor') {
            Moves.prototype[name] = cls.prototype[name];
        }
    });
});


const allMoves = [
    "R", "Rp", "R2", "L", "Lp", "L2",
    "U", "Up", "U2", "D", "Dp", "D2",
    "F", "Fp", "F2", "B", "Bp", "B2",
    "E", "Ep", "E2", "M", "Mp", "M2",
    "S", "Sp", "S2",
    "r", "rp", "r2", "l", "lp", "l2",
    "u", "up", "u2", "d", "dp", "d2",
    "f", "fp", "f2", "b", "bp", "b2",
    "x", "xp", "x2", "y", "yp", "y2",
    "z", "zp", "z2",
];

const moveSources = [MovesCorners, MovesEdges, MovesCenters, MovesUtils];

allMoves.forEach(name => {
    Moves.prototype[name] = function () {
        moveSources.forEach(cls => cls.prototype[name].call(this));
    };
});