let menuToggle = document.querySelector('.menu-toggle');
let pen = document.querySelector('#pen-color');
let penColor = pen.value;
let background = document.querySelector('#background-color');
let squareBackgroundColor = background.value;
let isDrawing = false;
let draw = true;
let eraser = false;
let rainbow = false;

pen.addEventListener('change', () => {
    penColor = pen.value;
})

let gridLines = document.querySelector('.grid-lines');
gridLines.addEventListener('click', () => {
    let gridSquares = document.querySelectorAll('.grid-squares');

    if (gridLines.id === 'on') {
        gridLines.id = 'off';
        gridSquares.forEach((square) => {
            square.style.border = 'none';
        });
    } else {
        gridLines.id = 'on';
        gridSquares.forEach((square) => {
            square.style.border = '0.5px solid #202020';
        });
    }
})

let rainbowButton = document.querySelector('.rainbow');
rainbowButton.addEventListener('click', () => {
    if (rainbowButton.id === 'off'){
        rainbowButton.id = 'on';
        rainbow = true;
    } else {
        rainbowButton.id = 'off';
        rainbow = false;
    }
})

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function addDrawingFunctionality(){
    let gridSquares = document.querySelectorAll('.grid-squares');

    gridSquares.forEach((square) => {
        square.addEventListener('mousedown', () => {
            isDrawing = true;
        })
    })

    gridSquares.forEach((square) => {
        square.addEventListener('mouseup', () => {
            isDrawing = false;
        })

    });

    gridSquares.forEach((square) => {
        square.addEventListener('mousemove', () => {
            if (isDrawing){
                if (draw){
                    if (!rainbow){
                        square.style.backgroundColor = penColor;
                    } else {
                        square.style.backgroundColor = getRandomColor();
                    }
                } else if (eraser){
                    square.style.backgroundColor = squareBackgroundColor;
                }
            }
        })
    })

    gridSquares.forEach((square) => {
        square.addEventListener('click', () => {
            if (draw){
                if (!rainbow){
                    square.style.backgroundColor = penColor;
                } else {
                    square.style.backgroundColor = getRandomColor();
                }
            } else if (eraser){
                square.style.backgroundColor = squareBackgroundColor;
            }
        })
    })
}

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

    if (gridLines.id === 'off'){
        divElement.style.border = 'none';
    }

    for (let i = 0; i < totalSquares; i++){
        rowDiv.appendChild(divElement.cloneNode(true));
    }

    for (let i = 0; i < totalSquares; i++){
        gridContainer.appendChild(rowDiv.cloneNode(true));
    }

    addDrawingFunctionality();
}

buildGrid();

document.getElementById('clear').addEventListener('click', () => {
    buildGrid();
})

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
let eraserButton = document.querySelector('.eraser');

fillColorButton.addEventListener('click', () => {
    if (draw){
        fillColorButton.id = 'off';
        draw = false;
    } else {
        fillColorButton.id = 'on';
        draw = true;
        if (eraser){
            eraserButton.id = 'off'
            eraser = false;
        }
    }
})

eraserButton.addEventListener('click', () => {
    if (eraser){
        eraserButton.id = 'off';
        draw = true;
        eraser = false;
        fillColorButton.id = 'on';
    } else {
        eraserButton.id = 'on';
        draw = false;
        eraser = true;
        fillColorButton.id = 'off';
    }
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