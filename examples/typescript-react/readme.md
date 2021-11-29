
## Running

A standalone TypeScript compiler is available on NPM.

	npm install typescript

To compile the TypeScript in this project:

	# from examples/typescript-react
	$ ./node_modules/typescript/bin/tsc -p ./

To be able to run the output JS files in the browser:

	# from examples/typescript-react
	$ ./node_modules/browserify/bin/cmd ./build/dist/app.js -o ./build/dist/bundle.js"

To run the app, spin up an HTTP server (e.g. `python -m SimpleHTTPServer`) and visit http://localhost/.../myexample/.
Alternatively you can run:

	# from examples/typescript-react
	$ npm run clear && npm run build && npm run start 
	
## Task 1 Responses:

## What would you do differently?
1. rename js folder src
2. use hooks 
3. compile/build typescript'scripts into a different folder(build/dist)
4. seperate and organize files with architecture (config,components pages, utils, etc…)
5. move tsconfig.json outside the src folder, root folder
6. use arrow functions for binding methods

## What's good?
1. using OOP logic
2. Defining how the server should start (definite PORT)
## What's bad?
1. Node_modules in the remote repository(makes the project heavy for clones and commits) (add to gitignore)
2. building ts script in js folder (makes hard to browse filed when writing code)
3. CSS in node_modules
## Are you missing anything in the tooling department?
Eslint & WebpackWhat


