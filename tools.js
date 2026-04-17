function reduce(notation) {
    if (!notation?.trim()) return "";

    const notes = notation.trim().split(/\s+/);

    function noteToQuarters(n) {
        if (n.endsWith("'")) return 3;
        if (n.endsWith("2")) return 2;
        return 1;
    }

    function quartersToSuffix(q) {
        if (q === 1) return "";
        if (q === 2) return "2";
        if (q === 3) return "'";
        return null;
    }

    const reduced = [];
    let i = 0;

    while (i < notes.length) {
        const face = notes[i][0];
        let quarters = 0;

        while (i < notes.length && notes[i][0] === face) {
            quarters += noteToQuarters(notes[i]);
            i++;
        }

        quarters %= 4;
        const suffix = quartersToSuffix(quarters);
        if (suffix !== null) {
            reduced.push(face + suffix);
        }
    }

    const result = reduced.join(" ");
    return result === notation.trim() ? result : reduce(result);
}


function inverse(notation) {
    const inverseMapping = {
        "R": "R'", "R'": "R", "R2": "R2",
        "L": "L'", "L'": "L", "L2": "L2",
        "U": "U'", "U'": "U", "U2": "U2",
        "D": "D'", "D'": "D", "D2": "D2",
        "F": "F'", "F'": "F", "F2": "F2",
        "B": "B'", "B'": "B", "B2": "B2",
        "r": "r'", "r'": "r", "r2": "r2",
        "l": "l'", "l'": "l", "l2": "l2",
        "u": "u'", "u'": "u", "u2": "u2",
        "d": "d'", "d'": "d", "d2": "d2",
        "f": "f'", "f'": "f", "f2": "f2",
        "b": "b'", "b'": "b", "b2": "b2",
        "M": "M'", "M'": "M", "M2": "M2",
        "E": "E'", "E'": "E", "E2": "E2",
        "S": "S'", "S'": "S", "S2": "S2",
        "x": "x'", "x'": "x", "x2": "x2",
        "y": "y'", "y'": "y", "y2": "y2",
        "z": "z'", "z'": "z", "z2": "z2",
    };

    return notation.trim().split(/\s+/).reverse().map(m => inverseMapping[m] || m).join(" ");
}

function remapNotationByRotation(notation, rotationMove) {
    const INVERSE_MOVE_MAP = {
        "z":  { "R":"D","R'":"D'","R2":"D2","L":"U","L'":"U'","L2":"U2","U":"R","U'":"R'","U2":"R2","D":"L","D'":"L'","D2":"L2" },
        "z'": { "R":"U","R'":"U'","R2":"U2","L":"D","L'":"D'","L2":"D2","U":"L","U'":"L'","U2":"L2","D":"R","D'":"R'","D2":"R2" },
        "z2": { "R":"L","R'":"L'","R2":"L2","L":"R","L'":"R'","L2":"R2","U":"D","U'":"D'","U2":"D2","D":"U","D'":"U'","D2":"U2" },
        "x":  { "U":"B","U'":"B'","U2":"B2","D":"F","D'":"F'","D2":"F2","F":"U","F'":"U'","F2":"U2","B":"D","B'":"D'","B2":"D2" },
        "x'": { "U":"F","U'":"F'","U2":"F2","D":"B","D'":"B'","D2":"B2","F":"D","F'":"D'","F2":"D2","B":"U","B'":"U'","B2":"U2" },
        "x2": { "U":"D","U'":"D'","U2":"D2","D":"U","D'":"U'","D2":"U2","F":"B","F'":"B'","F2":"B2","B":"F","B'":"F'","B2":"F2" },
        "y":  { "R":"F","R'":"F'","R2":"F2","F":"L","F'":"L'","F2":"L2","L":"B","L'":"B'","L2":"B2","B":"R","B'":"R'","B2":"R2" },
        "y'": { "R":"B","R'":"B'","R2":"B2","F":"R","F'":"R'","F2":"R2","L":"F","L'":"F'","L2":"F2","B":"L","B'":"L'","B2":"L2" },
        "y2": { "R":"L","R'":"L'","R2":"L2","L":"R","L'":"R'","L2":"R2","F":"B","F'":"B'","F2":"B2","B":"F","B'":"F'","B2":"F2" },
    };

    const mapping = INVERSE_MOVE_MAP[rotationMove] || {};
    return notation.trim().split(/\s+/).map(m => mapping[m] || m).join(" ");
}
