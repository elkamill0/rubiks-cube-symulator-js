test("R changes state", () => {
    const c = new Cube({state:"231201341334510413034422433542534215005541101550250022"});
    const before = structuredClone(c.corners);

    c.R();

    assert(JSON.stringify(c.corners) !== JSON.stringify(before), "R failed");
});

test("R inverse works", () => {
    const c = new Cube({state: "231201341334510413034422433542534215005541101550250022"});
    const start = structuredClone(c.corners);

    c.R();
    c.Rp();

    assertEqual(c.corners, start, "R + Rp failed");
});

function randomMoves(c, n = 20) {
    const moves = ["R","Rp","L","Lp","U","Up","D","Dp","F","Fp","B","Bp"];

    for (let i = 0; i < n; i++) {
        const m = moves[Math.floor(Math.random() * moves.length)];
        c[m]();
    }
}

test("test_inverse_all_moves", () => {
    const moves = ["R","L","U","D","F","B"];

    for (let i = 0; i < 50; i++) {
        const c = new Cube();
        randomMoves(c, 20);

        const start = structuredClone(c.corners);

        for (const m of moves) {
            const copy = c.clone();

            copy[m]();
            copy[m + "p"]();

            assertEqual(copy.corners, start, `${m} inverse failed`);
        }
    }
});

test("R^4 identity", () => {
    const c = new Cube({state:"231201341334510413034422433542534215005541101550250022"});
    const start = structuredClone(c.corners);

    c.R(); c.R(); c.R(); c.R();

    assertEqual(c.corners, start, "R4 failed");
});

test("test_moves_4_identity", () => {
    const moves = ["R","L","U","D","F","B"];

    for (const m of moves) {
        const c = new Cube();
        const start = structuredClone(c.corners);

        for (let i = 0; i < 4; i++) c[m]();

        assertEqual(c.corners, start, `${m}^4 failed`);
    }
});

test("test_no_corner_duplication", () => {
    for (let i = 0; i < 50; i++) {
        const c = new Cube();
        randomMoves(c, 30);

        const indices = c.corners.map(x => x[0]);
        const unique = new Set(indices);

        assert(
            unique.size === 8,
            "Duplicate or missing corner detected"
        );
    }
});

test("test_clone_independence", () => {
    const c = new Cube();
    randomMoves(c, 10);

    const clone = c.clone();

    c.R();

    assert(
        JSON.stringify(c.corners) !== JSON.stringify(clone.corners),
        "Clone is not independent"
    );
});


test("R move", () => {
    const c = new Cube({state:"231201341334510413034422433542534215005541101550250022"});
    c.R();
    assertEqual(c.corners, [[6,2],[4,2],[2,2],[1,1],[0,0],[3,0],[7,2],[5,0]], "R failed");
});

test("R' move", () => {
    const c = new Cube({state:"231201341334510413034422433542534215005541101550250022"});
    c.Rp();
    assertEqual(c.corners, [[6,2],[7,2],[3,0],[1,1],[0,0],[2,2],[4,2],[5,0]], "Rp failed");
});

test("R2 move", () => {
    const c = new Cube({state:"231201341334510413034422433542534215005541101550250022"});
    c.R2();
    assertEqual(c.corners, [[6,2],[2,0],[7,1],[1,1],[0,0],[4,1],[3,1],[5,0]], "R2 failed");
});

test("L move", () => {
    const c = new Cube({state:"231201341334510413034422433542534215005541101550250022"});
    c.L();
    assertEqual(c.corners, [[0,2],[3,1],[4,1],[6,0],[5,1],[7,1],[2,0],[1,0]], "L failed");
});

test("L' move", () => {
    const c = new Cube({state:"231201341334510413034422433542534215005541101550250022"});
    c.Lp();
    assertEqual(c.corners, [[1,0],[3,1],[4,1],[5,1],[6,0],[7,1],[2,0],[0,2]], "Lp failed");
});

