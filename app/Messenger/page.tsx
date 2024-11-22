"use client"

import Link from "next/link"
import { pbLogout } from "@/utils/functions"
import Chats from "../Chats/page"
import Contacts from "../Contacts/page"

type loginProps = {
    userId: string,
    token: string
}

export default function Messenger({searchParams} : {searchParams : { userId? : string}}) {
    const userId = searchParams.userId
    return (
        <div className="grid">
            <div className="flex justify-between">
                <p>Hello, {userId}!</p>
                <Link href="/"><button onClick={pbLogout}>Logout</button></Link>
            </div>
            <Contacts />
            <Chats />


        </div>
    )
}