import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface MenuItem {
  label: string;
  route: string;
}

interface SidebarDropdownProps {
  item: MenuItem[];
}

const SidebarDropdown: React.FC<SidebarDropdownProps> = ({ item }) => {
  const pathname = usePathname();

  return (
    <ul className=" mb-5.5 flex flex-col gap-2 my-2 pl-12">
      {item.map((child, index) => {
        const isActive = pathname === child.route;

        return (
          <li key={index}>
            <Link
              href={child.route}
              className={`
                group flex text-sm items-center gap-2.5 rounded-md px-4 py-2 font-medium
                duration-300 ease-in-out
                dark:text-white
                ${isActive ? "font-semibold text-[#1c1e1e] dark:text-white" : ""}
                hover:bg-gray-100 dark:hover:bg-gray-700
              `}
            >
              {child.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default SidebarDropdown;
