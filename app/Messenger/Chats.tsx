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
        // realTimeMessageList({fromId,toId,setChatList});
        // const temp = (from = id) ? "start" : "end" 
        // setAlignment (temp)

    }

    useEffect(()=>{ 
        // temp = await getMessageList({toId,fromId})
        console.log('start realtiime')
        handleGetChatList()
        realTimeMessageList({fromId,toId,chatList,setChatList});

    },[selectedContact])

    useEffect(()=>{
        realTimeMessageList({fromId,toId,chatList,setChatList});
    },[])

    return(
        <div>
            <div className='flex justify-between'>
                <p>Chats</p>
                <p>{selectedContact}</p>
                <div>
                    <Link href='/Messenger'>Back</Link>
                </div>

            </div>
            <div className='border border-green-500 flex flex-col'>
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
    const temp = (from === user) ? "flex-end" : "flex-start";
    return(
        <div className='' style={{display: "flex", justifyContent: `${temp}`}}>
            {message}
        </div>
    )
}