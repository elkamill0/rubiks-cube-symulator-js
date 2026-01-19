// f2l.js

// pomocnicza funkcja deep copy kostki
function cloneCube(cube) {
    const c = new Cube();
    c.corners = cube.corners.map(x => [...x]);
    c.edges = cube.edges.map(x => [...x]);
    c.centers = [...cube.centers];
    return c;
}

// ===== Wczytywanie przypadków F2L z JSON =====
async function loadF2LFromJSON(path) {
    const res = await fetch(path);
    const data = await res.json();

    const map = new Map();
    for (const item of data) {
        map.set(
            JSON.stringify(item.pair),
            item.alg
        );
    }
    return map;
}

// ===== KLASA F2L =====
class F2L {
    constructor(cube) {
        this.cube = cube.clone();

        this.solvedCube = new Cube();
        this.solvedCube.reset();

        this.edges = convert.edgesToBinary(this.cube, [10, 11, 8, 9]);
        this.corners = convert.cornersToBinary(this.cube, [6, 7, 4, 5]);

        this.freeSlots = this.checkFreeSlots();

        this.pairs = [];
    }
    static cachedPairs = null;

    async loadPairs() {
        if (F2L.cachedPairs) {
            this.pairs = F2L.cachedPairs;
            return;
        }

        const pairs = [
            new Map([
                ...await loadF2LFromJSON("cases/f2l1_cases.json"),
                ...await loadF2LFromJSON("cases/af2l1_cases.json")
            ]),
            new Map([
                ...await loadF2LFromJSON("cases/f2l2_cases.json"),
                ...await loadF2LFromJSON("cases/af2l2_cases.json")
            ]),
            new Map([
                ...await loadF2LFromJSON("cases/f2l3_cases.json"),
                ...await loadF2LFromJSON("cases/af2l3_cases.json")
            ]),
            new Map([
                ...await loadF2LFromJSON("cases/f2l4_cases.json"),
                ...await loadF2LFromJSON("cases/af2l4_cases.json")
            ])
        ];

        F2L.cachedPairs = pairs;
        this.pairs = pairs;
    }

    

    // // ===== ŁADOWANIE WSZYSTKICH PRZYPADKÓW =====
    // async loadPairs() {
    //     this.pairs = [
    //         new Map([
    //             ...await loadF2LFromJSON("cases/f2l1_cases.json"),
    //             ...await loadF2LFromJSON("cases/af2l1_cases.json")
    //         ]),
    //         new Map([
    //             ...await loadF2LFromJSON("cases/f2l2_cases.json"),
    //             ...await loadF2LFromJSON("cases/af2l2_cases.json")
    //         ]),
    //         new Map([
    //             ...await loadF2LFromJSON("cases/f2l3_cases.json"),
    //             ...await loadF2LFromJSON("cases/af2l3_cases.json")
    //         ]),
    //         new Map([
    //             ...await loadF2LFromJSON("cases/f2l4_cases.json"),
    //             ...await loadF2LFromJSON("cases/af2l4_cases.json")
    //         ])
    //     ];
    // }

    // ===== SPRAWDZANIE WOLNYCH SLOTÓW =====
    checkFreeSlots() {
        const edgesSolved = convert.edgesToBinary(this.solvedCube, [10, 11, 8, 9]);
        const cornersSolved = convert.cornersToBinary(this.solvedCube, [6, 7, 4, 5]);

        const free = [];

        for (let i = 0; i < 4; i++) {
            if (
                edgesSolved[i] !== this.edges[i] ||
                cornersSolved[i] !== this.corners[i]
            ) {
                free.push(i);
            }
        }
        return free;
    }

    // ===== ROZWIĄZYWANIE CAŁEGO F2L =====
    solve(verbose = false) {
        let i = 0;
        let uNotation = "";
        const result = [];

        while (i <= 4 && this.freeSlots.length > 0) {
            let solved = false;

            for (const slot of this.freeSlots) {
                const key = JSON.stringify([
                    this.corners[slot],
                    this.edges[slot]
                ]);
                // console.log(key)

                if (this.pairs[slot].has(key)) {
                    const alg = this.pairs[slot].get(key);
                    const finalAlg = reduce(uNotation + alg);

                    result.push(finalAlg);
                    if (verbose) console.log(finalAlg, `# Slot ${slot}`);

                    this.cube.move(alg);
                    this.updateState();

                    this.freeSlots = this.freeSlots.filter(s => s !== slot);
                    uNotation = "";
                    i = 0;
                    solved = true;
                    break;
                }
            }

            if (!solved) {
                this.cube.U();
                uNotation += "U ";
                this.updateState();
                i++;
            }
        }

        return result;
    }

    // ===== ZNAJDŹ ALGORYTMY BEZ WYKONYWANIA =====
    findPairs() {
        let i = 0;
        let uNotation = "";
        const result = [];

        while (i <= 4 && this.freeSlots.length > 0) {
            let found = false;

            for (const slot of this.freeSlots) {
                const key = JSON.stringify([
                    this.corners[slot],
                    this.edges[slot]
                ]);
                // console.log(key)

                if (this.pairs[slot].has(key)) {
                    const alg = this.pairs[slot].get(key);
                    result.push(reduce(uNotation + alg));
                    this.freeSlots = this.freeSlots.filter(s => s !== slot);
                    found = true;
                    break;
                }
            }

            if (!found) {
                this.cube.U();
                uNotation += "U ";
                this.updateState();
                i++;
            }
        }

        return result;
    }




 
    // ===== ROZWIĄŻ JEDEN SLOT =====
    solveSlot(slot) {
        // zabezpieczenie
        if (!this.pairs || !this.pairs[slot]) {
            return null;
        }

        const rotations = ["", "U ", "U2 ", "U' "];
        let uNotation = "";

        for (let i = 0; i < 4; i++) {
            const key = JSON.stringify([
                this.corners[slot],
                this.edges[slot]
            ]);

            // console.log("F2L key:", key);

            if (this.pairs[slot].has(key)) {
                const alg = this.pairs[slot].get(key);
                return reduce(uNotation + alg);
            }

            // brak dopasowania → obrót U i dalej
            this.cube.U();
            this.updateState();
            uNotation += "U ";
        }

        return null;
    }



    // ===== AKTUALIZACJA STANU =====
    updateState() {
        this.edges = convert.edgesToBinary(this.cube, [10, 11, 8, 9]);
        this.corners = convert.cornersToBinary(this.cube, [6, 7, 4, 5]);
    }
}
