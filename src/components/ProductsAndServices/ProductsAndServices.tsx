'use client'
import { CircleX, PlusIcon } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'

import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { PhotoIcon } from '@heroicons/react/24/outline';
import { getData, getOrgData } from '@/lib/createCookie';
import { createProductAndService, getProductsAndServices, ProductWithSales } from '@/services/api/products';
import { BusinessType } from '@/types/businesses';
import { ProductCard } from './components/ProductCard';
import UploadDialog from './components/UploadDialog';

export const ProductsAndServices = () => {

    const [modal, setModal] = useState(false)
    const [modal2, setModal2] = useState(false)
    const [loading, setLoading] = useState(false)
    const [productData, setProductData] = useState<ProductWithSales[] | null | undefined>(null)
    const businessData: BusinessType | null | undefined = getOrgData()
    const [openModal, setOpenModal] = useState(false)
    // Fetch products for the current business and update state
    const getProducts = React.useCallback(async () => {
        if (!businessData?.id) return;
        setLoading(true);
        try {
            const products = await getProductsAndServices(businessData.id);
            setProductData(products);
            console.log(products)
        } catch (error) {
            setProductData([]);
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, [businessData?.id]);



    useEffect(() => {
        getProducts()
    }, [getProducts])
    return (
        <div className='  dark:text-gray-200'>
          
            {/* pop up for adding products */}
            <div className='flex justify-between z-1'>
                <div className='text-2xl font-bold dark:text-gray-200'>Products and Services</div>
                <div>
                    <UploadDialog
                        open={openModal}
                        onClose={() => setOpenModal(false)}
                        getProducts={()=> getProducts()}
                    />
                    <button onClick={() => setOpenModal(true)} className='flex items-center rounded-md gap-3 border border-black dark:border-gray-600 py-1 px-3 dark:text-gray-200'>
                        <PlusIcon className='size-4' />
                        Add Products/Services
                    </button>
                </div>
            </div>
            <div className="flex justify-center z-1 py-5">
                <div className="max-w-[1200px] w-full px-4">
                    {loading ? (
                        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                            {[...Array(6)].map((_, i) => (
                                <div
                                    key={i}
                                    className="border border-gray-700 rounded-lg p-4 animate-pulse space-y-4"
                                >
                                    <div className="bg-gray-600 h-40 w-full rounded-md"></div>
                                    <div className="h-4 bg-gray-600 rounded w-3/4"></div>
                                    <div className="h-4 bg-gray-600 rounded w-1/2"></div>
                                    <div className="h-4 bg-gray-600 rounded w-1/3"></div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                            {productData?.map((e, key) => (
                                <ProductCard getProducts={()=> getProducts()} e={e} key={key} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div >
    )
}



