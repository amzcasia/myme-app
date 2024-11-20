"use server";

export async function checkLogin(){

    const res = await fetch('https://zgecxo.pockethost.io/api/collections/users/auth-with-password' , {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: '{ "identity" : "strikefrdm23", "password" : "xCY2QDwhIp50dBQ"}',
        }
    );

    // const res = await fetch('https://zgecxo.pockethost.io/api/collections/notes_app/records?page=1&perPage=30', { cache: 'no-store' });


    const data = await res.json();
    const dataToTxt = JSON.stringify(data.token, null, 2)
    console.log(dataToTxt)

    return dataToTxt
}