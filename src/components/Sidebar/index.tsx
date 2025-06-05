"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import SidebarItem from "@/components/Sidebar/SidebarItem";
import ClickOutside from "@/components/ClickOutside";
import useLocalStorage from "@/hooks/useLocalStorage";
import {
  ArrowTrendingUpIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  EyeDropperIcon,
  Squares2X2Icon,
  UsersIcon,
  ClipboardDocumentIcon,
  Cog6ToothIcon,
  WalletIcon,
} from "@heroicons/react/24/outline";

// icons imports
import image from './icons/ai_1447616 1.png'
import image2 from './icons/circle-square.png'
import image4 from './icons/star.png'
import image5 from './icons/trybae.png'

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const menuGroups = [
  {
    name: "MENU",
    menuItems: [
      {
        icon: <Squares2X2Icon className="size-6" />,
        label: "Overview",
        route: "/overview",
      },
      {
        icon: <Image alt="" src={image} className="size-6" />,
        label: "LennyAi",
        route: "/lennyAi",
      },

      {
        icon: <ArrowTrendingUpIcon className="size-5" />,
        label: "Insights",
        route: "#",
        children: [
          { label: "Sales Analytics", route: "/sales-analytics" },
          { label: "Customer Analytics", route: "/customer-analytics" },
        ],
      },
      {
        icon: <Image alt="" src={image2} className="size-6" />,
        label: "Products/Services",
        route: "/products_and_services",
      },
      {
        icon: <ClipboardDocumentIcon className="size-5" />,
        label: "Orders",
        route: "/orders",
      },
      {
        icon: <Image alt="" src={image4} className="size-6" />,
        label: "Ai agents",
        route: "#",
        children: [
          { label: "Whats app sales agent", route: "/whatsAppSalesAgent" },
        ],
      },
      {
        icon: <WalletIcon className="size-5" />,
        label: "Wallet",
        route: "/wallet",
      },
      {
        icon: <Cog6ToothIcon className="size-5" />,
        label: "Settings",
        route: "/settings",
      },
    ],
  },
];

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const pathname = usePathname();
  const [pageName, setPageName] = useLocalStorage("selectedMenu", "dashboard");

  return (
    <ClickOutside onClick={() => setSidebarOpen(false)}>
      <aside
        className={`w-60.5  fixed left-0 top-0 flex h-screen flex-col overflow-y-hidden border-r-2 border-gray-100  z-[9999] bg-[#ffff] duration-300 ease-linear dark:border-strokedark dark:bg-gray-500 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* <!-- SIDEBAR HEADER --> */}
        <div className="flex items-center justify-between gap-2 px-6 py-5 lg:py-6.5">
          <Link className="flex  items-center gap-4 justify-start" href="/">
            <Image
              width={50}
              src={image5}
              alt="Logo"
              priority
            />
            <p className="font-bold text-2xl">Inxource</p>
          </Link>

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            className="block lg:hidden"
          >
            <svg
              className="fill-current"
              width="20"
              height="18"
              viewBox="0 0 20 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
                fill=""
              />
            </svg>
          </button>
        </div>
        {/* <!-- SIDEBAR HEADER --> */}

        <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
          {/* <!-- Sidebar Menu --> */}
          <nav className="mt-5 px-2 py-4 lg:mt-9 lg:px-2">
            {menuGroups.map((group, groupIndex) => (
              <div key={groupIndex}>
                <h3 className="mb-4 ml-4 text-sm font-semibold dark:text-white text-[#616262]">
                  {group.name}
                </h3>

                <ul className="mb-6 flex flex-col gap-2">
                  {group.menuItems.map((menuItem, menuIndex) => (
                    <SidebarItem
                      key={menuIndex}
                      item={menuItem}
                      pageName={pageName}
                      setPageName={setPageName}
                    />
                  ))}
                </ul>
              </div>
            ))}
          </nav>
          {/* <!-- Sidebar Menu --> */}
        </div>
      </aside>
    </ClickOutside>
  );
};

export default Sidebar;
