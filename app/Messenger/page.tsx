"use client"

import Link from "next/link"
import { pbLogout } from "@/utils/functions"
import Chats from "./Chats/page"
import Contacts from "./Contacts/page"
import React from "react"

export default function Messenger({searchParams} : any) {

    const userParams: any = React.use(searchParams)
    const username = userParams.username
    // const userId = userParams
    return (
        <div className="grid">
            <div className="flex justify-between">
                <p>Hello, {username}!</p>
                <Link href="/"><button onClick={pbLogout}>Logout</button></Link>
            </div>
            <Contacts />
            <Chats />


        </div>
    )
}