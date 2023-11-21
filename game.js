/* VARIABLES */

/* 1° Capturar al elemento canvas de html*/

const canvas = document.querySelector("#game");
console.log(canvas);

/* 2° Crear el contexto de Canvas */

const game = canvas.getContext("2d");
console.log(game);

let canvaSize;
let elementSize;
let nivel = 0;
let lives = 3;
let timeStart;

let temporizador;

let timeMiliseconds;
let timeSeconds;


/*Clase 8: Crear evento que escuche botones de dirección*/

let btnUp, btnDown, btnRight, btnLeft;
let btnUp2, btnDown2, btnRight2, btnLeft2;

btnUp=document.querySelector(".btn--up");
btnUp2=document.querySelector("#up-cel");

btnLeft=document.querySelector(".btn--left");
btnLeft2=document.querySelector("#left-cel");

btnRight=document.querySelector(".btn--right");
btnRight2=document.querySelector("#right-cel");

btnDown=document.querySelector(".btn--down");
btnDown2=document.querySelector("#down-cel");

/*Clase 15: Contador de vidas */

const lifes = document.querySelector(".life--counter");
const recordDisplay = document.querySelector(".record--display");
const gameOver = document.querySelector(".game--over--message")

/*Clase 17: Sistema de tiempo y puntajes*/

const timer = document.querySelector(".time--counter");


/* EVENTOS */

/*3°Crear evento y función que va a contener las propiedades y métodos del contexto 2D */

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

/*Clase 8: Crear evento que escuche TECLAS de dirección*/

window.addEventListener("keydown", moveByKeys);

window.addEventListener("touchstart", moveByTouch);


/* FUNCIONES */

function setCanvasSize(){
    // Clase N° 03
    //Establecer el tamaño de un elemento del canvas(10x10)

    if(window.innerHeight > window.innerWidth){
        canvaSize = Math.trunc(window.innerWidth *0.8);
    } else{
        canvaSize= Math.trunc(window.innerHeight * 0.8);
    }

    canvas.setAttribute("height", canvaSize);
    canvas.setAttribute("width", canvaSize);

    console.log(window.innerHeight);
    console.log(window.innerWidth);
    console.log(canvas.height);
    console.log(canvas.width);

    //Establecer el tamaño de un elemento del canvas(10x10)

    elementSize=(canvaSize/10).toFixed(1);
    elementSize=parseFloat(elementSize);
    console.log(elementSize);
    welcome();
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

    //Contador_de_vidas

    lifesCounter(lives);

    //Mostrar nivel

    showLevel()

    //Clase N°17: Establecer tiempo inicial

    if (!timeStart) { //validación de que no exista timeStart
        timeStart = Date.now();
        showTime();
    }

    //Clase N° 18: Mostrar record

    recordDisplay.innerHTML= localStorage.getItem("record")

    //Detener cambio de colores al pasar de nivel

    clearInterval(colorFestival);
    colorFestival=undefined;
    canvas.className="color1";
    
    //Detener cambio de colores al perder vida

    clearInterval(loseFestival);
    loseFestival=undefined;
       
    // Uso de método de arrays: arrays.forEach()

    mapRowsCols.forEach((row, rowIndex) => {
        row.forEach((col, colIndex) => {
            console.log({row, rowIndex, col, colIndex});
            let posX = elementSize*colIndex;
            let posY = elementSize*(rowIndex+1);
            posX = posX.toFixed(1);
            posX = parseFloat(posX);
            posY = posY.toFixed(1);
            posY = parseFloat(posY);
            console.log({posX,posY});
            game.fillText(emojis[col],posX, posY)  //Renderizado del mapa del juego
            //Ubicar posición inicial del JUGADOR
            if (!colorFestival) {
                if(col=='O'){
                    playerPosition["x"]=posX;
                    playerPosition["y"]=posY;
                    console.log({playerPosition});
                }
            }

            //Ubicar posición del regalo (Clase 12)
            if (col=='I') {
                regaloPosition["x"]=posX;
                regaloPosition["y"]=posY;
                console.log({regaloPosition});
            }
            //Ubicar posición de las bombas (Clase 13)
            if (col=='X') {
                const repetition = obstaculosPosition.find(element => element.x==posX && element.y==posY);
                console.log(repetition);
                if(!repetition){
                    obstaculosPosition.push({x:posX, y:posY})
                }
            };

            // Eliminar del array de colisiones las bombas cuando se cambia de mapa

            if(col=='-' || col=='I'|| col=='O'){
                obstaculosPosition.forEach(element => 
                    {
                        if(element.x==posX && element.y==posY){
                            obstaculosPosition.splice(obstaculosPosition.indexOf(element),1);
                        }                  
                    }                    
                    );
            }  
        });
    });

    /*Clase 9: Renderizar al jugador*/
    console.log(playerPosition);  
    renderizarJugador(playerPosition["x"],playerPosition["y"])

    /*Clase 15: Renderizar al fuego*/

    firePosition.forEach( fire => game.fillText(emojis['BOMB_COLLISION'],fire.x,fire.y))

};

