
import Link from 'next/link'
export default function Chats(){
    return(
        <div>
            <nav className="flex">
                <Link href="/UserProfile">
                    ProfPic
                </Link>
                <div>
                    Settings
                </div>
            </nav>
            <main>

            </main>
        </div>
    );
}