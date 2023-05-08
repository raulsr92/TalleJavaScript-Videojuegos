/* 1° Capturar al elemento canvas de html*/

const canvas = document.querySelector("#game");
console.log(canvas);

/* 2° Crear el contexto de Canvas */

const game = canvas.getContext("2d");

/*3°Crear evento y función que va a contener las propiedades y métodos del contexto 2D */

window.addEventListener("load", startGame);


function startGame(){

}