function reStartGame(){

    //Mostrar nivel

    showLevel()

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
            let posX = elementSize*colIndex;
            let posY = elementSize*(rowIndex+1);
            posX = posX.toFixed(1);
            posX = parseFloat(posX);
            posY = posY.toFixed(1);
            posY = parseFloat(posY);
            console.log({posX,posY});

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
            
            //Ubicar posición de las bombas (Clase 13)

            if (col=='X') {
                const repetition = obstaculosPosition.find(element => Math.trunc(element.x)==Math.trunc(posX) && Math.trunc(element.y)==Math.trunc(posY));
                console.log(repetition);

                if(!repetition){
                    obstaculosPosition.push({x:posX, y:posY})
                }
            };

            // Eliminar del array de colisiones las bombas cuando se cambia de mapa

            if(col=='-' || col=='I'|| col=='O'){
                obstaculosPosition.forEach(element => 
                    {
                        if(element.x==posX && element.y==posY){
                            obstaculosPosition.splice(obstaculosPosition.indexOf(element),1);
                        }                  
                    }                    
                    );
            }       
        });
    });

    renderizarJugador(playerPosition["x"],playerPosition["y"])
    /*Clase 15: Renderizar al fuego*/

    firePosition.forEach( fire => game.fillText(emojis['BOMB_COLLISION'],fire.x,fire.y))
};

function renderizarJugador(x,y) {  
    // Clase 12: Agregar condicional para determinar si el jugador ha alcanzado el regalo

    game.fillText(emojis['PLAYER'],x,y);

    const intPlayerPosX = playerPosition["x"];
    const intPlayerPosY = playerPosition["y"];
    const intRegaloPosX = regaloPosition["x"];
    const intRegaloPosY = regaloPosition["y"];

    if (intPlayerPosX == intRegaloPosX && intPlayerPosY == intRegaloPosY){
        console.log(intPlayerPosY);
        console.log(intRegaloPosY);
        ganador();        
    } 
    
    // Clase 13: determinar colisiones (bombas)
    
    obstaculosPosition.forEach( element => {
        const obstacleColisionX =  Math.trunc(playerPosition["x"]) == Math.trunc(element.x);
        const obstacleColisionY =  Math.trunc(playerPosition["y"]) == Math.trunc(element.y);
        const obstacleColision = obstacleColisionX && obstacleColisionY;

        if(obstacleColision){
            console.log("Explosión")

            // Agregar objetos (posiciones de fuego) al array firePosition

            firePosition.push({x:element.x,y:element.y})

            perdedor();
            
        }
    });

    
}

function renderizarFire(x,y) {
    game.fillText(emojis['BOMB_COLLISION'],x,y)
}

function cambiarNivel(){
    nivel=nivel+1;

}

function ganador() {
    
    cambiarNivel();
    firePosition=[];
    

    if (nivel<maps.length) {
        console.log("Ganó");
        console.log(nivel);

        changeColor();

        setTimeout(reiniciar,2000)
        /*startGame(); */
    } else{
        clearInterval(temporizador);
        console.log("Ha superado todos los niveles!!!")
        nivel=0;
        lives=3;
        firePosition=[];
        /* Aquí va LOCALSTORAGE*/
        setRecord();
    }
}

function perdedor() {
    lives=lives-1; //quita 1 vida
    
    if(lives==0){
        console.log("Perdió el juego!, vuelve a nivel inicial");
        nivel=0;
        lives=3;
        firePosition=[];
        defeatCard.classList.remove("inactive");
    } else{
        console.log("Perdió!, repite nivel");
        console.log(playerPosition);

        losingAnimation()

        setTimeout(reiniciar,2000)
    }
}

