const notationToInt = {
    "R": 0, "R2": 1, "R'": 2,
    "L": 3, "L2": 4, "L'": 5,
    "U": 6, "U2": 7, "U'": 8,
    "D": 9, "D2": 10, "D'": 11,
    "F": 12, "F2": 13, "F'": 14,
    "B": 15, "B2": 16, "B'": 17,
};

const intToNotation = Object.fromEntries(
    Object.entries(notationToInt).map(([k, v]) => [v, k])
);

function stateToCube(state) {
    if (typeof state !== "string" || state.length !== 54 || !/^\d+$/.test(state)) {
        throw new Error("Stan kostki musi być stringiem długości 54 z cyframi 0–9");
    }

    // Mapowanie kolorów → (index, orientacja) — 1:1 z Pythona color_to_corners / color_to_edges
    const colorToCorners = {
        "0,1,4": [0,0], "4,0,1": [0,1], "1,4,0": [0,2],
        "0,4,3": [1,0], "3,0,4": [1,1], "4,3,0": [1,2],
        "0,3,2": [2,0], "2,0,3": [2,1], "3,2,0": [2,2],
        "0,2,1": [3,0], "1,0,2": [3,1], "2,1,0": [3,2],
        "5,4,1": [4,0], "1,5,4": [4,1], "4,1,5": [4,2],
        "5,3,4": [5,0], "4,5,3": [5,1], "3,4,5": [5,2],
        "5,2,3": [6,0], "3,5,2": [6,1], "2,3,5": [6,2],
        "5,1,2": [7,0], "2,5,1": [7,1], "1,2,5": [7,2],
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
        "2,3": [10,0],"3,2": [10,1],
        "2,1": [11,0],"1,2": [11,1],
    };

    const cornersFromState = [
        [state[0],  state[9],  state[38]],
        [state[2],  state[36], state[29]],
        [state[8],  state[27], state[20]],
        [state[6],  state[18], state[11]],
        [state[51], state[44], state[15]],
        [state[53], state[35], state[42]],
        [state[47], state[26], state[33]],
        [state[45], state[17], state[24]],
    ];

    const edgesFromState = [
        [state[1],  state[37]], [state[5],  state[28]],
        [state[7],  state[19]], [state[3],  state[10]],
        [state[52], state[43]], [state[50], state[34]],
        [state[46], state[25]], [state[48], state[16]],
        [state[41], state[12]], [state[39], state[32]],
        [state[23], state[30]], [state[21], state[14]],
    ];

    const centersFromState = [
        Number(state[4]),  Number(state[13]), Number(state[22]),
        Number(state[31]), Number(state[40]), Number(state[49]),
    ];

    const corners = cornersFromState.map(c => {
        const key = c.join(",");
        const val = colorToCorners[key];
        if (!val) throw new Error(`Niepoprawny układ narożnika: ${key}`);
        return [...val];
    });

    const edges = edgesFromState.map(e => {
        const key = e.join(",");
        const val = colorToEdges[key];
        if (!val) throw new Error(`Niepoprawny układ krawędzi: ${key}`);
        return [...val];
    });

    return { corners, edges, centers: centersFromState };
}

function notationToMoves(movesStr, cube) {
    const moveMap = {
        "R": ()=>cube.R(), "R'": ()=>cube.Rp(), "R2": ()=>cube.R2(),
        "L": ()=>cube.L(), "L'": ()=>cube.Lp(), "L2": ()=>cube.L2(),
        "U": ()=>cube.U(), "U'": ()=>cube.Up(), "U2": ()=>cube.U2(),
        "D": ()=>cube.D(), "D'": ()=>cube.Dp(), "D2": ()=>cube.D2(),
        "F": ()=>cube.F(), "F'": ()=>cube.Fp(), "F2": ()=>cube.F2(),
        "B": ()=>cube.B(), "B'": ()=>cube.Bp(), "B2": ()=>cube.B2(),
        "M": ()=>cube.M(), "M'": ()=>cube.Mp(), "M2": ()=>cube.M2(),
        "E": ()=>cube.E(), "E'": ()=>cube.Ep(), "E2": ()=>cube.E2(),
        "S": ()=>cube.S(), "S'": ()=>cube.Sp(), "S2": ()=>cube.S2(),
        "r": ()=>cube.r(), "r'": ()=>cube.rp(), "r2": ()=>cube.r2(),
        "l": ()=>cube.l(), "l'": ()=>cube.lp(), "l2": ()=>cube.l2(),
        "u": ()=>cube.u(), "u'": ()=>cube.up(), "u2": ()=>cube.u2(),
        "d": ()=>cube.d(), "d'": ()=>cube.dp(), "d2": ()=>cube.d2(),
        "f": ()=>cube.f(), "f'": ()=>cube.fp(), "f2": ()=>cube.f2(),
        "b": ()=>cube.b(), "b'": ()=>cube.bp(), "b2": ()=>cube.b2(),
        "x": ()=>cube.x(), "x'": ()=>cube.xp(), "x2": ()=>cube.x2(),
        "y": ()=>cube.y(), "y'": ()=>cube.yp(), "y2": ()=>cube.y2(),
        "z": ()=>cube.z(), "z'": ()=>cube.zp(), "z2": ()=>cube.z2(),
    };

    movesStr.trim().split(/\s+/).forEach(move => {
        if (move && moveMap[move]) moveMap[move]();
        else if (move) console.warn("Nieznany ruch:", move);
    });
}

