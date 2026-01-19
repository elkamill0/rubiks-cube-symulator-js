function reduce(notation) {
    const note = notation.trim().split(/\s+/);
    if (!note.length) return;

    function noteToQuarters(n) {
        if (n.endsWith("'")) return 3;
        if (n.endsWith("2")) return 2;
        return 1;
    }

    let i = 1;
    let combo = 0;
    let newNotation = "";
    let changed = false;

    while (i < note.length) {
        if (note[i - 1][0] === note[i][0]) {
            combo += noteToQuarters(note[i - 1]);
            changed = true;
        } else {
            if (combo > 0) {
                combo += noteToQuarters(note[i - 1]);
                combo %= 4;

                if (combo === 1) {
                    newNotation += note[i - 1][0] + " ";
                } else if (combo === 2) {
                    newNotation += note[i - 1][0] + "2 ";
                } else if (combo === 3) {
                    newNotation += note[i - 1][0] + "' ";
                }
                combo = 0;
            } else {
                newNotation += note[i - 1] + " ";
            }
        }
        i++;
    }

    newNotation += note[i - 1];

    if (changed) {
        return reduce(newNotation);
    }

    return newNotation;
}


function inverse(notation) {
    const inverseMapping = {
        "R": "R'",
        "R'": "R",
        "R2": "R2",
        "L": "L'",
        "L'": "L",
        "L2": "L2",
        "U": "U'",
        "U'": "U",
        "U2": "U2",
        "D": "D'",
        "D'": "D",
        "D2": "D2",
        "F": "F'",
        "F'": "F",
        "F2": "F2",
        "B": "B'",
        "B'": "B",
        "B2": "B2",
        "M": "M'",
        "M'": "M",
        "M2": "M2",
        "E": "E'",
        "E'": "E",
        "E2": "E2",
        "S": "S'",
        "S'": "S",
        "S2": "S2",
        "x": "x'",
        "x'": "x",
        "x2": "x2",
        "y": "y'",
        "y'": "y",
        "y2": "y2",
        "z": "z'",
        "z'": "z",
        "z2": "z2"
    };

    const moves = notation.trim().split(/\s+/);
    const invertedMoves = moves
        .reverse()
        .map(move => inverseMapping[move]);

    return invertedMoves.join(" ");
}


