"use client"

import { useState } from "react"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { CheckCircleIcon } from "lucide-react"

interface ManifestApprovalsTabProps {
  manifestId: string
}

export function ManifestApprovalsTab({ manifestId }: ManifestApprovalsTabProps) {
  const [approvals, setApprovals] = useState({
    cpo: false,
    cmo: true,
    ceo: false,
  })

  const handleApprovalToggle = (role: keyof typeof approvals) => {
    setApprovals({
      ...approvals,
      [role]: !approvals[role],
    })
  }

  const allApproved = approvals.cpo && approvals.cmo && approvals.ceo

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-medium">Approvals</h2>
        {allApproved && (
          <Badge className="bg-green-500 text-white rounded-[20px] px-4 py-2 text-sm">
            <CheckCircleIcon className="mr-2 h-4 w-4" /> Ready to Manifest
          </Badge>
        )}
      </div>

      <div className="space-y-6">
        <div className="bg-secondary rounded-[20px] p-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-medium">Chief Product Officer</h3>
              <p className="text-sm text-muted-foreground">Approves product specifications and quality</p>
            </div>
            <Switch checked={approvals.cpo} onCheckedChange={() => handleApprovalToggle("cpo")} />
          </div>
        </div>

        <div className="bg-secondary rounded-[20px] p-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-medium">Chief Marketing Officer</h3>
              <p className="text-sm text-muted-foreground">Approves branding and marketing strategy</p>
            </div>
            <Switch checked={approvals.cmo} onCheckedChange={() => handleApprovalToggle("cmo")} />
          </div>
        </div>

        <div className="bg-secondary rounded-[20px] p-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-medium">Chief Executive Officer</h3>
              <p className="text-sm text-muted-foreground">Final approval for launch</p>
            </div>
            <Switch checked={approvals.ceo} onCheckedChange={() => handleApprovalToggle("ceo")} />
          </div>
        </div>
      </div>

      <div className="bg-card rounded-[20px] p-6 border border-secondary">
        <h3 className="text-lg font-medium mb-4">Approval Timeline</h3>
        <div className="space-y-4">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-3"></div>
            <p className="text-sm">Marketing Strategy Approved - July 15, 2023</p>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-secondary mr-3"></div>
            <p className="text-sm text-muted-foreground">Product Specifications - Pending</p>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-secondary mr-3"></div>
            <p className="text-sm text-muted-foreground">Final Executive Approval - Pending</p>
          </div>
        </div>
      </div>
    </div>
  )
}
