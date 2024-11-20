"use client"
import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [identity, setIdentity] = useState('');
  const [password, setPassword] = useState('');

  const login = async (e:any) => {
    e.preventDefault();
    const res = await fetch('https://zgecxo.pockethost.io/api/collections/users/auth-with-password' , {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            identity,
            password,
        })
      }
    );
    const data = await res.json();
    const dataToTxt = JSON.stringify(data.token, null, 2)

    // console.log(dataToTxt)

    setIdentity('');
    setPassword('');
  }

  return (
    <div>
      <div>
        Image Here
      </div>
      <div>
        <form className="" onSubmit={login}>
          <div className="flex flex-col">
            <input 
              type="text" 
              className="" 
              value={identity}
              onChange={(e)=>setIdentity(e.target.value)}/>
            <input 
              type="password" 
              className="" 
              value={password}
              onChange={(e)=>setPassword(e.target.value)}/>
          </div>
          <div>
            {/* <LoginButton handleClick={checkLogin} /> */}
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
