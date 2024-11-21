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

        if (res != ""){
            router.push('/Messenger');
        }
    }

    return (
        <div>
            <p>Create Account</p>

            <form className='max-w-[60vw]'  onSubmit={handleRegister}>
                <div className='flex justify-between border border-black'>
                    <label htmlFor="email">Email</label>
                    <input className='text-black' type="email" id="email" onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <div className='flex justify-between border border-black'>
                    <label htmlFor="username">Username</label>
                    <input className='text-black' type="text" id="username" onChange={(e)=>setUsername(e.target.value)}/>
                </div>
                <div className='flex justify-between border border-black'>
                    <label htmlFor="password">Password</label>
                    <input className='text-black' type="password" id="password" onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                <div className='flex justify-between border border-black'>
                    <label htmlFor="password">Confirm Password</label>
                    <input className='text-black' type="password" id="passwordConfirm" onChange={(e)=>setPasswordConfirm(e.target.value)}/>
                </div>
                <div>
                    <button className='' type="submit">Register</button>
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