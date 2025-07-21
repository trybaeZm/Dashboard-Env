import Link from "next/link";
import DarkModeSwitcher from "./DarkModeSwitcher";
import { Building2, Copy, Download, KeyRound } from "lucide-react";
import DropdownNotification from "./DropdownNotification";
import NextImage from 'next/image'; // ✅ avoid name conflict
import Search from "../Search/Search";
import { ApiDatatype } from "@/services/token";
import image5 from '@/components/Sidebar/icons/trybae.png'
import { PowerIcon, User2Icon } from "lucide-react";
import { useRef, useState } from "react";
import { getOrgData, removeData, removeOrgData } from "@/lib/createCookie";
import { BusinessType, businessType } from "@/types/businesses";
import { QRCodeCanvas, QRCodeSVG } from 'qrcode.react';
import { useRouter } from "next/navigation";

const Header = ({ sidebarOpen, isOrgSelected, setUserData, userDataLoader, setSidebarOpen, userData }: {
  setUserData: any,
  isOrgSelected: any,
  sidebarOpen: string | boolean | undefined,
  setSidebarOpen: (arg0: boolean) => void,
  userData: undefined | null | ApiDatatype;
  userDataLoader: boolean
}) => {


  const navigation = useRouter();
  const qrRef = useRef<HTMLDivElement | null>(null); // ✅ Properly typed
  const [openOptions, setOpenOptions] = useState(false)
  const businessData: BusinessType | null = getOrgData()
  const [text, setText] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const [modal, setModal] = useState(false)


  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      alert('Copied to clipboard!');
    } catch (err) {
      // Fallback for older browsers
      if (inputRef.current) {
        inputRef.current.select();
        document.execCommand('copy');
        alert('Copied to clipboard (fallback)!');
      } else {
        alert('Failed to copy text.');
      }
    }
  };

  const generateEncryptedCode = (id: string, companyAlias: string) => {
    const obj = { id, companyAlias };
    const str = `?id=${id}&companyAlias=${companyAlias}`;
    setText('https://payment.inxource.com/payment/' + str); // Set the token to the input field
  };


  const handleDownload = () => {
    const canvas = qrRef.current?.querySelector('canvas');
    if (canvas instanceof HTMLCanvasElement) {
      const url = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = url;
      link.download = "business_qr_code.png";
      link.click();
    }
  };

  const LogoutUser = () => {
    removeData()
      .then((res) => {
        console.log('user deleted successfully...')
        setUserData(null)
        removeOrgData()
        // This will reload the current page
        // window.location.reload();
        navigation.push('/signin');
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
        <div className="flex justify-between flex-grow items-center gap-2">
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
              <NextImage
                width={30}
                src={image5}
                alt="Logo"
                priority
              />

              <p className="font-bold hidden md:block">Inxource</p> <span className="text-gray-500 hidden md:block hover:text-gray-400 duration-500 text-sm">{businessData && ' | ' + businessData.business_name}</span>
            </Link>
            {
              userData && businessData ?
                <button
                  onClick={() => setModal(true)}
                  className="ms-2 px-3 py-2 rounded-lg bg-gray-300 text-black dark:bg-gray-700 dark:text-white hover:bg-gray-400 dark:hover:bg-gray-600 transition duration-300 shadow-sm hover:shadow-md text-sm font-medium flex items-center gap-1"
                >
                  <KeyRound size={16} />
                  <span className="hidden md:block">
                    Generate Code
                  </span>
                </button>
                :
                <></>
            }

            <div
              className={`fixed inset-0 z-[999] flex justify-center items-center transition-transform duration-300 ${modal ? "translate-y-0" : "translate-y-full"
                }`}
            >
              {/* Backdrop */}
              <div
                onClick={() => setModal(false)}
                className="absolute inset-0  cursor-pointer"
              />


              <div
                className={`fixed inset-0 z-[999] flex justify-center items-center transition-transform duration-300 ${modal ? "translate-y-0" : "translate-y-full"
                  }`}
              >
                {/* Backdrop */}
                <div
                  onClick={() => setModal(false)}
                  className="absolute inset-0 cursor-pointer"
                />

                {/* Modal Box */}
                <div className="relative z-10 w-[90%] max-w-md bg-white dark:bg-boxdark rounded-lg shadow-lg overflow-y-auto p-6 space-y-4 text-gray-800 dark:text-white">
                  {/* Business Name */}
                  <h2 className="flex flex-col items-center gap-2 text-xl font-semibold text-gray-800 dark:text-white">
                    <Building2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    {businessData?.business_name || "Business Name"}
                  </h2>


                  {/* Generate Code Button */}
                  <button
                    onClick={() => {
                      if (businessData?.id && businessData?.company_alias) {
                        generateEncryptedCode(businessData.id, businessData.company_alias);
                      } else {
                        alert("Business data is incomplete.");
                      }
                    }}
                    className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition w-full"
                  >
                    Generate code for your business
                  </button>

                  {/* Code Display */}
                  <div className="bg-gray-100 hidden dark:bg-gray-800 rounded-md p-4 text-sm text-left break-words whitespace-pre-wrap text-gray-700 dark:text-gray-200">
                    {text}
                  </div>

                  {/* QR Code Section */}
                  {text && (
                    <div className="flex justify-center" ref={qrRef}>
                      <QRCodeCanvas
                        value={text}
                        size={160}
                        level="H"
                        bgColor="#ffffff"
                        fgColor="#000000"
                        className="my-4"
                      />
                    </div>
                  )}

                  <div className="flex gap-4">
                    {/* Copy Button */}
                    <button
                      onClick={handleCopy}
                      className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                    >
                      <Copy className="w-4 h-4" />
                      Copy
                    </button>

                    {/* Download Button */}
                    <button
                      onClick={handleDownload}
                      className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                  </div>
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
                      className="text-sm font-medium rounded-full 
             bg-gray-200 text-gray-800 
             dark:bg-gray-600 dark:text-gray-200 
             px-3 py-2 
             hover:bg-gray-300 dark:hover:bg-gray-500 
             transition duration-300"
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
                          <div className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md shadow-lg py-2 space-y-1">
                            <button
                              className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 transition"
                            >
                              <User2Icon size={16} />
                              Profile
                            </button>
                            <button
                              onClick={LogoutUser}
                              className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 transition"
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
      </div>
    </header>
  );
};

export default Header;
