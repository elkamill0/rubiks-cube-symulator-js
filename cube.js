class Cube extends Moves {
    constructor({ color = "y", notation = null, state = null } = {}) {
        super(
            Array.from({ length: 8 },  (_, i) => [i, 0]),
            Array.from({ length: 12 }, (_, i) => [i, 0]),
            Array.from({ length: 6 },  (_, i) => i),
            0
        );

        this.color = color;
        this.reset();

        if (notation) {
            convert.notationToMoves(scramble.remapScrambleByColor(notation, this.color), this);
        } else if (state) {
            const { corners, edges, centers } = convert.stateToCube(state);
            this.corners = corners;
            this.edges   = edges;
            this.centers = centers;
        }
    }

    clone() {
        const c = new Cube({ color: this.color });
        c.corners    = this.corners.map(x => [...x]);
        c.edges      = this.edges.map(x => [...x]);
        c.centers    = [...this.centers];
        c.y_rotate   = this.y_rotate;
        c.totalMoves = this.totalMoves;
        c.log        = [...this.log];
        c.logNames   = [...this.logNames];
        return c;
    }

    move(notation, name = null) {
        convert.notationToMoves(notation, this);
        this.totalMoves += notation.trim().split(/\s+/).length;
        this.log.push(notation);
        this.logNames.push(name ? `${notation}\t// ${name}` : notation);
    }

    applyStep(step) {
        // step: [alg, name]
        this.move(step[0], step[1]);
    }

    undo() {
        if (!this.log.length) return null;
        const last = this.log.pop();
        convert.notationToMoves(inverse(last), this);
        this.totalMoves -= last.trim().split(/\s+/).length;
        this.logNames.pop();
        return last;
    }

    getState() {
        return convert.cubeToColor(this, this.color);
    }

    isSolved() {
        return this.corners.every((c, i) => c[0] === i && c[1] === 0) &&
               this.edges.every((e, i)   => e[0] === i && e[1] === 0);
    }

    reset() {
        this.corners = Array.from({ length: 8 },  (_, i) => [i, 0]);
        this.edges   = Array.from({ length: 12 }, (_, i) => [i, 0]);

        const colorMap = {
            "y": [0, 1, 2, 3, 4, 5],
            "w": [5, 3, 2, 1, 4, 0],
            "r": [1, 5, 2, 0, 4, 3],
            "o": [3, 0, 2, 5, 4, 1],
            "g": [4, 1, 0, 3, 5, 2],
            "b": [2, 1, 5, 3, 0, 4],
        };

        if (!colorMap[this.color]) throw new Error(`Nieznany kolor: ${this.color}`);
        this.centers    = [...colorMap[this.color]];
        this.y_rotate   = 0;
        this.totalMoves = 0;
        this.log        = [];
        this.logNames   = [];
    }
}
