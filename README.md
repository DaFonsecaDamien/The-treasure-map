# Treasure Map Game
This is a simple command-line application for playing a treasure map game. It reads input data from a file, processes the game simulation, and writes the result to an output file.

### Getting Started
- Clone the repository: git clone https://github.com/DaFonsecaDamien/The-treasure-map
- Install dependencies: npm install
### Usage
To run the treasure map game, use the following command:

- npm run start:dev

#### Input File
The input file should contain the initial state of the game, including the dimensions of the map, the positions of mountains, treasures, and adventurers. The format of the input file should follow a specific structure.

#### Example Input File
C - 3 - 4\
M - 1 - 0\
M - 2 - 1\
T - 0 - 3 - 2\
T - 1 - 3 - 3\
A - Lara - 1 - 1 - S - AADADAGGA\
A - Indiana - 0 - 0 - N - ADADAGGA\

#### Output File
The output file will contain the result of the game simulation. The format of the output file depends on the specified response type.

- Normal response type: The output file will contain the final state of the game, including the positions of adventurers, mountains, and treasures, as well as any changes that occurred during the game.

- Board response type: The output file will contain a visual representation of the game map, showing the positions of mountains, treasures, and adventurers.