const notationToInt = {
    "R": 0,
    "R2": 1,
    "R'": 2,
    "L": 3,
    "L2": 4,
    "L'": 5,
    "U": 6,
    "U2": 7,
    "U'": 8,
    "D": 9,
    "D2": 10,
    "D'": 11,
    "F": 12,
    "F2": 13,
    "F'": 14,
    "B": 15,
    "B2": 16,
    "B'": 17
};

const intToNotation = {
    0: "R",
    1: "R2",
    2: "R'",
    3: "L",
    4: "L2",
    5: "L'",
    6: "U",
    7: "U2",
    8: "U'",
    9: "D",
    10: "D2",
    11: "D'",
    12: "F",
    13: "F2",
    14: "F'",
    15: "B",
    16: "B2",
    17: "B'"
};

function intToMovesScramble(nums) {
    return nums
        .filter(number => number in intToNotation)
        .map(number => intToNotation[number])
        .join(" ");
}

function notationToMoves(movesStr, cube) {
    const moveMap = {
        "R": () => cube.R(),
        "R'": () => cube.Rp(),
        "R2": () => cube.R2(),
        "L": () => cube.L(),
        "L'": () => cube.Lp(),
        "L2": () => cube.L2(),
        "U": () => cube.U(),
        "U'": () => cube.Up(),
        "U2": () => cube.U2(),
        "D": () => cube.D(),
        "D'": () => cube.Dp(),
        "D2": () => cube.D2(),
        "F": () => cube.F(),
        "F'": () => cube.Fp(),
        "F2": () => cube.F2(),
        "B": () => cube.B(),
        "B'": () => cube.Bp(),
        "B2": () => cube.B2(),
        "M": () => cube.M(),
        "M'": () => cube.Mp(),
        "M2": () => cube.M2(),
        "E": () => cube.E(),
        "E'": () => cube.Ep(),
        "E2": () => cube.E2(),
        "S": () => cube.S(),
        "S'": () => cube.Sp(),
        "S2": () => cube.S2(),
        "r": () => cube.r(),
        "r'": () => cube.rp(),
        "r2": () => cube.r2(),
        "l": () => cube.l(),
        "l'": () => cube.lp(),
        "l2": () => cube.l2(),
        "u": () => cube.u(),
        "u'": () => cube.up(),
        "u2": () => cube.u2(),
        "d": () => cube.d(),
        "d'": () => cube.dp(),
        "d2": () => cube.d2(),
        "f": () => cube.f(),
        "f'": () => cube.fp(),
        "f2": () => cube.f2(),
        "b": () => cube.b(),
        "b'": () => cube.bp(),
        "b2": () => cube.b2(),
        "x": () => cube.x(),
        "x'": () => cube.xp(),
        "x2": () => cube.x2(),
        "y": () => cube.y(),
        "y'": () => cube.yp(),
        "y2": () => cube.y2(),
        "z": () => cube.z(),
        "z'": () => cube.zp(),
        "z2": () => cube.z2(),
    };

    const movesList = movesStr.split(/\s+/);
    movesList.forEach(move => {
        // console.log("Executing move:", move); // <--- tu sprawdzisz, czy jest wywołanie
        if (moveMap[move]) moveMap[move]();
        else console.warn("Unknown move:", move);
    });

    return cube;
}


function converting(input, mode) {
    if (Array.isArray(input)) {
        // input to tablica liczb → zamieniamy na notacje (string)
        const output = input.filter(number => number in mode).map(number => mode[number]);
        return output.join(" ");
    } else if (typeof input === "string") {
        // input to string → zamieniamy na tablicę liczb
        const parts = input.split(/\s+/);
        const output = parts.filter(char => char in mode).map(char => mode[char]);
        return output;
    } else {
        throw new Error("Invalid input type. Must be array or string.");
    }
}


