"use client";
import '../css/style.css'
import React, { useEffect, useState } from "react";
import Loader from "@/components/common/Loader";
import ReactQueryProvider from "@/components/ReactQueryProvider";
import { themeScript } from "./theme-script";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loading, setLoading] = useState<boolean>(true);
  const [inDarkMode, setInDarkMode] = useState<boolean>(false);
  // const pathname = usePathname();

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
      <html style={{backgroundColor: inDarkMode ? '#111827' : '#f9fafb'}} lang="en">
        <head>
          <script
            dangerouslySetInnerHTML={{
              __html: themeScript(),
            }}
          />
        </head>
        <body suppressHydrationWarning={true}>
          <ReactQueryProvider>
            <div className="dark:bg-gray-800">
              {loading ? <Loader /> : children}
            </div>
          </ReactQueryProvider>
        </body>
      </html>
  );
}