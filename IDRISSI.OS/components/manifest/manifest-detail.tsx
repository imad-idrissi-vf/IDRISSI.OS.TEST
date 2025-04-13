"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ManifestOverviewTab } from "./manifest-overview-tab"
import { ManifestProductsTab } from "./manifest-products-tab"
import { ManifestMoodboardTab } from "./manifest-moodboard-tab"
import { ManifestApprovalsTab } from "./manifest-approvals-tab"

interface Manifest {
  id: string
  title: string
  eta: string
  status: string
  targetMargin: number
}

interface ManifestDetailProps {
  manifest: Manifest
}

export function ManifestDetail({ manifest }: ManifestDetailProps) {
  return (
    <div className="bg-card rounded-[20px] p-6">
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
          <ManifestOverviewTab manifest={manifest} />
        </TabsContent>

        <TabsContent value="products">
          <ManifestProductsTab manifestId={manifest.id} />
        </TabsContent>

        <TabsContent value="moodboard">
          <ManifestMoodboardTab manifestId={manifest.id} />
        </TabsContent>

        <TabsContent value="approvals">
          <ManifestApprovalsTab manifestId={manifest.id} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
