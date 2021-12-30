import Image from "next/image";
import {
  SearchIcon,
  PlusCircleIcon,
  UserGroupIcon,
  HeartIcon,
  PaperAirplaneIcon,
  MenuIcon,
  HomeIcon,
} from "@heroicons/react/outline";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";
function Header() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [open, setOpen] = useRecoilState(modalState);
  return (
    <header className="shadow-sm border-b bg-white sticky top-0 z-50">
      <div className="flex justify-between items-center bg-white max-w-6xl mx-5 xl:mx-auto">
        {/* Left */}
        <div className="relative hidden lg:inline-grid w-24">
          <img
            src="/normal-header-logo.png"
            layout="fill"
            className="cursor-pointer ineobject-contain"
            onClick={() => router.push("/")}
          />
        </div>
        <div className="relative lg:hidden w-10 flex-shrink-0 cursor-pointer">
          <img
            src="/mini-header-logo.png"
            layout="fill"
            className="cursor-pointer ineobject-contain"
            onClick={() => router.push("/")}
          />
        </div>
        {/* Middle Search input feild */}
        <div className="max-w-xs">
          <div className="relative mt-1 p-3 rounded-md">
            <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-4 w-4 text-gray-500" />
            </div>
            <input
              type="text"
              className="bg-gray-50 block w-full pl-10 sm:text-sm border-gray-300 rounded-md focus:ring-gray-400 focus:border-gray-400"
              placeholder="Search"
            />
          </div>
        </div>
        {/* Right */}
        <div className="flex items-center justify-end space-x-4">
          <HomeIcon className="navbtn" onClick={() => router.push("/")} />
          {session ? (
            <>
              <div className="relative navbtn">
                <PaperAirplaneIcon className="rotate-45 translate-x-4 origin-top" />
                <div className="absolute -top-2 -right-1 text-xs w-4 h-4 bg-red-500 rounded-full flex items-center justify-center    text-white animate-pulse">
                  4
                </div>
              </div>
              <PlusCircleIcon
                className="navbtn"
                onClick={() => setOpen(true)}
              />
              <UserGroupIcon className="navbtn" />
              <HeartIcon className="navbtn" />

              <MenuIcon className="h-10 w-10 md:hidden cursor-pointer" />
              <img
                src={session?.user?.image}
                alt="profile pic"
                onClick={signOut}
                className="h-10 rounded-full cursor-pointer"
              />
            </>
          ) : (
            <button className="rounded-md px-4 py-1" onClick={signIn}>
              Sign In
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
