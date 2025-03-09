let currentValue = "X";
const grid = document.getElementById("grid");
const cells = [];

for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.setAttribute("row", row);
        cell.setAttribute("col", col);
        cell.id = `cell-${row}-${col}`;
        cell.addEventListener("click", function () {
            if (!cell.textContent) {
                cell.textContent = currentValue;
                checkWin();
                currentValue = currentValue === "X" ? "O" : "X";
            }
        });
        grid.appendChild(cell);
        cells.push(cell);
    }
}

function checkWin() {
    const winPatterns = [
        [[0,0], [0,1], [0,2]], [[1,0], [1,1], [1,2]], [[2,0], [2,1], [2,2]], 
        [[0,0], [1,0], [2,0]], [[0,1], [1,1], [2,1]], [[0,2], [1,2], [2,2]],
        [[0,0], [1,1], [2,2]], [[0,2], [1,1], [2,0]]
    ];
    
    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        const cellA = document.getElementById(`cell-${a[0]}-${a[1]}`);
        const cellB = document.getElementById(`cell-${b[0]}-${b[1]}`);
        const cellC = document.getElementById(`cell-${c[0]}-${c[1]}`);
        
        if (cellA.textContent && cellA.textContent === cellB.textContent && cellA.textContent === cellC.textContent) {
            cellA.classList.add("winning");
            cellB.classList.add("winning");
            cellC.classList.add("winning");
            grid.style.pointerEvents = "none";
            return;
        }
    }
}
