import React from 'react'
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Wallet from '@/components/Wallet/wallet'
import WalletPage from '@/components/Wallet/wallet';

const page = () => {
  return (
    <DefaultLayout>
      <WalletPage />
    </DefaultLayout>
  );
}

export default page