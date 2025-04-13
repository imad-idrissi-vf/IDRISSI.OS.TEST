"use client"

import { cn } from "@/lib/utils"
import { MaterialStatus } from "@/lib/materials/material-store"

interface StatusPillProps {
  status: MaterialStatus
  className?: string
}

const statusStyles = {
  active: "bg-green-100 text-green-700 border-green-200",
  draft: "bg-yellow-100 text-yellow-700 border-yellow-200",
  archived: "bg-gray-100 text-gray-700 border-gray-200",
}

export function StatusPill({ status, className }: StatusPillProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
        statusStyles[status],
        className
      )}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  )
} 