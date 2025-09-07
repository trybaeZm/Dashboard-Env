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

export const DeleteDiag = ({isOpen,onClose}:{isOpen:boolean,onClose:()=>void }) => {
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
        onClick={() => {
          onDelete(); // call your delete function
          onClose();  // close the dialog
        }}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Delete
      </button>
    </div>

  </DialogContent>
</Dialog>

  )
}
