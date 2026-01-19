class OLL {
    constructor(cube, path = "cases/oll_cases.json") {
        // kopia aktualnej kostki
        this.cube = cube.clone();

        // kostka rozwiązana
        this.solved_cube = cube.clone();
        this.solved_cube.reset();

        this.path = path;
        this.cases = null;
    }

    /* ===============================
       WCZYTANIE CASE'ÓW (SYNC)
    ================================ */
    loadCases() {
        if (this.cases !== null) return;

        const xhr = new XMLHttpRequest();
        xhr.open("GET", this.path, false); // ⬅ SYNC
        xhr.send(null);

        if (xhr.status !== 200) {
            throw new Error("Nie można wczytać " + this.path);
        }

        const data = JSON.parse(xhr.responseText);
        this.cases = {};

        for (const item of data) {
            const key = this._key(item.edges, item.corners);
            this.cases[key] = item.algorithm;
        }
    }

    /* ===============================
       ROZWIĄZYWANIE OLL
    ================================ */
    solve() {
        this.loadCases();

        let notation = "";
        const cube = this.cube.clone();

        for (let i = 0; i < 4; i++) {
            const edges = cube.edges.slice(0, 4).map(e => e[1]);
            const corners = cube.corners.slice(0, 4).map(c => c[1]);

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
       SPRAWDZENIE CZY OLL GOTOWY
    ================================ */
    is_solved() {
        for (let i = 0; i < 4; i++) {
            if (this.cube.edges[i][1] !== 0) return false;
            if (this.cube.corners[i][1] !== 0) return false;
        }
        return true;
    }

    /* ===============================
       HELPER
    ================================ */
    _key(edges, corners) {
        return edges.join(",") + "|" + corners.join(",");
    }
}
