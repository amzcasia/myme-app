"use client"

import { useState } from 'react'
import { getUserInfo} from '@/utils/functions'

type inputParamType = {
    chatList:any,
    setChatList:Function,
    selectedContact: string,
    selectedContactUsername:string,
    setSelectedContact: Function,
}

type messageInputType = {
    message: string,
    from: string,
    user: string,
    alignment: string,
    setAlignment: Function
}

// export default function Chats( {chatList,setChatList,selectedContact,selectedContactUsername,setSelectedContact}: inputParamType){
    export default function Chats( {chatList,selectedContactUsername}: inputParamType){

    // const [chatList, setChatList] = useState<any>(null);
    const [alignment, setAlignment] = useState<string>('start');
    const {id} = getUserInfo();
    const fromId = id
    // const [selectedContactUsername, setSelectedContactUsername] = useState<string>('')

    return(
        <div className='m-2'>
            <div className='flex justify-between'>
                <p>{selectedContactUsername}</p>
                <div>
                    {/* <Link href='/Messenger'>Back</Link> */}
                    <p>Chat Area</p>
                </div>

            </div>
            <div className='border border-green-500 flex flex-col p-1'>
                {chatList?.map((chat:any)=>{
                    return (
                    <Message key={chat.id} 
                    message={chat.message} 
                    from={chat.from} 
                    user={fromId} 
                    alignment={alignment}
                    setAlignment={setAlignment}/>
                )})}
            </div>
        </div>
    );
}

function Message({message, from, user}:messageInputType){
    const temp = (from === user) ? "flex-end" : "flex-start";
    return(
        <div className='' style={{display: "flex", justifyContent: `${temp}`}}>
            {message}
        </div>
    )
}