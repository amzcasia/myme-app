import PocketBase from 'pocketbase';
// import { useRouter } from "next/navigation";

type loginProps = {
    identity: string,
    password: string,
    setIdentity: any,
    setPassword: any,
    router: any

}

type registerProps = {
    email: string,
    username: string,
    password: string,
    passwordConfirm: string,
    setEmail: any,
    setUsername: any,
    setPassword: any,
    setPasswordConfirm: any,
    router: any

}


export const pb = new PocketBase('https://zgecxo.pockethost.io/');

export async function pbLogin({identity, password, setIdentity, setPassword, router}:loginProps){
    // const router = useRouter();
    try{
        const authData = await pb.collection('users').authWithPassword(
            identity,
            password,
        );
        // after the above you can also access the auth data from the authStore
        // const loggedIn:boolean = pb.authStore.isValid
        const loggedIn = pb.authStore.isValid ?? false

        if (loggedIn){
            router.push('/Messenger')
            return true
        }
        else{
            // setIdentity('');
            setPassword('');
            return false
        }
    } catch (error){
        console.error("login error", error)
        setPassword('');
        return false
    }
}

export function pbLogout(){
    // "logout" the last authenticated account
    console.log("logout")
    pb.authStore.clear();

    // console.log(pb.authStore.isValid);
    // console.log(pb.authStore.token);
    // console.log(pb.authStore.model.id);
    // router.push('/')
}

export async function pbRegister(
    {   
        email,
        username,
        password,
        passwordConfirm,
        setEmail,
        setUsername,
        setPassword,
        setPasswordConfirm,
        router
    }:registerProps){

    let userId:string = ""

    const data = {
        "email": email,
        "username":username,
        "password":password,
        "passwordConfirm":passwordConfirm
    }
    try{
        const userInfo = await pb.collection('users').create(data)

        // const userInfo = await userInfoJson.json();
        userId = userInfo.id ?? null;
        console.log(userId)
        // sample output
        // {
        //     "avatar": "",
        //     "collectionId": "_pb_users_auth_",
        //     "collectionName": "users",
        //     "created": "2024-11-21 13:57:31.689Z",
        //     "emailVisibility": false,
        //     "id": "y3nlaffdbmdzjtp",
        //     "updated": "2024-11-21 13:57:31.689Z",
        //     "username": "strikefrdm24",
        //     "verified": false
        // }

    }catch(error){
        console.error("signup error", error)
    }

    if (userId != ""){
        const identity = username
        const setIdentity = setUsername
        const res = await pbLogin({identity, password, setIdentity, setPassword, router})
        console.log(res)
    }
    return userId
}