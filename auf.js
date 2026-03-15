class AUF {
    constructor(cube) {
        this.cube = cube;
    }

    isSolved() {
        const pll = new PLL(this.cube);
        return pll.isSolved();
    }

    solve() {
        if (this.isSolved()) return ["", "AUF"];
        const uMoves = ["U", "U'", "U2"];
        for (const u of uMoves) {
            const testCube = this.cube.clone();
            testCube.move(u);
            const auf = new AUF(testCube);
            if (auf.isSolved()) return [u, "AUF"];
        }
        return ["", "AUF"];
    }
}