function cubeToColor(cube, crossColor = "y", show = false) {
    const corners = cube.corners;
    const edges = cube.edges;
    const centers = cube.centers;

    const colorMap = {
        "y": ['0','1','2','3','4','5'],
        "w": ['5','3','2','1','4','0'],
        "r": ['1','5','2','0','4','3'],
        "o": ['3','0','2','5','4','1'],
        "g": ['4','1','0','3','5','2'],
        "b": ['2','1','5','3','0','4']
    };

    const colors = colorMap[crossColor];

    const cornersToColor = {
        0: [colors[0], colors[1], colors[4]],
        1: [colors[0], colors[4], colors[3]],
        2: [colors[0], colors[3], colors[2]],
        3: [colors[0], colors[2], colors[1]],
        4: [colors[5], colors[4], colors[1]],
        5: [colors[5], colors[3], colors[4]],
        6: [colors[5], colors[2], colors[3]],
        7: [colors[5], colors[1], colors[2]]
    };

    const edgesToColor = {
        0: [colors[0], colors[4]],
        1: [colors[0], colors[3]],
        2: [colors[0], colors[2]],
        3: [colors[0], colors[1]],
        4: [colors[5], colors[4]],
        5: [colors[5], colors[3]],
        6: [colors[5], colors[2]],
        7: [colors[5], colors[1]],
        8: [colors[4], colors[1]],
        9: [colors[4], colors[3]],
        10: [colors[2], colors[3]],
        11: [colors[2], colors[1]]
    };

    const mappedCorners = corners.map(c => [...cornersToColor[c[0]]]);
    const mappedEdges = edges.map(e => [...edgesToColor[e[0]]]);

    // Rotacja według orientacji
    const rotatedCorners = mappedCorners.map((c, i) => {
        const n = corners[i][1];
        return [...c.slice(-n), ...c.slice(0, -n)];
    });

    const rotatedEdges = mappedEdges.map((e, i) => {
        const n = edges[i][1];
        return [...e.slice(-n), ...e.slice(0, -n)];
    });

    const mappedCenters = centers.map(c => String(c));

    // Kolejność pól w output
    const numbers = [
        rotatedCorners[0][0], rotatedEdges[0][0], rotatedCorners[1][0],
        rotatedEdges[3][0], centers[0], rotatedEdges[1][0],
        rotatedCorners[3][0], rotatedEdges[2][0], rotatedCorners[2][0],
        rotatedCorners[0][1], rotatedEdges[3][1], rotatedCorners[3][2],
        rotatedEdges[8][1], centers[1], rotatedEdges[11][1],
        rotatedCorners[4][2], rotatedEdges[7][1], rotatedCorners[7][1],
        rotatedCorners[3][1], rotatedEdges[2][1], rotatedCorners[2][2],
        rotatedEdges[11][0], centers[2], rotatedEdges[10][0],
        rotatedCorners[7][2], rotatedEdges[6][1], rotatedCorners[6][1],
        rotatedCorners[2][1], rotatedEdges[1][1], rotatedCorners[1][2],
        rotatedEdges[10][1], centers[3], rotatedEdges[9][1],
        rotatedCorners[6][2], rotatedEdges[5][1], rotatedCorners[5][1],
        rotatedCorners[1][1], rotatedEdges[0][1], rotatedCorners[0][2],
        rotatedEdges[9][0], centers[4], rotatedEdges[8][0],
        rotatedCorners[5][2], rotatedEdges[4][1], rotatedCorners[4][1],
        rotatedCorners[7][0], rotatedEdges[6][0], rotatedCorners[6][0],
        rotatedEdges[7][0], centers[5], rotatedEdges[5][0],
        rotatedCorners[4][0], rotatedEdges[4][0], rotatedCorners[5][0]
    ];


    if (show) {
        const padding = ""; // 6 spacji – dopasuj do szerokości środkowego rzędu
        return `
        ${padding}${rotatedCorners[0][0]}${rotatedEdges[0][0]}${rotatedCorners[1][0]}
        ${padding}${rotatedEdges[3][0]}${centers[0]}${rotatedEdges[1][0]}
        ${padding}${rotatedCorners[3][0]}${rotatedEdges[2][0]}${rotatedCorners[2][0]}
    ---
${rotatedCorners[0][1]}${rotatedEdges[3][1]}${rotatedCorners[3][2]}|${rotatedCorners[3][1]}${rotatedEdges[2][1]}${rotatedCorners[2][2]}|${rotatedCorners[2][1]}${rotatedEdges[1][1]}${rotatedCorners[1][2]}|${rotatedCorners[1][1]}${rotatedEdges[0][1]}${rotatedCorners[0][2]}
${rotatedEdges[8][1]}${centers[1]}${rotatedEdges[11][1]}|${rotatedEdges[11][0]}${centers[2]}${rotatedEdges[10][0]}|${rotatedEdges[10][1]}${centers[3]}${rotatedEdges[9][1]}|${rotatedEdges[9][0]}${centers[4]}${rotatedEdges[8][0]}
${rotatedCorners[4][2]}${rotatedEdges[7][1]}${rotatedCorners[7][1]}|${rotatedCorners[7][2]}${rotatedEdges[6][1]}${rotatedCorners[6][1]}|${rotatedCorners[6][2]}${rotatedEdges[5][1]}${rotatedCorners[5][1]}|${rotatedCorners[5][2]}${rotatedEdges[4][1]}${rotatedCorners[4][1]}
    ---
        ${padding}${rotatedCorners[7][0]}${rotatedEdges[6][0]}${rotatedCorners[6][0]}
        ${padding}${rotatedEdges[7][0]}${centers[5]}${rotatedEdges[5][0]}
        ${padding}${rotatedCorners[4][0]}${rotatedEdges[4][0]}${rotatedCorners[5][0]}
    `;
    }

    return numbers.join('');
}


