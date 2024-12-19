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



export async function login(param) {
    const URL = `${laravel.URL}/login`;
    const response = await fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify( {

            username:param.username,          
            password: param.password
          



        })
    } );
    
    const data = await response.json();

    return data;
}


export async function addFriend(payload) {
    try {
        const response = await fetch('/api/friends/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });
        return await response.json();
    } catch (error) {
        console.error('Error adding friend:', error);
        return { success: false, message: 'Error adding friend' };
    }
}
