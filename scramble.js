// import { intToMovesScramble } from "./convert.js";

function randint(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateScramble(length) {
    const output = [];

    // pierwszy ruch
    output.push(randint(0, 5));

    // drugi ruch – nie może być taki sam
    let num = randint(0, 5);
    while (num === output[output.length - 1]) {
        num = randint(0, 5);
    }
    output.push(num);

    // reszta
    for (let i = 2; i < length; i++) {
        num = randint(0, 5);

        if ((output[output.length - 1] ^ 1) === output[output.length - 2]) {
            while (
                num === output[output.length - 1] ||
                num === (output[output.length - 1] ^ 1)
            ) {
                num = randint(0, 5);
            }
        }

        while (num === output[output.length - 1]) {
            num = randint(0, 5);
        }

        output.push(num);
    }

    return intToMovesScramble(
        output.map(x => x * 3 + randint(0, 2))
    );
}

function remapScrambleByColor(notation, color = "y") {
    const INVERSE_MOVE_MAP = {
        "w": { // z2
            "R":  "L",  "R'": "L'",  "R2": "L2",
            "L":  "R",  "L'": "R'",  "L2": "R2",
            "U":  "D",  "U'": "D'",  "U2": "D2",
            "D":  "U",  "D'": "U'",  "D2": "U2",
        },
        "o": { // z'
            "R":  "U",  "R'": "U'",  "R2": "U2",
            "L":  "D",  "L'": "D'",  "L2": "D2",
            "U":  "L",  "U'": "L'",  "U2": "L2",
            "D":  "R",  "D'": "R'",  "D2": "R2",
        },
        "r": { // z
            "R":  "D",  "R'": "D'",  "R2": "D2",
            "L":  "U",  "L'": "U'",  "L2": "U2",
            "U":  "R",  "U'": "R'",  "U2": "R2",
            "D":  "L",  "D'": "L'",  "D2": "L2",
        },
        "b": { // x
            "U":  "B",  "U'": "B'",  "U2": "B2",
            "D":  "F",  "D'": "F'",  "D2": "F2",
            "F":  "U",  "F'": "U'",  "F2": "U2",
            "B":  "D",  "B'": "D'",  "B2": "D2",
        },
        "g": { // x'
            "U":  "F",  "U'": "F'",  "U2": "F2",
            "D":  "B",  "D'": "B'",  "D2": "B2",
            "F":  "D",  "F'": "D'",  "F2": "D2",
            "B":  "U",  "B'": "U'",  "B2": "U2",
        },
        "y": {} // identity – nic nie rób
    };

    const mapping = INVERSE_MOVE_MAP[color] || {};

    return notation
        .split(/\s+/)
        .map(move => mapping[move] || move)
        .join(" ");
}

window.scramble = {generateScramble, remapScrambleByColor}

