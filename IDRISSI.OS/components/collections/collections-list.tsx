"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/lib/utils"

interface Collection {
  id: string
  title: string
  eta: string
  status: string
  targetMargin: number
}

interface CollectionsListProps {
  collections: Collection[]
  selectedId: string
  onSelect: (id: string) => void
}

export function CollectionsList({ collections, selectedId, onSelect }: CollectionsListProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "IDEA":
        return "bg-blue-500/20 text-blue-500"
      case "IN SAMPLE":
        return "bg-yellow-500/20 text-yellow-500"
      case "FINALIZED":
        return "bg-purple-500/20 text-purple-500"
      case "APPROVED":
        return "bg-green-500/20 text-green-500"
      default:
        return "bg-gray-500/20 text-gray-500"
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-medium mb-4">Collection Editions</h2>
      <div className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto custom-scrollbar pr-2">
        {collections.map((collection) => (
          <Card
            key={collection.id}
            className={`rounded-[20px] cursor-pointer transition-all duration-200 hover:bg-secondary ${
              selectedId === collection.id ? "bg-secondary" : ""
            }`}
            onClick={() => onSelect(collection.id)}
          >
            <CardContent className="p-5">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-medium">{collection.title}</h3>
                <Badge className={`rounded-[20px] font-medium ${getStatusColor(collection.status)}`}>
                  [{collection.status}]
                </Badge>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>ETA: {formatDate(collection.eta)}</span>
                <span>Target: {collection.targetMargin}%</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
