import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"

export default function ProjectsPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Projects</h1>
        <Button>
          <PlusIcon className="mr-2 h-4 w-4" /> New Project
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Kanban Board</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Kanban board for task management will go here</p>
        </CardContent>
      </Card>
    </div>
  )
}
