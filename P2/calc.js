console.log("Lanzamos la calculadora....");

// Leyemos las variables del index.html
display = document.getElementById("display")
boton = document.getElementsByClassName("digito")
operaciones = document.getElementsByClassName("operacion")
reset = document.getElementById("reset")
resultado = document.getElementById("resultado")
borrar = document.getElementById("del")
raiz = document.getElementById("raizcuadrada")

// Vamos a leer en primer lugar los digitos 
for (i=0; i<boton.length; i++){ // Comparamaos las longitudes para que vaya leyendo los diferentes digitos
boton[i].onclick = (ev) => {
console.log("Digito: " + ev.target.value)
recibido(ev.target.value); // Mostramos el valor en el display
}
}
// Vamos a leer en segundo lugar las operaciones 
for (i=0; i<operaciones.length; i++) {
operaciones[i].onclick = (ev) => {
console.log(" Operando: " + ev.target.value)
operadores(ev.target.value);
}    
}

const ESTADO = {
    INIT: 0,
    OP1: 1,
    OPERATION: 2,
    OP2: 3,
}

// ESTADO INICIAL DE LA CALCULADORA
let estado = ESTADO.INIT;

function recibido(boton){ //Funcion de los digitos
    if (estado == ESTADO.INIT) { // Si es el primer digito 
        display.innerHTML = boton; // Lo ponemos directamente en el display
        estado = ESTADO.OP1; // Pasamos al siguiente estad
    }else if (estado == ESTADO.OP1) { // Si el estado es OP1
        display.innerHTML += boton;  // Sumamos el digito al display para poder generasr numero mayores a 1 decima
    }else if (estado == ESTADO.OPERATION) { // Si detectamos el estado operacion , añadimos el digito despues del operador
        display.innerHTML += boton;
        estado = ESTADO.OP2;
    }else if (estado == ESTADO.OP2) { // Nos permite añadir un numero mas grande como segundo operando
        display.innerHTML += boton;
    }
}


function operadores(operaciones) { //Funcion de las operaciones
    if (estado == ESTADO.OP1) { // Si estamos en el estado OP1, ponemos el operando.
        display.innerHTML += operaciones;
        estado = ESTADO.OPERATION; // Pasamos a estado de operacion
        console.log("Detectamos operador");
    }else if(estado == ESTADO.OP2){ // Si se pulsa un segundo operador imprimimos el mensaje por pantalla
        console.log("No se pueden realizar dos operaciones a la vez."); 
    }
}









resultado.onclick = () => {
console.log("Imprime resultado");
if (estado == ESTADO.OP2) {
    display.innerHTML = eval(display.innerHTML);
    estado = ESTADO.OP1;
}

}
// Cuando se pulse el boton AC el valor del display volverá a 0
reset.onclick = () => {
    console.log("AC");
    display.innerHTML = 0; // Imprimimos por el display el valor 0
}
// Detectamos el click del borrar
borrar.onclick = () => {
    console.log("Borrando");
    display.innerHTML = display.innerHTML.slice(0, -1); // Borramos de display el ultimo dijito introducido.
}

raiz.onclick = () => { // Detectamos el click en la raiz
    console.log("raiz");
    display.innerHTML = Math.sqrt(display.innerHTML); // Realizamos la raiz del numero que se encuentra en el display
}