import { useEffect, useRef, useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { ImagePreview } from "@/services/api/products"
import { getData } from "@/lib/createCookie"
import { createBusiness } from "@/services/api/apiBusiness"
import { Upload, Building2, X, Loader2, CheckCircle, AlertCircle, Sparkles } from "lucide-react"

interface CreateBusinessDiagProps {
    isOpen: boolean
    onClose: () => void
    getBusinessByUserID: () => void
}

export const CreateBusinessDiag = ({ isOpen, onClose, getBusinessByUserID }: CreateBusinessDiagProps) => {
    const [loading, setLoading] = useState(false)
    const [companyAlias, setCompanyAlias] = useState('')
    const [selectedImages, setSelectedImages] = useState<ImagePreview | null>(null)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)
    const userData = getData()
    const fileInputRef = useRef<HTMLInputElement>(null)

    const industries = [
        "Technology & Software",
        "Retail & E-commerce",
        "Food & Beverages",
        "Healthcare & Pharmaceuticals",
        "Finance & Banking",
        "Education & Training",
        "Real Estate",
        "Manufacturing",
        "Professional Services",
        "Hospitality & Tourism",
        "Media & Entertainment",
        "Transportation & Logistics",
        "Construction",
        "Agriculture",
        "Energy & Utilities",
        "Nonprofit & NGOs",
        "Beauty & Personal Care",
        "Automotive",
        "Sports & Recreation",
        "Other"
    ]

    const getFirstTwoInitials = (name: string): string => {
        return name
            .split(' ')
            .map(word => word.charAt(0))
            .join('')
            .toUpperCase()
            .slice(0, 2)
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (!file || !file.type.startsWith("image/")) {
            setError('Please select a valid image file')
            return
        }

        if (file.size > 5 * 1024 * 1024) { // 5MB limit
            setError('Image size should be less than 5MB')
            return
        }

        const newImage: ImagePreview = {
            name: file.name,
            url: URL.createObjectURL(file),
            file,
        }

        setSelectedImages(newImage)
        setError('')
        event.target.value = ""
    }

    const removeImage = () => {
        if (selectedImages?.url) {
            URL.revokeObjectURL(selectedImages.url)
        }
        setSelectedImages(null)
    }

    const addBusiness = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            const formData = new FormData(e.currentTarget)
            const businessData = {
                industry: formData.get('industry') as string,
                business_name: formData.get('business_name') as string,
                registration_number: formData.get('registration_number') as string,
                phone: formData.get('phone_number') as string,
                company_alias: companyAlias,
                imageName: selectedImages?.name
            }

            await createBusiness(businessData, userData, selectedImages)
            
            setSuccess(true)
            setTimeout(() => {
                onClose()
                getBusinessByUserID()
                resetForm()
            }, 1500)
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to create business. Please try again.')
            console.error('Business creation error:', err)
        } finally {
            setLoading(false)
        }
    }

    const resetForm = () => {
        setCompanyAlias('')
        setSelectedImages(null)
        setError('')
        setSuccess(false)
    }

    const handleOpenChange = (open: boolean) => {
        if (!open) {
            resetForm()
            onClose()
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-2xl p-0 z-[9999]">
                {/* Header */}
                <DialogHeader className="p-6 border-b border-gray-200/50 dark:border-gray-700/50">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg">
                            <Building2 className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <DialogTitle className="text-xl font-bold text-gray-900 dark:text-white">
                                Create New Business
                            </DialogTitle>
                            <DialogDescription className="text-gray-600 dark:text-gray-400">
                                Set up your business profile to get started with analytics
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                <form onSubmit={addBusiness} className="p-6 space-y-6">
                    {/* Success State */}
                    {success && (
                        <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl text-green-700 dark:text-green-400">
                            <CheckCircle className="w-5 h-5 flex-shrink-0" />
                            <span className="font-medium">Business created successfully!</span>
                        </div>
                    )}

                    {/* Error State */}
                    {error && (
                        <div className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-700 dark:text-red-400">
                            <AlertCircle className="w-5 h-5 flex-shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}

                    {/* Image Upload */}
                    <div className="space-y-3">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Business Logo
                        </label>
                        <div 
                            // onClick={handleClick}
                            className={`
                                relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300 group
                                ${selectedImages 
                                    ? 'border-green-400 bg-green-50/50 dark:bg-green-900/10' 
                                    : 'border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500 bg-gray-50/50 dark:bg-gray-700/50'
                                }
                            `}
                        >
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                accept="image/*"
                                className="hidden"
                            />
                            
                            {selectedImages ? (
                                <div className="relative">
                                    <div 
                                        className="w-32 h-32 mx-auto bg-cover bg-center rounded-lg shadow-lg"
                                        style={{ backgroundImage: `url(${selectedImages.url})` }}
                                    />
                                    <button
                                        type="button"
                                        onClick={(e) => { e.stopPropagation(); removeImage(); }}
                                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                                        <Upload className="w-6 h-6 text-blue-500 dark:text-blue-400" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900 dark:text-white">
                                            Upload Business Logo
                                        </p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                            PNG, JPG up to 5MB
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Business Name */}
                    <div className="space-y-3">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Business Name *
                        </label>
                        <Input
                            required
                            onChange={(e) => setCompanyAlias(getFirstTwoInitials(e.target.value))}
                            type="text"
                            name="business_name"
                            placeholder="Enter your business name"
                            className="w-full px-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-gray-200/50 dark:border-gray-600/50 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white"
                        />
                    </div>

                    {/* Company Alias */}
                    <div className="space-y-3">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Company Alias
                        </label>
                        <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200/50 dark:border-blue-800/50">
                            <Sparkles className="w-4 h-4 text-blue-500" />
                            <span className="font-mono text-blue-700 dark:text-blue-300">
                                {companyAlias || "AB"}
                            </span>
                            <span className="text-sm text-blue-600 dark:text-blue-400 ml-auto">
                                Auto-generated
                            </span>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            This unique identifier will be used across the platform
                        </p>
                    </div>

                    {/* Industry */}
                    <div className="space-y-3">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Industry *
                        </label>
                        <select
                            name="industry"
                            required
                            className="w-full px-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-gray-200/50 dark:border-gray-600/50 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white"
                            defaultValue=""
                        >
                            <option value="" disabled>Select your industry</option>
                            {industries.map((industry, index) => (
                                <option key={index} value={industry}>{industry}</option>
                            ))}
                        </select>
                    </div>

                    {/* Registration & Phone */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Registration Number
                            </label>
                            <Input
                                type="text"
                                name="registration_number"
                                placeholder="REG-123456"
                                className="w-full px-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-gray-200/50 dark:border-gray-600/50 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white"
                            />
                        </div>

                        <div className="space-y-3">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Phone Number
                            </label>
                            <Input
                                type="tel"
                                name="phone_number"
                                placeholder="+1 (555) 000-0000"
                                className="w-full px-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-gray-200/50 dark:border-gray-600/50 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white"
                            />
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={loading}
                            className="flex-1 px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading || success}
                            className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:scale-100 shadow-lg"
                        >
                            {loading ? (
                                <div className="flex items-center justify-center gap-2">
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Creating...
                                </div>
                            ) : success ? (
                                <div className="flex items-center justify-center gap-2">
                                    <CheckCircle className="w-4 h-4" />
                                    Created!
                                </div>
                            ) : (
                                'Create Business'
                            )}
                        </button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}