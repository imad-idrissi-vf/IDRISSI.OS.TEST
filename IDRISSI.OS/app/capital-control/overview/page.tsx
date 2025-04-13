import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function CapitalControlOverviewPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Capital Control Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Revenue chart will go here</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Expense Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Expense breakdown chart will go here</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Profit Margin</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Profit margin chart will go here</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Cash Flow</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Cash flow chart will go here</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
