const fs = require('fs');

// Szöveg betöltése fájlból
function readTextFromFile(filePath) {
    return fs.readFileSync(filePath, 'utf-8');
}

// Szöveg mátrixra alakítása
function textToMatrix(text) {
    return text.split('\n').map(line => [...line].map(c => c.trim())); // Extra szóközök eltávolítása
}

// X-alakú MAS/SAM minta keresése
function findXPatternInMatrix(matrix) {
    const rows = matrix.length;
    const cols = matrix[0].length;
    const matches = [];

    for (let r = 1; r < rows - 1; r++) {
        for (let c = 1; c < cols - 1; c++) {
            // MAS minta keresése
            if (
                matrix[r][c] === 'A' && // Középső karakter A
                matrix[r - 1][c - 1] === 'M' && // Bal felső M
                matrix[r + 1][c + 1] === 'S' && // Jobb alsó S
                matrix[r - 1][c + 1] === 'M' && // Jobb felső M
                matrix[r + 1][c - 1] === 'S' // Bal alsó S
            ) {
                matches.push({
                    center: { row: r + 1, column: c + 1 },
                    pattern: 'MAS'
                });
                console.log(`MAS találat: sor ${r + 1}, oszlop ${c + 1}`);
            }
			if (
                matrix[r][c] === 'A' && // Középső karakter A
                matrix[r - 1][c - 1] === 'M' && // Bal felső M
                matrix[r + 1][c + 1] === 'S' && // Jobb alsó S
                matrix[r - 1][c + 1] === 'S' && // Jobb felső M
                matrix[r + 1][c - 1] === 'M' // Bal alsó S
            ) {
                matches.push({
                    center: { row: r + 1, column: c + 1 },
                    pattern: 'MAS'
                });
                console.log(`MAS találat: sor ${r + 1}, oszlop ${c + 1}`);
            }
			if (
                matrix[r][c] === 'A' && // Középső karakter A
                matrix[r - 1][c - 1] === 'S' && // Bal felső M
                matrix[r + 1][c + 1] === 'M' && // Jobb alsó S
                matrix[r - 1][c + 1] === 'M' && // Jobb felső M
                matrix[r + 1][c - 1] === 'S' // Bal alsó S
            ) {
                matches.push({
                    center: { row: r + 1, column: c + 1 },
                    pattern: 'MAS'
                });
                console.log(`MAS találat: sor ${r + 1}, oszlop ${c + 1}`);
            }

            // SAM minta keresése
            if (
                matrix[r][c] === 'A' && // Középső karakter A
                matrix[r - 1][c - 1] === 'S' && // Bal felső S
                matrix[r + 1][c + 1] === 'M' && // Jobb alsó M
                matrix[r - 1][c + 1] === 'S' && // Jobb felső S
                matrix[r + 1][c - 1] === 'M' // Bal alsó M
            ) {
                matches.push({
                    center: { row: r + 1, column: c + 1 },
                    pattern: 'SAM'
                });
                console.log(`SAM találat: sor ${r + 1}, oszlop ${c + 1}`);
            }
        }
    }

    return matches;
}

// Fő futtatás
const filePath = 'day4_input.txt'; // Az input fájl neve
const inputText = readTextFromFile(filePath);
const matrix = textToMatrix(inputText);
const matches = findXPatternInMatrix(matrix);

console.log("Találatok:", matches);
console.log("Összes találat száma:", matches.length);
