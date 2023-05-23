/* 1° Capturar al elemento canvas de html*/

const canvas = document.querySelector("#game");
console.log(canvas);

/* 2° Crear el contexto de Canvas */

const game = canvas.getContext("2d");
console.log(game);


/*3°Crear evento y función que va a contener las propiedades y métodos del contexto 2D */

window.addEventListener("load", startGame);


function startGame(){

    let canvaSize;

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

    /*
    game.fillRect(5, 5, 100, 100);
    console.log(game);
    game.clearRect(5, 5, 50, 50);
    game.clearRect(55, 55, 50, 50);
    game.font="20px Verdana";
    game.fillStyle = "Green";
    game.textAlign = "right";
    game.fillText("Raúl", 50, 35);*/

    


};
