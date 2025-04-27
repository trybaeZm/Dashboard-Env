import SalesAnalytics from "@/components/Analytics/SalesAnalytics/SalesAnalytics";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { Metadata } from "next";
import React, { Suspense } from "react";
import Loader from "@/components/common/Loader";
export const metadata: Metadata = {
  title: "Trybae Sales Analytics",
  description: "Trybae Admin Dashboard",
};

type Props = {};

const page = (props: Props) => {
  return (
    <DefaultLayout>
      <Suspense fallback={<div><Loader/></div>}>
        <SalesAnalytics />
      </Suspense>
    </DefaultLayout>
  );
};

export default page;
