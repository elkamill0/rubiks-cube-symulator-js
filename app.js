
// ============================================================
// APP STATE
// ============================================================
let appMode      = 'scramble';
let appCrossColor = 'y';
let appCube      = null;
let manualCube   = null;
let manualSteps  = [];

// ============================================================
// INIT
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
    buildCubeNet();
    appCube = new Cube({ color: appCrossColor });
    renderCubeNet(appCube);
});

// ============================================================
// CUBE NET — cubeToColor zwraca 54 znaki w kolejności:
// U(0-8) F(9-17) R(18-26) L(27-35) B(36-44) D(45-53)
// ============================================================
// const FACE_ORDER  = ['top','front','right','left','back','bottom'];
const FACE_ORDER  = ['top','left','front','right','back','bottom'];
const FACE_LABELS = { top:'U', front:'F', right:'R', left:'L', back:'B', bottom:'D' };
const COLOR_KEY   = ['w','o','g','r','b','y'];

function buildCubeNet() {
    const net = document.getElementById('cube-net');
    net.innerHTML = '';
    FACE_ORDER.forEach(f => {
        const wrapper = document.createElement('div');
        wrapper.className = 'face-wrapper';
        wrapper.dataset.f = f;

        const lbl = document.createElement('div');
        lbl.className = 'face-label';
        lbl.textContent = FACE_LABELS[f];

        const grid = document.createElement('div');
        grid.className = 'face-grid';
        for (let i = 0; i < 9; i++) {
            const s = document.createElement('div');
            s.className = 'sticker';
            s.dataset.c = '?';
            grid.appendChild(s);
        }
        wrapper.appendChild(lbl);
        wrapper.appendChild(grid);
        net.appendChild(wrapper);
    });
}

function renderCubeNet(cube) {
    const str = convert.cubeToColor(cube, cube.color || 'y');
    FACE_ORDER.forEach((f, fi) => {
        const stickers = document.querySelector(`.face-wrapper[data-f="${f}"]`).querySelectorAll('.sticker');
        for (let i = 0; i < 9; i++) {
            const ch  = str[fi * 9 + i];
            const num = parseInt(ch);
            stickers[i].dataset.c = isNaN(num) ? '?' : (COLOR_KEY[num] ?? '?');
        }
    });
}

// ============================================================
// UI HELPERS
// ============================================================
function setMode(mode) {
    appMode = mode;
    document.getElementById('tab-scramble').classList.toggle('active', mode === 'scramble');
    document.getElementById('tab-state').classList.toggle('active',   mode === 'state');
    document.getElementById('input-scramble').style.display = mode === 'scramble' ? '' : 'none';
    document.getElementById('input-state').style.display    = mode === 'state'    ? '' : 'none';
}

function setCrossColor(c) {
    appCrossColor = c;
    document.querySelectorAll('.color-btn').forEach(b => b.classList.toggle('active', b.dataset.c === c));
}

function toggleAutoCross() {
    document.getElementById('cross-length').disabled = document.getElementById('auto-cross').checked;
}

function setStatus(text, active = false) {
    document.getElementById('status-text').textContent = text.toUpperCase();
    document.getElementById('status-dot').classList.toggle('active', active);
}

function updateStats(cross, f2l, oll, pll) {
    const fmt = v => (v === null || v === undefined) ? '—' : v;
    document.getElementById('stat-cross').textContent = fmt(cross);
    document.getElementById('stat-f2l').textContent   = fmt(f2l);
    document.getElementById('stat-oll').textContent   = fmt(oll);
    document.getElementById('stat-pll').textContent   = fmt(pll);
}

function setBusy(busy) {
    document.getElementById('btn-reconstruct').disabled = busy;
    document.getElementById('btn-sbys').disabled        = busy;
}

function showError(msg) {
    document.getElementById('output-area').innerHTML = `<div class="error-box">⚠ ${msg}</div>`;
}

function getCrossLength() {
    return parseInt(document.getElementById('cross-length').value) || 6;
}

function makeCube() {
    const val = appMode === 'scramble'
        ? document.getElementById('scramble-input').value.trim()
        : document.getElementById('state-input').value.trim();
    if (!val) throw new Error('Brak inputu');
    return appMode === 'scramble'
        ? new Cube({ color: appCrossColor, notation: val })
        : new Cube({ color: appCrossColor, state: val });
}

// ============================================================
// GENERATE SCRAMBLE
// ============================================================
function doGenerateScramble() {
    const len = parseInt(document.getElementById('scramble-length').value) || 21;
    const sc  = scramble.generateScramble(len);
    document.getElementById('scramble-input').value = sc;
    setMode('scramble');
    document.getElementById('scramble-display').textContent = sc;

    appCube = new Cube({ color: appCrossColor, notation: sc });
    renderCubeNet(appCube);
    setStatus('Scramble wygenerowany');
    updateStats(null, null, null, null);
    document.getElementById('output-area').innerHTML = '<div class="empty-state">URUCHOM REKONSTRUKCJĘ</div>';
}

