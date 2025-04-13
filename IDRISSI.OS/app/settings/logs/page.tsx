import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function LogsPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">System Logs</h1>

      <Card>
        <CardHeader>
          <CardTitle>Activity Logs</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">System activity logs will go here</p>
        </CardContent>
      </Card>
    </div>
  )
}
