import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React from "react";
import { Busenesses } from "@/components/Businesses/Busenesses";
export const metadata: Metadata = {
  title: "Trybae Solutions",
  description: "Trybae Admin Dashboard",
};

 function Home() {
  return (
    <>
      <DefaultLayout>
        <>
          <Busenesses/>
        </>
      </DefaultLayout>
    </>
  );
}

export default Home