test("L2 move", () => {
    const c = new Cube({state:"231201341334510413034422433542534215005541101550250022"});
    c.L2();
    assertEqual(c.corners, [[5,0],[3,1],[4,1],[0,0],[1,1],[7,1],[2,0],[6,2]], "L2 failed");
});

test("U move", () => {
    const c = new Cube({state:"231201341334510413034422433542534215005541101550250022"});
    c.U();
    assertEqual(c.corners, [[1,1],[6,2],[3,1],[4,1],[0,0],[7,1],[2,0],[5,0]], "U failed");
});

test("U' move", () => {
    const c = new Cube({state:"231201341334510413034422433542534215005541101550250022"});
    c.Up();
    assertEqual(c.corners, [[3,1],[4,1],[1,1],[6,2],[0,0],[7,1],[2,0],[5,0]], "Up failed");
});

test("U2 move", () => {
    const c = new Cube({state:"231201341334510413034422433542534215005541101550250022"});
    c.U2();
    assertEqual(c.corners, [[4,1],[1,1],[6,2],[3,1],[0,0],[7,1],[2,0],[5,0]], "U2 failed");
});

test("D move", () => {
    const c = new Cube({state:"231201341334510413034422433542534215005541101550250022"});
    c.D();
    assertEqual(c.corners, [[6,2],[3,1],[4,1],[1,1],[7,1],[2,0],[5,0],[0,0]], "D failed");
});

test("D' move", () => {
    const c = new Cube({state:"231201341334510413034422433542534215005541101550250022"});
    c.Dp();
    assertEqual(c.corners, [[6,2],[3,1],[4,1],[1,1],[5,0],[0,0],[7,1],[2,0]], "Dp failed");
});

test("D2 move", () => {
    const c = new Cube({state:"231201341334510413034422433542534215005541101550250022"});
    c.D2();
    assertEqual(c.corners, [[6,2],[3,1],[4,1],[1,1],[2,0],[5,0],[0,0],[7,1]], "D2 failed");
});

test("F move", () => {
    const c = new Cube({state:"231201341334510413034422433542534215005541101550250022"});
    c.F();
    assertEqual(c.corners, [[6,2],[3,1],[1,2],[5,2],[0,0],[7,1],[4,0],[2,1]], "F failed");
});

test("F' move", () => {
    const c = new Cube({state:"231201341334510413034422433542534215005541101550250022"});
    c.Fp();
    assertEqual(c.corners, [[6,2],[3,1],[2,1],[4,0],[0,0],[7,1],[5,2],[1,2]], "Fp failed");
});

test("F2 move", () => {
    const c = new Cube({state:"231201341334510413034422433542534215005541101550250022"});
    c.F2();
    assertEqual(c.corners, [[6,2],[3,1],[5,0],[2,0],[0,0],[7,1],[1,1],[4,1]], "F2 failed");
});

test("B move", () => {
    const c = new Cube({state:"231201341334510413034422433542534215005541101550250022"});
    c.B();
    assertEqual(c.corners, [[3,2],[7,0],[4,1],[1,1],[6,1],[0,1],[2,0],[5,0]], "B failed");
});

test("B' move", () => {
    const c = new Cube({state:"231201341334510413034422433542534215005541101550250022"});
    c.Bp();
    assertEqual(c.corners, [[0,1],[6,1],[4,1],[1,1],[7,0],[3,2],[2,0],[5,0]], "Bp failed");
});

test("B2 move", () => {
    const c = new Cube({state:"231201341334510413034422433542534215005541101550250022"});
    c.B2();
    assertEqual(c.corners, [[7,1],[0,0],[4,1],[1,1],[3,1],[6,2],[2,0],[5,0]], "B2 failed");
});

// test("R moving", () =>{
//     const c = new Cube({state:"231201341334510413034422433542534215005541101550250022"});


//     assertEqual(c.corners, [[1,0],[7,1],[2,2],[]])
// })


// [[6,2],[3,1],[4,1],[1,1],[0,0],[7,1],[2,0],[5,0]]
