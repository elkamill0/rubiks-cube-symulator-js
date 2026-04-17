const R_CORNERS = [2,1,5,6];
const L_CORNERS = [0,3,7,4];
const U_CORNERS = [0,1,2,3];
const D_CORNERS = [7,6,5,4];
const F_CORNERS = [3,2,6,7];
const B_CORNERS = [1,0,4,5];


class MovesCorners{
    constructor(corners) {
        this.corners = corners;
    }

    _rotateCorner(elements, clockwise = true) {
        const operation = clockwise ? [1, -1, 1, -1] : [-1, 1, -1, 1];
        elements.forEach((el, i) => {
            this.corners[el][1] = (this.corners[el][1] + operation[i] + 3) % 3;
        });
    }

    _cycleRight(arr, data) {
        const temp = data[arr[arr.length-1]];
        for (let i = arr.length - 1; i > 0; i--){
            data[arr[i]] = data[arr[i-1]]
        }
        data[arr[0]] = temp;
    }

    _cycleLeft(arr, data) {
        const temp = data[arr[0]];
        for (let i = 0; i < arr.length - 1; i++) {
            data[arr[i]] = data[arr[i + 1]];
        }
        data[arr[arr.length - 1]] = temp;
    }

    _swapPairs(arr, data) {
        const a = data[arr[0]];
        const b = data[arr[1]];
        const c = data[arr[2]];
        const d = data[arr[3]];

        data[arr[0]] = c;
        data[arr[1]] = d;
        data[arr[2]] = a;
        data[arr[3]] = b;
    }

    R()  { this._cycleRight(R_CORNERS, this.corners); this._rotateCorner(R_CORNERS, false);}
    Rp() {  this._cycleLeft(R_CORNERS, this.corners); this._rotateCorner(R_CORNERS, false); }
    R2() {  this._swapPairs(R_CORNERS, this.corners); }

    L()  { this._cycleRight(L_CORNERS, this.corners); this._rotateCorner(L_CORNERS, false); }
    Lp() {  this._cycleLeft(L_CORNERS, this.corners); this._rotateCorner(L_CORNERS, false); }
    L2() {  this._swapPairs(L_CORNERS, this.corners); }

    U()  { this._cycleRight(U_CORNERS, this.corners); }
    Up() {  this._cycleLeft(U_CORNERS, this.corners); }
    U2() {  this._swapPairs(U_CORNERS, this.corners); }

    D()  { this._cycleRight(D_CORNERS, this.corners); }
    Dp() {  this._cycleLeft(D_CORNERS, this.corners); }
    D2() {  this._swapPairs(D_CORNERS, this.corners); }

    F()  { this._cycleRight(F_CORNERS, this.corners); this._rotateCorner(F_CORNERS, false); }
    Fp() {  this._cycleLeft(F_CORNERS, this.corners); this._rotateCorner(F_CORNERS, false); }
    F2() {  this._swapPairs(F_CORNERS, this.corners); }

    B()  { this._cycleRight(B_CORNERS, this.corners); this._rotateCorner(B_CORNERS, false); }
    Bp() {  this._cycleLeft(B_CORNERS, this.corners); this._rotateCorner(B_CORNERS, false); }
    B2() {  this._swapPairs(B_CORNERS, this.corners); }

    E()  {} Ep() {} E2() {}
    M()  {} Mp() {} M2() {}
    S()  {} Sp() {} S2() {}

    // r()  { this.R();  this.Mp(); } rp() { this.Rp(); this.M();  } r2() { this.R2(); this.M2(); }
    // l()  { this.L();  this.M();  } lp() { this.Lp(); this.Mp(); } l2() { this.L2(); this.M2(); }
    // u()  { this.U();  this.Ep(); } up() { this.Up(); this.E();  } u2() { this.U2(); this.E2(); }
    // d()  { this.D();  this.E();  } dp() { this.Dp(); this.Ep(); } d2() { this.D2(); this.E2(); }
    // f()  { this.F();  this.S();  } fp() { this.Fp(); this.Sp(); } f2() { this.F2(); this.S2(); }
    // b()  { this.B();  this.Sp(); } bp() { this.Bp(); this.S();  } b2() { this.B2(); this.S2(); }

    // y()  { this.U();  this.Dp(); }
    // yp() { this.Up(); this.D();  }
    // y2() { this.U2(); this.D2(); }

    // x()  { this.R();  this.Lp(); }
    // xp() { this.Rp(); this.L();  }
    // x2() { this.R2(); this.L2(); }

    // z()  { this.F();  this.Bp(); }
    // zp() { this.Fp(); this.B();  }
    // z2() { this.F2(); this.B2(); }

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