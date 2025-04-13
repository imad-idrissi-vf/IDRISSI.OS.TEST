"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArchiveIcon, CheckCircleIcon } from "lucide-react"
import { useState } from "react"

interface Collection {
  id: string
  title: string
  eta: string
  status: string
  targetMargin: number
}

interface CollectionDetailProps {
  collection: Collection
}

export function CollectionDetail({ collection }: CollectionDetailProps) {
  const [summary, setSummary] = useState(
    "This collection focuses on sustainable materials with a luxury aesthetic. The collection includes pieces designed for versatility and longevity. Key materials include organic cotton, recycled cashmere, and vegetable-tanned leather.",
  )
  const [timeline, setTimeline] = useState(collection.status)

  // Simulating CEO role - in a real app, this would be determined by authentication
  const isCEO = true

  return (
    <div className="bg-card rounded-[20px] p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-medium">{collection.title}</h2>
        <div className="flex space-x-4">
          {isCEO && (
            <>
              <Button variant="default" className="font-roboto uppercase tracking-wider">
                <CheckCircleIcon className="mr-2 h-4 w-4" /> Approve for Launch
              </Button>
              <Button variant="outline" className="font-roboto uppercase tracking-wider">
                <ArchiveIcon className="mr-2 h-4 w-4" /> Archive
              </Button>
            </>
          )}
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="overview" className="rounded-[20px]">
            Overview
          </TabsTrigger>
          <TabsTrigger value="products" className="rounded-[20px]">
            Products
          </TabsTrigger>
          <TabsTrigger value="moodboard" className="rounded-[20px]">
            Moodboard
          </TabsTrigger>
          <TabsTrigger value="approvals" className="rounded-[20px]">
            Approvals
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Timeline Status</label>
              <Select value={timeline} onValueChange={setTimeline}>
                <SelectTrigger className="rounded-[20px]">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent className="rounded-[20px]">
                  <SelectItem value="IDEA">Idea</SelectItem>
                  <SelectItem value="IN SAMPLE">In Sample</SelectItem>
                  <SelectItem value="FINALIZED">Finalized</SelectItem>
                  <SelectItem value="APPROVED">Approved</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Summary</label>
              <Textarea
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                className="min-h-[200px] rounded-[20px] bg-secondary resize-none"
                placeholder="Enter collection summary..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-secondary rounded-[20px] p-4">
                <p className="text-sm text-muted-foreground mb-1">Target Margin</p>
                <p className="text-2xl font-medium">{collection.targetMargin}%</p>
              </div>
              <div className="bg-secondary rounded-[20px] p-4">
                <p className="text-sm text-muted-foreground mb-1">Expected Release</p>
                <p className="text-2xl font-medium">
                  {new Date(collection.eta).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="products">
          <div className="flex items-center justify-center h-64">
            <p className="text-muted-foreground">Products tab content will go here</p>
          </div>
        </TabsContent>

        <TabsContent value="moodboard">
          <div className="flex items-center justify-center h-64">
            <p className="text-muted-foreground">Moodboard tab content will go here</p>
          </div>
        </TabsContent>

        <TabsContent value="approvals">
          <div className="flex items-center justify-center h-64">
            <p className="text-muted-foreground">Approvals tab content will go here</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
