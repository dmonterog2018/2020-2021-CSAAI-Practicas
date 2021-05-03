console.log("Lanzamos la calculadora....");

// Leyemos las variables del index.html
display = document.getElementById("display")
boton = document.getElementsByClassName("digito")
operaciones = document.getElementsByClassName("operacion")
reset = document.getElementById("reset")
resultado = document.getElementById("resultado")
borrar = document.getElementById("del")
raiz = document.getElementById("raizcuadrada")
sumatorio = document.getElementById("ans")

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
resul = 0;
if (estado == ESTADO.OP2) {
    display.innerHTML = eval(display.innerHTML);
    estado = ESTADO.OP1;
    resul = display.innerHTML; // Guardamos el rsultado del display el una variable y volvemos al OP1
}
}
// Cuando se pulse el boton AC el valor del display volverá a 0
reset.onclick = () => {
    console.log("AC");
    display.innerHTML = 0; // Imprimimos por el display el valor 0
    estado = ESTADO.OP1; // Como reseteamos volvemos al estado inicial
}
// Detectamos el click del borrar
borrar.onclick = () => {
    console.log("Borrando");
    if (estado == ESTADO.OP2 || estado == ESTADO.OPERATION){ // Si estamos en el estado OP2 o en estado OPERACION, borramos y volvemos al estado OP1
        display.innerHTML = display.innerHTML.slice(0, -1);
        estado = ESTADO.OP1;
    } else if (estado == ESTADO.OP1 ){ // SI estamos en el estado OP1, simplemente borramos los digitos
        display.innerHTML = display.innerHTML.slice(0, -1); // Borramos de display el ultimo digito introducido.
    }
}

raiz.onclick = () => { // Detectamos el click en la raiz
    console.log("raiz");
    display.innerHTML = Math.sqrt(display.innerHTML); // Realizamos la raiz del numero que se encuentra en el display
}

sumatorio.onclick = () => { // Detectamos el click en ans
    console.log("log");
    display.innerHTML = resul; //Igualamos el display a la variable resul
    estado = ESTADO.OP1; // Volvemos al operando 1
}