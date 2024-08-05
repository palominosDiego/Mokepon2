let ataqueJugador
let ataqueContrincante
let vidasJugador = 3
let vidasContrincante = 3



function iniciarJuego() {
    let sectionSeleccionarAtaque = document.getElementById('Selecionar-ataque')
    sectionSeleccionarAtaque.style.display = 'none'

    let sectionSeleccionarReiniciar = document.getElementById('Reiniciar')
    sectionSeleccionarReiniciar.style.display = 'none'

    let botonMascotaJugador = document.getElementById('boton-mascota')
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)

    let botonFuego = document.getElementById('boton-fuego')
    botonFuego.addEventListener('click', ataqueFuego)
    let botonAgua = document.getElementById('boton-agua')
    botonAgua.addEventListener('click', ataqueAgua)
    let botonTierra = document.getElementById('boton-tierra')
    botonTierra.addEventListener('click', ataqueTierra)

    let botonReinicar = document.getElementById('boton-reiniciar')
    botonReinicar.addEventListener('click', reiniciarJuego)
}

function seleccionarMascotaJugador() {
    let inputHipo = document.getElementById('hipo')
    let inputCapi = document.getElementById('capi')
    let inputRati = document.getElementById('rati')
    let spanMascotaJugador = document.getElementById('mascota-jugador')

    if (inputHipo.checked) {
        spanMascotaJugador.innerHTML = '<img src="./assets/Hipo.png" alt="Hipo" width="80" height="80">'
    } else if (inputCapi.checked) { 
        spanMascotaJugador.innerHTML = '<img src="./assets/Capi.png" alt="Capi" width="80" height="80">'
    } else if (inputRati.checked) {
        spanMascotaJugador.innerHTML = '<img src="./assets/Rati.png" alt="Rati" width="80" height="80">'
    } else {
        alert('Selecciona una mascota')
        return
    }

    let sectionSeleccionarMascota = document.getElementById('Selecionar-mascota')
    sectionSeleccionarMascota.style.display = 'none'

    let sectionSeleccionarAtaque = document.getElementById('Selecionar-ataque')
    sectionSeleccionarAtaque.style.display = 'flex'
    
    seleccionarMascotaContrincante()
}

function seleccionarMascotaContrincante() {
    let mascotaAleatoria = aleatorio(1, 3)
    let spanMascotaContrincante = document.getElementById('mascota-contrincante')

    if (mascotaAleatoria == 1) {
        spanMascotaContrincante.innerHTML = '<img src="./assets/Hipo.png" alt="Hipo" width="80" height="80">'
    } else if (mascotaAleatoria == 2) {
        spanMascotaContrincante.innerHTML = '<img src="./assets/Capi.png" alt="Capi" width="80" height="80">'
    } else {
        spanMascotaContrincante.innerHTML = '<img src="./assets/Rati.png" alt="Rati" width="80" height="80">'
    }
}

function ataqueFuego() {
    ataqueJugador = 'FUEGO'
    ataqueAleatorioContrincante()
}

function ataqueAgua() {
    ataqueJugador = 'AGUA'
    ataqueAleatorioContrincante()
}

function ataqueTierra() {
    ataqueJugador = 'TIERRA'
    ataqueAleatorioContrincante()
}

function ataqueAleatorioContrincante() {
    let ataqueAleatorio = aleatorio(1, 3)

    if (ataqueAleatorio == 1) {
        ataqueContrincante = 'FUEGO'
    } else if (ataqueAleatorio == 2) {
        ataqueContrincante = 'AGUA'
    } else {
        ataqueContrincante = 'TIERRA'
    }
    combate()
}

function combate() {
    let spanVidasJugador = document.getElementById('vidas-jugador')
    let spanVidasContrincante = document.getElementById('vida-contrincante')
    let ataquesDelJugador = document.getElementById('ataques-del-jugador')
    let ataquesDelEnemigo = document.getElementById('ataques-del-enemigo')

    ataquesDelJugador.innerHTML = `Ataque: ${ataqueJugador}`
    ataquesDelEnemigo.innerHTML = `Ataque: ${ataqueContrincante}`

    if (ataqueContrincante == ataqueJugador) {
        crearMensaje('💢 EMPATE 💢')
    } else if (ataqueContrincante == 'FUEGO' && ataqueJugador == 'TIERRA' ||
               ataqueContrincante == 'AGUA' && ataqueJugador == 'FUEGO' ||
               ataqueContrincante == 'TIERRA' && ataqueJugador == 'AGUA') {
        crearMensaje('😣 PERDISTE 😣')
        vidasJugador--
        if (vidasJugador <= 0) {
            vidasJugador = 0
            crearMensajeFinal('😭 You Lost 😭')
        }
        spanVidasJugador.innerHTML = vidasJugador
    } else {
        crearMensaje('😁 GANASTE 😁')
        vidasContrincante--
        if (vidasContrincante <= 0) {
            vidasContrincante = 0
            crearMensajeFinal('🤩 You Win 😎')
        }
        spanVidasContrincante.innerHTML = vidasContrincante
    }
}

function crearMensaje(resultado) {
    let sectionMensaje = document.getElementById('Mensaje')
    let parrafo = document.createElement('p')
    parrafo.innerHTML = resultado
    sectionMensaje.appendChild(parrafo)
}

function crearMensajeFinal(resultadoFinal) {
    let sectionMensaje = document.getElementById('Mensaje')
    let parrafo = document.createElement('p')
    parrafo.innerHTML = resultadoFinal
    sectionMensaje.appendChild(parrafo)

    let botonesAtaque = document.querySelectorAll('.boton-ataque')
    botonesAtaque.forEach(boton => {
        boton.disabled = true
    })

    let sectionReiniciar = document.getElementById('Reiniciar')
    sectionReiniciar.style.display = 'block'
}

function reiniciarJuego() {
    location.reload()
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}