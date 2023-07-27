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

    game.clearRect(0,0,canvaSize,canvaSize);

    // Uso de método de arrays: arrays.forEach()
    mapRowsCols.forEach((row, rowIndex) => {
        row.forEach((col, colIndex) => {
            console.log({row, rowIndex, col, colIndex});
            const posX = elementSize*colIndex;
            const posY = elementSize*(rowIndex+1);
            console.log({posX,posY})

            game.fillText(emojis[col],posX, posY)  //Renderizado del mapa del juego

            //Ubicar posición inicial del JUGADOR

            if(col=='O'){
                if(!playerPosition["x"] && !playerPosition["y"]){
                    playerPosition["x"]=posX;
                    playerPosition["y"]=posY;
                    console.log({playerPosition});
                }
            } else if (col=='I') {
                giftPosition["x"]=posX;
                giftPosition["y"]=posY;
                console.log({giftPosition});
            }
        });
    });
    
    /*Clase 9: Renderizar al jugador*/
    renderizarJugador(playerPosition["x"],playerPosition["y"])
};


function renderizarJugador(x,y) {

    //CREAR UNA VARIABLE POR CADA DISTINTA COLISIÓN (en eje X e Y)

    const giftColisionX = playerPosition["x"] == giftPosition["x"];

    const giftColisionY = playerPosition["y"] == giftPosition["y"];

    const huboColisionConElRegalito = giftColisionX && giftColisionY;
    console.log(huboColisionConElRegalito);


    if (huboColisionConElRegalito) {
        console.log("Subiste de nivel")
    }

    game.fillText(emojis['PLAYER'],x,y);
    
}

/*Clase 8: Crear evento que escuche botones de dirección*/

let btnUp, btnDown, btnRight, btnLeft;
let btnUp2, btnDown2, btnRight2, btnLeft2;

//paso N°01
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

//paso N°02

btnUp.addEventListener("click", moveUp);
btnUp2.addEventListener("click", moveUp);

btnLeft.addEventListener("click", moveLeft);
btnLeft2.addEventListener("click", moveLeft);

btnRight.addEventListener("click", moveRight);
btnRight2.addEventListener("click", moveRight);

btnDown.addEventListener("click", moveDown);
btnDown2.addEventListener("click", moveDown);


function moveUp(){
    console.log("Movement_Up");

    if(playerPosition["y"]>(elementSize+1)){    //agrega 1 para evitar error por decimales
        playerPosition["y"]=playerPosition["y"]-elementSize;
    } 

    startGame();
    console.log(playerPosition);
}

function moveLeft(){
    console.log("Movement_Left");

    if(playerPosition["x"]>1){          //Se establece 1 para evitar error por decimales
        playerPosition["x"]=playerPosition["x"]-elementSize;
    }

    startGame();
    console.log(playerPosition);

}

function moveRight(){
    console.log("Movement_Right");

    if(playerPosition["x"]<((canvaSize-elementSize)-1)){      //Se resta 1 para evitar error por decimales
        playerPosition["x"]=playerPosition["x"]+elementSize;
    }

    startGame();
    console.log(playerPosition);
} 

function moveDown(){
    console.log("Movement_Down");

    if(playerPosition["y"]<(canvaSize)){
        playerPosition["y"]=playerPosition["y"]+elementSize;
    } 

    startGame();
    console.log(playerPosition);
}

/*Clase 8: Crear evento que escuche TECLAS de dirección*/

window.addEventListener("keydown", moveByKeys);


//función con su único parámetro: descriptor del evento

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

/*Clase 9: Objeto playerPosition */

const playerPosition = {
    x:undefined,
    y:undefined
}

/*Clase 12: Objeto regaloPosition */

const giftPosition = {
    x:undefined,
    y:undefined
}

