import React from 'react'
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Wallet from '@/components/Wallet/wallet'

const page = () => {
  return (
    <DefaultLayout>
      <Wallet />
    </DefaultLayout>
  );
}

export default page