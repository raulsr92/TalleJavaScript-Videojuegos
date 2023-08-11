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


/*let timeFinal;

let timeFinalSeconds;*/

/*3°Crear evento y función que va a contener las propiedades y métodos del contexto 2D */

window.addEventListener("load", setCanvasSize);
window.addEventListener("resize", setCanvasSize);


function setCanvasSize(){
    // Clase N° 03
    //Establecer el tamaño de un elemento del canvas(10x10)

    if(window.innerHeight > window.innerWidth){
        canvaSize = window.innerWidth *0.8;
    } else{
        canvaSize= window.innerHeight * 0.9
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

    //Contador_de_vidas

    lifesCounter(lives);

    //Clase N°17: Establecer tiempo inicial

    if (!timeStart) { //validación de que no exista timeStart

        timeStart = Date.now();
        showTime();

    }

       
    // Uso de método de arrays: arrays.forEach()

    mapRowsCols.forEach((row, rowIndex) => {
        row.forEach((col, colIndex) => {
            console.log({row, rowIndex, col, colIndex});
            const posX = Math.trunc(elementSize)*colIndex;
            const posY = Math.trunc(elementSize)*(rowIndex+1);
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
                        if(element.x==Math.trunc(posX) && element.y==Math.trunc(posY)){
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
            const posX = Math.trunc(elementSize)*colIndex;
            const posY = Math.trunc(elementSize)*(rowIndex+1);
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
                        if(element.x==Math.trunc(posX) && element.y==Math.trunc(posY)){
                            obstaculosPosition.splice(obstaculosPosition.indexOf(element),1);
                        }                  
                    }                    
                    );
            }            
        });
    });

        /*Clase 15: Renderizar al fuego*/

        firePosition.forEach( fire => game.fillText(emojis['BOMB_COLLISION'],fire.x,fire.y))
};

