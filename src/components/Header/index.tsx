import Link from "next/link";
import DarkModeSwitcher from "./DarkModeSwitcher";
import DropdownMessage from "./DropdownMessage";
import DropdownNotification from "./DropdownNotification";
import DropdownUser from "./DropdownUser";
import Image from "next/image";
import Search from "../Search/Search";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { ApiDatatype } from "@/services/token";
import image5 from '@/components/Sidebar/icons/trybae.png'
import { PowerIcon, User2Icon } from "lucide-react";
import { useState } from "react";
import { removeData } from "@/lib/createCookie";


const Header = ({ sidebarOpen, setUserData, userDataLoader, setSidebarOpen, userData }: {
  setUserData: any,
  sidebarOpen: string | boolean | undefined,
  setSidebarOpen: (arg0: boolean) => void,
  userData: undefined | null | ApiDatatype;
  userDataLoader: boolean
}) => {

  const [openOptions, setOpenOptions] = useState(false)

  const LogoutUser = () => {
    removeData()
      .then((res) => {
          console.log('user deleted successfully...')
          setUserData(null)
          // This will reload the current page
          // window.location.reload();
        
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {

      })
  }

  return (
    <header className="fixed w-full top-0 z-999 shadow-md flex bg-white dark:bg-boxdark">
      <div className="flex flex-grow items-center text-sm justify-between px-4 py-2 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2">
          {
            userData ?
              <>
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
              </>
              :
              ''
          }
          <Link className="flex  items-center gap-4 justify-start" href="/">
            <Image
              width={30}
              src={image5}
              alt="Logo"
              priority
            />
            <p className="font-bold text-white ">Inxource</p>
          </Link>
        </div>
        <div className="flex items-center gap-2 text-white 2xsm:gap-4">
          {userData ?
            <>
              <ul className="flex items-center gap-2 2xsm:gap-2">
                <Search />
                {/* <DropdownMessage /> */}

                {/* <!-- Notification Menu Area --> */}
                <DropdownNotification />
              </ul>
              <DarkModeSwitcher />
            </>
            :
            <></>
          }
          {/* <!-- User Area --> */}
          {/* <DropdownUser /> */}

          {
            userData ?
              <>
                <div className="relative">
                  <button onClick={() => setOpenOptions(true)} className="text-sm rounded-md bg-gray-600 text-gray-300  p-1">
                    {userData?.name[0].toUpperCase()}
                  </button>
                  {
                    openOptions ?
                      <>
                        <div onClick={() => setOpenOptions(false)} className="fixed w-full h-full left-0 z-[999] top-0"></div>
                        <div className="absolute z-[999] p-1 right-0">
                          <div className="bg-gray-700  space-y-2 p-1 shadow-md rounded-md ">
                            <button className=" flex w-full duration-300  hover:bg-gray-600 p-1 rounded-md gap-2 items-center">
                              <User2Icon size={15} />
                              Profile
                            </button>
                            <button onClick={() => LogoutUser()} className=" flex duration-300 hover:bg-gray-600 p-1 w-full rounded-md gap-2 items-center">
                              <PowerIcon size={15} />
                              Logout
                            </button>
                          </div>
                        </div>
                      </>
                      :
                      ''}
                </div>

              </>
              :
              <>
                <div className="flex gap-3">
                  <button className="bg-gray-300 py-2 px-4 rounded-md text-black text-sm hover:opacity-[0.9] cursor-pointer">Login</button>
                  <button className="bg-gray-300 py-2 px-4 rounded-md text-black text-sm hover:opacity-[0.9] cursor-pointer">Sign up</button>
                </div>
              </>
          }
        </div>
      </div>
    </header>
  );
};

export default Header;
