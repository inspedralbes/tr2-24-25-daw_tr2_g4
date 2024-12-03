const socket = io();

let nombreUsuario = '';

function registrarNombre() {
    const nombre = document.getElementById('nombreUsuario').value;
    if (nombre) {
        nombreUsuario = nombre;
        socket.emit('registrarNombre', nombre);
    }
}

socket.on('nombreRegistrado', (nombre) => {
    document.getElementById('nombreConfirmado').textContent = `Nombre registrado: ${nombre}`;
});

function crearSala() {
    if (!nombreUsuario) {
        alert('Por favor, registra tu nombre primero.');
        return;
    }
    const codigoSala = document.getElementById('codigoCrear').value;
    if (codigoSala) {
        socket.emit('crearSala', codigoSala);
    }
}

function unirseSala() {
    if (!nombreUsuario) {
        alert('Por favor, registra tu nombre primero.');
        return;
    }
    const codigoSala = document.getElementById('codigoUnirse').value;
    if (codigoSala) {
        socket.emit('unirseSala', codigoSala);
    }
}

socket.on('salaCreada', (codigoSala) => {
    alert(`Sala creada con éxito! Código de la sala: ${codigoSala}`);
});

socket.on('errorSala', (mensaje) => {
    alert(mensaje);
});

socket.on('jugadores', (jugadores) => {
    const lista = document.getElementById('listaJugadores');
    lista.innerHTML = '';
    jugadores.forEach(nombre => {
        const li = document.createElement('li');
        li.textContent = nombre;
        lista.appendChild(li);
    });
});
