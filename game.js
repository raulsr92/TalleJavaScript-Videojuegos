/* 1° Capturar al elemento canvas de html*/

const canvas = document.querySelector("#game");
console.log(canvas);

/* 2° Crear el contexto de Canvas */

const game = canvas.getContext("2d");
console.log(game);


let canvaSize;
let elementSize;


/*3°Crear evento y función que va a contener las propiedades y métodos del contexto 2D */

window.addEventListener("load", setCanvasSize);

window.addEventListener("resize", setCanvasSize);


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
        });
    });

    /*
    for (let j = 1; j <= 10 ; j++) {
        for (let i = 0; i < 10; i++) {
            let emojiShow;
            emojiShow = mapRowsCols[j-1][i];
            game.fillText(emojis[emojiShow], (elementSize*i), elementSize*j)
        }
    } */

};

/*Clase 8: Crear evento que escuche botones de dirección*/

let btnUp, btnDown, btnRight, btnLeft;
let btnUp2, btnDown2, btnRight2, btnLeft2;


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


btnUp.addEventListener("click", contadorUp);
btnUp2.addEventListener("click", contadorUp);

btnLeft.addEventListener("click", contadorLeft);
btnLeft2.addEventListener("click", contadorLeft);

btnRight.addEventListener("click", contadorRight);
btnRight2.addEventListener("click", contadorRight);

btnDown.addEventListener("click", contadorDown);
btnDown2.addEventListener("click", contadorDown);


function contadorUp(){
    console.log("Click_Up");
}

function contadorLeft(){
    console.log("Click_Left");
}

function contadorRight(){
    console.log("Click_Right");
}

function contadorDown(){
    console.log("Click_Down");
}