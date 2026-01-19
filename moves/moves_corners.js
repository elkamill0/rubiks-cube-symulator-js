class MovesCorners {
    constructor(corners) {
        this.corners = corners; // expecting an array of arrays: [[index, orientation], ...]
    }

    // Prywatna funkcja do obracania narożników
    _rotateCorner(elements, clockwise = true) {
        const operation = clockwise ? [1, -1, 1, -1] : [-1, 1, -1, 1];
        elements.forEach((el, i) => {
            this.corners[el][1] = (this.corners[el][1] + operation[i] + 3) % 3;
        });
    }
    // Funkcja pomocnicza do cyklicznej zamiany narożników
    _cycleCorners(indices, target) {
        if (!target) {
            const temp = indices.map(i => this.corners[i]);
            indices.forEach((i, idx) => {
                this.corners[i] = temp[(idx + 1) % indices.length];
            });
        } else {
            const temp = target.map(i => this.corners[i]); // tymczasowa kopia
            indices.forEach((i, idx) => {
                this.corners[i] = temp[idx];
            });
        }
    }

    // Ruchy
    R() {
        this._cycleCorners([1, 2, 6, 5]);
        this._rotateCorner([1, 2, 6, 5], true);
    }

    Rp() {
        this._cycleCorners([1, 2, 6, 5], [5, 1, 2, 6]);
        this._rotateCorner([1, 2, 6, 5], true);
    }

    R2() {
        this._cycleCorners([1, 2, 6, 5], [6, 5, 1, 2]);
    }

    L() {
        this._cycleCorners([0, 3, 7, 4], [4, 0, 3, 7]);
        this._rotateCorner([0, 3, 7, 4], false);
    }

    Lp() {
        this._cycleCorners([0, 3, 7, 4], [3, 7, 4, 0]);
        this._rotateCorner([0, 3, 7, 4], false);
    }

    L2() {
        this._cycleCorners([0, 3, 7, 4], [7, 4, 0, 3]);
    }

    U() {
        this._cycleCorners([0, 1, 2, 3], [3, 0, 1, 2]);
    }

    Up() {
        this._cycleCorners([0, 1, 2, 3], [1, 2, 3, 0]);
    }

    U2() {
        this._cycleCorners([0, 1, 2, 3], [2, 3, 0, 1]);
    }

    D() {
        this._cycleCorners([4, 5, 6, 7], [5, 6, 7, 4]);
    }

    Dp() {
        this._cycleCorners([4, 5, 6, 7], [7, 4, 5, 6]);
    }

    D2() {
        this._cycleCorners([4, 5, 6, 7], [6, 7, 4, 5]);
    }

    F() {
        this._cycleCorners([3, 2, 6, 7], [7, 3, 2, 6]);
        this._rotateCorner([3, 2, 6, 7], false);
    }

    Fp() {
        this._cycleCorners([3, 2, 6, 7], [2, 6, 7, 3]);
        this._rotateCorner([3, 2, 6, 7], false);
    }

    F2() {
        this._cycleCorners([3, 2, 6, 7], [6, 7, 3, 2]);
    }

    B() {
        this._cycleCorners([0, 4, 5, 1], [1, 0, 4, 5]);
        this._rotateCorner([0, 4, 5, 1], true);
    }

    Bp() {
        this._cycleCorners([0, 4, 5, 1], [4, 5, 1, 0]);
        this._rotateCorner([0, 4, 5, 1], true);
    }

    B2() {
        this._cycleCorners([0, 4, 5, 1], [5, 1, 0, 4]);
    }

    E() { this._cycleCorners([8, 9, 10, 11], [9, 10, 11, 8]); }
    Ep() { this._cycleCorners([8, 9, 10, 11], [11, 8, 9, 10]); }
    E2() { this._cycleCorners([8, 9, 10, 11], [10, 11, 8, 9]); }

    M() { this._cycleCorners([0, 2, 6, 4], [4, 0, 2, 6]); }
    Mp() { this._cycleCorners([0, 2, 6, 4], [2, 6, 4, 0]); }
    M2() { this._cycleCorners([0, 2, 6, 4], [6, 4, 2, 0]); }

    S() { this._cycleCorners([3, 1, 5, 7], [7, 3, 1, 5]); }
    Sp() { this._cycleCorners([3, 1, 5, 7], [1, 5, 7, 3]); }
    S2() { this._cycleCorners([3, 1, 5, 7], [5, 7, 3, 1]); }

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

    y() { this.U(); this.Dp(); }
    yp() { this.Up(); this.D(); }
    y2() { this.U2(); this.D2(); }

    x() {
        this.R();
        this.Lp();
    }

    xp() {
        this.Rp();
        this.L();
    }

    x2() {
        this.R2();
        this.L2();
    }

    z() {
        this.F();
        this.Bp();
    }

    zp() {
        this.Fp();
        this.B();
    }

    z2() {
        this.F2();
        this.B2();
    }


}
