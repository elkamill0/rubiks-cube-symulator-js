class F2L {
    constructor(cube) {
        this.e = [
            [10,11,8,9],
            [9,10,11,8],
            [8,9,10,11],
            [11,8,9,10],
        ];
        this.c = [
            [6,7,4,5],
            [5,6,7,4],
            [4,5,6,7],
            [7,4,5,6],
        ];

        this.cube       = cube.clone();
        this.solvedCube = cube.clone();
        this.solvedCube.reset();

        this.edges    = convert.edgesToBinary(this.cube, this.e[this.cube.y_rotate]);
        this.corners  = convert.cornersToBinary(this.cube, this.c[this.cube.y_rotate]);
        this.freeSlots = this.checkFreeSlots();
    }

    checkFreeSlots() {
        const edgeOffset   = 64 * (this.cube.y_rotate % 2);
        const edgesSolved   = convert.edgesToBinary(this.solvedCube, this.e[0]).map(e => e ^ edgeOffset);
        const cornersSolved = convert.cornersToBinary(this.solvedCube, this.c[0]);

        const free = [];
        for (let i = 0; i < 4; i++) {
            if (edgesSolved[i] !== this.edges[i] || cornersSolved[i] !== this.corners[i]) {
                free.push(i);
            }
        }
        return free;
    }

    updateState() {
        this.edges    = convert.edgesToBinary(this.cube, this.e[this.cube.y_rotate]);
        this.corners  = convert.cornersToBinary(this.cube, this.c[this.cube.y_rotate]);
        this.freeSlots = this.checkFreeSlots();
    }

    solve() {
        let uNotation = "";
        const final   = [];
        let i = 0;

        while (i <= 4 && this.freeSlots.length > 0) {
            let found = false;

            for (const slot of [...this.freeSlots]) {
                const edgeOffset = 64 * (this.cube.y_rotate % 2);
                const key = JSON.stringify([
                    this.corners[slot],
                    this.edges[slot] ^ edgeOffset,
                ]);

                if (F2L.cachedPairs[slot] && key in F2L.cachedPairs[slot]) {
                    const { alg, name } = F2L.cachedPairs[slot][key];
                    // const reduced = reduce(uNotation + alg);
                    const customAlg = getSelectedAlg('f2l' + (slot + 1), name);
                    // const customAlg = getSelectedAlg('f2l', name);
                    const reduced = reduce(uNotation + (customAlg ?? alg));
                    final.push([reduced, name]);
                    this.freeSlots = this.freeSlots.filter(s => s !== slot);
                    found = true;
                    this.edges   = convert.edgesToBinary(this.cube, this.e[this.cube.y_rotate]);
                    this.corners = convert.cornersToBinary(this.cube, this.c[this.cube.y_rotate]);
                }
            }

            if (!found) {
                this.cube.U();
                uNotation += "U ";
                this.edges   = convert.edgesToBinary(this.cube, this.e[this.cube.y_rotate]);
                this.corners = convert.cornersToBinary(this.cube, this.c[this.cube.y_rotate]);
                i++;
            }
        }

        return final;
    }

    isSolved() {
        return this.checkFreeSlots().length === 0;
    }
}


F2L.cachedPairs = [];

F2L.loadCases = async function() {
    if (F2L.cachedPairs.length > 0) return;
    for (let i = 0; i < 4; i++) {
        const res  = await fetch(`cases/f2l${i + 1}_prepared.json`);
        const data = await res.json();
        const map  = {};
        data.forEach(item => {
            const key = JSON.stringify(item.pair);
            map[key]  = { alg: item.alg, name: item.name };
        });
        F2L.cachedPairs[i] = map;
    }
};