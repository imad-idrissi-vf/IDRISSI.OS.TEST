import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function OrdersPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Orders</h1>

      <Card>
        <CardHeader>
          <CardTitle>Orders Table</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Orders table with detailed information will go here</p>
        </CardContent>
      </Card>
    </div>
  )
}
