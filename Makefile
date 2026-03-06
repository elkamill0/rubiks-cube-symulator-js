run:
	python3 -m http.server 8000

c_to_wasm:
	emcc solver.c -O2 \
	-s WASM=1 \
	-s EXPORT_NAME='SolverModule' \
	-s MODULARIZE=1 \
	-s EXPORTED_FUNCTIONS='["_set_solver_args","_run_solver","_get_solution_count","_get_solution_length","_get_solution_move"]' \
	-s EXPORTED_RUNTIME_METHODS='["ccall","cwrap"]' \
	-s ALLOW_MEMORY_GROWTH=1 \
	--no-entry \
	-o solver.js