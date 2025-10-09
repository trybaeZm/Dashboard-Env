import { CustomerAnalytics } from '@/components/Analytics/CustomerAnalytics/CustomerAnalytics'
import Container from '@/components/Layouts/Container'
import DefaultLayout from '@/components/Layouts/DefaultLayout'
import React from 'react'

const Page = () => {
    return (
        <DefaultLayout>
            <Container>
                <CustomerAnalytics />
            </Container>
        </DefaultLayout>
    )
}


export default Page