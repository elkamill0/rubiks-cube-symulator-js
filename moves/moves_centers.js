class MovesCenters {
    constructor(centers) {
        this.centers = centers;
    }

    // --- Ruchy ścianek (puste, można uzupełnić jeśli potrzebne) ---
    R() {}
    Rp() {}
    R2() {}

    L() {}
    Lp() {}
    L2() {}

    U() {}
    Up() {}
    U2() {}

    D() {}
    Dp() {}
    D2() {}

    F() {}
    Fp() {}
    F2() {}

    B() {}
    Bp() {}
    B2() {}

    // --- E-warstwa ---
    E() {
        const temp = [this.centers[4], this.centers[1], this.centers[2], this.centers[3]];
        [this.centers[1], this.centers[2], this.centers[3], this.centers[4]] = temp;
    }

    Ep() {
        const temp = [this.centers[2], this.centers[3], this.centers[4], this.centers[1]];
        [this.centers[1], this.centers[2], this.centers[3], this.centers[4]] = temp;
    }

    E2() {
        const temp = [this.centers[3], this.centers[4], this.centers[1], this.centers[2]];
        [this.centers[1], this.centers[2], this.centers[3], this.centers[4]] = temp;
    }

    // --- M-warstwa ---
    Mp() {
        const temp = [this.centers[2], this.centers[5], this.centers[4], this.centers[0]];
        [this.centers[0], this.centers[2], this.centers[5], this.centers[4]] = temp;
    }

    M() {
        const temp = [this.centers[4], this.centers[0], this.centers[2], this.centers[5]];
        [this.centers[0], this.centers[2], this.centers[5], this.centers[4]] = temp;
    }

    M2() {
        const temp = [this.centers[5], this.centers[4], this.centers[0], this.centers[2]];
        [this.centers[0], this.centers[2], this.centers[5], this.centers[4]] = temp;
    }

    // --- S-warstwa ---
    S() {
        const temp = [this.centers[1], this.centers[0], this.centers[3], this.centers[5]];
        [this.centers[0], this.centers[3], this.centers[5], this.centers[1]] = temp;
    }

    Sp() {
        const temp = [this.centers[3], this.centers[5], this.centers[1], this.centers[0]];
        [this.centers[0], this.centers[3], this.centers[5], this.centers[1]] = temp;
    }

    S2() {
        const temp = [this.centers[5], this.centers[1], this.centers[0], this.centers[3]];
        [this.centers[0], this.centers[3], this.centers[5], this.centers[1]] = temp;
    }

    // --- Skróty dla ruchów szerokich ---
    r() { this.Mp(); }
    rp() { this.M(); }
    r2() { this.M2(); }

    l() { this.M(); }
    lp() { this.Mp(); }
    l2() { this.M2(); }

    u() { this.Ep(); }
    up() { this.E(); }
    u2() { this.E2(); }

    d() { this.E(); }
    dp() { this.Ep(); }
    d2() { this.E2(); }

    f() { this.S(); }
    fp() { this.Sp(); }
    f2() { this.S2(); }

    b() { this.Sp(); }
    bp() { this.S(); }
    b2() { this.S2(); }

    // --- Skróty dla obrotów całej kostki ---
    y() { this.Ep(); }
    yp() { this.E(); }
    y2() { this.E2(); }

    x() { this.Mp(); }
    xp() { this.M(); }
    x2() { this.M2(); }

    z() { this.S(); }
    zp() { this.Sp(); }
    z2() { this.S2(); }
}
