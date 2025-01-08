const socket = io();

const crearSalaBtn = document.getElementById('create-room');
const unirSalaBtn = document.getElementById('join-room');
const salirSalaBtn = document.getElementById('leave-room');
const claveSalaInput = document.getElementById('room-key');
const menuDiv = document.getElementById('menu');
const roomInfoDiv = document.getElementById('room-info');
const currentRoomSpan = document.getElementById('current-room');
const userList = document.getElementById('user-list');

crearSalaBtn.addEventListener('click', () => {
    socket.emit('create-room');
});

unirSalaBtn.addEventListener('click', () => {
    const claveSala = claveSalaInput.value.trim();
    if (claveSala) {
        socket.emit('join-room', claveSala);
    } else {
        alert('Introduce una clave de sala');
    }
});

salirSalaBtn.addEventListener('click', () => {
    const claveSala = currentRoomSpan.textContent;
    socket.emit('leave-room', claveSala);
});

socket.on('room-created', (claveSala) => {
    updateRoomView(claveSala);
});

socket.on('room-joined', (claveSala) => {
    updateRoomView(claveSala);
});

socket.on('room-users', ({ room, users }) => {
    currentRoomSpan.textContent = room;
    userList.innerHTML = '';
    users.forEach((user) => {
        const li = document.createElement('li');
        li.textContent = user;
        userList.appendChild(li);
    });
});

socket.on('left-room', () => {
    resetToMenu();
});

socket.on('error', (message) => {
    alert(message);
});

function updateRoomView(claveSala) {
    menuDiv.classList.add('hidden');
    roomInfoDiv.classList.remove('hidden');
    currentRoomSpan.textContent = claveSala;
}

function resetToMenu() {
    menuDiv.classList.remove('hidden');
    roomInfoDiv.classList.add('hidden');
    currentRoomSpan.textContent = '';
    userList.innerHTML = '';
}
