import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React from "react";
import { Businesses } from "@/components/Businesses/Busenesses";
export const metadata: Metadata = {
  title: "Trybae Solutions",
  description: "Trybae Admin Dashboard",
};

 function Home() {
  return (
    <>
      <DefaultLayout>
        <>
          <Businesses/>
        </>
      </DefaultLayout>
    </>
  );
}

export default Home