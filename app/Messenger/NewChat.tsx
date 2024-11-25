"use client"

import { useState, useEffect } from "react"
import { searchIdentity } from "@/utils/functions";

type inputParamType = {
    selectedContact: string,
    setSelectedContact: Function
    contactList: any[],
    setContactList:Function,
    chatList: any[],
    setChatList: Function,
    fromId: string
}


export default function NewChat({
        contactList, 
        setContactList, 
        selectedContact,
        setSelectedContact, 
        chatList, 
        setChatList, 
        fromId}: inputParamType){

    const [identity, setIdentity] = useState('');
    const [searchOutputList, setSearchOutputList] = useState<any>([]);

    async function handleSearch(){
        // e.preventDefault()
        // const identiy = e.target.value
        // setIdentity(identity)
        setSearchOutputList(await searchIdentity({identity}))
    }
    
    useEffect(()=>{
        handleSearch()
    },[identity])

    return(
        <div className="p-2">
            <div className="flex gap-x-2">
                <p>
                    Search user
                </p>
                <div>
                    <input  type="text" placeholder="username/email"
                    onChange={(e)=>{setIdentity(e.target.value)}}
                    value={identity} 
                    className="bg-black border px-1 border-green-500 placeholder:text-green-800"/>
                    <button></button>
                </div>
            </div>
            <div>
                <p>
                    Searching:
                </p>
                <div className="grid gap-y-1">
                    {searchOutputList?.map((item:any)=>{
                        return(
                            <SearchItem key={item.id} username={item.username} id={item.id} setSelectedContact={setSelectedContact}/>
                        )
                    })}
                </div>

            </div>
        </div>
    )
}

type searchItemType = {
    username:string,
    id: string,
    setSelectedContact: Function
}

function SearchItem({username,id,setSelectedContact}:searchItemType){
    return(
        <>
        <button className="text-start">
            {username}
        </button>
        {/* <button className="text-start"
            onClick={()=>{setSelectedContact({id})}}>
                {username}
        </button> */}
        </>
    )
}