// ============================================================
// FULL RECONSTRUCTION
// ============================================================
async function doReconstruct() {
    let cube;
    try { cube = makeCube(); } catch(e) { showError(e.message); return; }

    document.getElementById('scramble-display').textContent =
        appMode === 'scramble'
            ? document.getElementById('scramble-input').value.trim()
            : document.getElementById('state-input').value.trim();

    renderCubeNet(cube);
    setStatus('Solving…', true);
    setBusy(true);
    updateStats(null, null, null, null);
    document.getElementById('output-area').innerHTML =
        '<div class="empty-state" style="color:var(--accent);animation:pulse 1s infinite">ANALIZOWANIE…</div>';

    const auto     = document.getElementById('auto-cross').checked;
    const crossLen = getCrossLength();

    try {
        await F2L.loadCases();
        const solving = new Solving(cube);

        if (auto) {
            for (let len = 0; len <= 8; len++) {
                const solving = new Solving(cube);
                await solving.build_tree(len);
                if (solving.shortest_path.length > 0) {
                    updateStats(solving.total_cross, solving.total_f2l, solving.total_oll, solving.total_pll);
                    setStatus(`Znaleziono ${solving.shortest_path.length} rozwiązań`, false);
                    renderSolutions(solving.shortest_path);
                    break;
                }
            }
        } else {
            const solving = new Solving(cube);
            await solving.build_tree(crossLen);
            updateStats(solving.total_cross, solving.total_f2l, solving.total_oll, solving.total_pll);
            setStatus(`Znaleziono ${solving.shortest_path.length} rozwiązań`, false);
            renderSolutions(solving.shortest_path);
        }

    } catch(e) {
        showError('Błąd: ' + e.message);
        console.error(e);
    } finally {
        setBusy(false);
    }
}

function renderSolutions(paths) {
    if (!paths || paths.length === 0) {
        document.getElementById('output-area').innerHTML = '<div class="empty-state">BRAK ROZWIĄZAŃ</div>';
        return;
    }

    let html = '<div class="solutions">';
    paths.forEach(([logNames, totalMoves], idx) => {
        const stages = groupLogByStage(logNames);
        html += `
        <div class="solution-card" style="animation-delay:${idx * 0.08}s">
          <div class="solution-header">
            <div class="solution-num">Solution ${idx + 1}</div>
            <div class="solution-moves-count">${totalMoves} MOVES</div>
          </div>`;
        stages.forEach(({ tag, moves }) => {
            html += `<div class="step-line"><div class="step-tag">${tag}</div><div class="step-moves">${moves}</div></div>`;
        });
        html += `</div>`;
    });
    html += '</div>';
    document.getElementById('output-area').innerHTML = html;
}

function groupLogByStage(logNames) {
    const groups = {};
    const order  = [];
    logNames.forEach(line => {
        const parts = line.split('\t//');
        const notation = parts[0].trim();
        const tag      = parts[1] ? parts[1].trim() : 'Move';
        if (!groups[tag]) { groups[tag] = []; order.push(tag); }
        groups[tag].push(notation);
    });
    return order.map(tag => ({ tag, moves: groups[tag].join(' ') }));
}

// ============================================================
// STEP BY STEP
// ============================================================
async function doStepByStep() {
    let cube;
    try { cube = makeCube(); } catch(e) { showError(e.message); console.error(e); return; }

    document.getElementById('scramble-display').textContent =
        appMode === 'scramble'
            ? document.getElementById('scramble-input').value.trim()
            : document.getElementById('state-input').value.trim();

    renderCubeNet(cube);
    setStatus('Przygotowanie…', true);
    setBusy(true);
    document.getElementById('output-area').innerHTML =
        '<div class="empty-state" style="color:var(--accent);animation:pulse 1s infinite">PRZYGOTOWANIE…</div>';

    try {
        await F2L.loadCases();
        manualCube  = cube;
        const steps = await new Manual(manualCube, getCrossLength()).loop();
        manualSteps = steps.map(s => Array.isArray(s) ? { alg: s[0], name: s[1] } : s);

        setStatus('Step-by-step gotowy', false);
        renderManual();
    } catch(e) {
        showError('Błąd: ' + e.message);
        console.error(e);
    } finally {
        setBusy(false);
    }
}

function renderManual() {
    const area = document.getElementById('output-area');
    if (!manualSteps || manualSteps.length === 0) {
        area.innerHTML = '<div class="empty-state">BRAK KROKÓW</div>';
        return;
    }

    if (manualSteps.length === 1 && manualSteps[0].alg === "" && manualSteps[0].name === "Done") {
        area.innerHTML = '<div class="solved-banner">✓ KOSTKA ROZWIĄZANA</div>';
        return;
    }

    let html = '<div class="manual-steps">';
    manualSteps.forEach((step, i) => {
        html += `
        <div class="manual-step">
          <div class="manual-step-name">${step.name}</div>
          <button class="manual-step-btn" onclick="applyManualStep(${i})">${step.alg}</button>
        </div>`;
    });
    html += '</div>';

    if (manualCube.log.length > 0) {
        const lastMove = manualCube.log[manualCube.log.length - 1];
        html += `<button class="back-btn" onclick="undoManualStep()">← UNDO: ${inverse(lastMove)}</button>`;
    }

    area.innerHTML = html;
}

async function applyManualStep(idx) {
    const step = manualSteps[idx];
    manualCube.applyStep([step.alg, step.name]);
    renderCubeNet(manualCube);

    const nextSteps = await new Manual(manualCube, getCrossLength()).loop();
    manualSteps = nextSteps.map(s => Array.isArray(s) ? { alg: s[0], name: s[1] } : s);
    renderManual();
}

async function undoManualStep() {
    manualCube.undo();
    renderCubeNet(manualCube);

    const nextSteps = await new Manual(manualCube, getCrossLength()).loop();
    manualSteps = nextSteps.map(s => Array.isArray(s) ? { alg: s[0], name: s[1] } : s);
    renderManual();
}

// ============================================================
// RESET
// ============================================================
function doReset() {
    appCube     = new Cube({ color: appCrossColor });
    manualCube  = null;
    manualSteps = [];
    document.getElementById('scramble-display').textContent = '—';
    renderCubeNet(appCube);
    updateStats(null, null, null, null);
    setStatus('IDLE', false);
    document.getElementById('output-area').innerHTML =
        '<div class="empty-state">WCZYTAJ SCRAMBLE I URUCHOM REKONSTRUKCJĘ</div>';
}