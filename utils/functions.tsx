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
        
        const loggedIn = pb.authStore.isValid ?? false

        if (loggedIn){
            const username = pb.authStore.model? pb.authStore.model.username : ''
            const token = pb.authStore.token;
            console.log("login");
            console.log(token);
            // console.log(pb.authStore);
            router.push(`/Messenger`);
            return {loggedIn,username}
        }
        else{
            // setIdentity('');
            setPassword('');
            return { loggedIn: false, username:'' }
        }
    } catch (error:any){
        console.error("login error", error.message) 
        setPassword('');
        return { loggedIn: false, username:'' }
    }
}

export async function pbLogout(){
    console.log("logout")
    // pb.collection('chats').unsubscribe('*');
    const temp = await pb.realtime.unsubscribe();
    pb.authStore.clear();
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
        const identity = data.username
        const setIdentity = setUsername



        const {loggedIn,username} = await pbLogin({identity, password, setIdentity, setPassword, router})
        // console.log(token)
        return {loggedIn,username}
    }
    return {loggedIn:false,username:''}
}

export async function getContactList(){
    const {email,id,username} = getUserInfo();
    console.log("getContactList")
    try{        
        const data = await pb.collection('contacts').getList(1, 20, {
            filter: `from = "${id}"`
        });

        console.log(data.items)
        return data.items
    }catch(error){
        console.error("failed to get contact list", error)
    }

}
// const [email,id,username] = getUserInfo();
export function getUserInfo() {
    let email = ''
    let id = ''
    let username = ''
    if (pb.authStore.model){
        email = pb.authStore.model.email
        id = pb.authStore.model.id
        username = pb.authStore.model.username
    }
    return { email, id, username }
}

export function checkLoginStatus(){
    return pb.authStore.isValid
} 

type meessageListType = {
    fromId?: string,
    toId?: string,
    message?: string
    from?:string,
    to?:string,
    chatList?:any[],
    setChatList?:Function
}

type realtimeMessageListType = {
    fromId?: string,
    toId?: string,
    message?: string
    from?:string,
    to?:string,
    chatList?:any[],
    setChatList:Function
}

export async function getMessageList({fromId,toId}:meessageListType) {
    if (toId !== null && toId !== 'null'){
        try{
            const data = await pb.collection('chats').getList(1, 999, {
                filter: `(from = "${fromId}" && to = "${toId}") || (from = "${toId}" && to = "${fromId}")`,
                sort: 'created'
            });
            console.log("fetching chat list")
            console.log(data.items)
            return data.items
        } catch(error){
            console.error("error fetching chats",error);
        }
    }
}

export async function sendMessage({from, to, message}:meessageListType) {
    try{
        const data = {
            from,
            to,
            message
        }
        console.log("try sending message")
        const res = await pb.collection('chats').create(data); 
        console.log(res)
        return res
    }catch (error){
        console.error("Messege send error", error)
    }
}


export async function realTimeMessageList({fromId,toId,chatList,setChatList}:realtimeMessageListType){
    if (toId !== 'null'){
        console.log('start realtiime')
        console.log(`From: ${fromId}`)
        console.log(`To: ${toId}`)
        
        await pb.collection('chats').unsubscribe('*');
        await pb.collection('chats').subscribe('*', (e) => {
            if (
                (e.record.from === fromId && e.record.to === toId) || 
                (e.record.from === toId && e.record.to === fromId)
            ) {
                if (e.record?.message){
                    setChatList((prev:any[])=>[...prev, e.record])
                }
                console.log(e.record.message);
            }
                });
                
    }
}

type searchIdentityType = {
    identity: string
}

let timeout: NodeJS.Timeout;

export async function searchIdentity({identity}:searchIdentityType){
    // let data = null
    // if (identity){
    //     console.log("searching username/email")
    //     try{
    //         data = await pb.collection('users').getList(1, 50, {
    //             filter: `username ~ "${identity}" || email ~ "${identity}"`,
    //         });
    //         const searchData = data.items.map((item: any) => ({
    //             id: item.id,
    //             username: item.username,
    //         }));
    //         console.log(searchData)
    //         return searchData;
    //     }catch (error){
    //         console.error("search error", error);
    //     }
    // }

    clearTimeout(timeout); // Clear the previous timeout

    return new Promise((resolve, reject) => {
        timeout = setTimeout(async () => {
            if (identity) {
                console.log("searching username/email");
                try {
                    const data = await pb.collection('users').getList(1, 50, {
                        filter: `username ~ "${identity}" || email ~ "${identity}"`,
                    });
                    const searchData = data.items.map((item: any) => ({
                        id: item.id,
                        username: item.username,
                    }));
                    console.log(searchData);
                    resolve(searchData);
                } catch (error) {
                    console.error("search error", error);
                    reject(error);
                }
            } else {
                resolve([]);
            }
        }, 500); // Delay by 500ms
    });
}