"use client"

import { deleteContact, getContactList } from "@/utils/functions"
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
        
    useEffect(()=>{
        const handleContactList = async () => {
            const temp = await getContactList() ?? []

            setContactList(temp)
            if (temp.length > 0){
                const temp2 = await setSelectedContact(temp[0].to)
                const toId = selectedContact
            }
        }
        handleContactList();
    },[selectedContact])
// },[])

    return(
        <div className="m-2">
            {/* <div className="flex justify-end">
                <button className="border px-2" onClick={()=>handleNewChat}>Start new chat</button>
            </div> */}
            <div className="border border-green-500 p-1">
                <div className="flex justify-center pt-1">
                    <p>
                        Contact List
                    </p>
                </div>
                <div className="flex flex-col">
                    {contactList?.map((contact:any)=>{
                        return <Contact key={contact.id} 
                        fromId={contact.from}
                        contactId={contact.to} 
                        contactName={contact.toUsername}
                        setSelectedContact={setSelectedContact}/>
                    })}
                </div>
            </div>
        </div>
    )
}

function Contact({fromId,contactId, contactName, setSelectedContact}:any){
    const toId = contactId
    return(
        <div className="flex justify-between p-1 group">
            <p className="hover:cursor-pointer hover:bg-green-900 px-1"
            onClick={(e)=>{setSelectedContact(contactId)}}>
                {contactName}
            </p>
            <button className="hidden rounded-md group-hover:flex font-semibold px-2 hover:bg-green-900 hover:text-green-100"
            onClick={()=>{deleteContact({fromId,toId})}}>
                x</button>
        </div>
    )
}

