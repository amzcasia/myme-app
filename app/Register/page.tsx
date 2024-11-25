"use client"

import Link from 'next/link'
import {useState} from 'react';
import { pbRegister} from '@/utils/functions';
import { useRouter } from 'next/navigation';

export default function Register(){
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const handleRegister = async (e:any) =>{
        e.preventDefault();
        const res = await pbRegister(
        {
            email,
            username,
            password,
            passwordConfirm,
            setEmail,
            setUsername,
            setPassword,
            setPasswordConfirm,
            router
        });

        if (res?.username != ""){
            // router.push(`/Messenger?username=zzzzz`);
            router.push(`/Messenger?username=${username}`)
        }
    }

    return (
        <div className='m-2'>
            <div className='flex justify-center py-2'>
                <p>Create Account</p>
            </div>

            <form className='grid gap-y-2'  onSubmit={handleRegister}>
                <div className='flex justify-between '>
                    <label htmlFor="email">Email</label>
                    <input className='text-black' type="email" id="email" onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <div className='flex justify-between'>
                    <label htmlFor="username">Username</label>
                    <input className='text-black' type="text" id="username" onChange={(e)=>setUsername(e.target.value)}/>
                </div>
                <div className='flex justify-between'>
                    <label htmlFor="password">Password</label>
                    <input className='text-black' type="password" id="password" onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                <div className='flex justify-between'>
                    <label htmlFor="password">Confirm Password</label>
                    <input className='text-black' type="password" id="passwordConfirm" onChange={(e)=>setPasswordConfirm(e.target.value)}/>
                </div>
                {/* <div className='grid px-2 py-1 rounded-md '>
                    <button className='hover:bg-green-900 grow-0' type="submit">Register</button>
                </div> */}

                <div className='flex justify-center my-2'>
                    <button className="py-1 px-4 hover:bg-green-800 border border-green-500 rounded-md" type='submit'>Register</button>                
                </div>
            </form>

            <div className='flex gap-x-2'>
                <p>
                    Already have an account?
                </p>
                <Link href="/">
                    <p className='text-green-200 hover:text-green-500'>
                        Sign In
                    </p>
                </Link>
            </div>
        </div>
    );
}