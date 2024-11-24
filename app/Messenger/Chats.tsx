"use client"

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getMessageList, getUserInfo, realTimeMessageList } from '@/utils/functions'

type inputParamType = {
    chatList:any,
    setChatList:Function,
    selectedContact: string,
    setSelectedContact: Function,
}

type messageInputType = {
    message: string,
    from: string,
    user: string,
    alignment: string,
    setAlignment: Function
}

export default function Chats( {chatList,setChatList,selectedContact,setSelectedContact}: inputParamType){
    // const [chatList, setChatList] = useState<any>(null);
    const [alignment, setAlignment] = useState<string>('start');
    const {id} = getUserInfo();
    const fromId = id
    const toId = selectedContact

    const handleGetChatList = async ()=>{
        setChatList( await getMessageList({fromId,toId}));
    }

    useEffect(()=>{ 
        handleGetChatList()
        realTimeMessageList({fromId,toId,chatList,setChatList});

    },[selectedContact])

    // useEffect(()=>{
    //     realTimeMessageList({fromId,toId,chatList,setChatList});
    // },[])

    return(
        <div className='m-2'>
            <div className='flex justify-between'>
                
                <p>{selectedContact}</p>
                <div>
                    <Link href='/Messenger'>Back</Link>
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