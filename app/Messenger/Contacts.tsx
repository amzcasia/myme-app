"use client"

import { testgetContactList, getContactList } from "@/utils/functions"
import { useState, useEffect, use } from "react";
import Link from "next/link";

type inputParamType = {
    selectedContact: string,
    setSelectedContact: Function
}

export default function Contacts({selectedContact,setSelectedContact}: inputParamType){
    // const contactList = () => {await getContactList()}
    // console.log(contactList)
    // let contactList = [];
    const [contactList, setContactList] = useState<any>(null);
    

    const handleContactList = async () => {
        // const zzz = await getContactList();
        setContactList(await getContactList())
    } 
    
    useEffect(()=>{
        console.log("contact page.tsx")
        handleContactList();
    },[])

    return(
        <div className="my-2 grid justify-start">
            {contactList?.map((contact:any)=>{
                return <Contact key={contact.id} 
                contactId={contact.to} 
                contactName={contact.toUserName}
                setSelectedContact={setSelectedContact}/>
            })}
        </div>
    )
}

function Contact({contactId, contactName, setSelectedContact}:any){
    return(
        <button onClick={(e)=>{setSelectedContact(contactId)}}>
            <p className="">
                {contactName}
            </p>
            <p>
                {contactId}
            </p>
        </button>
    )
}

