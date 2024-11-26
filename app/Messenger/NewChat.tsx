"use client"

import { useState, useEffect } from "react"
import { searchContactUsername, addNewContact } from "@/utils/functions";

type inputParamType = {
    selectedContact: string,
    setSelectedContact: Function
    contactList: any[],
    setContactList:Function,
    chatList: any[],
    setChatList: Function,
    fromId: string,
    fromUsername:string
}


export default function NewChat({
        contactList, 
        setContactList, 
        setSelectedContact, 
        fromId,
        fromUsername}: inputParamType){

    // const [identity, setIdentity] = useState('');
    const [searchUsername, setSearchUsername] = useState('');
    const [searchOutputList, setSearchOutputList] = useState<any>([]);
    
    const [showSearch, setShowSearch] = useState<string>('hidden');

    useEffect(()=>{
        const fetchResults = async()=> {
            setSearchOutputList(await searchContactUsername({searchUsername}))
        }
        fetchResults();
        setShowSearch( searchUsername? 'flex' : 'none');
    },[searchUsername])

    return(
        <div className="p-2">
            <div className="grid grid-cols-3">
                <div className="w-full">
                    <p>Search user</p>
                </div>
                <div className="w-full col-span-2">
                    <input  type="text" placeholder="username/email"
                    onChange={(e)=>{setSearchUsername(e.target.value)}}
                    value={searchUsername} 
                    className="bg-black w-full border px-1 border-green-500 placeholder:text-green-800"/>
                    <button></button>
                </div>
            </div>
            {/* <div style={{display: `"${showSearch}"`}}> */}
            <div className="flex-col" style={{display: `${showSearch}`}}>
                <p>
                    Searching:
                </p>
                <div className="flex flex-col gap-y-1">
                    {searchOutputList?.map((item:any)=>{
                        return(
                            <SearchItem key={item.id} 
                            fromId={fromId}
                            fromUsername={fromUsername}
                            searchUsername={item.username} 
                            searchId={item.id} 
                            setSelectedContact={setSelectedContact}
                            contactList={contactList}
                            setContactList={setContactList}
                            setSearchUsername={setSearchUsername}/>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

type searchItemType = {
    fromId:string,
    fromUsername:string,
    searchUsername:string,
    searchId: string,
    setSelectedContact: Function,
    contactList:any[],
    setContactList: Function,
    setSearchUsername:Function
}

function SearchItem({fromId,fromUsername,searchUsername,searchId,setSelectedContact,contactList,setContactList,setSearchUsername}:searchItemType){
    // const fromId = 
    const toId = searchId;
    const toUsername = searchUsername

    const handleNewChat = async () => {
        setSearchUsername('');
        await addNewContact({fromId,fromUsername,toId,toUsername,contactList,setContactList,setSelectedContact})
    }

    // const addNewContact = async() => {
        // await setSelectedContact(id)
        // const fetchContactList = getContactList()
        // const contactListId = fetchContactList.map((contact:any) => ({
            //     id: contact.id 
            // }));
            
            // setChatList((prev:any[])=>[...prev, e.record])
            
            // await setContactList((prev: any[])=>[...prev,searchId])
        // }

    return(
        <>
        {/* <button className="text-start">
            {searchUsername}
        </button> */}

        <button className="text-start grow-0 hover:bg-green-900"
            onClick={()=>{handleNewChat()}}>
                {searchUsername}
        </button>
        </>
    )
}

