console.log("Ejecutando JS...");

//-- Crear objeto gui, con los elementos de la interfaz gráfica
//-- Al tenerlo agrupado podemos pasarlo como parámetro o asignárselo
//-- a otro objeto
const gui = {

  //-- Elementos gui del contador 1
  display1: document.getElementById("display1"),
  boton_inc1: document.getElementById("boton_inc1"),
  boton_dec1: document.getElementById("boton_dec1"),

  //-- Elementos gui del contador 2
  display2: document.getElementById("display2"),
  boton_inc2: document.getElementById("boton_inc2"),
  boton_dec2: document.getElementById("boton_dec2"),
}

//-- Constructor del objeto contador
//-- Se le pasa como parametro su display
class counter {

    //-- Constructor del objeto
    //-- Inicializacion de las propiedades
    constructor(display1) {

        //-- Valor del contador
        this.valor = 0;

        //-- Almacenar su display
        this.display1 = display1;
    }

    //-- Método inc para actualizar el contador
    //-- Y mostrarlo en el display
    inc(value) {
        this.valor += value;
        this.display.innerHTML = this.valor;
    }
}