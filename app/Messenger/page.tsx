"use client"

import Link from "next/link"
import { pbLogout } from "@/utils/functions"
import Chats from "../Chats/page"
import Contacts from "../Contacts/page"

export default function Messenger() {
    return (
        <div className="grid">
            <div className="flex justify-between">
                <p>User</p>
                <Link href="/"><button onClick={pbLogout}>Logout</button></Link>
            </div>
            <Contacts />
            <Chats />


        </div>
    )
}