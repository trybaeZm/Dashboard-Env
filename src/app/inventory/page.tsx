import Inventory from '@/components/inventory/Inventory';
import DefaultLayout from '@/components/Layouts/DefaultLayout'
import { PlusIcon, ArchiveBoxIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import React from 'react'

const page = () => {

    return (
        <DefaultLayout>
            <div className=''>
                <Inventory />
            </div>
        </DefaultLayout>
    )
}

export default page