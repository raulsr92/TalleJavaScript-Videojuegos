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

    const map = maps[nivel];
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
            console.log({posX,posY})

            game.fillText(emojis[col],posX, posY)  //Renderizado del mapa del juego

            //Ubicar posición inicial del JUGADOR

            if(col=='O'){
                playerPosition["x"]=posX;
                playerPosition["y"]=posY;
                console.log({playerPosition});
            }

            //Ubicar posición del regalo (Clase 12)

            if (col=='I') {
                regaloPosition["x"]=posX;
                regaloPosition["y"]=posY;
                console.log({regaloPosition});
            }
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


    /*Clase 9: Renderizar al jugador*/
    renderizarJugador(playerPosition["x"],playerPosition["y"])
};

let nivel = 0;


function reStartGame(){
    game.font = elementSize + "px Verdana";

    const map = maps[nivel];
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
            console.log({posX,posY})

            game.fillText(emojis[col],posX, posY)  //Renderizado del mapa del juego
            //Ubicar la última posición del JUGADOR
            if(col=='PLAYER'){
                playerPosition["x"]=posX;
                playerPosition["y"]=posY;
                console.log({playerPosition});
            }

            //Ubicar posición del regalo (Clase 12)
            if (col=='I') {
                regaloPosition["x"]=posX;
                regaloPosition["y"]=posY;
                console.log({regaloPosition});
            }
            

        });
    });
};

function renderizarJugador(x,y) {    
    game.fillText(emojis['PLAYER'],x,y);
}

function cambiarNivel(){
    nivel=nivel+1;
}

function ganador() {
    
    console.log("Ganó");
    clearGame();
    cambiarNivel();
    reStartGame();
    renderizarJugador(playerPosition["x"],playerPosition["y"]);
}

/*Clase 10: Crear f paara borrar lo renderizado*/

function clearGame() {
    game.reset();   
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
    clearGame();
    reStartGame();

//Agregar condicional para evitar que jugador se salga del mapa

    // Clase 12: Agregar condicional para determinar si el jugador ha alcanzado el regalo

    if(playerPosition["y"]>(elementSize+1)){    //agrega 1 para evitar error por decimales
        playerPosition["y"]=playerPosition["y"]-elementSize;
    } 
    renderizarJugador(playerPosition["x"],playerPosition["y"]);
    console.log(playerPosition);

    const intPlayerPosX = parseInt(playerPosition["x"].toFixed());
    const intPlayerPosY = parseInt(playerPosition["y"].toFixed());
    const intRegaloPosX = parseInt(regaloPosition["x"].toFixed());
    const intRegaloPosY = parseInt(regaloPosition["y"].toFixed());

    if (intPlayerPosX == intRegaloPosX && intPlayerPosY == intRegaloPosY){
        console.log(intPlayerPosY);
        console.log(intRegaloPosY);
        ganador();
    } 
}



function moveLeft(){
    console.log("Movement_Left");
    clearGame();
    reStartGame();

//Agregar condicional para evitar que jugador se salga del mapa

    if(playerPosition["x"]>1){          //Se establece 1 para evitar error por decimales
        playerPosition["x"]=playerPosition["x"]-elementSize;
    }

    renderizarJugador(playerPosition["x"],playerPosition["y"]);
    console.log(playerPosition);

    const intPlayerPosX = parseInt(playerPosition["x"].toFixed());
    const intPlayerPosY = parseInt(playerPosition["y"].toFixed());
    const intRegaloPosX = parseInt(regaloPosition["x"].toFixed());
    const intRegaloPosY = parseInt(regaloPosition["y"].toFixed());

    if (intPlayerPosX == intRegaloPosX && intPlayerPosY == intRegaloPosY){
        console.log(intPlayerPosY);
        console.log(intRegaloPosY);
        ganador();
    } 
}

function moveRight(){
    console.log("Movement_Right");
    clearGame();
    reStartGame();

//Agregar condicional para evitar que jugador se salga del mapa

    if(playerPosition["x"]<((canvaSize-elementSize)-1)){      //Se resta 1 para evitar error por decimales
        playerPosition["x"]=playerPosition["x"]+elementSize;
    }

    renderizarJugador(playerPosition["x"],playerPosition["y"]);
    console.log(playerPosition);

    const intPlayerPosX = parseInt(playerPosition["x"].toFixed());
    const intPlayerPosY = parseInt(playerPosition["y"].toFixed());
    const intRegaloPosX = parseInt(regaloPosition["x"].toFixed());
    const intRegaloPosY = parseInt(regaloPosition["y"].toFixed());

    if (intPlayerPosX == intRegaloPosX && intPlayerPosY == intRegaloPosY){
        console.log(intPlayerPosY);
        console.log(intRegaloPosY);
        ganador();
    } 

} 

function moveDown(){
    console.log("Movement_Down");

    clearGame();
    reStartGame();

//Agregar condicional para evitar que jugador se salga del mapa
    
    if(playerPosition["y"]<(canvaSize)){
        playerPosition["y"]=playerPosition["y"]+elementSize;
    } 

    renderizarJugador(playerPosition["x"],playerPosition["y"]);
    console.log(playerPosition);

    const intPlayerPosX = parseInt(playerPosition["x"].toFixed());
    const intPlayerPosY = parseInt(playerPosition["y"].toFixed());
    const intRegaloPosX = parseInt(regaloPosition["x"].toFixed());
    const intRegaloPosY = parseInt(regaloPosition["y"].toFixed());

    if (intPlayerPosX == intRegaloPosX && intPlayerPosY == intRegaloPosY){
        console.log(intPlayerPosY);
        console.log(intRegaloPosY);
        ganador();
    } 
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

const regaloPosition = {
    x:undefined,
    y:undefined
}
