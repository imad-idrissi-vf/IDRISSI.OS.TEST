import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"

export default function CustomersPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Customers</h1>
        <Button>
          <PlusIcon className="mr-2 h-4 w-4" /> Add Customer
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>CRM View</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Customer relationship management interface will go here</p>
        </CardContent>
      </Card>
    </div>
  )
}