function renderizarJugador(x,y) {  
    

    // Clase 13: determinar colisiones (bombas)
    

    game.fillText(emojis['PLAYER'],x,y);

    obstaculosPosition.forEach( element => {
        const obstacleColisionX =  Math.trunc(playerPosition["x"]) == Math.trunc(element.x);
        const obstacleColisionY =  Math.trunc(playerPosition["y"]) == Math.trunc(element.y);
        const obstacleColision = obstacleColisionX && obstacleColisionY;

        if(obstacleColision){
            console.log("Explosión")

            // Agregar objetos (posiciones de fuego) al array firePosition

            firePosition.push({x:Math.trunc(element.x),y:Math.trunc(element.y)})

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
    } else{
        console.log("Ha superado todos los niveles!!!")
        winner.classList.remove("inactive")
        nivel=0;
        lives=3;
        firePosition=[];

        clearInterval(temporizador);
    }

    clearGame();
    startGame();

}


function perdedor() {
    lives=lives-1; //quita 1 vida
    
    if(lives==0){
        console.log("Perdió el juego!, vuelve a nivel inicial");
        nivel=0;
        lives=3;
        firePosition=[];

        timeStart=null;

        gameOver.classList.remove("inactive");
    } else{
        console.log("Perdió!, repite nivel");
        console.log(playerPosition);
    }

    clearGame(); //limpia mapa
    startGame(); //renderiza mapa donde jugador está donde está la puerta.Aquí se dibujan los corazones
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

    if(Math.trunc(playerPosition["y"])>Math.trunc((elementSize+1))){    //agrega 1 para evitar error por decimales
        playerPosition["y"]=playerPosition["y"]-Math.trunc(elementSize);
    } 

    const intPlayerPosX = Math.trunc(parseInt(playerPosition["x"]));
    const intPlayerPosY = Math.trunc(parseInt(playerPosition["y"]));
    const intRegaloPosX = Math.trunc(parseInt(regaloPosition["x"]));
    const intRegaloPosY = Math.trunc(parseInt(regaloPosition["y"]));

    if (intPlayerPosX == intRegaloPosX && intPlayerPosY == intRegaloPosY){
        console.log(intPlayerPosY);
        console.log(intRegaloPosY);
        ganador();
    } 


    renderizarJugador(playerPosition["x"],playerPosition["y"]);
    console.log(playerPosition);
}

function moveLeft(){
    console.log("Movement_Left");
    clearGame();
    reStartGame();

//Agregar condicional para evitar que jugador se salga del mapa

    if(Math.trunc(playerPosition["x"])>1){          //Se establece 1 para evitar error por decimales
        playerPosition["x"]=playerPosition["x"]-Math.trunc(elementSize);
    }

    const intPlayerPosX = Math.trunc(parseInt(playerPosition["x"]));
    const intPlayerPosY = Math.trunc(parseInt(playerPosition["y"]));
    const intRegaloPosX = Math.trunc(parseInt(regaloPosition["x"]));
    const intRegaloPosY = Math.trunc(parseInt(regaloPosition["y"]));

    if (intPlayerPosX == intRegaloPosX && intPlayerPosY == intRegaloPosY){
        console.log(intPlayerPosY);
        console.log(intRegaloPosY);
        ganador();
    } 


    renderizarJugador(playerPosition["x"],playerPosition["y"]);
    console.log(playerPosition);
    
}

function moveRight(){
    console.log("Movement_Right");
    clearGame();
    reStartGame();

//Agregar condicional para evitar que jugador se salga del mapa

    if(Math.trunc(playerPosition["x"])<Math.trunc(((canvaSize-elementSize)-1))){      //Se resta 1 para evitar error por decimales
        playerPosition["x"]=playerPosition["x"]+Math.trunc(elementSize);
    }

    const intPlayerPosX = Math.trunc(parseInt(playerPosition["x"]));
    const intPlayerPosY = Math.trunc(parseInt(playerPosition["y"]));
    const intRegaloPosX = Math.trunc(parseInt(regaloPosition["x"]));
    const intRegaloPosY = Math.trunc(parseInt(regaloPosition["y"]));

    if (intPlayerPosX == intRegaloPosX && intPlayerPosY == intRegaloPosY){
        console.log(intPlayerPosY);
        console.log(intRegaloPosY);
        ganador();
    } 


    renderizarJugador(playerPosition["x"],playerPosition["y"]);
    console.log(playerPosition);
} 

function moveDown(){
    console.log("Movement_Down");

    clearGame();
    reStartGame();

//Agregar condicional para evitar que jugador se salga del mapa
    
    if(Math.trunc(playerPosition["y"])<(Math.trunc(canvaSize))){
        playerPosition["y"]=playerPosition["y"]+Math.trunc(elementSize);
    } 

    const intPlayerPosX = Math.trunc(parseInt(playerPosition["x"]));
    const intPlayerPosY = Math.trunc(parseInt(playerPosition["y"]));
    const intRegaloPosX = Math.trunc(parseInt(regaloPosition["x"]));
    const intRegaloPosY = Math.trunc(parseInt(regaloPosition["y"]));

    if (intPlayerPosX == intRegaloPosX && intPlayerPosY == intRegaloPosY){
        console.log(intPlayerPosY);
        console.log(intRegaloPosY);
        ganador();
    } 


    renderizarJugador(playerPosition["x"],playerPosition["y"]);
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

const regaloPosition = {
    x:undefined,
    y:undefined
}

/*Clase 13: Array con objetos */

const obstaculosPosition=[];

/*Clase 15: Contador de vidas */

const lifes = document.querySelector(".life--counter");
const gameOver = document.querySelector(".game--over--message")
const winner = document.querySelector(".winner--message")

/*Clase 17: Sistema de tiempo y puntajes*/

const timer = document.querySelector(".time--counter");

console.log(lifes);

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

/*Clase 15: Objeto firePosition */

let firePosition= [];

