"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Rubik } from 'next/font/google';
import { usePathname } from "next/navigation";
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const rub = Rubik({
  variable: "--font-Rubik",
  subsets: ["latin"],
});

const Navbar = () => {

  const [ShowDropDown, setShowdropdown] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const loginKaro = () => {
    if (session) {
      router.push("/generate");
    } else {
      router.push("/login");
    }
  }

  const pathname = usePathname();
  const showNavBar = ["/", "/generate", "/login", "/Dashboard"].includes(pathname);
  const [isPressed, setIsPressed] = useState(false);
  const [signUpPressed, setSignUpPressed] = useState(false);
  const [menuVisible, setMenuVisible] = useState(true);
  const [userHandle, setUserHandle] = useState("");

  useEffect(() => {
    const handleFetch = async () => {
      const out = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/Get`);
      const data = await out.json();
      console.log(data);
      setUserHandle(data.handle)
    }
    handleFetch();
  }, [session])

  const yourPage = () => {
    router.push(`/${userHandle}`)
  }

  const handleToggle = () => {
    setMenuVisible(prev => !prev)
  }

  return (<>{showNavBar && <div className='h-[100px] w-full fixed top-0 left-0 flex items-center justify-center z-10'>
    <nav className='w-[70%] h-[75px] bg-[#e0e5ec] px-10
    flex items-center justify-between rounded-full relative' >
      <div className="left flex gap-8 px-4">
        <div className="logo rounded flex items-center">
          <Link href="/" className={` text-[23px] font-semibold ${rub.className}`} >
            <span className="text-green-700" >&lt;</span>
            <span className='text-slate-600' >All</span>
            <span className='text-green-700'>|</span>
            <span className='text-slate-600' >Links</span>
            <span className='text-green-700'>/&gt;</span>
          </Link>
        </div>

        <ul className='flex items-center font-medium gap-8 text-gray-600'>
          <li onClick={() => loginKaro()} className='cursor-pointer gen' >Generate</li>
        </ul>
      </div>

      <div className="Btns flex">
        <button onClick={handleToggle} className='ham block lg:hidden cursor-pointer'>
          <img src="/hamburger.svg" className='h-8' alt="hamberger" />
        </button>

        <div className={`smButton invisible lg:visible flex items-center gap-5 ${menuVisible ? "visible" : ""} transition-opacity duration-300`}>

          {!session && <Link href={"/login"}>
            <button onMouseDown={() => setIsPressed(true)}
              onMouseUp={() => setIsPressed(false)}
              onMouseLeave={() => setIsPressed(false)}
              style={{
                boxShadow: isPressed
                  ? "inset 7px 7px 20px #a3b1c6, inset -5px -5px 20px #ffffff"
                  : "6px 6px 20px #a3b1c6, -4px -4px 20px #ffffff"
              }} className='px-4 py-3 bg-[#e0e5ec] text-gray-500 rounded-[8px] font-semibold cursor-pointer'>Log in</button></Link>
          }

          <div className='relative'>
            {session &&
              <>
                <button
                  style={{ boxShadow: "6px 6px 20px #a3b1c6, -4px -4px 20px #ffffff" }}
                  onBlur={() => {
                    setTimeout(() => {
                      setShowdropdown(false);
                    }, 100);
                  }} onClick={() => { setShowdropdown(!ShowDropDown) }} id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="px-4 py-3 bg-[#e0e5ec] text-gray-500 rounded-[8px] font-semibold cursor-pointer flex items-center justify-center" type="button"> Welcome back<svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                  </svg>
                </button>

                <div id="dropdown" className={` ${ShowDropDown ? "" : "hidden"} left-0 absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-[169px] mt-2 dark:bg-[#e0e5ec]`}>
                  <ul className="py-2 text-sm text-gray-700 dark:text-gray-700" aria-labelledby="dropdownDefaultButton">
                    <li onClick={yourPage} className="flex cursor-pointer items-center justify-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-white dark:hover:text-black ">Your page</li>

                    <Link onClick={() => { signOut({ callbackUrl: '/login' }) }} href="#"> <li
                      className="flex items-center justify-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-white dark:hover:text-black">Sign out
                    </li></Link>
                  </ul>
                </div>
              </>
            }
          </div>
          {session && <button onMouseDown={() => setSignUpPressed(true)}
            onMouseUp={() => setSignUpPressed(false)}
            onMouseLeave={() => setSignUpPressed(false)}
            style={{
              boxShadow: signUpPressed
                ? "inset 7px 7px 20px #a3b1c6, inset -5px -5px 20px #ffffff"
                : "6px 6px 20px #a3b1c6, -4px -4px 20px #ffffff"
            }} onClick={() => signOut({ callbackUrl: '/login' })} className='px-4 py-3 bg-[#e0e5ec] text-gray-500 rounded-[8px] font-semibold cursor-pointer' >Sign Out</button>}
        </div>
      </div>
    </nav >

  </div >
  }</>)
}

export default Navbar