import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"

export default function ApiKeysPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">API Keys</h1>
        <Button>
          <PlusIcon className="mr-2 h-4 w-4" /> Generate New Key
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>API Keys Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">API keys management interface will go here</p>
        </CardContent>
      </Card>
    </div>
  )
}
