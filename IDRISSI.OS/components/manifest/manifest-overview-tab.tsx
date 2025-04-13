"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArchiveIcon, CheckCircleIcon } from "lucide-react"

interface Manifest {
  id: string
  title: string
  eta: string
  status: string
  targetMargin: number
}

interface ManifestOverviewTabProps {
  manifest: Manifest
}

export function ManifestOverviewTab({ manifest }: ManifestOverviewTabProps) {
  const [summary, setSummary] = useState(
    "This Fall Capsule collection focuses on sustainable materials with a luxury aesthetic. The collection includes 12 pieces designed for versatility and longevity. Key materials include organic cotton, recycled cashmere, and vegetable-tanned leather.",
  )
  const [timeline, setTimeline] = useState(manifest.status)

  // Simulating CEO role - in a real app, this would be determined by authentication
  const isCEO = true

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-medium">{manifest.title}</h2>
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
          placeholder="Enter manifest summary..."
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-secondary rounded-[20px] p-4">
          <p className="text-sm text-muted-foreground mb-1">Target Margin</p>
          <p className="text-2xl font-medium">{manifest.targetMargin}%</p>
        </div>
        <div className="bg-secondary rounded-[20px] p-4">
          <p className="text-sm text-muted-foreground mb-1">Expected Release</p>
          <p className="text-2xl font-medium">
            {new Date(manifest.eta).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
          </p>
        </div>
      </div>
    </div>
  )
}
