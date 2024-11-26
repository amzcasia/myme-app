"use client"
import { useState } from 'react';
import Link from 'next/link';
import { pbLogin } from '@/utils/functions';
import { useRouter } from "next/navigation";

export default function Home() {
  const [identity, setIdentity] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState(true)
  const router = useRouter();

  const loginResponse = async (e:any) => {
    e.preventDefault(); 
    // setRes(true);
    // const res = login({identity,password});
    const {loggedIn} = await pbLogin({identity,password,setIdentity,setPassword,router});
    setLoginStatus(loggedIn);
    // setIdentity('');
    // setPassword('');
    // return res
  }

  return (
    <div className='flex justify-center'>
      <div className=' max-w-[90vw] md:min-w-[30vw]'>
        <div className='p-2'>
          Messenger
        </div>
        <div>
          <form className="" onSubmit={loginResponse}>
            <div className="flex flex-col  gap-y-2 px-2">
              <input 
                type="text" 
                className="bg-black border border-green-500 p-1 placeholder:text-green-800" 
                value={identity}
                name='identity'
                placeholder='username'
                onChange={(e)=>setIdentity(e.target.value)}/>
              <input 
                type="password" 
                className="bg-black border border-green-500 p-1 placeholder:text-green-800" 
                value={password}
                name='password'
                placeholder='password'
                onChange={(e)=>setPassword(e.target.value)}/>
            </div>
            <div className='flex justify-center my-4'>
              {!loginStatus? <LoginFailed /> : null}
              <button className="py-2 px-4 hover:bg-green-800 border border-green-500 rounded-md" type='submit'>Login</button>                
            </div>
          </form>
          <div className='flex gap-x-1'>
            <p>{"Don't have an account?"}</p>
            <p className='text-green-200 hover:text-green-500'>
              <Link href="/Register">Sign Up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function LoginFailed(){
  return(
  <p>
    Login Failed
  </p>
)}