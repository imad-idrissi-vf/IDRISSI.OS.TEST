import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Analytics</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>SKU Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">SKU performance analysis will go here</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Collection Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Collection performance analysis will go here</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
