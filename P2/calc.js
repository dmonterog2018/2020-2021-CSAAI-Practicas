console.log("Lanzamos la calculadora....");

// Leyemos las variables del index.html
display = document.getElementById("display")
boton = document.getElementsByClassName("digito")
operaciones = document.getElementsByClassName("operacion")
reset = document.getElementById("reset")
resultado = document.getElementById("resultado")
borrar = document.getElementById("del")

// Vamos a leer en primer lugar los digitos 
for (i=0; i<boton.length; i++){ // Comparamaos las longitudes para que vaya leyendo los diferentes digitos
boton[i].onclick = (ev) => {
console.log("Digito: " + ev.target.value)
display.innerHTML += ev.target.value; // Mostramos el valor en el display
}
}
// Vamos a leer en segundo lugar las operaciones 
for (i=0; i<operaciones.length; i++) {
operaciones[i].onclick = (ev) => {
console.log(" Operando: " + ev.target.value)
display.innerHTML += ev.target.value;
}    
}



resultado.onclick = () => {
console.log("Imprime resultado");
// Falta funcion resultado
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

