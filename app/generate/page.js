"use client"

import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { Poppins, Rubik } from 'next/font/google';

const pop = Poppins({
  variable: "--font-Poppins",
  weight: "600",
  subsets: ["latin"],
});

const rub = Rubik({
  variable: "--font-Rubik",
  subsets: ["latin"],
});

const page = () => {

  const searchParams = useSearchParams();
  const [links, setLinks] = useState([{ link: "", linktext: "" }]);
  const [handle, setHandle] = useState(searchParams.get('handle'));
  const [picture, setPicture] = useState("");
  const [description, setDescription] = useState("");

  const handleChange = (index, link, linktext) => {
    setLinks((initialLinks) => {
      return initialLinks.map((item, i) => {
        if (i == index) {
          return { link, linktext };
        } else {
          return item
        }
      })
    })
  }

  const addlink = () => {
    setLinks(links.concat([{ link: "", linktext: "" }]));
  }

  const submitlinks = async () => {

    const formattedLinks = links.map(item => ({
      url: item.link,
      title: item.linktext
    }));

    const raw = JSON.stringify({
      links: formattedLinks,
      handle: handle,
      picture: picture,
      description: description
    });

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: raw,
      credentials: 'include',
    };

    const out = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/updateProfile`, requestOptions);
    const result = await out.json();

    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }

  }

  return (
    <>
      <div className='absolute -z-10 top-0 left-0 bg-[url("/BG.jpg")] bg-cover blur-[3px] h-full w-screen bg-center'></div>

      <div className='generate grid grid-cols-2 text-white'>

        {/* column 1 */}
        <div className="col1 flex justify-center items-end flex-col w-full pt-5">
          <div className='flex flex-col gap-3'>
            <h1 className={`text-3xl ${pop.className}`}>Create your LinkTree</h1>
            <ToastContainer />

            <div className="item">
              <h2 className={`${rub.className} font-medium`}>Step 1: Claim your Handle</h2>
              <div className='mx-2'>
                <input onChange={(e) => setHandle(e.target.value)} value={handle || ""} className='bg-white text-zinc-950 px-4 py-2 focus:outline-4 focus:outline-pink-200 rounded-lg my-2 mx-2 imput' type="text" placeholder='Choose handle' />
              </div>
            </div>

            <div className="item">
              <h2 className={`${rub.className}`}>Step 2: Add your Links</h2>
              {links && links.map((item, index) => {
                return <div key={index} className='mx-2'>
                  <input value={item.link} onChange={e => handleChange(index, e.target.value, item.linktext)} className='bg-white px-4 py-2 focus:outline-4 focus:outline-pink-200 rounded-lg my-2 mx-2 text-zinc-950' type="text" placeholder='Enter Link' />

                  <input value={item.linktext} onChange={e => handleChange(index, item.link, e.target.value)} className='bg-white px-4 py-2 focus:outline-4 focus:outline-pink-200 rounded-lg my-2 mx-2 text-zinc-950' type="text" placeholder='Enetr Link Text' />
                </div>
              })}
              <button type='button' onClick={() => addlink()} className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 m-1 mx-4 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">+ Add Link</button>
            </div>

            <div className="item">
              <h2 className={`${rub.className}`} > Step 3: Add a Profile picture and finilize</h2>
              <div className="mx-2 flex flex-col">
                <input
                  value={picture}
                  onChange={e => setPicture(e.target.value)}
                  className='bg-white h-10 px-4 py-2 focus:outline-4 focus:outline-pink-200 rounded-lg my-2 mx-2 text-zinc-950'
                  placeholder='Enter URL to you image.'
                />

                <div className='my-5 flex flex-col'>
                  <label htmlFor="textarea">Enter Description for this collection :- </label>
                  <textarea value={description} onChange={e => setDescription(e.target.value)} className='bg-white px-4 py-1 focus:outline-4 focus:outline-pink-200 rounded-lg my-1 mx-2 text-zinc-950' type="text" placeholder='Add discription here'></textarea>
                </div>
                <button disabled={picture == "" || handle == "" || links[0].linktext == ""} onClick={() => { submitlinks() }} className='disabled:bg-slate-400 p-2 px-3 text-sm mx-2 bg-zinc-900 text-white rounded-lg font-medium cursor-pointer'>Create</button>
              </div>
            </div>
          </div>
        </div>

        {/* column 2 */}
        {/* <div className="col2 flex items-center justify-center mr-24">
        <img src="/Column.png" className='object-cover w-[600px] h-[400px]' alt="image" />
      </div> */}
      </div >
    </>
  )
}

export default page
