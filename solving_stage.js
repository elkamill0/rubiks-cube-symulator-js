class Node {
    constructor(cube, alg, stage, parent = null) {
        this.cube   = cube;
        this.alg    = alg;
        this.stage  = stage;
        this.parent = parent;
        this.child  = [];
    }
}

class Solving {
    constructor(cube) {
        this.cube          = cube;
        this.tree          = [];
        this.solutions     = [];
        this.total_cross   = 0;
        this.total_f2l     = 0;
        this.total_oll     = 0;
        this.total_pll     = 0;
        this.shortest_path = [];
    }

    async build_tree(crossLength) {
        const root = new Node(this.cube, "", "cross");
        this.tree  = [root];

        while (this.tree.length > 0) {
            const parent = this.tree.pop();

            if (parent.stage === "cross") {
                const cross        = new Cross(parent.cube);
                const crossAlgs    = await cross.findCross(crossLength);

                for (const alg of crossAlgs) {
                    this.total_cross++;
                    const cube = parent.cube.clone();
                    cube.applyStep(alg);

                    const child = new Node(cube, alg, "f2l", parent);
                    parent.child.push(child);
                    this.tree.push(child);
                }

            } else if (parent.stage === "f2l") {
                const f2l = new F2L(parent.cube);

                if (f2l.freeSlots.length === 0) {
                    this.tree.push(new Node(parent.cube, "", "oll", parent));
                    continue;
                }

                for (const alg of f2l.solve()) {
                    this.total_f2l++;
                    const cube = parent.cube.clone();
                    cube.applyStep(alg);

                    const child = new Node(cube, alg, "f2l", parent);
                    parent.child.push(child);
                    this.tree.push(child);
                }

            } else if (parent.stage === "oll") {
                const alg  = await new OLL(parent.cube).solve();
                const cube = parent.cube.clone();
                if (alg[0]) {
                    this.total_oll++;
                    cube.applyStep(alg);
                }

                const child = new Node(cube, alg, "pll", parent);
                parent.child.push(child);
                this.tree.push(child);

            } else if (parent.stage === "pll") {
                const alg  = await new PLL(parent.cube).solve();
                const cube = parent.cube.clone();
                if (alg[0]) {
                    this.total_pll++;
                    cube.applyStep(alg);
                }
                const child = new Node(cube, alg, "auf", parent);
                parent.child.push(child);
                this.tree.push(child);

            } else if (parent.stage === "auf") {
                const alg  = new AUF(parent.cube).solve();
                const cube = parent.cube.clone();
                if (alg[0]) cube.applyStep(alg);
                const child = new Node(cube, alg, "done", parent);
                parent.child.push(child);
                this.solutions.push(child);
                this.shortest_path.push([cube.logNames.slice(), cube.totalMoves]);
            }
        }

        this.shortest_path.sort((a, b) => a[1] - b[1]);
        return root.child;
    }
}

class Manual {
    constructor(cube, crossLength) {
        this.cube        = cube;
        this.crossLength = crossLength;
    }

    async loop() {
        const cross = new Cross(this.cube);
        if (!cross.isSolved()) {
            return await cross.findCross(this.crossLength);
        }

        const f2l = new F2L(this.cube);
        if (!f2l.isSolved()) {
            return f2l.solve();
        }

        const oll = new OLL(this.cube);
        if (!oll.isSolved()) {
            return [await oll.solve()];
        }

        const pll = new PLL(this.cube);
        if (!pll.isSolved()) {
            return [await pll.solve()];
        }
       
        const auf = new AUF(this.cube);
        if (!auf.isSolved()) {
            return [auf.solve()];
        }        

        return [["", "Done"]];
    }
}
