/* Clase 23: Reto-5*/

/* Interacción N° 01 - Almacenar nuevo récord de jugador y su nickname como un objeto*/

const nicknamePlayer = document.querySelector(".nickname--input");
console.log(nicknamePlayer);

const aceptarButton = document.querySelector(".type2");
console.log(aceptarButton);

const registerCard =  document.querySelector(".register--card");

aceptarButton.addEventListener("click", almacenarRecord);

const records = [];

function almacenarRecord() {


    if (nicknamePlayer.value == "") {
        alert("Ingrese un nickname")
    }else{
        records.push(
            {
                nickname: nicknamePlayer.value,
                record: localStorage.getItem("record"),
            }
        );  
        registerCard.classList.add("inactive");
    }

}

