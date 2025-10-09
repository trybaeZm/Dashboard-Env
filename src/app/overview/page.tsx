import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Dashboard from "@/components/Dashboard/Dashboard";
import React, { Suspense } from "react";
import Loader from "@/components/common/Loader";
import Container from "@/components/Layouts/Container";
export const metadata: Metadata = {
  title: "Trybae Solutions",
  description: "Trybae Admin Dashboard",
};

function Page() {

  return (
    <>
      <DefaultLayout>
        <Suspense fallback={<div><Loader /></div>}>
          <Container>
            <Dashboard />
          </Container>
        </Suspense>
      </DefaultLayout>
    </>
  );
}

export default Page
