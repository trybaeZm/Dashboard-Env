import DefaultLayout from '@/components/Layouts/DefaultLayout'
import ManagementOrder from '@/components/Layouts/ManagementOrder'
import { PendingTable } from '@/components/orderManagement/components/PendingTable'
import React from 'react'

const page = () => {
  return (
    <DefaultLayout>
        <ManagementOrder>
            <PendingTable filter="Cancelled" />
        </ManagementOrder>
    </DefaultLayout>
  )
}

export default page