/* Clase 23: Reto-5*/

/* Interacción N° 01 - Almacenar nuevo récord de jugador y su nickname como un objeto*/

const nicknamePlayer = document.querySelector(".nickname--input");
console.log(nicknamePlayer);

const aceptarButton = document.querySelector(".type2");
console.log(aceptarButton);

const registerCard =  document.querySelector(".register--card");

aceptarButton.addEventListener("click", almacenarRecord);

let records = [];

function almacenarRecord() {
    if (nicknamePlayer.value == "") {
        alert("Ingrese un nickname")
    } else if(localStorage.getItem("array")==null){
        records.push(
            {
                nickname: nicknamePlayer.value,
                record: localStorage.getItem("record"),
            }
        );  
        localStorage.setItem("array",JSON.stringify(records));
        registerCard.classList.add("inactive");
        location.reload();

    } else if(localStorage.getItem("array")){

        let arrayLength = JSON.parse(localStorage.getItem("array")).length;
        console.log(arrayLength);

        for (let i = 0; i < arrayLength; i++) {
            records.push(JSON.parse(localStorage.getItem("array"))[i]);
        }
        records.push(
            { 
                nickname: nicknamePlayer.value,
                record: localStorage.getItem("record"),
            }
        );  
        localStorage.setItem("array",JSON.stringify(records));
        registerCard.classList.add("inactive");
    }
    generatePlayer(records);
}

/* Interacción N° 02 - Que el NICKNAME almacenado  en array records se muestre en la pantalla.*/

function generatePlayer(array){
    array.forEach((player) => {
        const articlePlayer = document.createElement("article");
        articlePlayer.setAttribute("class", "player--record");
        const divPlayersContainer = document.querySelector(".players--container");
        divPlayersContainer.append(articlePlayer);

        const divPlayer = document.createElement("div");
        divPlayer.setAttribute("class","player--record__name");
        articlePlayer.append(divPlayer);

        const divTime = document.createElement("div");
        divTime.setAttribute("class","player--record__time");
        articlePlayer.append(divTime);

        const numberOfRecord = document.createElement("span");
        numberOfRecord.setAttribute("class", "player--record__number");
        divPlayer.append(numberOfRecord);
        numberOfRecord.innerHTML=array.indexOf(player)+1;

        const signaturePlayer= document.createElement("p");
        signaturePlayer.setAttribute("class","player--record__signature");
        divPlayer.append(signaturePlayer);
        signaturePlayer.innerHTML=player.nickname;

        const timePlayer = document.createElement("p");
        timePlayer.setAttribute("class", "player--record__record");
        divTime.append(timePlayer);
        timePlayer.innerHTML = player.record;

        const iconTimer = document.createElement("img");
        iconTimer.setAttribute("class", "player--record__icon");
        iconTimer.setAttribute("src", "./assets/chronometer.png");
        divTime.append(iconTimer);

        });
    console.log(array);

};

/* OM 2*/

/* Capturar el último array almacenado en localStorage */

let lastArrayInLS =JSON.parse(localStorage.getItem("array"));

/* Capturar el último record registrado en local Storage*/

let lastRecordInLocalStorage= parseFloat(localStorage.getItem("record"));
console.log(lastRecordInLocalStorage);

if ((localStorage.getItem("record")!=null)&&(parseFloat(lastArrayInLS[(lastArrayInLS.length)-1].record)!=lastRecordInLocalStorage)) {
    registerCard.classList.remove("inactive");

} else if(lastArrayInLS==null){
    registerCard.classList.add("inactive");
}

else if (lastRecordInLocalStorage=="") {
    registerCard.classList.add("inactive");

} else if ((parseFloat(lastArrayInLS[(lastArrayInLS.length)-1].record))==lastRecordInLocalStorage){
    registerCard.classList.add("inactive");


    let arrayLength = JSON.parse(localStorage.getItem("array")).length;
    console.log(arrayLength);

    for (let i = 0; i < arrayLength; i++) {
        records.push(JSON.parse(localStorage.getItem("array"))[i]);
    }

    generatePlayer(records);
} 


/*RETO 6 */

/* Interacción N° 1*/

let restartButton = document.querySelector("#deleteRecords");
console.log(restartButton);

let warningCard = document.querySelector("#warning-type")

restartButton.addEventListener("click", showWarning);

function showWarning(){
    warningCard.classList.remove("inactive");
}

/* Interacción N° 2*/

let aceptarButton2 = document.querySelector("#warning-button");

aceptarButton2.addEventListener("click", deleteLocalStorage);

function deleteLocalStorage() {
    warningCard.classList.add("inactive");

    localStorage.clear();   
    records = [];
    lastArrayInLS=[];

    location.reload();

    generatePlayer(records);

}

/* OM N° 3*/

let declineButton = document.querySelector("#warning-button-no");

declineButton.addEventListener("click",noDelete)

function noDelete() {
    warningCard.classList.add("inactive");

}
