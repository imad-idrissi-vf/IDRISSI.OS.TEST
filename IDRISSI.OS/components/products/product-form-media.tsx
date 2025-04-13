"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import type { Product } from "@/lib/products/product-store"
import { useTranslation } from "@/lib/i18n"
import { Upload, X, GripVertical } from "lucide-react"
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { restrictToVerticalAxis } from "@dnd-kit/modifiers"
import { CSS } from "@dnd-kit/utilities"

interface ProductFormMediaProps {
  data: Partial<Product>
  onChange: (field: string, value: any) => void
}

interface SortableImageProps {
  url: string
  id: string
  onRemove: () => void
}

function SortableImage({ url, id, onRemove }: SortableImageProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div ref={setNodeRef} style={style} className="relative group rounded-[20px] overflow-hidden border bg-card">
      <div
        {...attributes}
        {...listeners}
        className="absolute top-2 left-2 p-1 rounded-full bg-black/50 cursor-grab z-10 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <GripVertical className="h-4 w-4 text-white" />
      </div>
      <button
        type="button"
        onClick={onRemove}
        className="absolute top-2 right-2 p-1 rounded-full bg-black/50 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <X className="h-4 w-4 text-white" />
      </button>
      <img src={url || "/placeholder.svg"} alt="Product" className="w-full h-40 object-cover" />
    </div>
  )
}

export function ProductFormMedia({ data, onChange }: ProductFormMediaProps) {
  const { t } = useTranslation()
  const [images, setImages] = useState<string[]>(data.images || [])

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      // In a real app, you would upload these files to a server
      // For this demo, we'll create object URLs
      const newImages = acceptedFiles.map((file) => URL.createObjectURL(file))
      const updatedImages = [...images, ...newImages]
      setImages(updatedImages)
      onChange("images", updatedImages)
    },
    [images, onChange],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif"],
    },
  })

  const handleRemoveImage = (index: number) => {
    const updatedImages = [...images]
    updatedImages.splice(index, 1)
    setImages(updatedImages)
    onChange("images", updatedImages)
  }

  const handleDragEnd = (event) => {
    const { active, over } = event

    if (active.id !== over.id) {
      const oldIndex = images.findIndex((img) => img === active.id)
      const newIndex = images.findIndex((img) => img === over.id)

      const updatedImages = [...images]
      updatedImages.splice(oldIndex, 1)
      updatedImages.splice(newIndex, 0, active.id)

      setImages(updatedImages)
      onChange("images", updatedImages)
    }
  }

  return (
    <div className="space-y-6">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-[20px] p-8 text-center cursor-pointer transition-colors ${
          isDragActive ? "border-primary bg-primary/5" : "border-border"
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center gap-2">
          <Upload className="h-10 w-10 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">{t("products.form.media.dropzone")}</p>
        </div>
      </div>

      {images.length > 0 && (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          modifiers={[restrictToVerticalAxis]}
        >
          <SortableContext items={images} strategy={verticalListSortingStrategy}>
            <div className="grid grid-cols-2 gap-4">
              {images.map((image, index) => (
                <SortableImage key={image} id={image} url={image} onRemove={() => handleRemoveImage(index)} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  )
}
