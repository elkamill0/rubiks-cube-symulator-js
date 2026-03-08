class OLL {
    constructor(cube, path = "cases/oll_cases.json") {
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
            this.cases[key] = { alg: item.alg, name: item.name };
        }
    }

    async solve() {
        await this.loadCases();

        let newNotation = "";
        const cube = this.cube.clone();

        for (let i = 0; i < 4; i++) {
            const edges   = cube.edges.slice(0, 4).map(e => e[1]);
            const corners = cube.corners.slice(0, 4).map(c => c[1]);
            const key     = JSON.stringify([edges, corners]);

            if (this.cases[key]) {
                const { alg, name } = this.cases[key];
                const customAlg = getSelectedAlg('oll', name); // lub 'pll'
                return [reduce(newNotation + (customAlg ?? alg)), name];
                // return [reduce(newNotation + alg), name];
            }

            newNotation += "U ";
            cube.U();
        }

        return ["", ""];
    }

    isSolved() {
        for (let i = 0; i < 4; i++) {
            if (this.cube.edges[i][1]   !== 0) return false;
            if (this.cube.corners[i][1] !== 0) return false;
        }
        return true;
    }
}
