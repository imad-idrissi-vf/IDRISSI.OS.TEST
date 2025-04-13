"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, Package, Truck } from "lucide-react"

export function FulfillmentFlow() {
  const orders = [
    {
      id: "ORD-7829",
      customer: "Emma Johnson",
      status: "Delivered",
      icon: CheckCircle,
      iconColor: "text-green-500",
    },
    {
      id: "ORD-6547",
      customer: "Michael Chen",
      status: "Shipped",
      icon: Truck,
      iconColor: "text-blue-500",
    },
    {
      id: "ORD-9032",
      customer: "Sophia Williams",
      status: "Processing",
      icon: Package,
      iconColor: "text-yellow-500",
    },
    {
      id: "ORD-5214",
      customer: "James Rodriguez",
      status: "Pending",
      icon: Clock,
      iconColor: "text-gray-500",
    },
  ]

  return (
    <Card className="col-span-1 rounded-[20px] overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-medium">Fulfillment Flow</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="flex items-center justify-between p-3 bg-secondary rounded-[20px]">
            <div className="flex items-center">
              <div className={`mr-3 ${order.iconColor}`}>
                <order.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium">{order.id}</p>
                <p className="text-sm text-muted-foreground">{order.customer}</p>
              </div>
            </div>
            <span className="text-sm">{order.status}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
