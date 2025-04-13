import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SaveIcon } from "lucide-react"

export default function PrinciplesPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Brand Principles</h1>
        <Button>
          <SaveIcon className="mr-2 h-4 w-4" /> Save Changes
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Markdown Editor</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Markdown editor for brand principles will go here</p>
        </CardContent>
      </Card>
    </div>
  )
}
