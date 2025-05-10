"use client"

import { Rubik, Poppins } from "next/font/google";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

const rub = Rubik({
  variable: "--font-Rubik",
  subsets: ["latin"],
});

const pop = Poppins({
  variable: "--font-Poppins",
  weight: "400",
  subsets: ["latin"],
});

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();
  const [text, setText] = useState("");

  const createTree = () => {
    if (session) {
      router.push(`/generate?handle=${text}`);
    } else {
      router.push('/login');
    }
  };

  return (
    <main className="pt-32 px-4 sm:px-8 lg:px-16 xl:px-24">
      <section className="max-w-[1366px] mx-auto flex flex-col items-center gap-20">
        
        {/* Top Text Section */}
        <div className="flex flex-col items-center gap-6 text-center w-full md:w-3/4">
          <h1 className={`text-white font-normal text-4xl sm:text-5xl md:text-6xl leading-tight ${rub.className}`}>
            A unified link to all,<br /> essential resource.
          </h1>
          <p className={`text-white text-base sm:text-lg md:text-xl ${rub.className} tracking-[.36px]`}>
            Easily consolidate your digital presence with a single, organized link. Share your content, tools, and profiles from platforms like GitHub, LinkedIn, YouTube, and more - all in one accessible location.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center items-center">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              type="text"
              className="w-full sm:w-auto bg-white px-4 py-3 rounded-lg font-medium focus:outline-4 focus:outline-green-600"
              placeholder="Enter your handle..."
            />
            <button
              onClick={createTree}
              type="button"
              className={`text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 font-semibold rounded-lg text-sm px-5 py-3 inline-flex items-center ${rub.className}`}
            >
              Claim Your LinkTree
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="bg-white w-full h-[1px]" />

        {/* Bottom Content Section */}
        <div className="flex flex-col-reverse lg:flex-row w-full gap-10 items-center justify-between">
          {/* Left Image */}
          <div className="w-full lg:w-1/2">
            <img src="/Show.svg" alt="illustration" className="w-full h-auto" />
          </div>

          {/* Right Content */}
          <div className="w-full lg:w-1/2 flex flex-col gap-6 items-center justify-center text-center">
            <h2 className={`${pop.className} font-semibold text-white text-2xl sm:text-3xl md:text-4xl leading-snug`}>
              Ready to begin? Click to generate a single, unified link for all your content.
            </h2>
            <button
              onClick={createTree}
              type="button"
              className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 font-medium rounded-lg text-lg px-6 py-2 inline-flex items-center gap-2 ${rub.className}`}
            >
              Click to start
              <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
