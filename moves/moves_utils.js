class MovesUtils {
    constructor(y_rotate) {
        this.y_rotate = y_rotate;
    }

    R()  {} Rp() {} R2() {}
    L()  {} Lp() {} L2() {}
    U()  {} Up() {} U2() {}
    D()  {} Dp() {} D2() {}
    F()  {} Fp() {} F2() {}
    B()  {} Bp() {} B2() {}

    // Python: (y_rotate - 1) % 4  — w JS % może być ujemne, stąd + 4
    E()  { this.y_rotate = ((this.y_rotate - 1) % 4 + 4) % 4; }
    Ep() { this.y_rotate = ((this.y_rotate + 1) % 4 + 4) % 4; }
    // E()  { this.y_rotate = ((this.y_rotate + 1) % 4 + 4) % 4; }
    // Ep() { this.y_rotate = ((this.y_rotate - 1) % 4 + 4) % 4; }
    E2() { this.y_rotate = ((this.y_rotate + 2) % 4 + 4) % 4; }

    Mp() {} M()  {} M2() {}
    Sp() {} S()  {} S2() {}

    // r()  { this.R();  this.Mp(); } rp() { this.Rp(); this.M();  } r2() { this.R2(); this.M2(); }
    // l()  { this.L();  this.M();  } lp() { this.Lp(); this.Mp(); } l2() { this.L2(); this.M2(); }
    // u()  { this.U();  this.Ep(); } up() { this.Up(); this.E();  } u2() { this.U2(); this.E2(); }
    // d()  { this.D();  this.E();  } dp() { this.Dp(); this.Ep(); } d2() { this.D2(); this.E2(); }
    // f()  { this.F();  this.S();  } fp() { this.Fp(); this.Sp(); } f2() { this.F2(); this.S2(); }
    // b()  { this.B();  this.Sp(); } bp() { this.Bp(); this.S();  } b2() { this.B2(); this.S2(); }

    // x()  { this.Mp(); this.R();  this.Lp(); }
    // xp() { this.M();  this.Rp(); this.L();  }
    // x2() { this.M2(); this.R2(); this.L2(); }

    // z()  { this.F();  this.S();  this.Bp(); }
    // zp() { this.Fp(); this.Sp(); this.B();  }
    // z2() { this.F2(); this.S2(); this.B2(); }

    // y()  { this.U();  this.Dp(); this.Ep(); }
    // yp() { this.Up(); this.D();  this.E();  }
    // y2() { this.U2(); this.D2(); this.E2(); }

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
