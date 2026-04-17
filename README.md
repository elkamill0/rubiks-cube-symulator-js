# 🧩 Rubik's Cube Solver JS

A browser-based Rubik's Cube solver using the CFOP method.  
The cube logic is implemented in JavaScript, and the cross solver is compiled to WebAssembly (C → Emscripten).  
The user interface is a single-page application built with vanilla HTML/CSS/JS.

## 🌐 Live Demo

The application is hosted on GitHub Pages and available at:  
[https://elkamill0.github.io/rubiks-cube-symulator-js/](https://elkamill0.github.io/rubiks-cube-symulator-js/)

## ✨ Features

- Input your own scrambles or generate random ones
- Choose cross color (yellow, white, red, orange, blue, green)
- Full CFOP reconstruction — Cross, F2L, OLL, PLL
- Step-by-step mode with interactive algorithm buttons
- Auto cross length — automatically finds the shortest cross (0–8 moves)
- Real-time cube visualization (2D net)
- Move count statistics for each CFOP stage
- Undo last move in step-by-step mode
- Load cube state as a 54-character string

## 🛠 Tech Stack

- **JavaScript** (vanilla, no frameworks)
- **WebAssembly** — cross solver compiled from C via Emscripten
- **HTML/CSS** — single-page application, terminal/cyberpunk theme
- **JSON** — algorithm databases for F2L (4 slots), OLL (57 cases), PLL (21 cases)

## ⚙️ Requirements

- A browser with WebAssembly support (Chrome, Firefox, Edge, Safari)
- A local HTTP server (required for `fetch` to load `.wasm` and `.json` files)

## 🚀 Running the Application

```bash
# Python
python -m http.server 5500

# Node.js
npx serve .

# VS Code
# Use the Live Server extension
```

Then open `http://localhost:5500` in your browser.

## 🧪 Testing

You can test the application by opening the following page in your browser:
`http://127.0.0.1:5500/test.html`

## 📁 Project Structure

```
├── index.html / style.css  # Application frontend
├── app.js                  # Main logic
├── solver.js / solver.wasm # Cross solver (WebAssembly)
├── cube.js                 # Cube class
├── convert.js              # Notation and state conversion
├── scramble.js             # Scramble generator
├── cross.js                # Stage 1 — Cross
├── f2l.js                  # Stage 2 — F2L
├── oll.js                  # Stage 3 — OLL
├── pll.js                  # Stage 4 — PLL
├── solving_stage.js        # Solving and Manual classes
├── tools.js                # reduce, inverse, remap utilities
├── moves/                  # Move logic (corners, edges, centers)
└── cases/                  # F2L / OLL / PLL algorithm databases (JSON)
```

## 🎯 Project Goal

The project aims to:

- Port the solver logic from Python to JavaScript for full client-side functionality
- Maintain identical CFOP logic between the Python and JS versions
- Provide an interactive tool for learning and analyzing Rubik's Cube algorithms
- Demonstrate the use of WebAssembly in a web application

## 🔗 Python Version

The original Python + Streamlit version of this project is available here:  
[rubiks-cube-symulator](https://github.com/elkamill0/rubiks-cube-python)
