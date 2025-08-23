'use client'
import { CircleX, PlusIcon } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { PhotoIcon } from '@heroicons/react/24/outline';
import { getData, getOrgData } from '@/lib/createCookie';
import { createProductAndService, getProductsAndServices, ProductWithSales } from '@/services/api/products';
import { BusinessType } from '@/types/businesses';
import { ProductCard } from './components/ProductCard';

export const ProductsAndServices = () => {

    const [modal, setModal] = useState(false)
    const [modal2, setModal2] = useState(false)
    const [loading, setLoading] = useState(false)
    const [loading2, setLoading2] = useState(false)
    const [open, setOpen] = useState(false)
    const [productData, setProductData] = useState<ProductWithSales[] | null | undefined>(null)
    const businessData: BusinessType | null | undefined = getOrgData()
    const user = getData()
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedImages, setSelectedImages] = useState<ImagePreview[]>([]);

    interface ImagePreview {
        name: string;
        url: string;
        file: File; // include actual file reference
    }

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

    const handleDivClick = () => {
        if (selectedImages.length >= 3) {
            alert("You can only upload a maximum of 3 images.");
            return;
        }

        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    interface HandleFilesChangeEvent extends React.ChangeEvent<HTMLInputElement> {
        target: HTMLInputElement & {
            files: FileList | null;
        };
    }

    const handleFilesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files: File[] = Array.from(event.target.files ?? []);
        const remainingSlots = 3 - selectedImages.length;

        const newImages: ImagePreview[] = files
            .filter(file => file.type.startsWith('image/'))
            .slice(0, remainingSlots)
            .map(file => ({
                name: file.name,
                url: URL.createObjectURL(file),
                file: file,
            }));

        setSelectedImages(prev => [...prev, ...newImages]);
        console.log("Selected images:", newImages);
        event.target.value = ''; // clear input
    };

    const options = ["Phones", "Cakes", "Loans"];



    const addProduct = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading2(true);

        const form = e.currentTarget;
        const formData = new FormData(form);

        const category = formData.get('category') as string;
        const name = formData.get('name') as string;
        const price = parseFloat(formData.get('price') as string);
        const descriptions = formData.get('description') as string;

        // this section gets the partial payment defined by the user
        const partialPayment = parseFloat(formData.get('partialPayment') as string);



        const staticData = {
            price,
            name,
            category,
            description: descriptions || "",
            business_id: businessData?.id || "",
            int_business_id: businessData?.business_id || 0,
            partialPayment: partialPayment ? partialPayment : price * 0.3, // default to 30% of the price if not provided
        };

        try {
            const createdProduct = await createProductAndService(staticData, selectedImages);

            if (createdProduct) {
                // If images were uploaded successfully, reset the selected images
                setSelectedImages([]);
                alert("Product/Service added successfully!");
            } else {
                alert("Failed to add product/service. Please try again.");
            }
        } catch (err) {
            console.error(err);
        } finally {
            setModal2(false);
            getProducts();
            setLoading2(false);
        }
    };


    useEffect(() => {
        getProducts()
    }, [getProducts])
    return (
        <div className='pt-20  dark:text-gray-200'>
            <div className={`fixed top-0 bottom-0 flex transition-all duration-300 left-0 right-0 flex justify-end z-999 ${modal ? "translate-x-0" : " translate-x-full"}`}>
                <div className='absolute z-0 top-0 bottom-0 left-0 right-0 flex justify-end bg-[#00000050] ' onClick={() => setModal(false)}></div>
                <div className='bg-white dark:bg-boxdark shadow-lg shadow-black/10 z-4 pt-20 top-0 bottom-0 absolute overflow-y-auto px-10 py-5'>
                    <div className='flex flex-col gap-4'>
                        <div className='text-4xl font-bold dark:text-gray-200'>
                            Edit Product/Service
                        </div>
                        <div className='flex max-w-[500px] border border-black dark:border-gray-700 rounded-lg'>
                            <div className='px-6 flex items-center bg-[#EDF0F7] dark:bg-gray-700'>
                                <PhotoIcon className='w-[40px] dark:text-gray-200' />
                            </div>
                            <div className='p-4 flex flex-col gap-1'>
                                <div className='font-bold dark:text-gray-200'>Product/Service Name Card</div>
                                <div className='text-sm text-[#717D96] dark:text-gray-400'>ZMW XXXX</div>
                                <div className='text-[#717D96] dark:text-gray-400'>product description</div>
                            </div>
                        </div>
                        <hr className='dark:border-gray-700' />
                        <div className='flex flex-col gap-4'>


                            <div
                                className="p-10 border border-[#717D96] dark:border-gray-700 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                            >
                                <PhotoIcon className="w-[30px] dark:text-gray-200" />
                            </div>
                            <div className='flex flex-col gap-3'>
                                <div className='flex flex-col gap-1'>
                                    <label className='font-bold text-[#4B4F4F] dark:text-gray-300 text-sm'>Product/Service</label>
                                    <Select>
                                        <SelectTrigger className="w-full dark:bg-gray-700 dark:text-gray-200">
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                        <SelectContent className="dark:bg-gray-700">
                                            <SelectItem value="option" className="dark:text-gray-200">option</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <label className='font-bold text-[#4B4F4F] dark:text-gray-300 text-sm'>Enter Product/Service Name</label>
                                    <Input type='text' className="dark:bg-gray-700 dark:text-gray-200" />
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <label className='font-bold text-[#4B4F4F] dark:text-gray-300 text-sm'>Enter the Selling Price</label>
                                    <Input type='text' className="dark:bg-gray-700 dark:text-gray-200" />
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <label className='font-bold text-[#4B4F4F] dark:text-gray-300 text-sm'>Describe the Product/Service Briefly (Optional)</label>
                                    <Input type='textarea' className="dark:bg-gray-700 dark:text-gray-200" />
                                </div>
                            </div>

                            <div className='flex gap-3 justify-end'>
                                <button onClick={() => setModal(false)} className='border py-2 rounded-[100px] border-[#B9B9B9] text-[#B9B9B9] dark:border-gray-600 dark:text-gray-400 px-4'>Cancel</button>
                                <button onClick={() => setModal(false)} className='bg-[#1C0F86] py-2 rounded-[100px] text-white px-4'>Finish</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* pop up for adding products */}
            {
                modal2 ?
                    <div className='fixed p-5 top-0 bottom-0  left-0 right-0 flex justify-center items-center z-999 '>
                        <div className='bg-white dark:bg-boxdark shadow-lg shadow-black/10 
                  max-h-[90vh] w-full max-w-[600px] overflow-y-auto rounded-lg p-5'>
                            <div className='flex justify-end items-center'>
                                <button onClick={() => setModal2(false)} className=''>
                                    <CircleX />
                                </button>
                            </div>
                            <div className='p-5 space-y-4 max-w-[600px]'>
                                <div className='text-4xl font-bold dark:text-gray-200'>
                                    Add Product/Service
                                </div>

                                <form onSubmit={addProduct} className='flex flex-col gap-4'>
                                    <div className="space-y-4">
                                        {/* Hidden multi-file input */}
                                        <input
                                            type="file"
                                            accept="image/*"
                                            multiple
                                            ref={fileInputRef}
                                            onChange={handleFilesChange}
                                            className="hidden"
                                        />

                                        {/* Upload trigger div */}
                                        <div
                                            onClick={handleDivClick}
                                            className="p-10 border border-[#717D96] dark:border-gray-700 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                                        >
                                            <PhotoIcon className="w-[30px] dark:text-gray-200" />
                                        </div>

                                        {/* Image previews */}
                                        {selectedImages.length > 0 && (
                                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                                {selectedImages.map((img, index) => (
                                                    <>
                                                        <Image
                                                            src={img.url}
                                                            alt={img.name}
                                                            width={100}
                                                            height={128}
                                                            className="w-[100px] h-32 object-cover"
                                                        />
                                                        <p className="text-xs text-center p-1 truncate">{img.name}</p>

                                                    </>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    <div className='flex flex-col gap-3'>
                                        <div className='flex flex-col gap-1'>
                                            <label
                                                htmlFor="productSelect"
                                                className="font-bold text-[#4B4F4F] dark:text-gray-300 text-sm"
                                            >
                                                Product/Service
                                            </label>
                                            <select
                                                id="productSelect"
                                                name='category'
                                                required
                                                className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-gray-200"
                                            >
                                                <option value="" disabled>
                                                    Select
                                                </option>
                                                {options.map((option, index) => (
                                                    <option key={index} value={option} className="dark:text-gray-200">
                                                        {option}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className='flex flex-col gap-1'>
                                            <label className='font-bold text-[#4B4F4F] dark:text-gray-300 text-sm'>Enter Product/Service Name</label>
                                            <Input required name='name' type='text' className="dark:bg-gray-700 dark:text-gray-200" />
                                        </div>
                                        <div className='flex flex-col gap-1'>
                                            <label className='font-bold text-[#4B4F4F] dark:text-gray-300 text-sm'>Enter the Selling Price</label>
                                            <Input required name='price' type='number' className="dark:bg-gray-700 dark:text-gray-200" />
                                        </div>
                                        <div className='flex flex-col gap-1'>
                                            <label className='font-bold text-[#4B4F4F] dark:text-gray-300 text-sm'>Enter the Partial Payment Price</label>
                                            <label className='font-bold text-[#4B4F4F] dark:text-gray-400 text-[10px]'>this is the amount a client is requested to pay upon when the order is placed.(optioanl but 30% of Selling price by default)</label>
                                            <Input placeholder='default amount' name='partialPayment' type='number' className="dark:bg-gray-700 dark:text-gray-200" />
                                        </div>
                                        <div className='flex flex-col gap-1'>
                                            <label className='font-bold text-[#4B4F4F] dark:text-gray-300 text-sm'>Describe the Product/Service Briefly (Optional)</label>
                                            <Input name='description' type='textarea' className="dark:bg-gray-700 dark:text-gray-200" />
                                        </div>
                                    </div>

                                    <div className='flex gap-3 justify-end'>
                                        <button type='button' onClick={() => setModal(false)} className='border py-2 rounded-[100px] border-[#B9B9B9] text-[#B9B9B9] dark:border-gray-600 dark:text-gray-400 px-4'>Cancel</button>
                                        <button disabled={loading2} type='submit' className='bg-[#1C0F86] py-2 rounded-[100px] text-white px-4'>
                                            {
                                                loading2 ? <span className='animate-spin'>Loading...</span> :
                                                    <span>Finish</span>
                                            }
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div >
                    :
                    <></>
            }

            <div className='flex justify-between z-1'>
                <div className='text-2xl font-bold dark:text-gray-200'>Products and Services</div>
                <div>
                    <button onClick={() => setModal2(true)} className='flex items-center rounded-md gap-3 border border-black dark:border-gray-600 py-1 px-3 dark:text-gray-200'>
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
                                <ProductCard e={e} key={key} setModal={setModal} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div >
    )
}



