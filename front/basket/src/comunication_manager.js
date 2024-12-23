const laravel = { URL: "http://localhost:8000/api" };

// Función para registrar un usuario
export async function register(param) {
    const URL = `${laravel.URL}/register`;
    const response = await fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: param.username,
            email: param.email,
            password: param.password,
            avatar: param.avatar
        })
    });

    const data = await response.json();
    return data;
}

// Función para iniciar sesión
export async function login(param) {
    const URL = `${laravel.URL}/login`;
    const response = await fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: param.username,
            password: param.password
        })
    });

    const data = await response.json();
    return data;
}

// Función para obtener una pregunta por nivel
export async function getpregunta(nivel) {
    const URL = `${laravel.URL}/preguntas/nivel/${nivel}`;
    const response = await fetch(URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    const data = await response.json();
    return data;  // Devuelve la primera pregunta obtenida
}
