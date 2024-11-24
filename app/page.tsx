"use client"
import { useState } from 'react';
import Link from 'next/link';
import {login} from '@/utils/loginFunc2'
import { pbLogin, pbLogout, checkLoginStatus } from '@/utils/functions';
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
    const {loggedIn, username} = await pbLogin({identity,password,setIdentity,setPassword,router});
    setLoginStatus(loggedIn);
    // setIdentity('');
    // setPassword('');
    // return res
  }

  return (
    <div>
      <div>
        Image Here
      </div>
      <div>
        <form className="" onSubmit={loginResponse}>
          <div className="flex flex-col text-black gap-y-1 px-2">
            <input 
              type="text" 
              className="" 
              value={identity}
              name='identity'
              placeholder='username'
              onChange={(e)=>setIdentity(e.target.value)}/>
            <input 
              type="password" 
              className="" 
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
        <div>
          <p>Don't have an account?</p>
          <Link href="/Register">Sign Up</Link>
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