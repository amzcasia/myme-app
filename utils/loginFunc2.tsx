type loginProps = {
    identity: string,
    password: string
}

export async function login({identity,password}:loginProps){
    // const login = async (e:any) => {
    // e.preventDefault();
    const res = await fetch('https://zgecxo.pockethost.io/api/collections/users/auth-with-password' , {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            identity,
            password,
        })
        }
    );
    const data = await res.json();
    const dataToTxt = JSON.stringify(data.token, null, 2)

    console.log(dataToTxt)

    return dataToTxt
    
}