"use client"

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import useAuthStore from '@/store/authStore';
import Button from './Button';
import Dropdown from './Dropdown';
import { useEffect } from 'react';
import Image from 'next/image';

const Navbar = () => {
  const router = useRouter();
  const { user, isAuthenticated, logout, checkAuth, edit } = useAuthStore();

  useEffect(() => {
    checkAuth()
  }, []);

  const loginKaro = () => {
    router.push("/login");
  };

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  const pathname = usePathname();
  const showNavBar = ["/", "/generate", "/login"].includes(pathname);

  if (!showNavBar) return null;

  return (
    <div className="h-[100px] w-full flex items-center justify-center z-10">
      <nav className="w-full justify-between h-[70px] shadow-gray-700 px-6 sm:px-10 flex items-center rounded-xl relative">
        <Link href="/">
          <h1 className="text-2xl sm:text-3xl NunitoEB font-bold text-slate-700 flex items-center justify-around">
            <span className="text-cyan-700">&lt;</span>
            A<Image src="Logo.svg" height={30} width={30} className='invert' alt='Logo' />L
            <span className="text-cyan-700">&gt;</span>
          </h1>
        </Link>

        {isAuthenticated ? (
          <div className="NunitoEB text-green-500 flex items-center justify-center gap-3">
            <Dropdown logout={handleLogout} user={user} />
            <div className="hidden sm:block">
              <Button text="LogOut" click={handleLogout} />
            </div>
          </div>
        ) : (
          <Button text="LogIn" click={loginKaro} />
        )}
      </nav>
    </div>


  );
};

export default Navbar;
