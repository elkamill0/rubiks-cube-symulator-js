test("test_wide_inverse()", () => {
    const moves = ["r","l",
                   "u","d",
                   "f","b"];

    for (let i = 0; i < 30; i++) {
        const c = new Cube();
        randomMoves(c, 20);

        const startCorners = structuredClone(c.corners);
        const startEdges = structuredClone(c.edges);
        const startCenters = structuredClone(c.centers);

        for (const m of moves) {
            const copy = c.clone();

            copy[m]();
            copy[m + "p"]();

            assertEqual(copy.corners, startCorners, `${m} centers inverse failed`);
            assertEqual(copy.edges, startEdges, `${m} centers inverse failed`);
            assertEqual(copy.centers, startCenters, `${m} centers inverse failed`);
        }
    }
});

test("test_wide_4_identity()", () => {
    const moves = ["r","rp","r2","l","lp","l2",
                   "u","up","u2","d","dp","d2",
                   "f","fp","f2","b","bp","b2"];
    for (const m of moves) {
        const c = new Cube();
        const startCorners = structuredClone(c.corners);
        const startEdges = structuredClone(c.edges);
        const startCenters = structuredClone(c.centers);

        for (let i = 0; i < 4; i++) c[m]();

        assertEqual(c.corners, startCorners, `${m}^4 corners failed`);
        assertEqual(c.edges, startEdges, `${m}^4 edges failed`);
        assertEqual(c.centers, startCenters, `${m}^4 centers failed`);
    }
});


test("r move", () => {
    const c = new Cube({state:"231201341334510413034422433542534215005541101550250022"});
    c.r();
    assertEqual(c.getState(), "234222333334510413050450422255134542145101131501245000", "r failed");
});

test("r' move", () => {
    const c = new Cube({state:"231201341334510413034422433542534215005541101550250022"});
    c.rp();
    assertEqual(c.getState(), "201245300334510413031401441245431552225051051534222033", "rp failed");
});

test("r2 move", () => {
    const c = new Cube({state:"231201341334510413034422433542534215005541101550250022"});
    c.r2();
    assertEqual(c.getState(), "250250322334510413001445400512435245335221431531201041", "r2 failed");
});

test("l move", () => {
    const c = new Cube({state:"231201341334510413034422433542534215005541101550250022"});
    c.l();
    assertEqual(c.getState(), "101141501453113304234202343542534215020552155030420432", "l failed");
});

test("l' move", () => {
    const c = new Cube({state:"231201341334510413034422433542534215005541101550250022"});
    c.lp();
    assertEqual(c.getState(), "031421431403311354554252023542534215043502132100140502", "lp failed");
});

test("l2 move", () => {
    const c = new Cube({state:"231201341334510413034422433542534215005541101550250022"});
    c.l2();
    assertEqual(c.getState(), "551251021314015433104142503542534215034524130230200342", "l2 failed");
});

test("u move", () => {
    const c = new Cube({state:"231201341334510413034422433542534215005541101550250022"});
    c.u();
    assertEqual(c.getState(), "322403111034422413542534433005541215334510101550250022", "u failed");
});

test("u' move", () => {
    const c = new Cube({state:"231201341334510413034422433542534215005541101550250022"});
    c.up();
    assertEqual(c.getState(), "111304223005541413334510433034422215542534101550250022", "up failed");
});

test("u2 move", () => {
    const c = new Cube({state:"231201341334510413034422433542534215005541101550250022"});
    c.u2();
    assertEqual(c.getState(), "143102132542534413005541433334510215034422101550250022", "u2 failed");
});

test("d move", () => {
    const c = new Cube({state:"231201341334510413034422433542534215005541101550250022"});
    c.d();
    assertEqual(c.getState(), "231201341334541101034510413542422433005534215025255200", "d failed");
});

test("d' move", () => {
    const c = new Cube({state:"231201341334510413034422433542534215005541101550250022"});
    c.dp();
    assertEqual(c.getState(), "231201341334422433034534215542541101005510413002552520", "dp failed");
});

test("d2 move", () => {
    const c = new Cube({state:"231201341334510413034422433542534215005541101550250022"});
    c.d2();
    assertEqual(c.getState(), "231201341334534215034541101542510413005422433220052055", "d2 failed");
});

test("f move", () => {
    const c = new Cube({state:"231201341334510413034422433542534215005541101550250022"});
    c.f();
    assertEqual(c.getState(), "231113304325555400440323324322404115005541101255134022", "f failed");
});

test("f' move", () => {
    const c = new Cube({state:"231201341334510413034422433542534215005541101550250022"});
    c.fp();
    assertEqual(c.getState(), "231431552311504423423323044002554525005541101403311022", "fp failed");
});

test("f2 move", () => {
    const c = new Cube({state:"231201341334510413034422433542534215005541101550250022"});
    c.f2();
    assertEqual(c.getState(), "231052055312535445334224430312014435005541101143102022", "f2 failed");
});

test("b move", () => {
    const c = new Cube({state:"231201341334510413034422433542534215005541101550250022"});
    c.b();
    assertEqual(c.getState(), "245431341114300223034422433502552220150040115550311354", "b failed");
});

test("b' move", () => {
    const c = new Cube({state:"231201341334510413034422433542534215005541101550250022"});
    c.bp();
    assertEqual(c.getState(), "453113341024250203034422433522503211511040051550134542", "bp failed");
});

test("b2 move", () => {
    const c = new Cube({state:"231201341334510413034422433542534215005541101550250022"});
    c.b2();
    assertEqual(c.getState(), "220052341514430243034422433514515233101145500550102132", "b2 failed");
});