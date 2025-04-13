"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { MaterialFormGeneral } from "./material-form-general"
import { MaterialFormInventory } from "./material-form-inventory"
import { MaterialFormMedia } from "./material-form-media"
import { MaterialFormNotes } from "./material-form-notes"
import type { Material } from "@/types/materials"
import { useTranslation } from "@/lib/i18n"
import { useMaterialStore } from "@/lib/materials/material-store"
import { useToast } from "@/components/ui/use-toast"

interface MaterialDetailModalProps {
  isOpen: boolean
  onClose: () => void
  material: Material | null
}

export function MaterialDetailModal({ isOpen, onClose, material }: MaterialDetailModalProps) {
  const { t } = useTranslation()
  const { toast } = useToast()
  const { addMaterial, updateMaterial } = useMaterialStore()
  const [activeTab, setActiveTab] = useState("general")
  const [formData, setFormData] = useState<Partial<Material>>(
    material || {
      title: "",
      type: "raw",
      status: "draft",
      campaign: "none",
      tags: [],
      notes: "",
    }
  )

  // Reset form data when material changes
  useEffect(() => {
    if (material) {
      setFormData(material)
    } else {
      setFormData({
        title: "",
        type: "raw",
        status: "draft",
        campaign: "none",
        tags: [],
        notes: "",
      })
    }
    // Reset to general tab when opening a new material
    setActiveTab("general")
  }, [material, isOpen])

  const handleFormChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSave = () => {
    if (material) {
      updateMaterial(material.id, formData)
      toast({
        title: t("materials.notification.saved"),
        description: `${formData.title} has been updated.`,
      })
    } else {
      addMaterial(formData as Omit<Material, "id" | "createdAt" | "updatedAt">)
      toast({
        title: t("materials.notification.saved"),
        description: `${formData.title} has been created.`,
      })
    }
    onClose()
  }

  const isFormValid = () => {
    return formData.title && formData.type && formData.status
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] p-0 max-h-[90vh] flex flex-col overflow-hidden bg-background/95 backdrop-blur-sm">
        <DialogHeader className="p-6 border-b">
          <DialogTitle>{material ? t("materials.modal.title.edit") : t("materials.modal.title.add")}</DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col overflow-hidden">
          <div className="border-b">
            <TabsList className="h-auto p-0 bg-transparent justify-center">
              {["general", "inventory", "media", "notes"].map((tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  className="flex-1 py-3 rounded-none data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-primary transition-all"
                >
                  {t(`materials.modal.tabs.${tab}`)}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <div className="flex-1 overflow-auto p-6">
            <TabsContent value="general" className="mt-0 h-full">
              <MaterialFormGeneral data={formData} onChange={handleFormChange} />
            </TabsContent>

            <TabsContent value="inventory" className="mt-0 h-full">
              <MaterialFormInventory data={formData} onChange={handleFormChange} />
            </TabsContent>

            <TabsContent value="media" className="mt-0 h-full">
              <MaterialFormMedia data={formData} onChange={handleFormChange} />
            </TabsContent>

            <TabsContent value="notes" className="mt-0 h-full">
              <MaterialFormNotes data={formData} onChange={handleFormChange} />
            </TabsContent>
          </div>
        </Tabs>

        <DialogFooter className="p-6 border-t">
          <div className="flex justify-between w-full">
            <Button variant="outline" onClick={onClose}>
              {t("common.cancel")}
            </Button>
            <Button onClick={handleSave} disabled={!isFormValid()}>
              {t("materials.form.save")}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 