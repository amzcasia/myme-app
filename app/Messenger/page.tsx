"use client"

import Link from "next/link"
import { pbLogout, getUserInfo, realTimeMessageList, getMessageList } from "@/utils/functions"
import Contacts from "./Contacts"
import Chats from "./Chats"
import React, { useState, useEffect } from "react"
import MessageInput from "./MessageInput"
import NewChat from "./NewChat"
// import { useState } from "react"

// export default function Messenger({searchParams} : any) {
export default function Messenger() {
    const {email,id,username} = getUserInfo();
    const [selectedContact, setSelectedContact] = useState<any>('null');
    const [chatList, setChatList] = useState<any>(null);
    const [contactList, setContactList] = useState<any>(null);


    const fromId = id;
    const toId = selectedContact

    const handleGetChatList = async ()=>{
        setChatList( await getMessageList({fromId,toId}));
    }

    useEffect(()=>{ 
        handleGetChatList()
        realTimeMessageList({fromId,toId,chatList,setChatList});

    },[selectedContact])

    // const userId = userParams
    return (
        <div className="grid">
            <div className="flex justify-between">
                <div>
                    <p>{username}</p>
                </div>
                <Link href="/">
                    <button onClick={pbLogout}>Logout</button>
                </Link>
            </div>
            <Contacts 
                contactList={contactList}
                setContactList = {setContactList}
                selectedContact={selectedContact} 
                setSelectedContact={setSelectedContact}
                chatList={chatList}
                setChatList={setChatList}
                fromId={id} >
            </Contacts>
            <NewChat contactList={contactList}
                setContactList = {setContactList}
                selectedContact={selectedContact} 
                setSelectedContact={setSelectedContact}
                chatList={chatList}
                setChatList={setChatList}
                fromId={id}>
            </NewChat>
            <Chats
                chatList={chatList}
                setChatList = {setChatList}
                selectedContact={selectedContact} 
                setSelectedContact={setSelectedContact}>
            </Chats>
            <MessageInput 
                fromId={id}
                selectedContact={selectedContact}
                setChatList={setChatList} >
            </MessageInput>

        </div>
    )
}