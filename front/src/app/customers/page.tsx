import CustomersTable from "@/components/Customers/CustomersTable";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <DefaultLayout>
      <CustomersTable />
    </DefaultLayout>
  );
};

export default page;
