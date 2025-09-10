import { useEffect, useRef, useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { ImagePreview, updateProductAndService } from "@/services/api/products"
import { getData, getOrgData } from "@/lib/createCookie"
import { BusinessType } from "@/types/businesses"
import { createBusiness } from "@/services/api/apiBusiness"

export const CreateBusinessDiag = ({ isOpen, onClose, getBusinessByUserID }: { getBusinessByUserID: () => void, isOpen: boolean, onClose: () => void }) => {


    const [loading, setLoading] = useState(false)
    const [openBusinessModel, setOpenBusinessModel] = useState(false);
    const [company_alias, setCompanyAlias] = useState<string>('')
    const [organisationData, setOrganisationData] = useState<null | BusinessType[]>(null)
    const [selectedImages, setSelectedImages] = useState<ImagePreview | null>(null);
    const userData = getData()
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click(); // programmatically click input
        }
    };

    let category = [
        "Agriculture",
        "Food & Beverages",
        "Retail & E-commerce",
        "Wholesale",
        "Fashion & Apparel",
        "Beauty & Personal Care",
        "Health & Pharmaceuticals",
        "Medical Services",
        "Education & Training",
        "Technology & Software",
        "Telecommunications",
        "Financial Services",
        "Loans & Microfinance",
        "Insurance",
        "Banking",
        "Construction",
        "Real Estate",
        "Transportation & Logistics",
        "Automotive",
        "Energy & Utilities",
        "Mining & Metals",
        "Manufacturing",
        "Media & Entertainment",
        "Sports & Recreation",
        "Tourism & Hospitality",
        "Food Services & Catering",
        "Cakes & Bakery",
        "Electronics & Phones",
        "Home & Living",
        "Furniture",
        "Cleaning Services",
        "Professional Services",
        "Legal Services",
        "Consulting",
        "Nonprofit & NGOs",
        "Government & Public Sector",
        "Events & Weddings",
        "Printing & Publishing",
        "Handcrafts & Art",
        "Pet Services & Supplies"
    ];



    const addBusiness = async (e: React.FormEvent<HTMLFormElement>) => {
        setLoading(true)
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);
        const industry = formData.get('industry'); // get the selected industry value
        const business_name = formData.get('business_name') as string;
        const registration_number = formData.get('registration_number') as string;
        const phone_number = formData.get('phone_number') as string;


        console.log('Business added');


        createBusiness({
            industry: industry as string,
            business_name: business_name,
            registration_number: registration_number,
            phone: phone_number,
            company_alias: company_alias,
            imageName: selectedImages?.name
        },
            userData, selectedImages)
            .then((res) => {
                console.log('business creation is a success', res)
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                setLoading(false)
                onClose()
                getBusinessByUserID()
            })

        // Here, you can send the data to your backend or process it further
    };


    function getFirstTwoInitials(name: string): string {
        return name
            .split(' ')
            .map(word => word.slice(0, 1))
            .join('');
    }


    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file || !file.type.startsWith("image/")) return;

        const newImage: ImagePreview = {
            name: file.name,
            url: URL.createObjectURL(file),
            file,
        };

        setSelectedImages(newImage);
        console.log("Selected image:", newImage);

        event.target.value = ""; // reset input
    };

    return (

        <Dialog open={isOpen} onOpenChange={(open: boolean) => !open && onClose()}>
            <DialogContent className="sm:max-w-[600px] max-h-[80vh] dark:text-white overflow-y-auto z-[9999] bg-white dark:bg-boxdark rounded-lg shadow-lg p-6">

                <DialogHeader>
                    <DialogTitle className="text-gray-900 dark:text-gray-200">
                        Create Business
                    </DialogTitle>
                </DialogHeader>

                <form
                    onSubmit={addBusiness}
                    className="w-full max-w-2xl space-y-5"
                >
                    {/* Header */}
                    <h2 className="text-xl font-semibold text-black dark:text-white text-center">Create New Business</h2>
                    <div onClick={handleClick} className="flex cursor-pointer gap-4  hover:opacity-80 transition items-center justify-between">
                        <div
                            className="bg-center p-3 rounded-xl grow border-2 border-dashed border-gray-400 flex items-center justify-center "
                        >
                            <div
                                className="w-full rounded-xl grow h-40 bg-cover "
                                style={{ backgroundImage: selectedImages ? `url(${selectedImages.url})` : undefined }} // replace with your bg image
                            ></div>

                            {/* Hidden input */}
                            <input
                                type="file"
                                name="image"
                                ref={fileInputRef}
                                className="hidden"
                                onChange={handleFileChange}
                                accept="image/*"
                            />

                        </div>


                    </div>

                    {/* Business Name */}
                    <div className="space-y-1">
                        <label className="text-black dark:text-white">Business Name</label>
                        <Input
                            required
                            onChange={(e) =>
                                setCompanyAlias(getFirstTwoInitials(e.target.value).toUpperCase())
                            }
                            type="text"
                            name="business_name"
                            autoFocus
                            placeholder="Enter business name"
                            className="bg-white text-white dark:bg-gray-800"
                        />
                    </div>

                    {/* Company Alias Display */}
                    <div className="space-y-1">
                        <label className="text-black dark:text-white">Company Alias</label>
                        <div className="p-3 text-sm text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 rounded">
                            {company_alias
                                ? company_alias
                                : "This will be used to identify your business in the system."}
                        </div>
                    </div>

                    {/* Industry */}
                    <div className="space-y-1">
                        <label className="text-black dark:text-white" htmlFor="industry">
                            Industry
                        </label>
                        <select
                            id="industry"
                            name="industry"
                            required
                            className="w-full bg-white text-black dark:bg-gray-800 dark:text-white p-2 rounded"
                            defaultValue=""
                        >
                            <option value="" disabled>
                                Select industry (optional)
                            </option>
                            {
                                category.map((e, key) =>

                                    <option key={key} value={e}>{e}</option>
                                )
                            }
                            {/* Add more as needed */}
                        </select>
                    </div>

                    {/* Registration & Phone */}
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 space-y-1">
                            <label className="text-black dark:text-white">
                                Registration Number <span className="text-sm text-gray-400">(optional)</span>
                            </label>
                            <Input
                                type="text"
                                name="registration_number"
                                placeholder="REG-1234"
                                className="bg-white text-white dark:bg-gray-800"
                            />
                        </div>

                        <div className="flex-1 space-y-1">
                            <label className="text-black dark:text-white">
                                Phone Number <span className="text-sm text-gray-400">(optional)</span>
                            </label>
                            <Input
                                type="text"
                                name="phone_number"
                                placeholder="Enter business phone number"
                                className="bg-white text-white dark:bg-gray-800"
                            />
                        </div>
                    </div>

                    {/* Actions */}
                    {/* Submit Button */}
                    <div>
                        <div className="mt-6 flex justify-center gap-4">
                            <button
                                onClick={onClose}
                                className="px-4 py-2 grow bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                            <button
                                disabled={loading}
                                type="submit"
                                className="px-4 py-2 grow bg-green-600 text-white rounded hover:bg-green-700"
                            >
                                {loading ? "Saving..." : "Save"}
                            </button>
                        </div>
                    </div>
                </form>

            </DialogContent>
        </Dialog>

    )
}
