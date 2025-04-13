import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"

export default function ExpensesPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Expenses</h1>
        <Button>
          <PlusIcon className="mr-2 h-4 w-4" /> Add Expense
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Category-Based Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Expense tracking by category will go here</p>
        </CardContent>
      </Card>
    </div>
  )
}
