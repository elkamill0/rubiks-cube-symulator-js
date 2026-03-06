class Cross {
    constructor(cube) {
        this.cube = cube;
        this.crossEdges   = [4, 5, 6, 7];
        let rot         = this.cube.y_rotate % 4;
        this.rotatedSlots = [
            ...this.crossEdges.slice(rot),
            ...this.crossEdges.slice(0, rot),
        ];
        this.startState = convert.edgesToBinary(this.cube, this.crossEdges);
        this.endState   = null;
    }

    async findCross(length) {
        if (!this.endState) {
            const solvedCube = new Cube();
            this.endState = convert.edgesToBinary(solvedCube, this.crossEdges);
        }
        const solutions = await this._findSolutions(length);
        return solutions.map(sol => [sol, "cross"]);
    }

    async _findSolutions(length) {
        return new Promise(resolve => {
            SolverModule().then(Module => {
                Module.ccall(
                    "set_solver_args", "void",
                    ["number","number","number","number","number","number","number","number","number"],
                    [
                        length,
                        this.startState[0], this.startState[1],
                        this.startState[2], this.startState[3],
                        this.endState[0],   this.endState[1],
                        this.endState[2],   this.endState[3],
                    ]
                );

                Module.ccall("run_solver", "void");

                const count = Module.ccall("get_solution_count", "number");
                const solutions = [];
                for (let i = 0; i < count; i++) {
                    const len = Module.ccall("get_solution_length", "number", ["number"], [i]);
                    const moves = [];
                    for (let j = 0; j < len; j++) {
                        const moveInt = Module.ccall("get_solution_move", "number", ["number","number"], [i, j]);
                        moves.push(convert.intToNotation[moveInt]);
                    }
                    solutions.push(moves.join(" "));
                }

                resolve(solutions);
            });
        });
    }

    isSolved() {
        const rot = this.cube.y_rotate % 4;
        const rotatedSlots = [
            ...this.crossEdges.slice(rot),
            ...this.crossEdges.slice(0, rot),
        ];
        for (let i = 0; i < rotatedSlots.length; i++) {
            const slot = rotatedSlots[i];
            const edge = this.crossEdges[i];
            const e = this.cube.edges[slot];
            if (e[0] !== edge || e[1] !== 0) return false;
        }
        return true;
    }

    // isSolved() {
    //     // Python: sprawdza rotatedSlots vs crossEdges
    //     for (let i = 0; i < this.rotatedSlots.length; i++) {
    //         const slot = this.rotatedSlots[i];
    //         const edge = this.crossEdges[i];
    //         const e = this.cube.edges[slot];
    //         if (e[0] !== edge || e[1] !== 0) return false;
    //     }
    //     return true;
    // }
}
