document.addEventListener('DOMContentLoaded', (event) => {
    const table = document.querySelector('table');
    for (let i = 0; i < 9; i++) {
        let row = document.createElement('tr');
        for (let j = 0; j < 9; j++) {
            let cell = document.createElement('td');
            let input = document.createElement('input');
            input.type = 'number';
            input.min = 1;
            input.max = 9;
            input.addEventListener('input', () => {
                if (input.value > 9) input.value = 9;
                if (input.value < 1 && input.value !== '') input.value = 1;
            });
            cell.appendChild(input);
            row.appendChild(cell);
        }
        table.appendChild(row);
    }

    const solveBtn = document.getElementById('solveBtn');
    solveBtn.addEventListener('click', () => {
        const grid = getGrid();
        if (isValidSudoku(grid)) {
            if (solve(grid)) {
                displayGrid(grid);
            } else {
                alert('No solution exists for the provided grid.');
            }
        } else {
            alert('Invalid Sudoku grid. Please check your input.');
        }
    });

    function getGrid() {
        const grid = [];
        const rows = table.querySelectorAll('tr');
        rows.forEach(row => {
            const rowData = [];
            const cells = row.querySelectorAll('input');
            cells.forEach(cell => {
                rowData.push(parseInt(cell.value) || 0);
            });
            grid.push(rowData);
        });
        return grid;
    }

    function displayGrid(grid) {
        const rows = table.querySelectorAll('tr');
        rows.forEach((row, i) => {
            const cells = row.querySelectorAll('input');
            cells.forEach((cell, j) => {
                cell.value = grid[i][j];
            });
        });
    }

    function isValidSudoku(grid) {
        for (let i = 0; i < 9; i++) {
            const rowSet = new Set();
            const colSet = new Set();
            const boxSet = new Set();
            for (let j = 0; j < 9; j++) {
                // Check rows
                if (grid[i][j] !== 0) {
                    if (rowSet.has(grid[i][j])) return false;
                    rowSet.add(grid[i][j]);
                }
                // Check columns
                if (grid[j][i] !== 0) {
                    if (colSet.has(grid[j][i])) return false;
                    colSet.add(grid[j][i]);
                }
                // Check 3x3 sub-boxes
                const boxRow = 3 * Math.floor(i / 3) + Math.floor(j / 3);
                const boxCol = 3 * (i % 3) + j % 3;
                if (grid[boxRow][boxCol] !== 0) {
                    if (boxSet.has(grid[boxRow][boxCol])) return false;
                    boxSet.add(grid[boxRow][boxCol]);
                }
            }
        }
        return true;
    }

    function isValid(board, row, col, num) {
        for (let x = 0; x < 9; x++) {
            if (board[row][x] === num || board[x][col] === num) {
                return false;
            }
        }
        const startRow = 3 * Math.floor(row / 3);
        const startCol = 3 * Math.floor(col / 3);
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[startRow + i][startCol + j] === num) {
                    return false;
                }
            }
        }
        return true;
    }

    function solve(board) {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (board[row][col] === 0) {
                    for (let num = 1; num <= 9; num++) {
                        if (isValid(board, row, col, num)) {
                            board[row][col] = num;
                            if (solve(board)) {
                                return true;
                            }
                            board[row][col] = 0;
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }
});
