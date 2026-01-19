class Cross {
    constructor(cube) {
        this.cube = cube;

        // Stan początkowy crossa (krawędzie 4–7)
        this.start_state = convert.edgesToBinary(this.cube, [4, 5, 6, 7]);

        // Stan docelowy (rozwiązana kostka)
        const solvedCube = new Cube();
        this.end_state = convert.edgesToBinary(solvedCube, [4, 5, 6, 7]);
    }

    // Renderuje rozwiązania cross do wskazanego elementu HTML
    findCross(length) {
        return new Promise(resolve => {
            SolverModule().then(Module => {

                Module.ccall(
                    "set_solver_args",
                    "void",
                    ["number","number","number","number","number","number","number","number","number"],
                    [
                        length,
                        this.start_state[0], this.start_state[1],
                        this.start_state[2], this.start_state[3],
                        this.end_state[0], this.end_state[1],
                        this.end_state[2], this.end_state[3]
                    ]
                );

                Module.ccall("run_solver", "void");

                const count = Module.ccall("get_solution_count", "number");

                const solutions = [];

                for (let i = 0; i < count; i++) {
                    const len = Module.ccall(
                        "get_solution_length",
                        "number",
                        ["number"],
                        [i]
                    );

                    const moves = [];
                    for (let j = 0; j < len; j++) {
                        const moveInt = Module.ccall(
                            "get_solution_move",
                            "number",
                            ["number","number"],
                            [i, j]
                        );
                        moves.push(intToNotation[moveInt]);
                    }

                    solutions.push(moves.join(" "));
                }

                resolve(solutions);
            });
        });
    }

    isCrossSolved() {
        for (let e = 4; e < 8; e++) {
            const [index, orientation] = this.cube.edges[e];
            if (index !== e || orientation !== 0) return false;
        }
        return true;
    }
}
