/*Declaración de variables y objetos*/

let canvaSize, elementSize;
let btnUp, btnDown, btnRight, btnLeft;
let btnUp2, btnDown2, btnRight2, btnLeft2;

/*Declaración de variables y objetos*/

const canvas = document.querySelector("#game");
console.log(canvas);

const game = canvas.getContext("2d");
console.log(game);

btnUp=document.querySelector(".btn--up");
btnUp2=document.querySelector("#up-cel");
console.log(btnUp);
console.log(btnUp2);


btnLeft=document.querySelector(".btn--left");
btnLeft2=document.querySelector("#left-cel");
console.log(btnLeft);
console.log(btnLeft2);

btnRight=document.querySelector(".btn--right");
btnRight2=document.querySelector("#right-cel");
console.log(btnRight);
console.log(btnRight2);

btnDown=document.querySelector(".btn--down");
btnDown2=document.querySelector("#down-cel");
console.log(btnDown);
console.log(btnDown2);


/*Eventos*/

window.addEventListener("load", setCanvasSize);
window.addEventListener("resize", setCanvasSize);

btnUp.addEventListener("click", moveUp);
btnUp2.addEventListener("click", moveUp);

btnLeft.addEventListener("click", moveLeft);
btnLeft2.addEventListener("click", moveLeft);

btnRight.addEventListener("click", moveRight);
btnRight2.addEventListener("click", moveRight);

btnDown.addEventListener("click", moveDown);
btnDown2.addEventListener("click", moveDown);

window.addEventListener("keydown", moveByKeys);


/*Funciones*/

function setCanvasSize(){
    // Clase N° 03
    //Establecer el tamaño de un elemento del canvas(10x10)

    if(window.innerHeight > window.innerWidth){
        canvaSize = window.innerWidth *0.7;
    } else{
        canvaSize= window.innerHeight * 0.7
    }

    canvas.setAttribute("height", canvaSize);
    canvas.setAttribute("width", canvaSize);

    console.log(window.innerHeight);
    console.log(window.innerWidth);
    console.log(canvas.height);
    console.log(canvas.width);

    //Establecer el tamaño de un elemento del canvas(10x10)

    elementSize=canvaSize/10;
    console.log(elementSize);
    startGame();
}

function startGame(){

    game.font = elementSize + "px Verdana";

//Dividir cada mapa en arrays bidimendionales

    const map = maps[0];
    const mapRows = map.trim().split("\n");
    console.log(mapRows);
    const mapRowsClean= mapRows.map(value=>value.trim());
    console.log(mapRowsClean);

    const mapRowsCols=mapRowsClean.map(value=>value.split(""));
    console.log(mapRowsCols);

    // Uso de método de arrays: arrays.forEach()

    mapRowsCols.forEach((row, rowIndex) => {
        row.forEach((col, colIndex) => {
            console.log({row, rowIndex, col, colIndex});
            const posX = elementSize*colIndex;
            const posY = elementSize*(rowIndex+1);

            game.fillText(emojis[col],posX, posY)

            if(col=='O'){
                playerPosition["x"]=posX;
                playerPosition["y"]=posY;
                console.log({playerPosition});
            }
        });
    });

    // Renderizar posición inicial del jugador
    
    game.fillText(emojis['PLAYER'],playerPosition["x"], [playerPosition["y"]]);


};

function moveUp(event){
    console.log("Movement_Up");
}

function moveLeft(){
    console.log("Movement_Left");
}

function moveRight(){
    console.log("Movement_Right");
}

function moveDown(){
    console.log("Movement_Down");
}

function moveByKeys(event){
    switch(event.key){
        case "ArrowUp":
            moveUp();
            break;
        case "ArrowDown":
            moveDown();
            break;
        case "ArrowLeft":
            moveLeft();
            break;
        case "ArrowRight":
            moveRight();
            break;      
        default:
            console.log("No_Movement")                  
    }
}