const ALG_FILES = {
    f2l1: 'cases_select/f2l1.json',
    f2l2: 'cases_select/f2l2.json',
    f2l3: 'cases_select/f2l3.json',
    f2l4: 'cases_select/f2l4.json',
    oll: 'cases_select/oll.json',
    pll: 'cases_select/pll.json',
};

const ALG_IMG_DIRS = {
    f2l1: 'images/f2l/',
    f2l2: 'images/f2l/',
    f2l3: 'images/f2l/',
    f2l4: 'images/f2l/',
    oll: 'images/oll/',
    pll: 'images/pll/',
};

const algData       = { f2l1: null, f2l2: null, f2l3: null, f2l4: null, oll: null, pll: null };
const algSelections = { f2l1: {}, f2l2: {}, f2l3: {}, f2l4: {}, oll: {}, pll: {} };

let currentAlgStage = 'f2l1';

function showPage(page) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
    document.getElementById(`page-${page}`).classList.add('active');
    document.getElementById(`nav-${page}`).classList.add('active');

    if (page === 'algorithms') {
        loadAlgStage(currentAlgStage);
    }
}

function setAlgStage(stage) {
    currentAlgStage = stage;
    document.querySelectorAll('.alg-stage-tab').forEach(t => t.classList.remove('active'));
    document.getElementById(`alg-tab-${stage}`).classList.add('active');
    document.getElementById('alg-search').value = '';
    loadAlgStage(stage);
}

async function loadAlgStage(stage) {
    if (!algData[stage]) {
        // document.getElementById('alg-grid').innerHTML =
        //     '<div class="empty-state" style="color:var(--accent);animation:pulse 1s infinite">LOADING…</div>';
        try {
            const res  = await fetch(ALG_FILES[stage]);
            algData[stage] = await res.json();
        } catch(e) {
            document.getElementById('alg-grid').innerHTML =
                `<div class="empty-state" style="color:var(--accent2)">⚠ Could not load ${ALG_FILES[stage]}</div>`;
            return;
        }
    }
    renderAlgGrid();
}

async function exportSelections() {
    await Promise.all(['f2l1','f2l2','f2l3','f2l4','oll','pll'].map(s => loadAlgStage(s, false)));
    
    const result = {};
    ['f2l1','f2l2','f2l3','f2l4','oll','pll'].forEach(stage => {
        result[stage] = {};
        const data = algData[stage];
        if (!data) return;
        data.forEach(c => {
            const idx = algSelections[stage][c.name] ?? 0;
            if (c.algs && c.algs[idx]) {
                result[stage][c.name] = { idx, alg: c.algs[idx] };
            }
        });
    });

    const blob = new Blob([JSON.stringify(result, null, 2)], { type: 'application/json' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = 'alg_selections.json';
    a.click();
    URL.revokeObjectURL(url);
}


function importSelections(input) {
    const file = input.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const parsed = JSON.parse(e.target.result);
            ['f2l1','f2l2','f2l3','f2l4','oll','pll'].forEach(stage => {
                if (parsed[stage]) {
                    Object.entries(parsed[stage]).forEach(([name, val]) => {
                        algSelections[stage][name] = typeof val === 'object' ? val.idx : val;
                    });
                }
            });
            localStorage.setItem('algSelections', JSON.stringify(algSelections));
            renderAlgGrid();
            const banner = document.getElementById('alg-save-banner');
            banner.textContent = '✓ IMPORT SUCCESSFUL';
            banner.style.display = 'block';
            setTimeout(() => { banner.style.display = 'none'; }, 2000);
        } catch(e) {
            alert('Invalid JSON file');
        }
    };
    reader.readAsText(file);
    input.value = '';
}

function renderAlgGrid() {
    const stage   = currentAlgStage;
    const data    = algData[stage];
    if (!data) return;

    const query   = document.getElementById('alg-search').value.trim().toLowerCase();
    const filtered = query
    ? data.filter(c => 
        c.name.toLowerCase().includes(query) ||
        (c.algs && c.algs.some(alg => alg.toLowerCase().includes(query)))
    )
    : data;

    const grid = document.getElementById('alg-grid');

    if (filtered.length === 0) {
        grid.innerHTML = '<div class="empty-state">NO CASES FOUND</div>';
        return;
    }

    grid.innerHTML = filtered.map(c => buildCard(stage, c, query)).join('');
    // grid.innerHTML = filtered.map(c => buildCard(stage, c)).join('');
}

