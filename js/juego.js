// VARIABLES PARA CONTROLAR EL JUEGO
var contador = 60;
var puntuacion = 0;
var juego = false;
var items = 0;

// ELEMENTOS DEL JUEGO
// Botones
const elemJugar = document.getElementById("jugar");
const elemReintentar = document.getElementById("reintentar");

// Contenedores
const elemCorrecto = document.getElementById("correcto");
const elemIncorrecto = document.getElementById("incorrecto");

// Cajas que contienen las imagenes
const elem1 = document.getElementById("uno");
const elem2 = document.getElementById("dos");
const elem3 = document.getElementById("tres");
const elem4 = document.getElementById("cuatro");
const elem5 = document.getElementById("cinco");
const elem6 = document.getElementById("seis");
const elem7 = document.getElementById("siete");
const elem8 = document.getElementById("ocho");
const elem9 = document.getElementById("nueve");
const elem10 = document.getElementById("diez");

// INICIAMOS EL JUEGO CON EL BOTON JUGAR
function jugar() {
    // Mostramos los iconos y contenedores ocultos
    elemJugar.style.display = "none";
    elemCorrecto.style.display = "flex";
    elemIncorrecto.style.display = "flex";
    elem1.style.display = "block";
    elem2.style.display = "block";
    elem3.style.display = "block";
    elem4.style.display = "block";
    elem5.style.display = "block";
    elem6.style.display = "block";
    elem7.style.display = "block";
    elem8.style.display = "block";
    elem9.style.display = "block";
    elem10.style.display = "block";

    cambiarImagen(); // Cambiamos los iconos para evitar que se repitan al jugar

    juego = true;

    // CONTROLAMOS LOS DROPS
    var comprobar = setInterval(function () {
        if (items == 10) {
            clearInterval(comprobar);
            terminado();
        }
    }, 100);

    // CONTROLAMOS EL CONTADOR
    var tiempo = setInterval(function () {
        if (juego) {
            contador--;
            document.getElementById("segundos").innerHTML = contador;
            if (contador == 0) {
                clearInterval(tiempo);
                terminado();
            }
        } else {
            clearInterval(tiempo);
        }
    }, 1000);

    // CONTROLAMOS LA PUNTUACIÓN
    var puntos = setInterval(function () {
        if (contador != 0) {
            document.getElementById("valor").innerHTML = puntuacion;
            if (puntuacion == 1000) {
                clearInterval(puntos);
            }
        }
    }, 100);
}

// Generamos un numero aleatorio
function aleatorio(numero) {
    return(Math.floor(Math.random() * numero + 1 ));
}

// Creamos un array con todos los iconos
var imagenes = new Array();
imagenes[0] = "media/correcto/1.png";
imagenes[1] = "media/correcto/2.png";
imagenes[2] = "media/correcto/3.png";
imagenes[3] = "media/correcto/4.png";
imagenes[4] = "media/correcto/5.png";
imagenes[5] = "media/correcto/6.png";
imagenes[6] = "media/correcto/7.png";
imagenes[7] = "media/correcto/8.png";
imagenes[8] = "media/correcto/9.png";
imagenes[9] = "media/correcto/10.png";
imagenes[10] = "media/correcto/11.png";
imagenes[11] = "media/correcto/12.png";
imagenes[12] = "media/correcto/13.png";
imagenes[13] = "media/correcto/14.png";
imagenes[14] = "media/correcto/15.png";
imagenes[15] = "media/correcto/16.png";
imagenes[16] = "media/incorrecto/1.png";
imagenes[17] = "media/incorrecto/2.png";
imagenes[18] = "media/incorrecto/3.png";
imagenes[19] = "media/incorrecto/4.png";
imagenes[20] = "media/incorrecto/5.png";
imagenes[21] = "media/incorrecto/6.png";
imagenes[22] = "media/incorrecto/7.png";
imagenes[23] = "media/incorrecto/8.png";
imagenes[24] = "media/incorrecto/9.png";
imagenes[25] = "media/incorrecto/10.png";
imagenes[26] = "media/incorrecto/11.png";
imagenes[27] = "media/incorrecto/12.png";
imagenes[28] = "media/incorrecto/13.png";
imagenes[29] = "media/incorrecto/14.png";
imagenes[30] = "media/incorrecto/15.png";
imagenes[31] = "media/incorrecto/16.png";


// GENERAMOS ICONOS ALEATORIOS AL JUGAR
// Extraemos iconos del array a partir del numero aleatorio que generamos
function cambiarImagen() {
    document.getElementById("ia1").src = imagenes[aleatorio(imagenes.length)-1];
    document.getElementById("ia2").src = imagenes[aleatorio(imagenes.length)-1];
    document.getElementById("ia3").src = imagenes[aleatorio(imagenes.length)-1];
    document.getElementById("ia4").src = imagenes[aleatorio(imagenes.length)-1];
    document.getElementById("ia5").src = imagenes[aleatorio(imagenes.length)-1];
    document.getElementById("ia6").src = imagenes[aleatorio(imagenes.length)-1];
    document.getElementById("ia7").src = imagenes[aleatorio(imagenes.length)-1];
    document.getElementById("ia8").src = imagenes[aleatorio(imagenes.length)-1];
    document.getElementById("ia9").src = imagenes[aleatorio(imagenes.length)-1];
    document.getElementById("ia10").src = imagenes[aleatorio(imagenes.length)-1];
}

