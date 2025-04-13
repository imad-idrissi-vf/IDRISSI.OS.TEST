import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SaveIcon } from "lucide-react"

export default function NoListPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">No List</h1>
        <Button>
          <SaveIcon className="mr-2 h-4 w-4" /> Save Changes
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Brand Constraints</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Editor for brand constraints and "no list" will go here</p>
        </CardContent>
      </Card>
    </div>
  )
}
