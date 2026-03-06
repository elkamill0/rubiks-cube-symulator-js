class MovesCenters {
    constructor(centers) {
        this.centers = centers;
    }

    _cycle(indices, target) {
        const temp = target.map(i => this.centers[i]);
        indices.forEach((idx, i) => {
            this.centers[idx] = temp[i];
        });
    }

    R()  {} Rp() {} R2() {}
    L()  {} Lp() {} L2() {}
    U()  {} Up() {} U2() {}
    D()  {} Dp() {} D2() {}
    F()  {} Fp() {} F2() {}
    B()  {} Bp() {} B2() {}

    E()  { this._cycle([1,2,3,4], [4,1,2,3]); }
    Ep() { this._cycle([1,2,3,4], [2,3,4,1]); }
    E2() { this._cycle([1,2,3,4], [3,4,1,2]); }

    Mp() { this._cycle([0,2,5,4], [2,5,4,0]); }
    M()  { this._cycle([0,2,5,4], [4,0,2,5]); }
    M2() { this._cycle([0,2,5,4], [5,4,0,2]); }

    Sp() { this._cycle([0,3,5,1], [3,5,1,0]); }
    S()  { this._cycle([0,3,5,1], [1,0,3,5]); }
    S2() { this._cycle([0,3,5,1], [5,1,0,3]); }

    // r()  { this.Mp(); } rp() { this.M();  } r2() { this.M2(); }
    // l()  { this.M();  } lp() { this.Mp(); } l2() { this.M2(); }
    // u()  { this.Ep(); } up() { this.E();  } u2() { this.E2(); }
    // d()  { this.E();  } dp() { this.Ep(); } d2() { this.E2(); }
    // f()  { this.S();  } fp() { this.Sp(); } f2() { this.S2(); }
    // b()  { this.Sp(); } bp() { this.S();  } b2() { this.S2(); }

    // y()  { this.Ep(); }
    // yp() { this.E();  }
    // y2() { this.E2(); }

    // x()  { this.Mp(); }
    // xp() { this.M();  }
    // x2() { this.M2(); }

    // z()  { this.S();  }
    // zp() { this.Sp(); }
    // z2() { this.S2(); }

    r()  {} rp() {} r2() {}
    l()  {} lp() {} l2() {}
    u()  {} up() {} u2() {}
    d()  {} dp() {} d2() {}
    f()  {} fp() {} f2() {}
    b()  {} bp() {} b2() {}
    x()  {} xp() {} x2() {}
    y()  {} yp() {} y2() {}
    z()  {} zp() {} z2() {}

}
