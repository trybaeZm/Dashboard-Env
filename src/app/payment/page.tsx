'use client'
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'

const page = () => {
    const value = useParams()

    useEffect(()=>{
        console.log(value.id)
    })
  return (
    <div>page</div>
  )
}

export default page