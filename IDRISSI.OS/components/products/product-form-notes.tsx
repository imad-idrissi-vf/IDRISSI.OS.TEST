"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import type { Product, NoteEntry } from "@/lib/products/product-store"
import { useTranslation } from "@/lib/i18n"
import { useProductStore } from "@/lib/products/product-store"
import { Send } from "lucide-react"

interface ProductFormNotesProps {
  data: Partial<Product>
  onChange: (field: string, value: any) => void
}

export function ProductFormNotes({ data, onChange }: ProductFormNotesProps) {
  const { t } = useTranslation()
  const [newNote, setNewNote] = useState("")
  const { addNoteToProduct } = useProductStore()
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleAddNote = () => {
    if (newNote.trim() && data.id) {
      const noteEntry = {
        id: Date.now().toString(),
        text: newNote,
        timestamp: new Date(),
        user: "John Doe" // In a real app, this would come from the auth context
      }
      
      // Update the notes array
      const updatedNotes = data.notes ? [noteEntry, ...data.notes] : [noteEntry]
      onChange("notes", updatedNotes)
      
      // Also update in the store
      addNoteToProduct(data.id, newNote)
      
      // Clear the input
      setNewNote("")
      
      // Focus back on textarea
      textareaRef.current?.focus()
    }
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(date))
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      e.preventDefault()
      handleAddNote()
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="newNote">{t("products.form.notes.addNew")}</Label>
        <div className="flex gap-2">
          <Textarea
            ref={textareaRef}
            id="newNote"
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder={t("products.form.notes.placeholder")}
            rows={3}
            onKeyDown={handleKeyDown}
            className="flex-1"
          />
          <Button 
            onClick={handleAddNote} 
            disabled={!newNote.trim() || !data.id} 
            size="icon"
            className="self-end"
          >
            <Send className="h-4 w-4" />
            <span className="sr-only">{t("common.send")}</span>
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">Press Ctrl+Enter to send</p>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium">{t("products.form.notes.history")}</h3>

        {data.notes && data.notes.length > 0 ? (
          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
            {data.notes.map((note: NoteEntry) => (
              <div key={note.id} className="flex gap-3 p-3 rounded-lg bg-muted/50">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>
                    {note.user
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <p className="text-sm font-medium">{note.user}</p>
                    <time className="text-xs text-muted-foreground">{formatDate(note.timestamp)}</time>
                  </div>
                  <p className="text-sm mt-1 whitespace-pre-wrap">{note.text}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">{t("products.form.notes.empty")}</p>
        )}
      </div>
    </div>
  )
}