// ELEMENTOS ARRASTRADOS
function dragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.id);
    event.currentTarget.style.opacity = "0.001";
}

function dragEnd(event) {
    event.currentTarget.style.border = "2px solid #fff";
    event.currentTarget.style.opacity = "";
}

// CAJAS DONDE SE ARRASTRAN LOS ELEMENTOS
function dragEnter(event) {
    event.preventDefault();
    event.currentTarget.style.background = "#f4f4f4";
}

function dragLeave(event) {
    event.currentTarget.style.background = "white";
}

function dragOver(event) {
    event.preventDefault();
}

// CAJA CORRECTA
function dropCorrect(event) {
    event.currentTarget.style.background = "#ABEBC6";
    
    // Guardamos el id del elemento que arrastramos para hacer modificaciones sobre él
    let id = event.dataTransfer.getData('text');
    let elementoSeleccionado = document.getElementById(id);

    // Guardamos la carpeta donde se encuentra la imagen
    let imagenCorrecta = elementoSeleccionado.src;
    let cadena = imagenCorrecta.split("/");
    let rutaCorrecta = cadena[cadena.length-2];

    items++; // Guardamos el numero de iconos soltados
    
    // Sumamos puntos si soltamos el icono correcto en el contenedor
    if (rutaCorrecta === "correcto") {
        puntuacion += 10;
    } else if (puntuacion >= 5) {
        puntuacion -= 5;
    }

    // Eliminamos el icono que soltamos
    elementoSeleccionado.remove();
    event.dataTransfer.clearData();
}

// CAJA INCORRECTA
function dropIncorrect(event) {
    event.currentTarget.style.background = "#F5B7B1";

    // Guardamos el id del elemento que arrastramos para hacer modificaciones sobre él
    let id = event.dataTransfer.getData('text');
    let elementoSeleccionado = document.getElementById(id);

    // Guardamos la carpeta donde se encuentra la imagen
    let imagenIncorrecta = elementoSeleccionado.src;
    let cadena = imagenIncorrecta.split("/");
    let rutaIncorrecta = cadena[cadena.length-2];

    items++; // Guardamos el numero de iconos soltados

    // Sumamos puntos si soltamos el icono correcto en el contenedor
    if (rutaIncorrecta === "incorrecto") {
        puntuacion += 10;
    } else if (puntuacion >= 5) {
        puntuacion -= 5;
    }

    // Eliminamos el icono que soltamos
    elementoSeleccionado.remove();
    event.dataTransfer.clearData();
}

// FINAL DEL JUEGO
function terminado() {
    // Ocultamos los iconos y los contenedores al finalizar el juego
    elemCorrecto.style.display = "none";
    elemIncorrecto.style.display = "none";
    elem1.style.display = "none";
    elem2.style.display = "none";
    elem3.style.display = "none";
    elem4.style.display = "none";
    elem5.style.display = "none";
    elem6.style.display = "none";
    elem7.style.display = "none";
    elem8.style.display = "none";
    elem9.style.display = "none";
    elem10.style.display = "none";

    // Mostramos mensajes diferentes si conseguimos la puntuación máxima
    if (puntuacion == 100) {
        alert("¡Felicidades, has conseguido la puntuación máxima!\nPuntuación: " + puntuacion + " puntos");
    } else {
        alert("Puntuación: " + puntuacion + " puntos");
    }

    elemReintentar.style.display = "inline"; // Mostramos el botón de Reintentar al finalizar el juego
    
    juego = false;

    ajax_mandar(); // Enviamos la puntuación obtenida por el jugador
}

// VOLVER A JUGAR
function reintentar() {
    // Ocultamos al boton Reintentar
    elemReintentar.style.display = "none";

    // Reiniciamos los drops, el tiempo y los puntos
    items = 0;
    contador = 60;
    puntuacion = 0;

    // Creamos los iconos que hemos eliminado al terminar el juego
    elem1.innerHTML = "<img id='ia1' class='imagen1' src=''>";
    elem2.innerHTML = "<img id='ia2' class='imagen2' src=''>";
    elem3.innerHTML = "<img id='ia3' class='imagen3' src=''>";
    elem4.innerHTML = "<img id='ia4' class='imagen4' src=''>";
    elem5.innerHTML = "<img id='ia5' class='imagen5' src=''>";
    elem6.innerHTML = "<img id='ia6' class='imagen6' src=''>";
    elem7.innerHTML = "<img id='ia7' class='imagen7' src=''>";
    elem8.innerHTML = "<img id='ia8' class='imagen8' src=''>";
    elem9.innerHTML = "<img id='ia9' class='imagen9' src=''>";
    elem10.innerHTML = "<img id='ia10' class='imagen10' src=''>";

    // Cambiamos la opacidad de todas las imagenes para que sean visibles y los bordes
    let elementos = document.querySelectorAll(".cajas");
    for (let i = 0; i < elementos.length; i++) {
        elementos[i].style.opacity = "1";
        elementos[i].style.border = "0";
    }

    cambiarImagen(); // Cambiamos los iconos para evitar que se repitan al jugar
    
    jugar(); // Ejecutamos esta función y volvemos a empezar
}