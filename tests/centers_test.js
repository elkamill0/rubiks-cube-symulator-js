test("test_centers_inverse()", () => {
    const moves = ["E","M","S"];

    for (let i = 0; i < 30; i++) {
        const c = new Cube();
        randomMoves(c, 20);

        const start = structuredClone(c.centers);

        for (const m of moves) {
            const copy = c.clone();

            copy[m]();
            copy[m + "p"]();

            assertEqual(copy.centers, start, `${m} centers inverse failed`);
        }
    }
});

test("test_centers_4_identity()", () => {
    const moves = ["E","M","S"];

    for (const m of moves) {
        const c = new Cube();
        const start = structuredClone(c.centers);

        for (let i = 0; i < 4; i++) c[m]();

        assertEqual(c.centers, start, `${m}^4 centers failed`);
    }
});

test("test_centers_no_duplication()", () => {
    for (let i = 0; i < 30; i++) {
        const c = new Cube();
        randomMoves(c, 30);

        const unique = new Set(c.centers);

        assert(unique.size === 6, "Center duplication");
    }
});


test("E move", () => {
    const c = new Cube({state:"231201341334510413034422433542534215005541101550250022"});
    c.E();
    assertEqual(c.centers, [0,4,1,2,3,5], "E failed");
});

test("E' move", () => {
    const c = new Cube({state:"231201341334510413034422433542534215005541101550250022"});
    c.Ep();
    assertEqual(c.centers, [0,2,3,4,1,5], "Ep failed");
});

test("E2 move", () => {
    const c = new Cube({state:"231201341334510413034422433542534215005541101550250022"});
    c.E2();
    assertEqual(c.centers, [0,3,4,1,2,5], "E2 failed");
});

test("M move", () => {
    const c = new Cube({state:"231201341334510413034422433542534215005541101550250022"});
    c.M();
    assertEqual(c.centers, [4,1,0,3,5,2], "M failed");
});

test("M' move", () => {
    const c = new Cube({state:"231201341334510413034422433542534215005541101550250022"});
    c.Mp();
    assertEqual(c.centers, [2,1,5,3,0,4], "Mp failed");
});

test("M2 move", () => {
    const c = new Cube({state:"231201341334510413034422433542534215005541101550250022"});
    c.M2();
    assertEqual(c.centers, [5,1,4,3,2,0], "M2 failed");
});

test("S move", () => {
    const c = new Cube({state:"231201341334510413034422433542534215005541101550250022"});
    c.S();
    assertEqual(c.centers, [1,5,2,0,4,3], "S failed");
});

test("S' move", () => {
    const c = new Cube({state:"231201341334510413034422433542534215005541101550250022"});
    c.Sp();
    assertEqual(c.centers, [3,0,2,5,4,1], "Sp failed");
});

test("S2 move", () => {
    const c = new Cube({state:"231201341334510413034422433542534215005541101550250022"});
    c.S2();
    // console.log(JSON.stringify(c.centers));
    assertEqual(c.centers, [5,3,2,1,4,0], "S2 failed");
});