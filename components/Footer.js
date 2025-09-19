"use client"

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import useAuthStore from "@/store/authStore";

const Footer = () => {

  const { login } = useAuthStore()
  const pathname = usePathname();
  const showFooter = ["/", "/generate"].includes(pathname);
  if (!showFooter) return null;

  return (
    <>
      <footer className="mt-10 py-16 w-screen flex flex-col items-center justify-center bg-[#272833] text-white border-x">
        <div className="mb-16 flex items-center flex-col justify-center">
          <h1 className="text-3xl NunitoEB font-bold mb-8 text-white"> <span className="text-cyan-700">&lt;</span>AllLinks<span className="text-cyan-700">&#8725;&gt;</span></h1>
          <ul className="flex gap-10 text-[16px] text-[#99a1af] Ruda ">
            <Link href="/login"><li className="hover:text-white">Login</li></Link>
            <Link href={`/${login ? "login" : "generate"}`} ><li className="hover:text-white">Generate</li></Link>
            <Link href="https://my-portfolio-seven-delta-21.vercel.app/" target="_blank"><li className="hover:text-white">Developer</li></Link>
          </ul>
        </div>

        <div className="flex gap-5 items-center justify-center">
          <Link href="https://www.linkedin.com/in/akhil-singh-bhandari-4267a4310/" target="_blank" className="hover:scale-110 duration-300">
            <Image src="/logos/LinkedIn.svg" className="invert" width={35} height={35} alt="LinkedLogo" />
          </Link>

          <Link href="/">
            <Image src="/logos/Twitter.svg" className="invert" width={35} height={35} alt="TwitterLogo" />
          </Link>

          <Link href="https://github.com/codeArray-go" target="_blank" className="hover:scale-110 duration-300">
            <Image src="/logos/gitHub.svg" width={35} height={35} className="invert" alt="GithubLogo" />
          </Link>

          <Link href="https://www.instagram.com/_bhayiya_ji/" target="_blank" className="hover:scale-110 ease-in-out duration-300">
            <Image src="/logos/Instagram.svg" width={35} height={35} className="invert" alt="GithubLogo" />
          </Link>
        </div>

        <p className="mt-8 text-white text-xs">&copy; 2025 AllLinks. All rights reserved</p>
      </footer >
    </>
  )
}

export default Footer;
