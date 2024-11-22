"use client"

import Link from "next/link"
import { pbLogout, getUserInfo } from "@/utils/functions"
import Contacts from "./Contacts"
import Chats from "./Chats"
import React, { useState } from "react"
// import { useState } from "react"

// export default function Messenger({searchParams} : any) {
export default function Messenger() {
    const {email,id,username} = getUserInfo();
    const [selectedContact, setSelectedContact] = useState<any>('null');

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
            <Contacts selectedContact={selectedContact} 
                setSelectedContact={setSelectedContact}>
            </Contacts>
            <Chats
                selectedContact={selectedContact} 
                setSelectedContact={setSelectedContact}>
            </Chats>


        </div>
    )
}