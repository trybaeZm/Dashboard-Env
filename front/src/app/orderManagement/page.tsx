import DefaultLayout from '@/components/Layouts/DefaultLayout'
import ManagementOrder from '@/components/Layouts/ManagementOrder'
import { OrderManagement } from '@/components/orderManagement/orderManagement'
import React from 'react'

const page = () => {
  return (
    <DefaultLayout>
        <ManagementOrder>
            <OrderManagement/>
        </ManagementOrder>
    </DefaultLayout>
  )
}

export default page