function intToMovesScramble(nums) {
    return nums.filter(n => n in intToNotation).map(n => intToNotation[n]).join(" ");
}

function cubeToColor(cube, crossColor = "y") {
    const colors = {
        "y": ['0','1','2','3','4','5'],
        "w": ['5','3','2','1','4','0'],
        "r": ['1','5','2','0','4','3'],
        "o": ['3','0','2','5','4','1'],
        "g": ['4','1','0','3','5','2'],
        "b": ['2','1','5','3','0','4'],
    }[crossColor];

    const cornersToColor = {
        0: [colors[0],colors[1],colors[4]],
        1: [colors[0],colors[4],colors[3]],
        2: [colors[0],colors[3],colors[2]],
        3: [colors[0],colors[2],colors[1]],
        4: [colors[5],colors[4],colors[1]],
        5: [colors[5],colors[3],colors[4]],
        6: [colors[5],colors[2],colors[3]],
        7: [colors[5],colors[1],colors[2]],
    };

    const edgesToColor = {
        0:  [colors[0],colors[4]],
        1:  [colors[0],colors[3]],
        2:  [colors[0],colors[2]],
        3:  [colors[0],colors[1]],
        4:  [colors[5],colors[4]],
        5:  [colors[5],colors[3]],
        6:  [colors[5],colors[2]],
        7:  [colors[5],colors[1]],
        8:  [colors[4],colors[1]],
        9:  [colors[4],colors[3]],
        10: [colors[2],colors[3]],
        11: [colors[2],colors[1]],
    };

    // np.roll equivalent: przesuń tablicę o orient pozycji w prawo
    function roll(arr, n) {
        if (n === 0) return [...arr];
        const len = arr.length;
        n = ((n % len) + len) % len;
        return [...arr.slice(len - n), ...arr.slice(0, len - n)];
    }

    const mappedCorners = cube.corners.map(c => roll(cornersToColor[c[0]], c[1]));
    const mappedEdges   = cube.edges.map(e   => roll(edgesToColor[e[0]],   e[1]));
    const mappedColors  = colors; // centers
    console.log(cube.centers)

    const numbers = [
        mappedCorners[0][0], mappedEdges[0][0],  mappedCorners[1][0],
        mappedEdges[3][0],   cube.centers[0],     mappedEdges[1][0],
        mappedCorners[3][0], mappedEdges[2][0],   mappedCorners[2][0],

        mappedCorners[0][1], mappedEdges[3][1],   mappedCorners[3][2],
        mappedEdges[8][1],   cube.centers[1],      mappedEdges[11][1],
        mappedCorners[4][2], mappedEdges[7][1],   mappedCorners[7][1],

        mappedCorners[3][1], mappedEdges[2][1],   mappedCorners[2][2],
        mappedEdges[11][0],  cube.centers[2],      mappedEdges[10][0],
        mappedCorners[7][2], mappedEdges[6][1],   mappedCorners[6][1],

        mappedCorners[2][1], mappedEdges[1][1],   mappedCorners[1][2],
        mappedEdges[10][1],  cube.centers[3],      mappedEdges[9][1],
        mappedCorners[6][2], mappedEdges[5][1],   mappedCorners[5][1],

        mappedCorners[1][1], mappedEdges[0][1],   mappedCorners[0][2],
        mappedEdges[9][0],   cube.centers[4],      mappedEdges[8][0],
        mappedCorners[5][2], mappedEdges[4][1],   mappedCorners[4][1],

        mappedCorners[7][0], mappedEdges[6][0],   mappedCorners[6][0],
        mappedEdges[7][0],   cube.centers[5],      mappedEdges[5][0],
        mappedCorners[4][0], mappedEdges[4][0],   mappedCorners[5][0],
    ];

    return numbers.join("");
}

function edgesToBinary(cube, targetValues) {
    const colorToBinary = {
        0: 36,  1: 5,   2: 20,  3: 6,
        4: 40,  5: 9,   6: 24,  7: 10,
        8: 34,  9: 33, 10: 17, 11: 18,
    };

    return targetValues.map(val => {
        const idx = cube.edges.findIndex(e => e[0] === val);
        const orient = cube.edges[idx][1];
        return colorToBinary[idx] + (orient ? 64 : 0);
    });
}

function cornersToBinary(cube, targetValues) {
    const colorToBinary = {
        0: 38, 1: 37, 2: 21, 3: 22,
        4: 42, 5: 41, 6: 25, 7: 26,
    };

    return targetValues.map(val => {
        const idx = cube.corners.findIndex(c => c[0] === val);
        const orient = cube.corners[idx][1];
        return colorToBinary[idx] + orient * 64;
    });
}

function replaceNumbersWithColors(str) {
    const map = { "0":"⬜","1":"🟧","2":"🟩","3":"🟥","4":"🟦","5":"🟨" };
    return str.split('').map(c => map[c] || c).join('');
}

// Eksport jako namespace (jak window.convert w oryginale)
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
};
