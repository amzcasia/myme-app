"use client"

import { testgetContactList, getContactList} from "@/utils/functions"
import { useState, useEffect, use } from "react";
import Link from "next/link";

type inputParamType = {
    selectedContact: string,
    setSelectedContact: Function
    contactList: any[],
    setContactList:Function,
    chatList: any[],
    setChatList: Function,
    fromId: string
}

export default function Contacts({
        contactList, 
        setContactList, 
        selectedContact,
        setSelectedContact, 
        chatList, 
        setChatList, 
        fromId}: inputParamType){
            
    const handleContactList = async () => {
        const temp = await getContactList() ?? []
        // console.log(`selected Contact: ${temp[0].to}`)
        setContactList(temp)
        if (temp.length > 0){
            const temp2 = await setSelectedContact(temp[0].to)
            const toId = selectedContact
        }
    } 

    const handleNewChat = async ()=> {
        
    }

    useEffect(()=>{
        handleContactList();
    },[])

    return(
        <div className="m-2">
            <div className="flex justify-end">
                <button className="border px-2" onClick={()=>handleNewChat}>Start new chat</button>
            </div>
            <div className="border border-green-500 p-1">
                <div className="flex justify-center">
                    <p>
                        Contact List
                    </p>
                </div>
                <div className="my-2 flex flex-col gap-y-2">
                    {contactList?.map((contact:any)=>{
                        return <Contact key={contact.id} 
                        contactId={contact.to} 
                        contactName={contact.toUserName}
                        setSelectedContact={setSelectedContact}/>
                    })}
                </div>
            </div>
        </div>
    )
}

function Contact({contactId, contactName, setSelectedContact}:any){
    return(
        <button className="flex" 
        onClick={(e)=>{setSelectedContact(contactId)}}>
            <p className="">
                {contactName}
            </p>
        </button>
    )
}

