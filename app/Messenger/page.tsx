"use client"

import Link from "next/link"
import { pbLogout, getUserInfo } from "@/utils/functions"
import Contacts from "./Contacts"
import Chats from "./Chats"
import React, { useState } from "react"
import MessageInput from "./MessageInput"
// import { useState } from "react"

// export default function Messenger({searchParams} : any) {
export default function Messenger() {
    const {email,id,username} = getUserInfo();
    const [selectedContact, setSelectedContact] = useState<any>('null');
    const [chatList, setChatList] = useState<any>(null);
    const [contactList, setContactList] = useState<any>(null);

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
                setSelectedContact={setSelectedContact}>
            </Contacts>
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