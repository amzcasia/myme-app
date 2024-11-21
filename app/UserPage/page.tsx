"use client"

import Link from "next/link"
import { pbLogout } from "@/utils/functions"

export default function UserPage(){
    return(
        <div>
            User
            <Link href="/"><button onClick={pbLogout}>Logout</button></Link>
            
        </div>
    )
}