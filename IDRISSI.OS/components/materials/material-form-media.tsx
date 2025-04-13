"use client"

import { ChangeEvent, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useTranslation } from "@/lib/i18n"
import { ImagePlus, Trash2, X } from "lucide-react"
import type { Material } from "@/types/materials"

interface MaterialFormMediaProps {
  data: Partial<Material>
  onChange: (field: keyof Material, value: any) => void
}

export function MaterialFormMedia({ data, onChange }: MaterialFormMediaProps) {
  const { t } = useTranslation()

  const handleImageUpload = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (!file) return

      const reader = new FileReader()
      reader.onloadend = () => {
        onChange("image", reader.result as string)
      }
      reader.readAsDataURL(file)
    },
    [onChange]
  )

  const handleRemoveImage = useCallback(() => {
    onChange("image", null)
  }, [onChange])

  const handleAttachmentUpload = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || [])
      const currentAttachments = data.attachments || []
      
      const newAttachments = files.map((file) => ({
        name: file.name,
        size: file.size,
        type: file.type,
        url: URL.createObjectURL(file),
      }))

      onChange("attachments", [...currentAttachments, ...newAttachments])
    },
    [data.attachments, onChange]
  )

  const handleRemoveAttachment = useCallback(
    (index: number) => {
      const attachments = [...(data.attachments || [])]
      attachments.splice(index, 1)
      onChange("attachments", attachments)
    },
    [data.attachments, onChange]
  )

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t("materials.form.image")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col gap-4">
              <Label htmlFor="image">{t("materials.form.materialImage")}</Label>
              {data.image ? (
                <div className="relative w-full h-48">
                  <img
                    src={data.image}
                    alt={t("materials.form.materialImage")}
                    className="w-full h-full object-cover rounded-md"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={handleRemoveImage}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center justify-center w-full h-48 border-2 border-dashed rounded-md">
                  <label
                    htmlFor="image-upload"
                    className="flex flex-col items-center gap-2 cursor-pointer"
                  >
                    <span>{t("materials.form.uploadImage")}</span>
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </label>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t("materials.form.attachments")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col gap-4">
              <input
                type="file"
                multiple
                className="hidden"
                id="attachments-upload"
                onChange={handleAttachmentUpload}
              />
              <label
                htmlFor="attachments-upload"
                className="flex items-center justify-center w-full h-24 border-2 border-dashed rounded-md cursor-pointer"
              >
                <span>Drop files here or click to upload</span>
              </label>

              {data.attachments && data.attachments.length > 0 && (
                <div className="space-y-2">
                  {data.attachments.map((attachment, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 border rounded-md"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">
                          {attachment.name}
                        </span>
                        <span className="text-sm text-gray-500">
                          {Math.round(attachment.size / 1024)}KB
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveAttachment(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 