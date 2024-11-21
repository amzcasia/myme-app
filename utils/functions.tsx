import PocketBase from 'pocketbase';
// import { useRouter } from "next/navigation";

type loginProps = {
    identity: string,
    password: string,
    setIdentity: any,
    setPassword: any,
    router: any
}

export const pb = new PocketBase('https://zgecxo.pockethost.io/');

export async function pbLogin({identity, password, setIdentity, setPassword, router}:loginProps){
    // const router = useRouter();
    let loggedIn2:boolean = true
    try{
        const authData = await pb.collection('users').authWithPassword(
            identity,
            password,
        );

        // after the above you can also access the auth data from the authStore

        // const loggedIn:boolean = pb.authStore.isValid
        const loggedIn = pb.authStore.isValid

        if (loggedIn){
            router.push('/Messenger')
        }
        else{
            // setIdentity('');
            setPassword('');
            
        }
        console.log("login");
        console.log(loggedIn);
        console.log(pb.authStore.token);

        return loggedIn

        
        // console.log(pb.authStore.model.id);
    } catch (error){
        console.error("login error", error)
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