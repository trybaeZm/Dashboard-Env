"use client";
import React, { useState, ReactNode, Suspense, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { useSearchParams } from "next/navigation";
import { createCookie, getCookie, getData, storeData } from "@/lib/createCookie";
import { getUserDataWithToken, TokenData, verifyToken } from "@/services/token";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userData, setUserData] = useState<TokenData | null | undefined | any>(null)
  const [userDataLoader, setUserDataLoader] = useState(false)

  const searchParams = useSearchParams();
  let token: string | null = searchParams.get('token'); 
  if(searchParams){
    token = searchParams.get('token'); // e.g., "signup"
  }

  useEffect(() => {
    const fetchUserData = async () => {
      setUserDataLoader(true);
      if (token) {
        createCookie(token);
        try {
          const response = await fetch('/api/refreshtoken', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token })
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          if (data) {
            setUserData(data);
            storeData(data)
          }
        } catch (error) {
          console.error('Error posting data:', error);
        } finally {
          setUserDataLoader(false);
        }
      } else {
        setUserDataLoader(false); // Handle missing token case
      }
    };
    if(token){
      fetchUserData();
    } else {
      setUserData(getData())
    }
  }, []);


  return (
    <>
      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <div className="dark:bg-gray-800">
        {/* <!-- ===== Sidebar Start ===== --> */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        {/* <!-- ===== Sidebar End ===== --> */}

        {/* <!-- ===== Content Area Start ===== --> */}
        <div className="dark:bg-gray-800">
          {/* <!-- ===== Header Start ===== --> */}
          <Header userDataLoader={userDataLoader} userData={userData} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          {/* <!-- ===== Header End ===== --> */}

          {/* <!-- ===== Main Content Start ===== --> */}
          <main className="dark:bg-gray-800">
            <div className="mx-auto p-3 min-h-screen dark:bg-gray-800">
              <Suspense fallback={<div>Loading...</div>}>
                {children}
              </Suspense>
            </div>
          </main>
          {/* <!-- ===== Main Content End ===== --> */}
        </div>
        {/* <!-- ===== Content Area End ===== --> */}
      </div>
      {/* <!-- ===== Page Wrapper End ===== --> */}
    </>
  );
}
