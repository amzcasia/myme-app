"use client"
import { useState } from "react"
import { sendMessage } from "@/utils/functions"

type inputParamType = {
    selectedContact: string,
    fromId: string,
    setChatList: Function
}

export default function MessageInput({fromId, selectedContact}: inputParamType){
    const [message, setMessage] = useState<string>('')
    const handleSendMessage = async(e:any) =>{
        e.preventDefault();
        const to = selectedContact;
        const from = fromId
        await sendMessage({from,to,message});
        setMessage('');
    }

    return(
        <form onSubmit={handleSendMessage} className="m-2 gap-y-2 text-green flex flex-col justify-center">
            <div className="flex flex-col md:flex-row">
                <textarea 
                onChange={(e)=>{setMessage(e.target.value)}} 
                value={message} 
                placeholder="Message"
                className="w-full p-1 min-h-5 bg-black border border-green-500  placeholder-green-900" name="" id="messageInput"></textarea>
                <button type="submit" className="md:min-w-20 w-full p-1 rounded-sm border border-green-500 hover:bg-green-900">Send</button>
            </div>
        </form>
    )
}