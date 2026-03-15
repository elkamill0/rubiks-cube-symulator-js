class PLL {
    constructor(cube, path = "cases/pll_cases.json") {
        this.cube       = cube.clone();
        this.solvedCube = cube.clone();
        this.solvedCube.reset();
        this.path  = path;
        this.cases = null;
    }

    async loadCases() {
        if (this.cases) return;

        const res  = await fetch(this.path);
        const data = await res.json();

        this.cases = {};
        for (const item of data) {
            const key = JSON.stringify([item.edges, item.corners]);
            this.cases[key] = { alg: item.alg, name: item.name, auf: item.auf ?? "" };
        }
    }

    async solve() {
        await this.loadCases();
        let newNotation = "";
        const cube = this.cube.clone();
        for (let i = 0; i < 4; i++) {
            const edges   = cube.edges.slice(0, 4).map(e => e[0]);
            const corners = cube.corners.slice(0, 4).map(c => c[0]);
            const key     = JSON.stringify([edges, corners]);
            if (this.cases[key]) {
                const { alg, name } = this.cases[key];
                const customAlg = getSelectedAlg('pll', name);
                const finalAlg  = customAlg ?? alg;

                const uSuffixes = ["", "U", "U'", "U2"];
                for (const suffix of uSuffixes) {
                    const testCube = this.cube.clone();
                    testCube.move(reduce(newNotation + finalAlg));
                    if (suffix) testCube.move(suffix);
                    const auf = new AUF(testCube);
                    if (auf.isSolved()) {
                        const full = suffix
                            ? reduce(newNotation + finalAlg) + " " + suffix
                            : reduce(newNotation + finalAlg);
                        return [full.trim(), name];
                    }
                }

                return [reduce(newNotation + finalAlg), name];
            }
            newNotation += "U ";
            cube.U();
        }
        return ["", ""];
    }

    isSolved() {
        const rot = (4 - this.cube.y_rotate % 4) % 4;
        for (let i = 0; i < 4; i++) {
            const rotatedI = (i + rot) % 4;
            if (this.cube.edges[i][0]   !== rotatedI || this.cube.edges[i][1]   !== 0) return false;
            if (this.cube.corners[i][0] !== rotatedI || this.cube.corners[i][1] !== 0) return false;
        }
        return true;
    }

}
