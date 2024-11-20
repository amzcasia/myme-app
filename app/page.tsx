import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <div>
        Image Here
      </div>
      <div>
        <form action="" className="">
          <div className="flex flex-col">
            <input type="text" className="" />
            <input type="password" className=""/>
          </div>
          <div>
            {/* <button>Login</button> */}
            <Link href="/Chats">Login</Link>
          </div>
        </form>
        <div>
          <p>Don't have an account?</p>
          <Link href="/Register">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}
