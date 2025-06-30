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
import { useRef, useState } from "react";
import { getOrgData, removeData, removeOrgData } from "@/lib/createCookie";
import { BusinessType, businessType } from "@/types/businesses";

const Header = ({ sidebarOpen, isOrgSelected, setUserData, userDataLoader, setSidebarOpen, userData }: {
  setUserData: any,
  isOrgSelected: any,
  sidebarOpen: string | boolean | undefined,
  setSidebarOpen: (arg0: boolean) => void,
  userData: undefined | null | ApiDatatype;
  userDataLoader: boolean
}) => {


  const [openOptions, setOpenOptions] = useState(false)
  const businessData: BusinessType | null = getOrgData()
  const [text, setText] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const [modal, setModal] = useState(false)


  const handleCopy = () => {
    if (inputRef.current) {
      inputRef.current.select();
      document.execCommand('copy'); // For older browsers
      navigator.clipboard.writeText(text); // For modern browsers
      alert('Copied to clipboard!');
    }
  };

  const generateEncryptedCode = (id: string, companyAlias: string) => {
    fetch('/api/createToken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, companyAlias })
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Server error: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log('Encrypted token:', data.token);
        setText('https://payment.inxource.com/payment/' + data.token); // Set the token to the input field
        // You can use `data.token` here
      })
      .catch((err) => {
        console.error('Error generating token:', err);
      });
  };


  const LogoutUser = () => {
    removeData()
      .then((res) => {
        console.log('user deleted successfully...')
        setUserData(null)
        removeOrgData()
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
    <header className="fixed dark:text-gray-300 text-gray-800 w-full top-0 z-999 shadow-md flex bg-white dark:bg-boxdark">
      <div className="flex flex-grow items-center text-sm justify-between px-4 py-2 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2">
          {
            userData && isOrgSelected ?
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
            <p className="font-bold">Inxource</p> <span className="text-gray-500 hover:text-gray-400 duration-500 text-sm">{businessData && ' | ' + businessData.business_name}</span>
          </Link>
          {
            userData && businessData ?
              <button onClick={() => setModal(true)} className="bg-gray-300 text-black px-2 ms-5 py-1  rounded-md hover:bg-gray-400 duration-300">
                generate code
              </button>
              :
              <></>
          }

          <div className={`fixed top-0 bottom-0 flex z-[999] transition-all duration-300 left-0 right-0 flex justify-center items-center  ${modal ? "translate-y-0" : " translate-y-full"}`}>
            <div className='absolute  z-0 top-0 bottom-0 left-0 right-0 flex justify-center items-center' onClick={() => setModal(false)}></div>
            <div className='bg-white text-center text-white dark:bg-boxdark z-4 space-y-2 shadow-lg shadow-black absolute overflow-y-auto p-4 rounded-lg'>
              <div className="text-lg">
                {businessData && businessData.business_name}
              </div>
              <div className="text-center">
                <p
                  onClick={() => {
                    if (businessData?.id && businessData?.company_alias) {
                      generateEncryptedCode(businessData.id, businessData.company_alias);
                    } else {
                      alert("Business data is incomplete.");
                    }
                  }}
                  className="text-sm text-center text-gray-500 hover:opacity-[0.5] duration-500 cursor-pointer"
                >
                  Generate code for your business
                </p>
                <div className="p-4 flex flex-wrap gap-3 max-w-md w-full">
                  <div className="text-sm text-left text-gray-800 dark:text-gray-300 whitespace-normal break-words flex-1 min-w-[200px]">
                    {text}
                  </div>
                </div>
                <button
                  onClick={handleCopy}
                  className="bg-blue-600 w-full px-4 py-2 rounded hover:bg-blue-700"
                >
                  Copy
                </button>
              </div>
            </div>

          </div>
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
                  {/* User Initial Button */}
                  <button
                    onClick={() => setOpenOptions(true)}
                    className="text-sm font-medium rounded-full bg-gray-600 text-gray-200 px-3 py-2 hover:bg-gray-500 transition duration-300"
                  >
                    {userData?.name?.[0]?.toUpperCase() || "U"}
                  </button>

                  {/* Dropdown */}
                  {openOptions && (
                    <>
                      {/* Backdrop to close on outside click */}
                      <div
                        onClick={() => setOpenOptions(false)}
                        className="fixed inset-0 z-[998]"
                      ></div>

                      {/* Dropdown Menu */}
                      <div className="absolute z-[999] right-0 mt-2 w-40">
                        <div className="bg-gray-700 text-gray-100 rounded-md shadow-lg py-2 space-y-1">
                          <button
                            className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-gray-600 transition"
                          >
                            <User2Icon size={16} />
                            Profile
                          </button>
                          <button
                            onClick={LogoutUser}
                            className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-gray-600 transition"
                          >
                            <PowerIcon size={16} />
                            Logout
                          </button>
                        </div>
                      </div>
                    </>
                  )}
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
