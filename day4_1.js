const fs = require('fs');

// Szöveg betöltése fájlból
function readTextFromFile(filePath) {
    return fs.readFileSync(filePath, 'utf-8');
}

// Szöveg mátrixra alakítása
function textToMatrix(text) {
    return text.split('\n').map(line => [...line]);
}

// Minta keresése a mátrixban
function findPatternInMatrix(matrix, patterns) {
    const rows = matrix.length;
    const cols = matrix[0].length;
    const matches = [];

    const directions = [
        { dr: 0, dc: 1 },  // Jobbra
        { dr: 1, dc: 0 },  // Lefelé
        { dr: 1, dc: 1 },  // Átlósan jobbra lefelé
        { dr: 1, dc: -1 }  // Átlósan balra lefelé
    ];

    function isMatch(r, c, pattern, dr, dc) {
        for (let i = 0; i < pattern.length; i++) {
            const nr = r + i * dr;
            const nc = c + i * dc;
            if (nr < 0 || nr >= rows || nc < 0 || nc >= cols || matrix[nr][nc] !== pattern[i]) {
                return false;
            }
        }
        return true;
    }

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            for (const pattern of patterns) {
                for (const { dr, dc } of directions) {
                    if (isMatch(r, c, pattern, dr, dc)) {
                        matches.push({
                            pattern,
                            start: { row: r + 1, column: c + 1 },
                            direction: { dr, dc }
                        });
                    }
                }
            }
        }
    }

    return matches;
}

// Fő futtatás
const filePath = 'day4_input.txt'; // Az input fájl neve
const inputText = readTextFromFile(filePath);
const matrix = textToMatrix(inputText);
const patterns = ["XMAS", "SAMX"];
const matches = findPatternInMatrix(matrix, patterns);


console.log(matches);
console.log("Összes találat száma:", matches.length);

