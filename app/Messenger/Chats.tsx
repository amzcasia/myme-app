"use Client"

import Link from 'next/link'
import { useEffect } from 'react'

type inputParamType = {
    selectedContact: string,
    setSelectedContact: Function
}

export default function Chats( {selectedContact,setSelectedContact}: inputParamType){
    useEffect(()=>{
        
    },[selectedContact])

    return(
        <div className='flex justify-between'>
            <p>Chats</p>
            <p>{selectedContact}</p>
            <div>
                <Link href='/Messenger'>Back</Link>
            </div>

        </div>
    );
}