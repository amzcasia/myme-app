"use client"

import Link from "next/link"
import { pbLogout, getUserInfo, realTimeMessageList, getMessageList, getContactList } from "@/utils/functions"
import Contacts from "./Contacts"
import Chats from "./Chats"
import React, { useState, useEffect, useRef } from "react"
import MessageInput from "./MessageInput"
import NewChat from "./NewChat"
// import { useState } from "react"

// export default function Messenger({searchParams} : any) {
export default function Messenger() {
    const {id,username} = getUserInfo();
    const [selectedContact, setSelectedContact] = useState<any>('null');
    const [chatList, setChatList] = useState<any>(null);
    const [contactList, setContactList] = useState<any>(null);
    const [selectedContactUsername, setSelectedContactUsername] = useState<string>('')
    const scrollToBottomDivRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        console.log("scroll to bottom")
        scrollToBottomDivRef.current?.scrollTo({ top: scrollToBottomDivRef.current.scrollHeight, behavior: 'smooth'});
    };
    // const [toId, setToId] = useState<string>('');

    const fromId = id;
    
    useEffect(()=>{ 
        const toId = selectedContact
        console.log('/Messenger/page.tsx/useEffect/toId')
        console.log(toId)
        console.log("ChatList")
        console.log(chatList)
        const fetchData = async () => {
            setContactList(await getContactList() ?? [])
            setChatList( await getMessageList({fromId,toId}));
            realTimeMessageList({fromId,toId,chatList,setChatList});
        };
        fetchData();
        scrollToBottom();
    },[selectedContact])

    // const userId = userParams
    return (
        <div className="flex justify-center ">
            <div className="grid min-w-[60vw] w-full grid-cols-1 md:grid-cols-3 md:max-w-[90vw] lg:max-w-[70vw] md:h-[100vh] border border-green-500">
                <div className="md:h-full col-span-1 flex flex-col gap-y-1">
                    <div className="flex justify-between px-2 pt-2">
                        <div>
                            <p>Hello {username}</p>
                        </div>
                        <Link href="/">
                            <button onClick={pbLogout}>Logout</button>
                        </Link>
                    </div>
                    <div className="">
                        <NewChat contactList={contactList}
                            setContactList = {setContactList}
                            selectedContact={selectedContact} 
                            setSelectedContact={setSelectedContact}
                            chatList={chatList}
                            setChatList={setChatList}
                            fromId={id}
                            fromUsername={username}>
                            
                        </NewChat>
                        <Contacts 
                            contactList={contactList}
                            setContactList = {setContactList}
                            selectedContact={selectedContact} 
                            setSelectedContact={setSelectedContact}
                            chatList={chatList}
                            setChatList={setChatList}
                            fromId={id}
                            selectedContactUsername={selectedContactUsername}
                            setSelectedContactUsername={setSelectedContactUsername} >
                        </Contacts>
                    </div>
                </div>
                {selectedContactUsername &&
                <div className="col-span-2 md:h-full flex flex-col justify-between">
                    {/* <div className="border"> */}
                        <Chats
                            scrollToBottom={scrollToBottom}
                            scrollToBottomDivRef={scrollToBottomDivRef}
                            chatList={chatList}
                            setChatList = {setChatList}
                            selectedContact={selectedContact} 
                            setSelectedContact={setSelectedContact}
                            selectedContactUsername={selectedContactUsername}>
                        </Chats>
                        <MessageInput 
                            fromId={id}
                            selectedContact={selectedContact}
                            setChatList={setChatList}
                            scrollToBottom={scrollToBottom} >
                        </MessageInput>
                    {/* </div> */}
                </div>}
            </div>
        </div>
    )
}