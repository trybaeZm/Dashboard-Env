import SalesAnalytics from "@/components/Analytics/SalesAnalytics/SalesAnalytics";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Trybae Sales Analytics",
  description: "Trybae Admin Dashboard",
};

type Props = {};

const page = (props: Props) => {
  return (
    <DefaultLayout>
      <SalesAnalytics />
    </DefaultLayout>
  );
};

export default page;
