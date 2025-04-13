"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { UploadIcon, ExternalLinkIcon, GripIcon } from "lucide-react"
import { Input } from "@/components/ui/input"

interface MoodboardItem {
  id: string
  type: "image" | "embed"
  content: string
}

interface ManifestMoodboardTabProps {
  manifestId: string
}

export function ManifestMoodboardTab({ manifestId }: ManifestMoodboardTabProps) {
  const [moodboardItems, setMoodboardItems] = useState<MoodboardItem[]>([
    {
      id: "1",
      type: "image",
      content: "/placeholder.svg?height=300&width=500",
    },
    {
      id: "2",
      type: "image",
      content: "/placeholder.svg?height=300&width=500",
    },
    {
      id: "3",
      type: "embed",
      content: "https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FsampleID",
    },
  ])

  const [embedUrl, setEmbedUrl] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      // In a real app, you would upload the file to a server and get a URL back
      // For this example, we'll just use a placeholder
      const newItem: MoodboardItem = {
        id: Date.now().toString(),
        type: "image",
        content: "/placeholder.svg?height=300&width=500",
      }
      setMoodboardItems([...moodboardItems, newItem])
    }
  }

  const handleEmbedAdd = () => {
    if (embedUrl) {
      const newItem: MoodboardItem = {
        id: Date.now().toString(),
        type: "embed",
        content: embedUrl,
      }
      setMoodboardItems([...moodboardItems, newItem])
      setEmbedUrl("")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-medium">Moodboard</h2>
        <div className="flex space-x-4">
          <Button
            variant="outline"
            className="font-roboto uppercase tracking-wider"
            onClick={() => fileInputRef.current?.click()}
          >
            <UploadIcon className="mr-2 h-4 w-4" /> Upload
          </Button>
          <Input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
        </div>
      </div>

      <div className="flex items-center space-x-4 mb-6">
        <Input
          type="text"
          placeholder="Paste Figma or Notion embed URL"
          value={embedUrl}
          onChange={(e) => setEmbedUrl(e.target.value)}
          className="rounded-[20px]"
        />
        <Button onClick={handleEmbedAdd} className="font-roboto uppercase tracking-wider">
          <ExternalLinkIcon className="mr-2 h-4 w-4" /> Embed
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {moodboardItems.map((item) => (
          <div key={item.id} className="bg-secondary rounded-[20px] overflow-hidden relative group">
            <div className="absolute top-2 right-2 bg-background/80 rounded-full p-1 cursor-move opacity-0 group-hover:opacity-100 transition-opacity">
              <GripIcon className="h-5 w-5" />
            </div>

            {item.type === "image" ? (
              <img
                src={item.content || "/placeholder.svg"}
                alt="Moodboard item"
                className="w-full h-[300px] object-cover rounded-[20px]"
              />
            ) : (
              <div className="w-full h-[300px] bg-secondary rounded-[20px] flex items-center justify-center">
                <iframe src={item.content} className="w-full h-full rounded-[20px]" title="Embedded content" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
