const E_CENTERS = [1,2,3,4]
const M_CENTERS = [5,2,0,4]
const S_CENTERS = [5,3,0,1]


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

    E()  { this._cycleRight(E_CENTERS, this.centers); }
    Ep() {  this._cycleLeft(E_CENTERS, this.centers); }
    E2() {  this._swapPairs(E_CENTERS, this.centers); }

    Mp() { this._cycleRight(M_CENTERS, this.centers); }
    M()  {  this._cycleLeft(M_CENTERS, this.centers); }
    M2() {  this._swapPairs(M_CENTERS, this.centers); }

    Sp() { this._cycleRight(S_CENTERS, this.centers); }
    S()  {  this._cycleLeft(S_CENTERS, this.centers); }
    S2() {  this._swapPairs(S_CENTERS, this.centers); }

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
