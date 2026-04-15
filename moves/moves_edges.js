const R_EDGES = [ 1,  9, 5, 10];
const L_EDGES = [ 3, 11, 7, 8];
const U_EDGES = [ 0,  1, 2, 3];
const D_EDGES = [ 7,  6, 5, 4];
const F_EDGES = [ 2, 10, 6, 11];
const B_EDGES = [ 0,  8, 4, 9];
const M_EDGES = [ 6,  2, 0, 4];
const E_EDGES = [11, 10, 9, 8];
const S_EDGES = [ 5,  1, 3, 7];


class MovesEdges{
    constructor(edges) {
        this.edges = edges;
    }

    _rotate(elements) {
        elements.forEach(el => {
            this.edges[el][1] = 1 - this.edges[el][1];
        });
    }

    R()  { this._cycleRight(R_EDGES, this.edges);   }
     Rp() { this._cycleLeft(R_EDGES, this.edges);   }
     R2() { this._swapPairs(R_EDGES, this.edges);   }

    L()  { this._cycleRight(L_EDGES, this.edges);   }
     Lp() { this._cycleLeft(L_EDGES, this.edges);   }
     L2() { this._swapPairs(L_EDGES, this.edges);   }

    U()  { this._cycleRight(U_EDGES, this.edges);    }
     Up() { this._cycleLeft(U_EDGES, this.edges);    }
     U2() { this._swapPairs(U_EDGES, this.edges);    }

    D()  { this._cycleRight(D_EDGES, this.edges);    }
     Dp() { this._cycleLeft(D_EDGES, this.edges);    }
     D2() { this._swapPairs(D_EDGES, this.edges);    }

    F()  { this._cycleRight(F_EDGES, this.edges);  this._rotate(F_EDGES); }
     Fp() { this._cycleLeft(F_EDGES, this.edges);  this._rotate(F_EDGES); }
     F2() { this._swapPairs(F_EDGES, this.edges);  }

    B()  { this._cycleRight(B_EDGES, this.edges);    this._rotate(B_EDGES); }
     Bp() { this._cycleLeft(B_EDGES, this.edges);    this._rotate(B_EDGES); }
     B2() { this._swapPairs(B_EDGES, this.edges);    }

    E()  { this._cycleRight(E_EDGES, this.edges);this._rotate(E_EDGES);   }
     Ep() { this._cycleLeft(E_EDGES, this.edges);this._rotate(E_EDGES);  }
     E2() { this._swapPairs(E_EDGES, this.edges); }

    Mp() { this._cycleRight(M_EDGES, this.edges); this._rotate(M_EDGES); }
     M()  { this._cycleLeft(M_EDGES, this.edges); this._rotate(M_EDGES); }
     M2() { this._swapPairs(M_EDGES, this.edges); }

    Sp() { this._cycleRight(S_EDGES, this.edges); this._rotate(S_EDGES); }
     S()  { this._cycleLeft(S_EDGES, this.edges); this._rotate(S_EDGES); }
     S2() { this._swapPairs(S_EDGES, this.edges); }

    r()  { this.R();  this.Mp(); } rp() { this.Rp(); this.M();  } r2() { this.R2(); this.M2(); }
    l()  { this.L();  this.M();  } lp() { this.Lp(); this.Mp(); } l2() { this.L2(); this.M2(); }
    u()  { this.U();  this.Ep(); } up() { this.Up(); this.E();  } u2() { this.U2(); this.E2(); }
    d()  { this.D();  this.E();  } dp() { this.Dp(); this.Ep(); } d2() { this.D2(); this.E2(); }
    f()  { this.F();  this.S();  } fp() { this.Fp(); this.Sp(); } f2() { this.F2(); this.S2(); }
    b()  { this.B();  this.Sp(); } bp() { this.Bp(); this.S();  } b2() { this.B2(); this.S2(); }

    x()  { this.Mp(); this.R();  this.Lp(); }
    xp() { this.M();  this.Rp(); this.L();  }
    x2() { this.M2(); this.R2(); this.L2(); }

    z()  { this.F();  this.S();  this.Bp(); }
    zp() { this.Fp(); this.Sp(); this.B();  }
    z2() { this.F2(); this.S2(); this.B2(); }

    y()  { this.U();  this.Dp(); this.Ep(); }
    yp() { this.Up(); this.D();  this.E();  }
    y2() { this.U2(); this.D2(); this.E2(); }
}
