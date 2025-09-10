import { useEffect, useRef, useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight } from "lucide-react"
import { BusinessType } from "@/types/businesses"
import { softDeleteBusiness } from "@/services/api/apiBusiness"

export const DeleteDiag = ({isOpen,onClose, data, getBusinessByUserID}:{isOpen:boolean,onClose:()=>void , data: BusinessType,getBusinessByUserID: ()=> void}) => {
  const [loading, setLoading] = useState(false)

  const onDelete = () => {
    setLoading(true)
    softDeleteBusiness(data?.id)
    .then((res)=>{
      if(res){
        onClose()
      }
    })
    .catch((err)=>{
      console.error("Error deleting business:", err);
    })
    .finally(()=>{
      getBusinessByUserID()
      setLoading(false)
    })
    // Implement your delete logic here
    console.log("Business deleted");
  }
  return (
    
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
  <DialogContent className="sm:max-w-[500px] max-h-[80vh] dark:text-white overflow-y-auto z-[9999] bg-white dark:bg-boxdark rounded-lg shadow-lg p-6">
    
    <DialogHeader>
      <DialogTitle className="text-gray-900 text-center dark:text-gray-200">
        Are you sure you want to delete this business?
      </DialogTitle>
      <DialogDescription className="text-gray-700 dark:text-gray-400 text-center">
        This action cannot be undone.
      </DialogDescription>
    </DialogHeader>

    <div className="mt-6 flex justify-center gap-4">
      <button
        onClick={onClose}
        className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
      >
        Cancel
      </button>
      <button
        disabled={loading}
        onClick={() => {
          onDelete(); // call your delete function
        }}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        {loading ? 'Deleting...' : 'Delete'}
      </button>
    </div>

  </DialogContent>
</Dialog>

  )
}
