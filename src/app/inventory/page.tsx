import Inventory from '@/components/inventory/Inventory';
import Container from '@/components/Layouts/Container';
import DefaultLayout from '@/components/Layouts/DefaultLayout'
import { PlusIcon, ArchiveBoxIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import React from 'react'

const page = () => {

    return (
        <DefaultLayout>
            <Container>
                <Inventory />
            </Container>
        </DefaultLayout>
    )
}

export default page