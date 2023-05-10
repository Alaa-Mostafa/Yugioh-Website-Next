import React from 'react';
import Link from 'next/link';
import {useSession, signIn, signOut} from 'next-auth/react';

const Navbar = () => {

    const button_style = "btn border border-secondary border-2 px-5 py-2 fw-semibold ms-5";
    const {data:session} = useSession();

    if (session) {
        return (
            <div className="py-2 d-flex justify-content-start bg-dark-subtle">
        
                <Link className={button_style} href="/"> Home </Link>
                <Link className={button_style} href="/cards"> Cards </Link>
                <Link className={button_style} href="/cards/add"> Add Card </Link>
                <Link className={button_style} href="/api/auth/signout" onClick={()=>signOut()}> SignOut </Link>
    
            </div>
        );
    }

    return (
        <div className="py-2 d-flex justify-content-start bg-dark-subtle">
            <Link className={button_style} href="/"> Home </Link>
            <Link className={button_style} href="/cards"> Cards </Link>
            <Link className={button_style} href="/api/auth/signout" onClick={()=>signIn()}> Signin </Link>
        </div>
    );

};

export default Navbar;