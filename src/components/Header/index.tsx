import Link from "next/link";
import DarkModeSwitcher from "./DarkModeSwitcher";
import DropdownMessage from "./DropdownMessage";
import DropdownNotification from "./DropdownNotification";
import DropdownUser from "./DropdownUser";
import Image from "next/image";
import Search from "../Search/Search";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { TokenData } from "@/services/token";

const Header = ( {sidebarOpen, userDataLoader,setSidebarOpen, userData}:{
  sidebarOpen: string | boolean | undefined,
  setSidebarOpen: (arg0: boolean) => void,
  userData:  undefined | null | TokenData,
  userDataLoader: boolean
}) => {
  return (
    <header className="fixed w-full top-0 z-999 shadow-md flex bg-white dark:bg-boxdark">
      <div className="flex flex-grow items-center justify-between px-4 py-4 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2">
          {/* <!-- Hamburger Toggle BTN --> */}
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              setSidebarOpen(!sidebarOpen);
            }}
            className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark"
          >
            <svg
              className="h-6 w-6 text-black dark:text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none" 
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round" 
                strokeWidth={2}
                d={sidebarOpen 
                  ? "M6 18L18 6M6 6l12 12" // X shape when open
                  : "M4 6h16M4 12h16M4 18h16" // Hamburger when closed
                }
              />
            </svg>
          </button>
          {/* <!-- Hamburger Toggle BTN --> */}

          <Link className="block flex-shrink-0 lg:hidden" href="/">
            <Image
              width={32}
              height={32}
              src={"/images/logo/logo-icon.svg"}
              alt="Logo"
            />
          </Link>
        </div>
        <div className="flex items-center gap-2 text-white 2xsm:gap-4">
          <ul className="flex items-center gap-2 2xsm:gap-2">
            <Search />
            {/* <DropdownMessage /> */}

            {/* <!-- Notification Menu Area --> */}
            <DropdownNotification />
          </ul>

          <DarkModeSwitcher />
          {/* <!-- User Area --> */}
          {/* <DropdownUser /> */}
          {
            userDataLoader ? 
            <>loading...</>
            :
            <>
              {
                userData ? 
                <>
                <div>
                  {userData?.token.name.toUpperCase()}
                </div>
                </>
                :
                <>
                <SignedOut>
                  <SignInButton />
                </SignedOut>
                <SignedIn>
                  <UserButton />
                </SignedIn>
                </>
              }
            </>
          }
        </div>
      </div>
    </header>
  );
};

export default Header;
