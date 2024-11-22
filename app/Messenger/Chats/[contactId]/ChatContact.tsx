import Link from "next/link"


export default async function ChatContact({params}:any){
    const {contactId} = await params;
    return(
        <div>
            <div className="flex justify-between">
                <p>Chat with Contact</p>
                <Link href='/Messenger'>
                    <p>Back</p>
                </Link>
            </div>
            <div>
                <p>
                    contactId: {contactId}
                </p>
            </div>
        </div>
    )
}

async function getMessages(params:any) {
    
}