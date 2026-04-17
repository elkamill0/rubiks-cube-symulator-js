test("rzuca błąd dla nie-stringa", () => {
    assertThrows(() => stateToCube(123), "failed");
});

test("rzuca błąd dla złej długości", () => {
    assertThrows(() => stateToCube("123"), "failed");
});

test("rzuca błąd dla nie-cyfr", () => {
    assertThrows(() => stateToCube("a".repeat(54)), "failed");
});

test("poprawny stan zwraca obiekt z corners, edges, centers", () => {
    const result = stateToCube("230201445330510113331422433441534215205541100550250422");
    assert(result.corners !== undefined, "failed");
    assert(result.edges !== undefined, "failed");
    assert(result.centers !== undefined, "failed");
});

test("corners ma 8 elementów", () => {
    const result = stateToCube("230201445330510113331422433441534215205541100550250422");
    assert(result.corners.length === 8, "failed");
});

test("edges ma 12 elementów", () => {
    const result = stateToCube("230201445330510113331422433441534215205541100550250422");
    assert(result.edges.length === 12, "failed");
});

test("centers ma 6 elementów", () => {
    const result = stateToCube("230201445330510113331422433441534215205541100550250422");
    assert(result.centers.length === 6, "failed");
});

test("każdy narożnik ma 2 elementy", () => {
    const result = stateToCube("230201445330510113331422433441534215205541100550250422");
    assert(result.corners.every(c => c.length === 2), "failed");
});

test("każda krawędź ma 2 elementy", () => {
    const result = stateToCube("230201445330510113331422433441534215205541100550250422");
    assert(result.edges.every(e => e.length === 2), "failed");
});

test("rzuca błąd dla niepoprawnego układu narożnika", () => {
    assertThrows(() => stateToCube("0".repeat(54)), "failed");
});

test("map from state to elements", () => {
    const c = new Cube({state:"230201445330510113331422433441534215205541100550250422"});
    console.log(JSON.stringify(c.corners));
    console.log(JSON.stringify(c.edges));
    console.log(JSON.stringify(c.centers));
    assertEqual(c.corners, [[6,2],[3,0],[4,0],[1,2],[0,1],[7,1],[2,0],[5,0]], "corners failed");
    assertEqual(c.edges, [[1,1],[8,1],[9,0],[10,0],[2,1],[3,0],[5,0],[11,0],[7,1],[4,0],[6,1],[0,1]], "edges failed");
    assertEqual(c.centers, [0,1,2,3,4,5], "centers failed");
});


test("map from elements to state", () => {
    const c = new Cube({notation: "R2 D L2 F2 U' F2 D2 U L2 B2 U F L' U2 B' F L' U2 B2 U L'"});
    console.log(c.getState());
    assertEqual(c.getState(), "230201445330510113331422433441534215205541100550250422", "state failed")
});