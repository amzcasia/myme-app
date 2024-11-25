import { userInfo } from 'os';
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
        console.log("Contact List:")
        console.log(data.items)
        return data.items
    }catch(error){
        console.error("failed to get contact list", error)
    }
}

type addNewContactType = {
    fromId: string,
    toId: string, 
    toUsername: string,
    contactList:any[],
    setContactList:Function,
    setSelectedContact: Function
}

export async function addNewContact({fromId, toId, toUsername, contactList, setContactList, setSelectedContact}:addNewContactType) {
    console.log('addNewContact')
    console.log(`From: ${fromId}`)
    console.log(`To: ${toId}`)
    console.log(`ToUsername: ${toUsername}`)

    console.log("Contact List:")
    console.log(contactList)


    const toUsernameList = contactList.map((contact)=>(contact.toUsername))

    if(!toUsernameList.includes(toUsername)){
        console.log(`${toUsername} is not in Contact List. Adding now...`)
        const contactData = {
            "from": `${fromId}`,
            "to": `${toId}`,
            "toUsername": `${toUsername}`
        };
        try{
            const record = await pb.collection('contacts').create(contactData);
            console.log("response after adding new contact:")
            console.log(record)
            const contactDataWithId = {
                "id":`${record.id}`,
                "from": `${fromId}`,
                "to": `${toId}`,
                "toUsername": `${toUsername}`
            }; 
            setContactList((prev:any)=>[...prev,contactDataWithId])
            setSelectedContact(toId)
            // return record.id
        }catch(error){
            console.error("error adding new contact: functions.tsx/addNewContact", error);
        }

    }else{
        console.log(`${toUsername} is already in Contact List. Now jumping to chat`);
        setSelectedContact(toId);

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
    searchUsername: string
}

let timeout: NodeJS.Timeout;

export async function searchContactUsername({searchUsername}:searchIdentityType){
    clearTimeout(timeout); // Clear the previous timeout

    return new Promise((resolve, reject) => {
        timeout = setTimeout(async () => {
            if (searchUsername) {
                console.log("searching username/email");
                try {
                    const data = await pb.collection('users').getList(1, 50, {
                        filter: `username ~ "${searchUsername}" || email ~ "${searchUsername}"`,
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

type deleteContactType = {
    fromId:string,
    toId: string
}

export async function deleteContact({fromId,toId}:deleteContactType) {
    //delete all messeges with toId ={toId}
    //delete contact from contactList
    const toDelete = await pb.collection('contacts').getList(1, 50, {
        filter: `from = "${fromId}" && to = "${toId}"`,
      });

    alert('Delete contact is still under development');
    try{
        // await pb.collection('contacts').delete('RECORD_ID');
        console.log("test delete")
        console.log(toDelete.items[0].id)

        // for (const record of toDelete.items) {
        //     await pb.collection('contacts').delete(record.id);
        //   }

    }catch(error){
        console.error('function.tsx/deleteContact: Error deleting contact/chat',error)
    }
}