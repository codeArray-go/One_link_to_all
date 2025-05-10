"use client"

import React, { useEffect } from 'react'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const page = () => {

    const {data: session} = useSession();

    const router = useRouter();
    useEffect(() => {
        if(session){
            router.push("/generate")
        }
    }, [session, router]);

    return (
        <>
            <div className='text-white container min-h-screen min-w-screen flex justify-center items-center'>

                <div className="Social-media-buttons">
                    <div className="flex flex-col items-center gap-2">
                        <button
                            className="flex items-center cursor-pointer w-60 bg-white border border-gray-300 rounded-lg shadow-md max-w-xs px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">

                            <img src="/googlelogin.svg" className="h-6 w-6 mr-2" alt="" />
                            <span>Continue with Google</span>
                        </button>

                        <button
                            className="flex items-center cursor-pointer w-60 bg-white border border-gray-300 rounded-lg shadow-md max-w-xs px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">

                            <img src="/linkedInlogin.svg" className="h-6 w-6 mr-2" alt="" />
                            <span>Continue with LinkedIn</span>
                        </button>

                        <button
                            className="flex items-center cursor-pointer w-60 bg-white border border-gray-300 rounded-lg shadow-md max-w-xs px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">

                            <img src="/twitterlogin.svg" className="h-6 w-6 mr-2" alt="" />
                            <span>Continue with Twitter</span>
                        </button>

                        <button
                            className="flex items-center cursor-pointer w-60 bg-white border border-gray-300 rounded-lg shadow-md max-w-xs px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">

                            <img src="/facebooklogin.svg" className="h-6 w-6 mr-2" alt="" />
                            <span>Continue with Facebook</span>
                        </button>

                        <button
                            onClick={() => { signIn("github") }}
                            className="flex items-center cursor-pointer w-60 bg-white border border-gray-300 rounded-lg shadow-md max-w-xs px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">

                            <img src="/gitHub.svg" className="h-6 w-6 mr-2" alt="github" />
                            <span>Continue with Github</span>
                        </button>

                        <button
                            className="flex items-center cursor-pointer w-60 bg-white border border-gray-300 rounded-lg shadow-md max-w-xs px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">

                            <img src="/applelogin.svg" className="h-6 w-6 mr-2" alt="" />
                            <span>Continue with Apple</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default page