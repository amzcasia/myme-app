"use client"

export default function LoginButton(handleClick: any){
    return(
        <>
        <button onClick={()=>handleClick()}>Login</button>
        </>
    );
}