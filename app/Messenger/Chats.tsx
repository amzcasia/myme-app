"use client"

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getMessageList, getUserInfo } from '@/utils/functions'

type inputParamType = {
    selectedContact: string,
    setSelectedContact: Function
}

type messageInputType = {
    message: string,
    from: string,
    user: string,
    alignment: string,
    setAlignment: Function
}

export default function Chats( {selectedContact,setSelectedContact}: inputParamType){
    const [chatList, setChatList] = useState<any>(null);
    const [alignment, setAlignment] = useState<string>('start');
    const {id} = getUserInfo();
    const fromId = id

    const handleGetChatList = async ()=>{
        const toId = selectedContact
        setChatList( await getMessageList({fromId,toId}))
        // const temp = (from = id) ? "start" : "end" 
        // setAlignment (temp)

    }

    useEffect(()=>{ 
        // temp = await getMessageList({toId,fromId})
        handleGetChatList()
    },[selectedContact])

    return(
        <div>
            <div className='flex justify-between'>
                <p>Chats</p>
                <p>{selectedContact}</p>
                <div>
                    <Link href='/Messenger'>Back</Link>
                </div>

            </div>
            <div className='border border-white grid'>
                {chatList?.map((chat:any)=>{
                    return (
                    // setAlignment((from = user) ? "start" : "end")
                    <Message key={chat.id} 
                    message={chat.message} 
                    from={chat.from} 
                    user={fromId} 
                    alignment={alignment}
                    setAlignment={setAlignment}
                    />
                )
                })}


                {/* {contactList?.map((contact:any)=>{
                return <Contact key={contact.id} 
                contactId={contact.to} 
                contactName={contact.toUserName}
                setSelectedContact={setSelectedContact}/>
            })} */}
            </div>
        </div>
    );
}

function Message({message, from, user}:messageInputType){
    const temp = (from === user) ? "end" : "end";
    return(
        <div className={`flex justify-${temp}`}>
            {message}
        </div>
    )
}