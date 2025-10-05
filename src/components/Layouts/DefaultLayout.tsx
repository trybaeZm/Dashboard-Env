"use client";

import React, { useState, useEffect, Suspense } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { useSearchParams } from "next/navigation";
import { createCookie, getData, storeData } from "@/lib/createCookie";
import { ApiDatatype } from "@/services/token";

interface DefaultLayoutProps {
  children: React.ReactNode;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userData, setUserData] = useState<ApiDatatype | null>(null);
  const [loadingUser, setLoadingUser] = useState(false);

  const searchParams = useSearchParams();
  const token = searchParams?.get("token") || null;

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      if (!token) {
        setUserData(getData());
        return;
      }

      setLoadingUser(true);
      createCookie(token);

      try {
        const res = await fetch("/api/refreshtoken", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });

        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const data = await res.json();
        if (data) {
          setUserData(data);
          storeData(data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoadingUser(false);
      }
    };

    fetchUserData();
  }, [token]);

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-800">
      {/* Sidebar: always part of layout */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {userData && (
          <Header
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            userData={userData}
            setUserData={setUserData}
            userDataLoader={loadingUser}
            isOrgSelected={true} // Always true, sidebar is visible
          />
        )}

        <main className="flex-1 overflow-y-auto pt-20">
          <div className="mx-auto p-3 dark:text-gray-300 text-gray-800 min-h-screen">
            <Suspense fallback={<div>Loading...</div>}>
              {children}
            </Suspense>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DefaultLayout;