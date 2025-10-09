import Container from '@/components/Layouts/Container'
import DefaultLayout from '@/components/Layouts/DefaultLayout'
import { ProductsAndServices } from '@/components/ProductsAndServices/ProductsAndServices'
import React from 'react'

const Page = () => {
  return (
    <DefaultLayout>
      <Container>
        <ProductsAndServices />
      </Container>
    </DefaultLayout>
  )
}

export default Page