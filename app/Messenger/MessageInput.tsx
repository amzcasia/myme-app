"use client"
import { useState } from "react"
import { sendMessage, getMessageList } from "@/utils/functions"

type inputParamType = {
    selectedContact: string,
    fromId: string,
    setChatList: Function
}

export default function MessageInput({fromId, selectedContact, setChatList}: inputParamType){
    const [message, setMessage] = useState<string>('')
    const handleSendMessage = async(e:any) =>{
        // const fromId = id
        e.preventDefault();
        const to = selectedContact;
        const from = fromId
        const toId = selectedContact
        const msgSent = await sendMessage({from,to,message});
        // setChatList( await getMessageList({fromId,toId}))
        setMessage('');
    }

    return(
        <form onSubmit={handleSendMessage} className="m-2 gap-y-2 text-green flex flex-col justify-center">
            <textarea 
            onChange={(e)=>{setMessage(e.target.value)}} 
            value={message} 
            placeholder="Message"
            className="w-full p-1 min-h-5 bg-black border border-green-500  placeholder-green-900" name="" id="messageInput"></textarea>
            <button type="submit" className="p-1 rounded-sm border border-green-500 hover:bg-green-900">Send</button>
        </form>
    )
}