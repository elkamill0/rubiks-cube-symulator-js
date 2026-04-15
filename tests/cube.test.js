test("R changes state", () => {
    const c = new Cube();
    const before = structuredClone(c.corners);

    c.R();

    assert(JSON.stringify(c.corners) !== JSON.stringify(before), "R failed");
});

test("R inverse works", () => {
    const c = new Cube();
    const start = structuredClone(c.corners);

    c.R();
    c.Rp();

    assertEqual(c.corners, start, "R + Rp failed");
});

test("R^4 identity", () => {
    const c = new Cube();
    const start = structuredClone(c.corners);

    c.R(); c.R(); c.R(); c.R();

    assertEqual(c.corners, start, "R^4 failed");
});