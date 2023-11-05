let menuToggle = document.querySelector('.menu-toggle');
let pen = document.querySelector('#pen-color');
let penColor = pen.value;
let background = document.querySelector('#background-color');
let squareBackgroundColor = background.value;
let draw = true;
let eraserButton = false;
let rainbow = false;

pen.addEventListener('change', () => {
    penColor = pen.value;
})



let range = document.querySelector('#grid-size');

function buildGrid() {
    let gridContainer = document.querySelector('.grid-container');
    let totalSquares = parseInt(range.value);

    while (gridContainer.firstChild){
        gridContainer.removeChild(gridContainer.firstChild);
    }


    let squareSize = (gridContainer.offsetWidth - 30) / totalSquares;

    let divElement = document.createElement('div');
    let rowDiv = document.createElement('div');
    rowDiv.classList.add('row-div')
    divElement.classList.add('grid-squares');
    divElement.style.width = `${squareSize}px`;
    divElement.style.height = `${squareSize}px`;

    for (let i = 0; i < totalSquares; i++){
        rowDiv.appendChild(divElement.cloneNode(true));
    }

    for (let i = 0; i < totalSquares; i++){
        gridContainer.appendChild(rowDiv.cloneNode(true));
    }
}

buildGrid()

window.addEventListener('resize', () => {
    let totalSquares = parseInt(range.value);
    let gridContainer = document.querySelector('.grid-container');
    let gridSquares = document.querySelectorAll('.grid-squares');
    let squareSize = (gridContainer.offsetWidth - 30) / totalSquares;

    gridSquares.forEach((square) => {
        square.style.width = `${squareSize}px`;
        square.style.height = `${squareSize}px`;
    })
})

let fillColorButton = document.querySelector('.color-fill');

fillColorButton.addEventListener('click', () => {
    if (fillColorButton.id === 'on'){
        fillColorButton.id = 'off';
        draw = false;
    } else {
        fillColorButton.id = 'on';
        draw = true;
    }
})

let gridSquares = document.querySelectorAll('.grid-squares');
gridSquares.forEach((square) => {
    square.addEventListener('click', () => {
        if (draw){
            if (!rainbow){
                square.style.backgroundColor = penColor;
            }
        }
    })
})

background.addEventListener('change', () => {
    let gridContainer = document.querySelector('.grid-container');
    gridContainer.style.backgroundColor = background.value; 
})

range.addEventListener('change', () => {
    let sizes = document.querySelectorAll('.size');
    let selectedSize = range.value;

    sizes[0].innerHTML = selectedSize;
    sizes[1].innerHTML = selectedSize;
    buildGrid()
})


menuToggle.addEventListener('click', () => {   
    let controls = document.querySelector('.controls');
    let gridContainer = document.querySelector('.grid-container');
    if (controls.style.display !== 'flex'){
        controls.style.display = 'flex';
        gridContainer.style.display = 'none';
    } else {
        controls.style.display = 'none';
        gridContainer.style.display = 'flex';
    }
})