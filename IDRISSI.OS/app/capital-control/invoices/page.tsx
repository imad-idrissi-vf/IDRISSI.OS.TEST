import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"

export default function InvoicesPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Invoices</h1>
        <Button>
          <PlusIcon className="mr-2 h-4 w-4" /> Create Invoice
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Invoices Table</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Invoices table with detailed information will go here</p>
        </CardContent>
      </Card>
    </div>
  )
}
