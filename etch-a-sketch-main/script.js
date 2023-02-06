const html = document.querySelector("html");
const themeButton = document.querySelector("#theme-btn");
const gridContainer = document.querySelector(".grid-container");
const sizeDisplay = document.querySelector("#size-display");
const sizeRange = document.querySelector("#size-range");
const btnRainbow = document.querySelector("#btn-rainbow");
const btnErase = document.querySelector("#btn-erase");
const btnClear = document.querySelector("#btn-clear");
const btnColor = document.querySelector("#btn-color");
const colorContainer = document.querySelector(".color-container");
const colorInput = document.querySelector("#color-input");
const btnGrid = document.querySelector("#toggle-grid");
const gridIcon = document.querySelector("#grid-icon");
let squareList = [];
let allSquares = null;
let down = false;
let downListener = () => down = true;
let upListener = () => down = false;
let color = "#1b2832";
colorInput.value = "#1b2832";

function randomizeColor() {
    let red = Math.floor((Math.random() * 255) + 1);
    let green = Math.floor((Math.random() * 255) + 1);
    let blue = Math.floor((Math.random() * 255) + 1);
    color = `rgb(${red},${green},${blue})`;
}

function changeColor(square) {
    square.setAttribute("style",`background-color: ${color}`);
}

function clearGrid() {
    allSquares.forEach( (square) => {
        gridContainer.removeChild(square);
    });
}

function changeSize(size) {
    if (allSquares != null) {
        allSquares.forEach((square) => {
            square.removeEventListener("mouseover",() => {
            if(down) changeColor(square);
            });
            square.removeEventListener("click", () => changeColor(square));
        });
        allSquares = null;
    }
    squareList = [];
    if(size == 1) {
        gridContainer.setAttribute("style",`grid-template-columns: 1fr;`);
        squareList.push(document.createElement("div"));
        squareList[0].classList.add("square");
        gridContainer.appendChild(squareList[0]);
    } else {
        gridContainer.setAttribute("style",`grid-template-columns: repeat(${size},1fr);`);
        size = size ** 2;
        for(let i = 0; i < size; i++){
            squareList.push(document.createElement("div"));
            squareList[i].classList.add("square");
            gridContainer.appendChild(squareList[i]);
        }
    }
    getSquares();
}

function getSquares () {
    allSquares = document.querySelectorAll(".square");
    allSquares.forEach((square) => {
        square.addEventListener("mouseover",() => {
            if(!(btnRainbow.classList.contains("outline"))) randomizeColor();
            if(down) changeColor(square);
        });
        square.addEventListener("click", () => changeColor(square));
    });
}

themeButton.addEventListener('click', () => {
    if(html.getAttribute("data-theme") === "dark"){
        html.setAttribute('data-theme','light');
        themeButton.setAttribute("data-tooltip", "Turn on dark mode");
    } else {
        html.setAttribute('data-theme','dark');
        themeButton.setAttribute("data-tooltip", "Turn off dark mode");
    }
});

changeSize(16);

sizeRange.addEventListener("mousemove", (e) => {
    sizeDisplay.textContent = `${e.target.value}x${e.target.value}`;
});

sizeRange.addEventListener("change", (e) => {
    gridIcon.classList.replace("fa-eye-slash","fa-eye")
    sizeRange.setAttribute("value",e.target.value);
    clearGrid();
    changeSize(e.target.value);
});

btnRainbow.addEventListener("click", () => {
    btnRainbow.classList.remove("outline");
    if (!(btnErase.classList.contains("outline"))) btnErase.classList.add("outline");
    if (!(btnColor.classList.contains("outline"))) {
        btnColor.classList.add("outline");
        colorContainer.setAttribute("style","left: 50px;");
    } 
});

btnErase.addEventListener("click", () => {
    btnErase.classList.remove("outline");
    if (!(btnRainbow.classList.contains("outline"))) btnRainbow.classList.add("outline");
    if (!(btnColor.classList.contains("outline"))) {
        btnColor.classList.add("outline");
        colorContainer.setAttribute("style","left: 50px;");
    } 
    color = "none";
});

btnClear.addEventListener("click", () => {
    gridIcon.classList.replace("fa-eye-slash","fa-eye");
    btnClear.classList.remove("outline");
    setTimeout(() => btnClear.classList.add("outline"), 200);
    clearGrid();
    changeSize(sizeRange.getAttribute("value"));
});

btnColor.addEventListener("mouseover", () => {
    if(btnColor.classList.contains("outline")) colorContainer.setAttribute("style","left: 215px;");
    color = colorInput.value;
});

btnColor.addEventListener("mouseout", () => {
    if(btnColor.classList.contains("outline")) colorContainer.setAttribute("style","left: 50px;");
});

btnColor.addEventListener("click", () => {
    btnColor.classList.remove("outline");
    if (!(btnRainbow.classList.contains("outline"))) btnRainbow.classList.add("outline");
    if (!(btnErase.classList.contains("outline"))) btnErase.classList.add("outline");
    colorContainer.setAttribute("style","left: 215px;");
});

colorInput.addEventListener("change", (e) => {
    color = e.target.value;
});

btnGrid.addEventListener("click", () => {
    if (gridIcon.classList.contains("fa-eye-slash")) {
        gridIcon.classList.replace("fa-eye-slash","fa-eye");
        allSquares.forEach((square) => {
            square.classList.remove("square-border");
            btnGrid.setAttribute("data-tooltip","Show grid");
        });
    } else {
        gridIcon.classList.replace("fa-eye","fa-eye-slash");
        allSquares.forEach((square) => {
            square.classList.add("square-border");
            btnGrid.setAttribute("data-tooltip","Hide grid");
        });
    }
})

gridContainer.addEventListener("mousedown", downListener);

document.body.addEventListener("mouseup", upListener);