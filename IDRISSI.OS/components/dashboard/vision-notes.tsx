"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Lock, Edit2, Save } from "lucide-react"

export function VisionNotes() {
  const [isEditing, setIsEditing] = useState(false)
  const [notes, setNotes] = useState(
    "Our next collection should focus on sustainable materials while maintaining our luxury aesthetic. Key markets to target: Paris, Tokyo, New York.\n\nConsider collaboration with Artist X for limited edition pieces.\n\nAI integration for personalized shopping experiences should be priority for Q4.",
  )
  const [editableNotes, setEditableNotes] = useState(notes)

  const handleSave = () => {
    setNotes(editableNotes)
    setIsEditing(false)
  }

  return (
    <Card className="col-span-1 lg:col-span-2 rounded-[20px] overflow-hidden">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <div className="flex items-center">
          <Lock className="h-5 w-5 mr-2" />
          <CardTitle className="text-xl font-medium">Vision Notes</CardTitle>
        </div>
        {isEditing ? (
          <Button onClick={handleSave} className="rounded-[20px] font-roboto uppercase text-xs tracking-wider">
            <Save className="h-4 w-4 mr-2" />
            SAVE
          </Button>
        ) : (
          <Button
            onClick={() => setIsEditing(true)}
            className="rounded-[20px] font-roboto uppercase text-xs tracking-wider"
          >
            <Edit2 className="h-4 w-4 mr-2" />
            EDIT
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <textarea
            value={editableNotes}
            onChange={(e) => setEditableNotes(e.target.value)}
            className="w-full h-40 p-4 bg-secondary rounded-[20px] focus:outline-none resize-none"
          />
        ) : (
          <div className="bg-secondary p-4 rounded-[20px] whitespace-pre-line">{notes}</div>
        )}
      </CardContent>
    </Card>
  )
}
