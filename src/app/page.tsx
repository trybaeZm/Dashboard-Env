import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Dashboard from "@/components/Dashboard/Dashboard";
import React, { Suspense } from "react";
import Loader from "@/components/common/Loader";
import { NextRequest } from "next/server";
export const metadata: Metadata = {
  title: "Trybae Solutions",
  description: "Trybae Admin Dashboard",
};

export default function Home(req: NextRequest) {
  return (
    <>
      <DefaultLayout>
        <Suspense fallback={<div><Loader/></div>}>
          <Dashboard />
        </Suspense>
      </DefaultLayout>
    </>
  );
}