function stateToCube(state) {
    // --- Walidacja ---
    // if (typeof state !== "string") {
    //     throw new TypeError("Argument 'state' musi być napisem (str).");
    // }

    // if (state.length !== 54) {
    //     throw new Error("Stan kostki musi mieć długość 54");
    // }

    // if (!/^\d+$/.test(state)) {
    //     throw new Error("Stan kostki może zawierać tylko cyfry (0–9).");
    // }


    // --- Mapowania kolor → (index, orientacja) ---
    const colorToCorners = {
        "0,1,4": [0,0], "4,0,1": [0,1], "1,4,0": [0,2],
        "0,4,3": [1,0], "3,0,4": [1,1], "4,3,0": [1,2],
        "0,3,2": [2,0], "2,0,3": [2,1], "3,2,0": [2,2],
        "0,2,1": [3,0], "1,0,2": [3,1], "2,1,0": [3,2],
        "5,4,1": [4,0], "1,5,4": [4,1], "4,1,5": [4,2],
        "5,3,4": [5,0], "4,5,3": [5,1], "3,4,5": [5,2],
        "5,2,3": [6,0], "3,5,2": [6,1], "2,3,5": [6,2],
        "5,1,2": [7,0], "2,5,1": [7,1], "1,2,5": [7,2]
    };

    const colorToEdges = {
        "0,4": [0,0], "4,0": [0,1],
        "0,3": [1,0], "3,0": [1,1],
        "0,2": [2,0], "2,0": [2,1],
        "0,1": [3,0], "1,0": [3,1],
        "5,4": [4,0], "4,5": [4,1],
        "5,3": [5,0], "3,5": [5,1],
        "5,2": [6,0], "2,5": [6,1],
        "5,1": [7,0], "1,5": [7,1],
        "4,1": [8,0], "1,4": [8,1],
        "4,3": [9,0], "3,4": [9,1],
        "2,3": [10,0], "3,2": [10,1],
        "2,1": [11,0], "1,2": [11,1]
    };

    // --- Odczyt elementów ze stanu ---
    const cornersFromState = [
        [state[0],  state[9],  state[38]],
        [state[2],  state[36], state[29]],
        [state[8],  state[27], state[20]],
        [state[6],  state[18], state[11]],
        [state[51], state[44], state[15]],
        [state[53], state[35], state[42]],
        [state[47], state[26], state[33]],
        [state[45], state[17], state[24]]
    ];

    const edgesFromState = [
        [state[1],  state[37]],
        [state[5],  state[28]],
        [state[7],  state[19]],
        [state[3],  state[10]],
        [state[52], state[43]],
        [state[50], state[34]],
        [state[46], state[25]],
        [state[48], state[16]],
        [state[41], state[12]],
        [state[39], state[32]],
        [state[23], state[30]],
        [state[21], state[14]]
    ];

    const centersFromState = [
        Number(state[4]),
        Number(state[13]),
        Number(state[22]),
        Number(state[31]),
        Number(state[40]),
        Number(state[49])
    ];

    // --- Mapowanie ---
    const mapCorner = (elem) => {
        const key = elem.join(",");
        const val = colorToCorners[key];
        // if (!val) throw new Error("Niepoprawny układ kolorów narożnika");
        return val;
    };

    const mapEdge = (elem) => {
        const key = elem.join(",");
        const val = colorToEdges[key];
        // if (!val) throw new Error("Niepoprawny układ kolorów krawędzi");
        return val;
    };

    const mappedCorners = cornersFromState.map(mapCorner);
    const mappedEdges   = edgesFromState.map(mapEdge);

    return {
        corners: mappedCorners,
        edges: mappedEdges,
        centers: centersFromState
    };
}

function edgesToBinary(cube, targetValues) {
    const colorToBinary = {
        0: 36,  1: 5,   2: 20,  3: 6,
        4: 40,  5: 9,   6: 24,  7: 10,
        8: 34,  9: 33, 10: 17, 11: 18
    };

    const cross = targetValues.map(val => {
        const index = cube.edges.findIndex(e => e[0] === val);
        if (index === -1) {
            throw new Error(`Edge ${val} not found`);
        }
        const orientation = cube.edges[index][1];
        return colorToBinary[index] + (orientation ? 64 : 0);
    });

    return cross;
}

function cornersToBinary(cube, targetValues) {
    const colorToBinary = {
        0: 38,  1: 37,  2: 21,  3: 22,
        4: 42,  5: 41,  6: 25,  7: 26
    };

    const cross = targetValues.map(val => {
        const index = cube.corners.findIndex(c => c[0] === val);
        if (index === -1) {
            throw new Error(`Corner ${val} not found`);
        }
        const orientation = cube.corners[index][1];
        return colorToBinary[index] + (orientation * 64);
    });

    return cross;
}


function replaceNumbersWithColors(asciiCube) {
    const numberToEmoji = {
        "0": "⬜", // white
        "1": "🟧", // orange
        "2": "🟩", // green
        "3": "🟥", // red
        "4": "🟦", // blue
        "5": "🟨"  // yellow
    };

    let result = asciiCube;

    for (const [number, emoji] of Object.entries(numberToEmoji)) {
        result = result.split(number).join(emoji);
        // albo: result = result.replaceAll(number, emoji); (ES2021+)
    }

    return result;
}

const convert = {
    notationToMoves,
    intToMovesScramble,
    cubeToColor,
    replaceNumbersWithColors,
    stateToCube,
    edgesToBinary,
    cornersToBinary,
    notationToInt,
    intToNotation,
    converting
};
