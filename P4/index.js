console.log("Ejecutando JS....")

//-- Obtener elementos del DOM
const canvas = document.getElementById('canvas');
const img = document.getElementById('imagen1')
const ctx = canvas.getContext('2d');
const r = document.getElementById('r');
const g = document.getElementById('g');
const b = document.getElementById('b');
const r_value = document.getElementById('rvalue');
const g_value = document.getElementById('gvalue');
const b_value = document.getElementById('bvalue');
const gris = document.getElementById('gris');


//-- Función de retrollamada de imagen cargada
//-- La imagen no se carga instantaneamente, sino que
//-- lleva un tiempo. Sólo podemos acceder a ella una vez
//-- que esté totalmente cargada
img.onload = function () {

  console.log("Imagen cargada");
  //-- Se establece como tamaño del canvas el mismo
  //-- que el de la imagen original
  canvas.width = img.width;
  canvas.height = img.height;

  ctx.drawImage(img, 0,0);
 

};


r.oninput = () => {
    rgb(r);
}

g.oninput = () => {
    rgb(g);
}

b.oninput = () => {
    rgb(b);
}

gris.onclick = () => {
    grises();
}

function rgb () {
    canvas.width = img.width;
    canvas.height = img.height;

    ctx.drawImage(img, 0,0);

    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    //-- Obtener el array con todos los píxeles
    let data = imgData.data;


    r_value.innerHTML = r.value;
    g_value.innerHTML = g.value;
    b_value.innerHTML = b.value;

    valorrojo = r.value
    valorverde = g.value
    valorazul = b.value

    for (let i = 0; i < data.length; i+=4) {
        if(data[i] > valorrojo) 
            data[i] = valorrojo;
        if(data[i + 1] > valorverde)
            data[i + 1] = valorverde;
        if(data[i + 2] > valorazul)
            data[i + 2] = valorazul;
    }


    ctx.putImageData(imgData, 0, 0);
}


function grises () {

    canvas.width = img.width;
    canvas.height = img.height;

    ctx.drawImage(img, 0,0);

    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    //-- Obtener el array con todos los píxeles
    let data = imgData.data;

    for (let i=0; i< data.length; i+=4) {
        blancoynegro = (3 * data[i] + 4 * (data[i + 1]) + (data[i + 2]))/8;
        data[i] = blancoynegro;
        data[i + 1] = blancoynegro;
        data[i + 2] = blancoynegro;
    }

    ctx.putImageData(imgData, 0, 0);
}




console.log("Fin...");