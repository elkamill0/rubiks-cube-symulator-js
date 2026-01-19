class Cube extends Moves {
    constructor({ color = "y", notation = null, state = null } = {}) {
        // ustawiamy kolor najpierw
        super(
            Array.from({ length: 8 }, (_, i) => [i, 0]),  // corners
            Array.from({ length: 12 }, (_, i) => [i, 0]), // edges
            Array.from({ length: 6 }, (_, i) => i)        // centers
        );
        this.color = color;  // inicjalizacja koloru
        this.reset();        // resetuje kostkę do stanu początkowego zależnego od koloru

        if (notation) {
            convert.notationToMoves(scramble.remapScrambleByColor(notation, this.color), this);
        } else if (state) {
            const { corners, edges, centers } = convert.stateToCube(state);
            this.corners = corners.map(c => [...c]);
            this.edges = edges.map(e => [...e]);
            this.centers = [...centers];
        }
    }

    clone() {
        const newCube = new Cube({ color: this.color }); // tworzymy nową instancję z tym samym kolorem

        // kopia tablic (głębokie kopiowanie)
        newCube.corners = this.corners.map(c => [...c]);
        newCube.edges = this.edges.map(e => [...e]);
        newCube.centers = [...this.centers];

        return newCube;
    }

    move(notation) {
        convert.notationToMoves(notation, this);
    }

    toString() {
        return convert.replaceNumbersWithColors(
            convert.cubeToColor(this, crossColor=this.color, true)
        );
    }

    getState() {
        return convert.cubeToColor(this, false);
    }

    reset() {
        this.corners = Array.from({ length: 8 }, (_, i) => [i, 0]);
        this.edges = Array.from({ length: 12 }, (_, i) => [i, 0]);

        const colors = {
            "y": [0, 1, 2, 3, 4, 5],
            "w": [5, 3, 2, 1, 4, 0],
            "r": [1, 5, 2, 0, 4, 3],
            "o": [3, 0, 2, 5, 4, 1],
            "g": [4, 1, 0, 3, 5, 2],
            "b": [2, 1, 5, 3, 0, 4]
        };

        if (!colors[this.color]) {
            throw new Error(`Nieznany kolor: ${this.color}`);
        }

        this.centers = [...colors[this.color]];
    }
}
