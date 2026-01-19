class Node {
    constructor(cube, alg, stage, name, parent = null) {
        this.cube = cube;      // Cube
        this.alg = alg;        // string
        this.stage = stage;    // Array<int> | null
        this.name = name;      // string
        this.parent = parent;  // Node | null
        this.child = [];       // Array<Node>
    }
}

class Solving {
    constructor(cube) {
        this.cube = cube;

        this.tree = [];
        this.solutions = [];
        this.root = [];

        this.total_cross = 0;
        this.total_f2l = 0;
        this.total_oll = 0;
        this.total_pll = 0;
    }

    /* ===============================
       BUDOWANIE DRZEWA ROZWIĄZAŃ
    ================================ */
    async build_tree(cross_length) {
        const f2lLoader = new F2L(this.cube);
        await f2lLoader.loadPairs();

        const root = new Node(this.cube, "", null, "scramble", null);

        /* ---------- CROSS ---------- */
        const crossSolutions = await new Cross(this.cube).findCross(cross_length);

        for (const c of crossSolutions) {
            const cube = this.cube.clone();
            // console.log(cube);
            cube.move(c);

            this.total_cross++;

            const node = new Node(
                cube,
                c,
                null,
                "Cross: ",
                root
            );

            root.child.push(node);
            this.root.push(node);

            node.stage = new F2L(cube).checkFreeSlots();
            this.tree.push(node);
        }

        /* ---------- DFS ---------- */
        while (this.tree.length > 0) {
            const parent = this.tree.pop();

            /* ===== BRAK SLOTÓW F2L → OLL + PLL ===== */
            if (!parent.stage || parent.stage.length === 0) {

                /* --- OLL --- */
                let cubeOLL = parent.cube.clone();
                const ollAlg = new OLL(cubeOLL).solve();
                if (ollAlg) cubeOLL.move(ollAlg);
                if (ollAlg) this.total_oll++;

                const ollNode = new Node(
                    cubeOLL,
                    ollAlg,
                    null,
                    "OLL: ",
                    parent
                );

                parent.child.push(ollNode);

                /* --- PLL --- */
                let cubePLL = cubeOLL.clone();
                const pllAlg = new PLL(cubePLL).solve();
                if (pllAlg) cubePLL.move(pllAlg);
                if (pllAlg) this.total_pll++;

                const pllNode = new Node(
                    cubePLL,
                    pllAlg,
                    null,
                    "PLL: ",
                    ollNode
                );

                ollNode.child.push(pllNode);
                this.solutions.push(pllNode);

                } else {
                    /* ===== F2L ===== */
                    const originalStage = parent.stage.slice();

                    while (parent.stage.length > 0) {
                        const index = parent.stage.pop();

                        const f2l = new F2L(parent.cube);
                        f2l.pairs = F2L.cachedPairs;

                        const alg = f2l.solveSlot(index);
                        if (!alg) continue;

                        this.total_f2l++;

                        const cube = parent.cube.clone();
                        cube.move(alg);

                        const stage = originalStage.slice();
                        stage.splice(stage.indexOf(index), 1);

                        const node = new Node(
                            cube,
                            alg,
                            stage,
                            `F2L ${index + 1}: `,
                            parent
                        );

                        parent.child.push(node);
                        this.tree.push(node);
                    }
                }

        }

        return this.root;
    }
}
