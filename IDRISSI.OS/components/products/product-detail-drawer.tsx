"use client"

import { useState } from "react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ProductFormGeneral } from "./product-form-general"
import { ProductFormInventory } from "./product-form-inventory"
import { ProductFormMedia } from "./product-form-media"
import { ProductFormNotes } from "./product-form-notes"
import type { Product } from "@/lib/products/product-store"
import { useTranslation } from "@/lib/i18n"
import { useProductStore } from "@/lib/products/product-store"
import { useToast } from "@/components/ui/use-toast"

interface ProductDetailDrawerProps {
  isOpen: boolean
  onClose: () => void
  product: Product | null
}

export function ProductDetailDrawer({ isOpen, onClose, product }: ProductDetailDrawerProps) {
  const { t } = useTranslation()
  const { toast } = useToast()
  const { addProduct, updateProduct } = useProductStore()
  const [activeTab, setActiveTab] = useState("general")
  const [formData, setFormData] = useState<Partial<Product>>(
    product || {
      name: "",
      sku: "",
      status: "draft",
      description: "",
      collection: "",
      costPrice: 0,
      retailPrice: 0,
      quantity: 0,
      warehouse: "",
      restockThreshold: 0,
      images: [],
      notes: "",
      tags: [],
    },
  )

  const handleFormChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSave = () => {
    if (product) {
      updateProduct(product.id, formData)
      toast({
        title: t("products.notification.saved"),
        description: `${formData.name} has been updated.`,
      })
    } else {
      addProduct(formData as Omit<Product, "id" | "margin">)
      toast({
        title: t("products.notification.saved"),
        description: `${formData.name} has been created.`,
      })
    }
    onClose()
  }

  const isFormValid = () => {
    return formData.name && formData.sku
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-xl w-full p-0 flex flex-col">
        <SheetHeader className="p-6 border-b">
          <SheetTitle>{product ? t("products.drawer.title.edit") : t("products.drawer.title.add")}</SheetTitle>
        </SheetHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <TabsList className="grid grid-cols-4 px-6 pt-2">
            <TabsTrigger value="general">{t("products.drawer.tabs.general")}</TabsTrigger>
            <TabsTrigger value="inventory">{t("products.drawer.tabs.inventory")}</TabsTrigger>
            <TabsTrigger value="media">{t("products.drawer.tabs.media")}</TabsTrigger>
            <TabsTrigger value="notes">{t("products.drawer.tabs.notes")}</TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-auto p-6">
            <TabsContent value="general" className="mt-0">
              <ProductFormGeneral data={formData} onChange={handleFormChange} />
            </TabsContent>

            <TabsContent value="inventory" className="mt-0">
              <ProductFormInventory data={formData} onChange={handleFormChange} />
            </TabsContent>

            <TabsContent value="media" className="mt-0">
              <ProductFormMedia data={formData} onChange={handleFormChange} />
            </TabsContent>

            <TabsContent value="notes" className="mt-0">
              <ProductFormNotes data={formData} onChange={handleFormChange} />
            </TabsContent>
          </div>
        </Tabs>

        <SheetFooter className="p-6 border-t">
          <div className="flex justify-between w-full">
            <Button variant="outline" onClick={onClose}>
              {t("products.form.cancel")}
            </Button>
            <Button onClick={handleSave} disabled={!isFormValid()}>
              {t("products.form.save")}
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
