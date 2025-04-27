import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { PendingTable } from './components/PendingTable'

export const Pending = () => {
    return (
        <>
            <PendingTable filter="Pending" />
        </>
    )
}
