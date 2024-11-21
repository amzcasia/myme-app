"use client"
import { useState } from 'react';
import Link from 'next/link';
import {login} from '@/utils/loginFunc2'
import { pbLogin, pbLogout } from '@/utils/functions';
import { useRouter } from "next/navigation";

export default function Home() {
  const [identity, setIdentity] = useState('');
  const [password, setPassword] = useState('');
  const [res, setRes] = useState(true)
  const router = useRouter();

  const loginResponse = async (e:any) => {
    e.preventDefault(); 
    // setRes(true);
    // const res = login({identity,password});
    const res2 = await pbLogin({identity,password,setIdentity,setPassword,router});
    setRes(res2 ?? true);
    // setIdentity('');
    // setPassword('');
    return res
  }

  return (
    <div>
      <div>
        Image Here
      </div>
      <div>
        <form className="" onSubmit={loginResponse}>
          <div className="flex flex-col text-black">
            <input 
              type="text" 
              className="" 
              value={identity}
              name='identity'
              onChange={(e)=>setIdentity(e.target.value)}/>
            <input 
              type="password" 
              className="" 
              value={password}
              name='password'
              onChange={(e)=>setPassword(e.target.value)}/>
          </div>
          <div>
            {res? null : <LoginFailed />}
            <button className="" type='submit'>Login</button>                
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