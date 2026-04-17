test("puste wejście zwraca pusty string", () => {
    assert(reduce("") === "", "failed");
});

test("whitespace zwraca pusty string", () => {
    assert(reduce("   ") === "", "failed");
});

test("pojedynczy ruch nie zmienia się", () => {
    assert(reduce("R") === "R", "failed");
});

test("R R redukuje się do R2", () => {
    console.log(reduce("R R"));
    assert(reduce("R R") === "R2", "failed");
});

test("R R R redukuje się do R'", () => {
    assert(reduce("R R R") === "R'", "failed");
});

test("R R R R anuluje się", () => {
    assert(reduce("R R R R") === "", "failed");
});

test("R' redukuje się poprawnie", () => {
    assert(reduce("R' R'") === "R2", "failed");
});

test("R2 R2 anuluje się", () => {
    assert(reduce("R2 R2") === "", "failed");
});

test("R R' anuluje się", () => {
    assert(reduce("R R'") === "", "failed");
});

test("różne ściany nie są łączone", () => {
    assert(reduce("R U") === "R U", "failed");
});

test("R R U U redukuje się do R2 U2", () => {
    assert(reduce("R R U U") === "R2 U2", "failed");
});

test("R U R U redukuje się do R U R U", () => {
    assert(reduce("R U R U") === "R U R U", "failed");
});

test("R R R R U redukuje się do U", () => {
    assert(reduce("R R R R U") === "U", "failed");
});

test("długa sekwencja tej samej ściany", () => {
    assert(reduce("R R R R R") === "R", "failed");
});

test("redukcja wielokrokowa: R R2 redukuje się do R'", () => {
    assert(reduce("R R2") === "R'", "failed");
});



test("puste wejście zwraca pusty string", () => {
    assert(inverse("") === "", "failed");
});

test("R zwraca R'", () => {
    assert(inverse("R") === "R'", "failed");
});

test("R' zwraca R", () => {
    assert(inverse("R'") === "R", "failed");
});

test("R2 zwraca R2", () => {
    assert(inverse("R2") === "R2", "failed");
});

test("kolejność jest odwrócona", () => {
    assert(inverse("R U") === "U' R'", "failed");
});

test("inverse(inverse(x)) === x", () => {
    const seq = "R U R' U' F2 D";
    assert(inverse(inverse(seq)) === seq, "failed");
});

test("sekwencja złożona", () => {
    assert(inverse("R U R' U'") === "U R U' R'", "failed");
});

test("ruchy dwuwarstwowe", () => {
    assert(inverse("r u") === "u' r'", "failed");
});

test("ruchy środkowe", () => {
    assert(inverse("M E S") === "S' E' M'", "failed");
});

test("ruchy obrotów", () => {
    assert(inverse("x y z") === "z' y' x'", "failed");
});

test("whitespace jest trimowany", () => {
    assert(inverse("  R U  ") === "U' R'", "failed");
});