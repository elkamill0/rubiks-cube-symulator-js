class PLL {
    constructor(cube, path = "cases/pll_cases.json") {
        this.cube = cube.clone();          // aktualny stan
        this.solved_cube = cube.clone();   // solved
        this.solved_cube.reset();
        this.path = path;
        this.cases = null;
    }

    /* ===============================
       KLONOWANIE KOSTKI
    ================================ */
    static cloneCube(cube) {
        const c = new Cube();
        c.corners = cube.corners.map(x => [...x]);
        c.edges = cube.edges.map(x => [...x]);
        c.centers = [...cube.centers];
        return c;
    }

    /* ===============================
       PRZYGOTOWANIE ALGORYTMÓW
       (uruchamiane offline / dev)
    ================================ */
    prepare_algs(path = "algs/pll.json") {
        const data = JSON.parse(this._loadFile(path));
        const records = [];

        for (let i = 0; i < data.length; i++) {
            const baseAlg = data[i];

            for (const u of ["", " U", " U2", " U'"]) {
                const notation = baseAlg + u;

                const cube = PLL.cloneCube(this.solved_cube);
                cube.move(inverse(notation));

                records.push({
                    edges: cube.edges.slice(0, 4).map(e => e[0]),
                    corners: cube.corners.slice(0, 4).map(c => c[0]),
                    algorithm: notation
                });
            }
        }

        this._saveFile(this.path, records);
        console.log(`Zapisano ${records.length} przypadków PLL → ${this.path}`);
    }

    /* ===============================
       ROZWIĄZYWANIE PLL
    ================================ */
    solve() {
        if (!this.cases) {
            const data = JSON.parse(this._loadFile(this.path));
            this.cases = {};
            for (const item of data) {
                const key = this._key(item.edges, item.corners);
                this.cases[key] = item.algorithm;
            }
        }

        let notation = "";
        const cube = PLL.cloneCube(this.cube);

        for (let i = 0; i < 4; i++) {
            const edges = cube.edges.slice(0, 4).map(e => e[0]);
            const corners = cube.corners.slice(0, 4).map(c => c[0]);
            const key = this._key(edges, corners);

            if (this.cases[key]) {
                return reduce(notation + this.cases[key]);
            }

            cube.U();
            notation += "U ";
        }

        return null;
    }

    /* ===============================
       HELPERY
    ================================ */
    _key(edges, corners) {
        return edges.join(",") + "|" + corners.join(",");
    }

    _loadFile(path) {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", path, false); // SYNC
        xhr.send(null);
        if (xhr.status !== 200) {
            throw new Error(`Nie można wczytać ${path}`);
        }
        return xhr.responseText;
    }

    _saveFile(path, data) {
        console.warn("Zapisu plików nie da się zrobić w przeglądarce.");
        console.log(JSON.stringify(data, null, 2));
    }
}
