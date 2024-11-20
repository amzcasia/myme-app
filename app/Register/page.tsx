import Link from 'next/link'

export default function Register(){
    return (
        <div>
            <p>Create Account</p>

            <form action="">
                <div>
                    <label htmlFor="email">email</label>
                    <input type="email" id="email"/>
                </div>
                <div>
                    <label htmlFor="username">username</label>
                    <input type="text" id="username"/>
                </div>
                <div>
                    <label htmlFor="password">password</label>
                    <input type="password" />
                </div>
                <div>
                    {/* <button>
                        Register
                    </button> */}
                    <Link href="./Chats">
                        Register
                    </Link>
                </div>
            </form>

            <div>
                <p>
                    Already have an account?
                </p>
                <Link href="/">
                    Sign In
                </Link>
            </div>
        </div>
    );
}