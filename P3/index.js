// Creacion del canvas
const canvas = document.getElementById("canvas");


canvas.width = 600;
canvas.height = 420;

const ctx = canvas.getContext("2d");


const LADRILLO = {
    F: 6,   //-- Filas
    C: 13,   //-- Columnas
    w: 43,  //-- Anchura
    h: 20,  //-- Altura
    padding: 3,  //-- Espacio alrededor del ladrillo
    visible: true //-- Estado del ladrillo: activo o no
  }

// Variables de la raqueta que vamos a formar para que rebote la bola

const raqueta = {
  altura: 10, // Altura del eje Y de la raqueta
  ancho : 65 // Ancho de la raqueta
}
var inicialraquetax = (canvas.width - raqueta.ancho)/2; // Posicion inicial de la raqueta en el eje X
var inicialraquetay = canvas.height - raqueta.altura; // Posicion inicial de la raqueta en el eje Y

// Variables de la bola

const bola = {
  radio: 9 // radio de la bola
  
}
var inicialbolax =  canvas.width/2; // Posicion inicial de la bola en el eje X
var inicialbolay = canvas.height -20; // Posicion inicial de la bola en el eje Y
var velocidadx = 0;  // Velocidad en el eje X de la bola inicalizada en 0
var velocidady = 0; // Velocidad en el eje Y de la bola inicalizada en 0
//-- Creación de los ladrillos. La estructura se almacena 
//-- en el objeto ladrillos, que inicialmente está vacío
const ladrillos = [];


// FUNCIONES 
// BOLA
function drawbola() {
  console.log("Dibujando bola....");
  ctx.beginPath();
  ctx.arc(inicialbolax, inicialbolay, bola.radio, 0, Math.PI*2);  //Posicion de la bola(x, y), radio, radio inicial, radio final
  ctx.fillStyle = 'yellow'; // Color de la bola
  ctx.fill();
  ctx.closePath();
}
// RAQUETA
function drawraqueta() {
  console.log("Dibujando raqueta....");
  ctx.beginPath();
  ctx.rect(inicialraquetax, inicialraquetay, raqueta.ancho, raqueta.altura); // Posicion de la raqueta (x, y), ancho y largo de la raqueta
  ctx.fillStyle = 'yellow'; // Color de la raqueta
  ctx.fill();
  ctx.closePath();
}

//MOVIMIENTOS


//-- Recorrer todas las filas. La variable i toma valores de 0 hasta F-1 (número de filas)
// RAQUETA
document.addEventListener("keydown", function (ev) {
  var desplazamiento = 7;
  if(ev.key === "ArrowRight") {
    inicialraquetax +=  desplazamiento;
    console.log("Izquierda");
    if(inicialraquetax + raqueta.ancho >= canvas.width){
      inicialraquetax = 600 - raqueta.ancho;
    }
  }else if(ev.key === "ArrowLeft" ){
    inicialraquetax -= desplazamiento;
    console.log("Izquierda");
    if (inicialraquetax < 0){
      inicialraquetax = 0;
    }
  }else if (ev.key === " "){
    velocidadx = 3;
    velocidady = 3;
  console.log("Espacio");
  }
  
  
});



function main () {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawbola(); // Llamamos a la funcion para que nos dibuje la bola
  drawraqueta(); // Llamamos a la funcion para que nos dibuje la raqueta
  
  for (let i = 0; i < LADRILLO.F; i++) {
    ladrillos[i] = [];  //-- Inicializar la fila. Las filas son a su vez Arrays que inicialmente están vacíos
  
    //-- Recorrer las C columnas de la fila i. La variable j toma valores de 0 hasta C-1 (numero de columnas)
    for (let j = 0; j < LADRILLO.C; j++) {
  
      //-- Calcular valores para el ladrillo de la fila i y la columna j
      //-- Algunos valores son constates. Otros depeden de i y j
      ladrillos[i][j] = {
        x: (LADRILLO.w + LADRILLO.padding) * j,
        y: (LADRILLO.h + LADRILLO.padding) * i,
        w: LADRILLO.w,
        h: LADRILLO.h,
        padding: LADRILLO.padding,
        visible: LADRILLO.visible
      };
    }
  }
  
  
  
  //-- Dibujar ladrillos
  for (let i = 1; i < LADRILLO.F; i++) {
      for (let j = 0; j < LADRILLO.C; j++) {
  
        //-- Si el ladrillo es visible se pinta
        if (ladrillos[i][j].visible) {
          ctx.beginPath();
          ctx.rect(ladrillos[i][j].x, ladrillos[i][j].y, LADRILLO.w, LADRILLO.h);
          ctx.fillStyle = 'blue';
          ctx.fill();
          ctx.closePath();
        }
      }
  }

  // MOVIMIENTO DE LA BOLA
  if (inicialbolax + velocidadx > canvas.width - bola.radio || inicialbolax + velocidadx < bola.radio) {
    velocidadx = -velocidadx;

  }

  if( inicialbolay + velocidady < bola.radio) {
    velocidady = -velocidady;
  }

  if (inicialbolay + velocidady > canvas.height - bola.radio) {
    if (inicialbolax > inicialraquetax && inicialbolax < inicialraquetax + raqueta.ancho) {
      velocidadx = velocidadx;
      velocidady = -velocidady;
    }
  
  }

  if (inicialbolay + velocidady > canvas.height) {
    inicialbolax = canvas.width/2; 
    inicialbolay = canvas.height -20;
    velocidadx = 0;
    velocidady = 0;
  }

inicialbolax += velocidadx;
inicialbolay += velocidady;
requestAnimationFrame(main);
    
}




main();