function buildCard(stage, c, query = '') {
    const sel     = algSelections[stage][c.name] ?? null;
    const imgPath = c.img.startsWith('http') ? c.img : ALG_IMG_DIRS[stage] + c.img;
    const count   = c.algs ? c.algs.length : 0;
    const rotate = c.rotate ?? 0;
   
    const filteredAlgs = query
        ? (c.algs || []).filter(alg => alg.toLowerCase().includes(query))
        : (c.algs || []);
    const visibleAlgs = filteredAlgs.slice(0, 4);
    const hiddenAlgs  = filteredAlgs.slice(4);


    // const visibleAlgs = c.algs ? c.algs.slice(0, 4) : [];
    // const hiddenAlgs  = c.algs ? c.algs.slice(4) : [];

    const visibleHTML = visibleAlgs.length > 0
        ? visibleAlgs.map((alg, i) => `
            <div class="alg-option ${i === sel ? 'alg-option-active' : ''}"
                 onclick="selectAlg('${stage}', '${c.name}', ${i}, this)">
                ${alg}
            </div>`).join('')
        : '<div class="alg-option" style="color:var(--text-dim);cursor:default">No algs yet</div>';

    const hiddenHTML = hiddenAlgs.length > 0 ? `
        <div class="alg-hidden" id="hidden-${stage}-${c.name}" style="display:none;flex-direction:column;gap:4px">
            ${hiddenAlgs.map((alg, i) => `
                <div class="alg-option ${i + 4 === sel ? 'alg-option-active' : ''}"
                     onclick="selectAlg('${stage}', '${c.name}', ${i + 4}, this)">
                    ${alg}
                </div>`).join('')}
        </div>
        <button class="alg-more-btn" onclick="toggleMoreAlgs('${stage}', '${c.name}', this)">
            ⊹ ${hiddenAlgs.length} more algorithms
        </button>` : '';

    return `
        <div class="alg-card ${count > 0 && sel !== undefined ? 'selected' : ''}" id="card-${stage}-${c.name}">
            <div style="display:flex;gap:12px;align-items:flex-start">
                <div class="alg-card-img" style="width:80px;height:80px;flex-shrink:0">
                    <img src="${imgPath}" alt="${c.name}"
                         style="transform: rotate(${rotate}deg);"
                         onerror="this.parentElement.textContent='${c.name}'">
                </div>
                <div style="flex:1;min-width:0">
                    <div class="alg-card-name">${c.name}</div>
                </div>
            </div>
            <div class="alg-options-list" style="margin-top:10px">
                ${visibleHTML}
                ${hiddenHTML}
            </div>
        </div>`;
}

function toggleMoreAlgs(stage, name, btn) {
    const hidden  = document.getElementById(`hidden-${stage}-${name}`);
    const visible = hidden.style.display === 'none';
    hidden.style.display = visible ? 'flex' : 'none';
    btn.textContent = visible
        ? '✕ Show less'
        : `⊹ ${hidden.children.length} more algorithms`;
}


function selectAlg(stage, name, idx, el) {
    algSelections[stage][name] = idx;
    const card = document.getElementById(`card-${stage}-${name}`);
    if (card) {
        card.classList.add('selected');
        card.querySelectorAll('.alg-option').forEach(o => o.classList.remove('alg-option-active'));
        el.classList.add('alg-option-active');
    }
    try {
        localStorage.setItem('algSelections', JSON.stringify(algSelections));
    } catch(e) {}
}

function selectAllAlgs() {
    const stage = currentAlgStage;
    const data  = algData[stage];
    if (!data) return;
    data.forEach(c => {
        if (c.algs && c.algs.length > 0) {
            algSelections[stage][c.name] = algSelections[stage][c.name] ?? 0;
        }
    });
    renderAlgGrid();
}

function deselectAllAlgs() {
    const stage = currentAlgStage;
    algSelections[stage] = {};
    renderAlgGrid();
}

function saveAlgSelections() {
    try {
        localStorage.setItem('algSelections', JSON.stringify(algSelections));
    } catch(e) {}

    const banner = document.getElementById('alg-save-banner');
    banner.style.display = 'block';
    setTimeout(() => { banner.style.display = 'none'; }, 2000);
}

(function loadSavedSelections() {
    try {
        const saved = localStorage.getItem('algSelections');
        if (saved) {
            const parsed = JSON.parse(saved);
            Object.assign(algSelections.f2l1, parsed.f2l1 || {});
            Object.assign(algSelections.f2l2, parsed.f2l2 || {});
            Object.assign(algSelections.f2l3, parsed.f2l3 || {});
            Object.assign(algSelections.f2l4, parsed.f2l4 || {});
            Object.assign(algSelections.oll,  parsed.oll  || {});
            Object.assign(algSelections.pll,  parsed.pll  || {});
        }
    } catch(e) {}
})();

(async function preloadAlgData() {
    await Promise.all(['f2l1','f2l2','f2l3','f2l4','oll','pll'].map(s => loadAlgStage(s, false)));
})();

function getSelectedAlg(stage, caseName) {
    const idx  = algSelections[stage][caseName];
    const data = algData[stage];
    if (!data || idx === undefined) return null;
    const c = data.find(c => c.name === caseName);
    if (!c || !c.algs || !c.algs[idx]) return null;
    return c.algs[idx];
}