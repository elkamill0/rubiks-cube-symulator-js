function randint(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateScramble(length) {
    const output = [randint(0, 5)];

    let num = randint(0, 5);
    while (num === output[output.length - 1]) num = randint(0, 5);
    output.push(num);

    for (let i = 2; i < length; i++) {
        num = randint(0, 5);

        // Jeśli dwa ostatnie są przeciwne (XOR 1), unikamy też przeciwnego do ostatniego
        if ((output[output.length - 1] ^ 1) === output[output.length - 2]) {
            while (num === output[output.length - 1] || num === (output[output.length - 1] ^ 1)) {
                num = randint(0, 5);
            }
        }
        while (num === output[output.length - 1]) {
            num = randint(0, 5);
        }
        output.push(num);
    }

    return convert.intToMovesScramble(output.map(x => x * 3 + randint(0, 2)));
}

function remapScrambleByColor(notation, color = "y") {
    const COLOR_TO_ROTATION = {
        "w": "z2",
        "o": "z'",
        "r": "z",
        "b": "x",
        "g": "x'",
        "y": null,
    };

    const rotation = COLOR_TO_ROTATION[color];
    if (!rotation) return notation;
    return remapNotationByRotation(notation, rotation);
}

const scramble = { generateScramble, remapScrambleByColor };
