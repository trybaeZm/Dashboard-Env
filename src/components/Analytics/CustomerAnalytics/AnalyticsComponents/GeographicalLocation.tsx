import React from 'react'
import BarChart from '../components/BarChart'

export const GeographicalLocation = ({location}: {location:any}) => {
    return (
        <>
            <div className="">
                <BarChart location={location} />
            </div>
            <div>
                <div className="text-[#1A0670] dark:text-white">Geographical Location of Customers</div>
                <div className="flex text-[#1A0670] dark:text-white justify-between items-end gap-2">
                    <div className="flex items-end gap-2">
                        <div className="font-bold text-2xl">{location?.length} Locations</div>
                    </div>
                </div>
            </div>
        </>
    )
}
