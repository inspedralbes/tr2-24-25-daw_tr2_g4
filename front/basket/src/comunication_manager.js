const laravel = { URL: "http://localhost:8000/api" }

export async function register(param) {
    const URL = `${laravel.URL}/register`;
    const response = await fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify( {

            username:param.username,
            email: param.email,            
            password: param.password,
            avatar: param.avatar



        })
    } );
    
    const data = await response.json();

    return data;
}
