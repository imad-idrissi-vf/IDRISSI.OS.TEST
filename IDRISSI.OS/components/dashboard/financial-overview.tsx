"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpRight, ArrowDownRight, DollarSign } from "lucide-react"

export function FinancialOverview() {
  const metrics = [
    {
      title: "Revenue",
      value: "$128,430",
      change: "+12.5%",
      trend: "up",
    },
    {
      title: "Expenses",
      value: "$54,210",
      change: "-3.2%",
      trend: "down",
    },
    {
      title: "Profit",
      value: "$74,220",
      change: "+18.7%",
      trend: "up",
    },
  ]

  return (
    <Card className="col-span-1 rounded-[20px] overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-medium">Financial Overview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {metrics.map((metric, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center mr-4">
                <DollarSign className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{metric.title}</p>
                <p className="text-xl font-medium">{metric.value}</p>
              </div>
            </div>
            <div className={`flex items-center ${metric.trend === "up" ? "text-green-500" : "text-red-500"}`}>
              {metric.trend === "up" ? (
                <ArrowUpRight className="h-4 w-4 mr-1" />
              ) : (
                <ArrowDownRight className="h-4 w-4 mr-1" />
              )}
              <span>{metric.change}</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
