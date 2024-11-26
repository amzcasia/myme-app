"use client"
import { useState } from "react"
import { sendMessage } from "@/utils/functions"

type inputParamType = {
    selectedContact: string,
    fromId: string,
    setChatList: Function,
    scrollToBottom: Function
}

export default function MessageInput({fromId, selectedContact, scrollToBottom}: inputParamType){
    const [message, setMessage] = useState<string>('')
    const handleSendMessage = async(e:any) =>{
        e.preventDefault();
        const to = selectedContact;
        const from = fromId
        await sendMessage({from,to,message});
        setMessage('');
    }

    return(
        <form onSubmit={handleSendMessage} className="m-2 text-green sticky bottom-0 bg-black">
            <div className="flex flex-col md:flex-row gap-y-1 md:gap-x-2">
                <div className="w-full">
                    <textarea 
                    onChange={(e)=>{setMessage(e.target.value)}} 
                    value={message} 
                    placeholder="Message"
                    className="w-full h-full resize-none p-1 bg-black border border-green-500  placeholder-green-900" name="" id="messageInput"></textarea>
                </div>
                <div className="md:min-w-32 border-green-500 border hover:bg-green-900 flex ">
                    <button onClick={()=>{scrollToBottom()}} type="submit" className="rounded-sm w-full p-2">Send</button>
                </div>
            </div>
        </form>
    )
}