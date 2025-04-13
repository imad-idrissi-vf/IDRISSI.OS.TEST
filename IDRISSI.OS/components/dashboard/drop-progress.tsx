"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react"

const drops = [
  { id: 1, name: "Summer Collection", progress: 85, dueDate: "Aug 15, 2023" },
  { id: 2, name: "Fall Essentials", progress: 45, dueDate: "Oct 1, 2023" },
  { id: 3, name: "Holiday Special", progress: 20, dueDate: "Dec 1, 2023" },
]

export function DropProgress() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <Card className="col-span-1 rounded-[20px] overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-medium">Drop Progress</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {drops.map((drop) => (
          <div key={drop.id} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-medium">{drop.name}</span>
              <span className="text-sm text-muted-foreground">{drop.progress}%</span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-primary animate-progress-fill rounded-full"
                style={{ "--progress-width": `${drop.progress}%` } as React.CSSProperties}
              ></div>
            </div>
            <div className="text-sm text-muted-foreground">Due: {drop.dueDate}</div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
