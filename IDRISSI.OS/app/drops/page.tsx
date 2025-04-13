"use client"

import { useState } from "react"
import { CollectionsList } from "@/components/collections/collections-list"
import { CollectionDetail } from "@/components/collections/collection-detail"
import { NewCollectionModal } from "@/components/collections/new-collection-modal"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"

export default function CollectionsPage() {
  const [selectedCollectionId, setSelectedCollectionId] = useState<string | null>(null)
  const [isNewCollectionModalOpen, setIsNewCollectionModalOpen] = useState(false)

  // Sample data - replace with real API or database calls when ready
  const collections = [
    {
      id: "1",
      title: "Fall Capsule",
      eta: "2023-09-15",
      status: "IN SAMPLE",
      targetMargin: 65,
    },
    {
      id: "2",
      title: "Winter Collection",
      eta: "2023-11-01",
      status: "IDEA",
      targetMargin: 70,
    },
    {
      id: "3",
      title: "Spring Essentials",
      eta: "2024-02-15",
      status: "FINALIZED",
      targetMargin: 68,
    },
    {
      id: "4",
      title: "Summer Limited Edition",
      eta: "2024-05-01",
      status: "APPROVED",
      targetMargin: 75,
    },
  ]

  const selectedCollection = collections.find((c) => c.id === selectedCollectionId) || collections[0]

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-medium">Collections</h1>
        <Button onClick={() => setIsNewCollectionModalOpen(true)} className="font-roboto uppercase tracking-wider">
          <PlusIcon className="mr-2 h-4 w-4" /> New Collection
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <CollectionsList
            collections={collections}
            selectedId={selectedCollectionId || collections[0].id}
            onSelect={setSelectedCollectionId}
          />
        </div>
        <div className="lg:col-span-2">
          <CollectionDetail collection={selectedCollection} />
        </div>
      </div>

      <NewCollectionModal isOpen={isNewCollectionModalOpen} onClose={() => setIsNewCollectionModalOpen(false)} />
    </div>
  )
}
