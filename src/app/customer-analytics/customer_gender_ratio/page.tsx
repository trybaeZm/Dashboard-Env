import CustomerGenerRatio from '@/components/Analytics/CustomerAnalytics/customer_gender_ratio/customerGenderRatio'
import Container from '@/components/Layouts/Container'
import DefaultLayout from '@/components/Layouts/DefaultLayout'
import React from 'react'

const Page = () => {
  return (
    <DefaultLayout>
      <Container>
        <CustomerGenerRatio />
      </Container>
    </DefaultLayout>
  )
}

export default Page