"use client"

import { useEffect, useState } from 'react'
import { getUserInfo} from '@/utils/functions'

type inputParamType = {
    scrollToBottomDivRef: any,
    chatList:any,
    setChatList:Function,
    selectedContact: string,
    selectedContactUsername:string,
    setSelectedContact: Function,
    scrollToBottom: Function
}

type messageInputType = {
    message: string,
    from: string,
    user: string,
    alignment: string,
    setAlignment: Function
}

// export default function Chats( {chatList,setChatList,selectedContact,selectedContactUsername,setSelectedContact}: inputParamType){
    export default function Chats( {scrollToBottomDivRef,chatList,selectedContactUsername,scrollToBottom}: inputParamType){

    // const [chatList, setChatList] = useState<any>(null);
    const [alignment, setAlignment] = useState<string>('start');
    const {id} = getUserInfo();
    const fromId = id
    // const [selectedContactUsername, setSelectedContactUsername] = useState<string>('')
    const scrollToTop = () =>{
        // scrollToBottomDivRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    useEffect( ()=>{
        scrollToBottom();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    },[chatList])

    return(
        <div className='mx-2 h-full flex flex-col justify-between relative'>
            <div className='pt-2 px-1 pb-1 h-[8vh] md:h-[5vh] flex justify-between items-center sticky top-0 bg-black border border-green-500'>
                <p>Chatting with {selectedContactUsername}</p>
                <div className='md:hidden'>
                    <button className='px-2 text-green-300' onClick={scrollToTop}>Top^^</button>
                </div>
            </div>
            <div className='h-full grid content-end'>
                <div ref={scrollToBottomDivRef} className='border border-green-500 flex flex-col p-1 overflow-y-auto md:h-[85vh] '>
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
        </div>
    );
}

function Message({message, from, user}:messageInputType){
    const temp = (from === user) ? "flex-end" : "flex-start";
    return(
        <div className='break-all text-wrap' >
            <p className='text-right' style={{display: "flex", justifyContent: `${temp}`}}>
                {message}
            </p>
        </div>
    )
}