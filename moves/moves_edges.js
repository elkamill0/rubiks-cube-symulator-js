class MovesEdges {
    constructor(edges) {
        this.edges = edges; // expecting array of arrays: [[index, flipped], ...]
    }

    // Prywatna funkcja do obracania krawędzi
    _rotate(elements) {
        elements.forEach(el => {
            this.edges[el][1] = 1 - this.edges[el][1];
        });
    }

    // Funkcja pomocnicza do cyklicznej zamiany krawędzi
    _cycleEdges(indices, target = null) {
        if (!target) {
            // Cykl w odwrotną stronę: ostatni element na początek
            const temp = indices.map(i => this.edges[i]);
            indices.forEach((i, idx) => {
                this.edges[i] = temp[(idx - 1 + indices.length) % indices.length];
            });
        } else {
            // Tworzymy tymczasową kopię target, żeby przypisanie było równoczesne
            const temp = target.map(i => this.edges[i]);
            indices.forEach((i, idx) => {
                this.edges[i] = temp[idx];
            });
        }
    }

    // Ruchy
    R() { this._cycleEdges([1, 9, 5, 10]); }
    Rp() { this._cycleEdges([1, 9, 5, 10], [9, 5, 10, 1]); }
    R2() { this._cycleEdges([1, 9, 5, 10], [5, 10, 1, 9]); }

    L() { this._cycleEdges([3, 11, 7, 8]); }
    Lp() { this._cycleEdges([3, 11, 7, 8], [11, 7, 8, 3]); }
    L2() { this._cycleEdges([3, 11, 7, 8], [7, 8, 3, 11]); }

    U() { this._cycleEdges([0, 1, 2, 3], [3, 0, 1, 2]); }
    Up() { this._cycleEdges([0, 1, 2, 3], [1, 2, 3, 0]); }
    U2() { this._cycleEdges([0, 1, 2, 3], [2, 3, 0, 1]); }

    D() { this._cycleEdges([4, 5, 6, 7], [5, 6, 7, 4]); }
    Dp() { this._cycleEdges([4, 5, 6, 7], [7, 4, 5, 6]); }
    D2() { this._cycleEdges([4, 5, 6, 7], [6, 7, 4, 5]); }

    F() { this._cycleEdges([2, 10, 6, 11], [11, 2, 10, 6]); this._rotate([2, 10, 6, 11]); }
    Fp() { this._cycleEdges([2, 10, 6, 11], [10, 6, 11, 2]); this._rotate([2, 10, 6, 11]); }
    F2() { this._cycleEdges([2, 10, 6, 11], [6, 11, 2, 10]); }

    B() { this._cycleEdges([0, 8, 4, 9], [9, 0, 8, 4]); this._rotate([0, 8, 4, 9]); }
    Bp() { this._cycleEdges([0, 8, 4, 9], [8, 4, 9, 0]); this._rotate([0, 8, 4, 9]); }
    B2() { this._cycleEdges([0, 8, 4, 9], [4, 9, 0, 8]); }

    y() {
        this.U();
        this.Dp();
        this.Ep();
    }

    yp() {
        this.Up();
        this.D();
        this.E();
    }

    y2() {
        this.U2();
        this.D2();
        this.E2();
    }

    E() { this._cycleEdges([8, 9, 10, 11], [9, 10, 11, 8]); }
    Ep() { this._cycleEdges([8, 9, 10, 11], [11, 8, 9, 10]); }
    E2() { this._cycleEdges([8, 9, 10, 11], [10, 11, 8, 9]); }

    Mp() {
        this._cycleEdges([0, 2, 6, 4], [2, 6, 4, 0]);
    }

    M() {
        this._cycleEdges([0, 2, 6, 4], [4, 0, 2, 6]);
    }

    M2() { this._cycleEdges([0, 2, 6, 4], [6, 4, 2, 0]); }

    S() { this._cycleEdges([3, 1, 5, 7], [7, 3, 1, 5]); }
    Sp() { this._cycleEdges([3, 1, 5, 7], [1, 5, 7, 3]); }
    S2() { this._cycleEdges([3, 1, 5, 7], [5, 7, 3, 1]); }

    r() { this.R(); this.Mp(); }
    rp() { this.Rp(); this.M(); }
    r2() { this.R2(); this.M2(); }

    l() { this.L(); this.M(); }
    lp() { this.Lp(); this.Mp(); }
    l2() { this.L2(); this.M2(); }

    u() { this.U(); this.Ep(); }
    up() { this.Up(); this.E(); }
    u2() { this.U2(); this.E2(); }

    d() { this.D(); this.E(); }
    dp() { this.Dp(); this.Ep(); }
    d2() { this.D2(); this.E2(); }

    f() { this.F(); this.S(); }
    fp() { this.Fp(); this.Sp(); }
    f2() { this.F2(); this.S2(); }

    b() { this.B(); this.Sp(); }
    bp() { this.Bp(); this.S(); }
    b2() { this.B2(); this.S2(); }

    x() {
        this.Mp();
        this.R();
        this.Lp();
    }

    xp() {
        this.M();
        this.Rp();
        this.L();
    }

    x2() {
        this.M2();
        this.R2();
        this.L2();
    }

    z() {
        this.F();
        this.S();
        this.Bp();
    }

    zp() {
        this.Fp();
        this.Sp();
        this.B();
    }

    z2() {
        this.F2();
        this.S2();
        this.B2();
    }

}
