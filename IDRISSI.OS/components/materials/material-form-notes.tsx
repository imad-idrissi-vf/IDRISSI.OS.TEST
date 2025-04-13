"use client"

import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useTranslation } from "@/lib/i18n"
import type { Material } from "@/types/materials"

interface MaterialFormNotesProps {
  data: Partial<Material>
  onChange: (field: string, value: any) => void
}

export function MaterialFormNotes({ data, onChange }: MaterialFormNotesProps) {
  const { t } = useTranslation()
  const [notes, setNotes] = useState<string>(data.notes || "")

  const handleNotesChange = (value: string) => {
    setNotes(value)
    onChange("notes", value)
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="notes">{t("materials.form.notes")}</Label>
        <Textarea
          id="notes"
          value={notes}
          onChange={(e) => handleNotesChange(e.target.value)}
          placeholder={t("materials.form.notesPlaceholder")}
          className="min-h-[200px]"
        />
      </div>
    </div>
  )
} 