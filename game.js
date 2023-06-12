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
    
    
    for (let j = 1; j <= 10 ; j++) {
        for (let i = 0; i < 10; i++) {
            game.fillText(emojis[mapRowsCols[j][i]], (elementSize*i), elementSize*j)
        }
    } 





};

//Dividir cada mapa en arrays bidimendionales

const mapRows = maps[0].trim().split("\n");
console.log(mapRows);

const mapRowsClean= mapRows.map(value=>value.trim());

const mapRowsCols=mapRowsClean.map(value=>value.split(""));