function tiempoTrasncurrido() {

    timeMiliseconds =Date.now() - timeStart;
    timeSeconds =(timeMiliseconds /1000).toFixed(2);
    timer.innerHTML = timeSeconds ;
}

function showTime() {

    temporizador = setInterval(tiempoTrasncurrido, 10) ;

    /*timeFinal = Date.now()-timeStart;
    console.log(timeFinal);
    // Tranformar a milisegundos
    timeFinalSeconds = (timeFinal/1000).toFixed(2);
    console.log(timeFinalSeconds);
    //Imprimir_tiempo
    timer.innerHTML= (timeFinalSeconds);*/
}

function setRecord(){
    if (localStorage.getItem("record")==null) {
        localStorage.setItem("record", timeSeconds);
        victoryCard.classList.remove("inactive"); 
    } else{

        if (parseFloat(timeSeconds) < parseFloat(localStorage.getItem("record"))){
            localStorage.setItem("record", timeSeconds);
            newRecordCard.classList.remove("inactive");
            newRecordPlace.innerHTML = timeSeconds;
            /*alert("Su nuevo record es: "+ timeSeconds)*/
        } else{
            victoryCard.classList.remove("inactive"); 
        }
    }
}

/*Clase 10: Crear f para borrar lo renderizado*/

function clearGame() {
    game.reset();   
}

function moveUp(){
    console.log("Movement_Up");

    //Agregar condicional para evitar que jugador se salga del mapa

    if(playerPosition["y"]>(elementSize+1)){    //agrega 1 para evitar error por decimales
        playerPosition["y"]=playerPosition["y"]-elementSize;
        playerPosition["y"]=playerPosition["y"].toFixed(1);
        playerPosition["y"]=parseFloat(playerPosition["y"]);
    } 
    clearGame();
    reStartGame();
}

function moveLeft(){
    console.log("Movement_Left");

    //Agregar condicional para evitar que jugador se salga del mapa

    if(playerPosition["x"]>1){          //Se establece 1 para evitar error por decimales
        playerPosition["x"]=playerPosition["x"]-elementSize;
                playerPosition["x"]=playerPosition["x"].toFixed(1);
        playerPosition["x"]=parseFloat(playerPosition["x"]);
    }
    clearGame();
    reStartGame();
}

function moveRight(){
    console.log("Movement_Right");

//Agregar condicional para evitar que jugador se salga del mapa

    if(playerPosition["x"]<((canvaSize-elementSize)-1)){      //Se resta 1 para evitar error por decimales
        playerPosition["x"]=playerPosition["x"]+elementSize;
        playerPosition["x"]=playerPosition["x"].toFixed(1);
        playerPosition["x"]=parseFloat(playerPosition["x"]);
    }
    clearGame();
    reStartGame();
} 

function moveDown(){
    console.log("Movement_Down");

//Agregar condicional para evitar que jugador se salga del mapa
    
    if(playerPosition["y"]<canvaSize){
        playerPosition["y"]=playerPosition["y"]+elementSize;
        playerPosition["y"]=playerPosition["y"].toFixed(1);
        playerPosition["y"]=parseFloat(playerPosition["y"]);

    } 
    clearGame();
    reStartGame();
}

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

