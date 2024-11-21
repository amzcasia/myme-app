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