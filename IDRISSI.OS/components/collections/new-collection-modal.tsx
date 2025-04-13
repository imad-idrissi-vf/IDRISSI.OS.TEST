"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface NewCollectionModalProps {
  isOpen: boolean
  onClose: () => void
}

export function NewCollectionModal({ isOpen, onClose }: NewCollectionModalProps) {
  const [title, setTitle] = useState("")
  const [eta, setEta] = useState("")
  const [purpose, setPurpose] = useState("")

  const handleSubmit = () => {
    // In a real app, you would submit this data to your backend
    console.log({ title, eta, purpose })

    // Reset form and close modal
    setTitle("")
    setEta("")
    setPurpose("")
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="rounded-[20px] bg-background border-none max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-medium">Create New Collection</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Summer Collection 2024"
              className="rounded-[20px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="eta">Expected Release Date</Label>
            <Input
              id="eta"
              type="date"
              value={eta}
              onChange={(e) => setEta(e.target.value)}
              className="rounded-[20px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="purpose">Purpose</Label>
            <Textarea
              id="purpose"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              placeholder="Describe the purpose of this collection..."
              className="rounded-[20px] min-h-[100px]"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} className="font-roboto uppercase tracking-wider rounded-[20px]">
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="font-roboto uppercase tracking-wider rounded-[20px]">
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
