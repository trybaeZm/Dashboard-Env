import CustomerGenerRatio from '@/components/Analytics/CustomerAnalytics/customer_gender_ratio/customerGenderRatio'
import TotalSalesOverTime from '@/components/Analytics/SalesAnalytics/total_sales_over_time/TotalSalesOverTime'
import DefaultLayout from '@/components/Layouts/DefaultLayout'
import { ArrowLeftIcon } from 'lucide-react'
import React from 'react'

const Page = () => {
  return (
    <DefaultLayout>
     <CustomerGenerRatio/>
    </DefaultLayout>
  )
}

export default Page