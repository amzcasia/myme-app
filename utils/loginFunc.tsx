"use server";

export async function checkLogin(identity:string,password:string){

    const res = await fetch('https://zgecxo.pockethost.io/api/collections/users/auth-with-password' , {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: `{ "identity" : ${identity}, "password" : ${password}}`,
        }
    );

    // const res = await fetch('https://zgecxo.pockethost.io/api/collections/notes_app/records?page=1&perPage=30', { cache: 'no-store' });


    const data = await res.json();
    const dataToTxt = JSON.stringify(data.token, null, 2)
    console.log(dataToTxt)

    return dataToTxt
}