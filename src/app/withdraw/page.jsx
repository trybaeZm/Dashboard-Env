import React from 'react'
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Withdraw from '@/components/Wallet/withdraw'

const page = () => {
  return (
    <DefaultLayout>
      <Withdraw />
    </DefaultLayout>
  );
}

export default page