function moveByTouch(event) {
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

function lifesCounter(vidas){   
    switch (vidas) {
        case 3:
            lifes.innerHTML=emojis['L'] +" "+ emojis['L']+" "+ emojis['L'];
            break;

        case 2:
            lifes.innerHTML=emojis['L'] +" "+ emojis['L'];
            break;
    
        case 1:
            lifes.innerHTML=emojis['L'] ;
            break;   

        case 0:
            lifes.innerHTML="";
            break;   
    }
}


/* OBJETOS Y ARRAYS */

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

/*Clase 13: Array con objetos */

const obstaculosPosition=[];

/*Clase 15: Objeto firePosition */

let firePosition= [];




/*Clase 18: Mejora: TARJETA DE ALERT PARA NUEVO RECORD*/

const newRecordCard =document.querySelector(".message--record");
const newRecordPlace =document.querySelector(".new--record");
const playAgainButton1 =document.querySelector("#record-play-again");

playAgainButton1.addEventListener("click", playAgain);

function playAgain() {
    newRecordCard.classList.add("inactive");
    timeStart=null;
    firePosition=[];
    clearGame(); //limpia mapa
    startGame(); //renderiza mapa donde jugador está donde está la puerta.Aquí se dibujan los corazones
}

/*Clase 18: Mejora: TARJETA DE VICTORIA SIN RÉCORD*/

const victoryCard =document.querySelector(".win-without-record");
const playAgainButton2 =document.querySelector("#record-play-again2");
playAgainButton2.addEventListener("click", playAgain2);

function playAgain2() {
    victoryCard.classList.add("inactive");
    timeStart=null;
    firePosition=[];
    clearGame(); //limpia mapa
    startGame(); //renderiza mapa donde jugador está donde está la puerta.Aquí se dibujan los corazones
}

/*Clase 18: Mejora: TARJETA DE JUEGO PERDIDO*/

const defeatCard =document.querySelector(".message--defeat");
const playAgainButton3 =document.querySelector("#record-play-again3");

playAgainButton3.addEventListener("click", playAgain3);

function playAgain3() {
    defeatCard.classList.add("inactive");
    timeStart=null;
    firePosition=[];
    clearGame(); //limpia mapa
    startGame(); //renderiza mapa donde jugador está donde está la puerta.Aquí se dibujan los corazones
}

/*Clase 19: Mejora: MENSAJE_INICIO*/

const welcomeCard =document.querySelector(".welcome--message");
const initialGame =document.querySelector("#initial-play");

function welcome() {
    welcomeCard.classList.remove("inactive");  
}

initialGame.addEventListener("click", initial);

function initial() {

    const defeatScreenIsClosed= defeatCard.classList.contains("inactive")
    if(!defeatScreenIsClosed){
        defeatCard.classList.add("inactive");
    }

    const victorryScreenIsClosed= victoryCard.classList.contains("inactive")
    if(!victorryScreenIsClosed){
        defeatCard.classList.add("inactive");
    }

    welcomeCard.classList.toggle("inactive");
    timeStart=null;
    startGame();
}

/*Clase 23: Reto-1*/

let colorFestival;

const levelShow =document.querySelector(".level--show");


function showLevel() {
    levelShow.innerHTML="Nivel"+ " " +(nivel+1);
}

function oscilar() {
    console.log(canvas);
    switch (canvas.className) {
        case "color1":
            canvas.className="color2"
            break;
    
        case "color2":
            canvas.className="color3"
            break;

        case "color3":
            canvas.className="color4"
            break;

        case "color4":
            canvas.className="color5"
            break;

        case "color5":
            canvas.className="color6"
            break; 

         case "color6":
            canvas.className="color1"
            break;                  
    }
}

function changeColor() {
    colorFestival= setInterval(oscilar,100);
}

function reiniciar() {
    clearGame(); //limpia mapa
    startGame(); //renderiza mapa donde jugador está donde está la puerta.Aquí se dibujan los corazones*/
}


/*Clase 23: Reto-2*/

let loseFestival;

function losingAnimation() {
    loseFestival= setInterval(oscilar2,100);
}

function oscilar2() {
    console.log(canvas);
    switch (canvas.className) {
        case "color1":
            canvas.className="color7"
            break;
    
        case "color7":
            canvas.className="color8"
            break;  

        case "color8":
            canvas.className="color9"
               break;  
               
        case "color9":
            canvas.className="color7"
             break;   
            
    }
}


/* OM N° 4*/

let returnToMainMenu = document.querySelector("#menu-button");

returnToMainMenu.addEventListener("click",welcomeAfterLose)

function welcomeAfterLose() {
    const defeatScreenIsClosed= defeatCard.classList.contains("inactive");

    if(!defeatScreenIsClosed){
        defeatCard.classList.add("inactive");
    }

    welcomeCard.classList.toggle("inactive");  
}

/* OM N° 5*/

let returnToMainMenu2 = document.querySelector("#menu-button2");

returnToMainMenu2.addEventListener("click",welcomeAfterWinWithoutRecord)

function welcomeAfterWinWithoutRecord() {
    const victorryScreenIsClosed= victoryCard.classList.contains("inactive")

    if(!victorryScreenIsClosed){
        defeatCard.classList.add("inactive");
    }

    welcomeCard.classList.toggle("inactive");  
}