/* 1° Capturar al elemento canvas de html*/

const canvas = document.querySelector("#game");
console.log(canvas);

/*Clase 16: Sistema de vidas y corazones */

const lifes = document.querySelector(".life--counter");

/*Clase 17: Sistema de tiempo y puntajes*/

const timer = document.querySelector(".time--counter");


/*Clase 19: Guardando records del jugador*/

const record = document.querySelector(".record--display");


/* 2° Crear el contexto de Canvas */

const game = canvas.getContext("2d");
console.log(game);

let canvaSize;
let elementSize;
let level = 0;
let lives = 3;
let timeStart;

let timePlayer;
let timeInterval;

/*3°Crear evento y función que va a contener las propiedades y métodos del contexto 2D */

window.addEventListener("load", setCanvasSize);
window.addEventListener("resize", setCanvasSize);


function setCanvasSize(){
    // Clase N° 03
    //Establecer el tamaño de un elemento del canvas(10x10)
    if(window.innerHeight > window.innerWidth){
        canvaSize = window.innerWidth *0.8;
    } else{
        canvaSize= window.innerHeight * 0.9;
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
    
    playerPosition["x"]=undefined;
    playerPosition["y"]=undefined;
    startGame();
}


function startGame(){

    game.font = elementSize + "px Verdana";

//Dividir cada mapa en arrays bidimendionales
    const map = maps[level];

    if (!map) {
        gameWin();
        return;
    }

    showLives();

    //Clase N°17: Establecer tiempo inicial

    if (!timeStart) { //validación de que no exista timeStart
        timeStart = Date.now();
        timeInterval = setInterval(showTime,100)
    }

    showRecord();

    const mapRows = map.trim().split("\n");
    console.log(mapRows);
    const mapRowsClean= mapRows.map(value=>value.trim());
    console.log(mapRowsClean);

    const mapRowsCols=mapRowsClean.map(value=>value.split(""));
    console.log(mapRowsCols);

    //Limpiar canvas

    game.clearRect(0,0,canvaSize,canvaSize);

    //Limpiar array de obstáculos

    obstaculosPosition=[];

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
            } else if (col=='X'){      //Ubicar posición de las bombas (Clase 13)
                obstaculosPosition.push({
                    x:Math.trunc(posX), 
                    y:Math.trunc(posY)
                })
            }   
        });
    });
    
    /*Clase 9: Renderizar al jugador*/
    renderizarJugador(playerPosition["x"],playerPosition["y"])
};

function levelWin(){
    console.log("Subiste de nivel");
    level++;
    startGame();
}

function levelFail() {
    console.log("Chocaste contra una bomba");
    lives--;

    if (lives<=0) {
        level=0;
        lives=3;
        timeStart=null;

    } 

    playerPosition["x"]=undefined;
    playerPosition["y"]=undefined;
    startGame();        
}

function gameWin(){
    console.log("Terminaste el juego");
    clearInterval(timeInterval);

    const recordTime = localStorage.getItem("record_time");
    console.log(recordTime);
    const playerTime = Date.now()-timeStart;

    if (recordTime) {

        if (recordTime > playerTime) {
            localStorage.setItem("record_time",playerTime);
            console.log("Superaste el récord")

        } else{
            console.log("No superaste el récord")
        }
    } else{
        localStorage.setItem("record_time",playerTime);
    }

    console.log({recordTime,playerTime});
}


function showLives(){

    //Crear un array utilizando el constructor Array() e indicando su longitud
    const livesArrays = Array(lives);
    console.log(livesArrays.length);

    // Poblar el array con el valor del emoji de corazón
    livesArrays.fill(emojis['L']);
    console.log(livesArrays);

    //forma 1 
    /* 
    lifes.innerHTML=livesArrays.join(" ");  */

    //forma 2

    lifes.innerHTML=""; 
    livesArrays.forEach(heart => lifes.append(heart + " "));
    
}

function showTime() {
    timer.innerHTML = Date.now() - timeStart;
}

function showRecord() {
    record.innerHTML = localStorage.getItem("record_time");
}


function renderizarJugador(x,y) {
    game.fillText(emojis['PLAYER'],x,y);

    //CREAR UNA VARIABLE POR CADA DISTINTA COLISIÓN (en eje X e Y)

    const giftColisionX = Math.trunc(playerPosition["x"]) == Math.trunc(giftPosition["x"]);
    const giftColisionY = Math.trunc(playerPosition["y"]) == Math.trunc(giftPosition["y"]);
    const huboColisionConElRegalito = giftColisionX && giftColisionY;
    console.log(huboColisionConElRegalito);


    if (huboColisionConElRegalito) {
        console.log("Subiste de nivel")
        levelWin();
    }

    // Clase 13: determinar colisiones (bombas)

    const enemyCollision = obstaculosPosition.find(enemy => {
        const enemyColisionX = Math.trunc(enemy.x) == Math.trunc(playerPosition["x"]);
        console.log(enemyColisionX);
        const enemyColisionY = Math.trunc(enemy.y) == Math.trunc(playerPosition["y"]);
        console.log(enemyColisionY);

        return enemyColisionX && enemyColisionY;
    });

    console.log(enemyCollision);

    if (enemyCollision) {
        levelFail();
    }
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

/*Clase 13: Array con objetos */

let obstaculosPosition=[];
