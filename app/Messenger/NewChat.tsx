"use client"

import { useState, useEffect } from "react"
import { getContactList, searchContactUsername, addNewContact } from "@/utils/functions";

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

    // const [identity, setIdentity] = useState('');
    const [searchUsername, setSearchUsername] = useState('');
    const [searchOutputList, setSearchOutputList] = useState<any>([]);
    const [showSearch, setShowSearch] = useState<string>('hidden');

    async function handleSearch(){
        // e.preventDefault()
        // const identiy = e.target.value
        // setIdentity(identity)
        setSearchOutputList(await searchContactUsername({searchUsername}))
    }

    useEffect(()=>{
        handleSearch()
        // if(searchUsername !== ''){
        //     setShowSearch('flex')
        // }else{
        //     setShowSearch('none')
        // }
        setShowSearch( searchUsername? 'flex' : 'none')
    },[searchUsername])

    return(
        <div className="p-2">
            <div className="flex gap-x-2">
                <p>
                    Search user
                </p>
                <div>
                    <input  type="text" placeholder="username/email"
                    onChange={(e)=>{setSearchUsername(e.target.value)}}
                    value={searchUsername} 
                    className="bg-black border px-1 border-green-500 placeholder:text-green-800"/>
                    <button></button>
                </div>
            </div>
            {/* <div style={{display: `"${showSearch}"`}}> */}
            <div className="flex-col" style={{display: `${showSearch}`}}>
                <p>
                    Searching:
                </p>
                <div className="grid gap-y-1">
                    {searchOutputList?.map((item:any)=>{
                        return(
                            <SearchItem key={item.id} 
                            fromId={fromId}
                            searchUsername={item.username} 
                            searchId={item.id} 
                            setSelectedContact={setSelectedContact}
                            contactList={contactList}
                            setContactList={setContactList}/>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

type searchItemType = {
    fromId:string,
    searchUsername:string,
    searchId: string,
    setSelectedContact: Function,
    contactList:any[],
    setContactList: Function
}

function SearchItem({fromId,searchUsername,searchId,setSelectedContact,contactList,setContactList}:searchItemType){
    // const fromId = 
    const toId = searchId;
    const toUsername = searchUsername

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

        <button className="text-start"
            onClick={()=>{addNewContact({fromId,toId,toUsername,contactList,setContactList,setSelectedContact})}}>
                {searchUsername}
        </button>
        </>
    )
}

