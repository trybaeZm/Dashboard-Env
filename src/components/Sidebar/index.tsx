import React, { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import SidebarItem from "./SidebarItem";
import ClickOutside from "@/components/ClickOutside";
import useLocalStorage from "@/hooks/useLocalStorage";
import image5 from './icons/trybae.png'
import {
  ArrowTrendingUpIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  EyeDropperIcon,
  Squares2X2Icon,
  UsersIcon,
  ClipboardDocumentIcon,
  Cog6ToothIcon,
  WalletIcon,
  ArchiveBoxIcon,
  AdjustmentsHorizontalIcon,
  CpuChipIcon,
} from "@heroicons/react/24/outline";

import { ShoppingBagIcon, SparklesIcon } from "lucide-react";
// Update the import path if the file is located elsewhere, for example:
// import { SidebarProps, menuGroups } from "../../types/sidebar";
// Or create the file at src/types/sidebar.ts and export SidebarProps and menuGroups from it.


// Sidebar component props
interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

// Each menu item can have children
interface MenuItem {
  icon: ReactNode;
  label: string;
  route: string;
  children?: MenuItem[];
}

// Sidebar menu groups
interface MenuGroup {
  name: string;
  menuItems: MenuItem[];
}


const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  
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
        icon: <SparklesIcon className="size-5" />,
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
        icon: <ArchiveBoxIcon  className="size-5" />,
        label: "Inventory",
        route: "/inventory",
      },
      {
        icon: <ShoppingBagIcon className="size-5"  />,
        label: "Products/Services",
        route: "/products_and_services",
      },
      {
        icon: <ClipboardDocumentIcon className="size-5" />,
        label: "Orders",
        route: "/orders",
      },
      {
        icon: <CpuChipIcon className="size-5"  />,
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

  const pathname = usePathname();
  const [pageName, setPageName] = useLocalStorage("selectedMenu", "dashboard");

  return (
    <ClickOutside onClick={() => sidebarOpen && setSidebarOpen(false)}>
      <aside
        className={`
          fixed top-0 left-0 h-full w-60 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 z-50
          transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:flex-shrink-0
        `}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-6">
          {/* <Link href="/" className="flex items-center gap-2">
            <Image src={image5.src} alt="Logo" width={40} height={40} />
            <span className="font-bold dark:text-white text-xl">Inxource</span>
          </Link> */}

          {/* Mobile toggle */}
          <button
            className="md:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            ✕
          </button>
        </div>

        {/* Sidebar Menu */}
        <nav className="overflow-y-auto flex-1 px-2 py-4">
          {menuGroups.map((group, groupIndex) => (
            <div key={groupIndex}>
              <h3 className="text-gray-500 dark:text-gray-400 text-sm font-semibold mb-2 ml-2">
                {group.name}
              </h3>
              <ul className="flex flex-col gap-1">
                {group.menuItems.map((item, index) => (
                  <SidebarItem
                    key={index}
                    item={item}
                    pageName={pageName}
                    setPageName={setPageName}
                  />
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>
    </ClickOutside>
  );
};

export default Sidebar;
