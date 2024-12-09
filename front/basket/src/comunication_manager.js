const laravel = { URL: "http://localhost:8001/api" }

export async function register(param) {
    const URL = `${laravel.URL}/register`;
    const response = await fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ param })
    });

    const data = await response.json();

    return data;
}
