const tests = [];

function test(name, fn) {
    tests.push({ name, fn });
}

function assert(cond, msg = "Assertion failed") {
    if (!cond) throw new Error(msg);
}

function assertEqual(a, b, msg = "Not equal") {
    if (JSON.stringify(a) !== JSON.stringify(b)) {
        throw new Error(msg);
    }
}

function assertThrows(fn) {
    try {
        fn();
        return false;
    } catch (e) {
        return true;
    }
}

window.test = test;
window.assert = assert;
window.assertEqual = assertEqual;

window.addEventListener("load", () => {
    const container = document.getElementById("test-results");

    let passed = 0;

    tests.forEach(t => {
        const el = document.createElement("div");
        el.className = "test";

        try {
            t.fn();
            el.textContent = "✅ " + t.name;
            el.classList.add("pass");
            passed++;
        } catch (e) {
            el.textContent = "❌ " + t.name + " — " + e.message;
            el.classList.add("fail");
        }

        container.appendChild(el);
    });

    const summary = document.createElement("div");
    summary.className = "summary";
    summary.textContent = `DONE: ${passed}/${tests.length}`;

    container.appendChild(summary);
});