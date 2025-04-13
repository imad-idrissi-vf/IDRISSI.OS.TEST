"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
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

interface ProductDetailModalProps {
  isOpen: boolean
  onClose: () => void
  product: Product | null
}

export function ProductDetailModal({ isOpen, onClose, product }: ProductDetailModalProps) {
  const { t } = useTranslation()
  const { toast } = useToast()
  const { addProduct, updateProduct } = useProductStore()
  const [activeTab, setActiveTab] = useState("general")
  const [formData, setFormData] = useState<Partial<Product>>(
    product || {
      name: "",
      sku: "IDR-",
      status: "draft",
      productType: "",
      description: "",
      collection: "",
      costPrice: 0,
      retailPrice: 0,
      quantity: 0,
      warehouses: [],
      restockThreshold: 0,
      images: [],
      notes: [],
      tags: [],
    },
  )

  // Reset form data when product changes
  useEffect(() => {
    if (product) {
      setFormData(product)
    } else {
      setFormData({
        name: "",
        sku: "IDR-",
        status: "draft",
        productType: "",
        description: "",
        collection: "",
        costPrice: 0,
        retailPrice: 0,
        quantity: 0,
        warehouses: [],
        restockThreshold: 0,
        images: [],
        notes: [],
        tags: [],
      })
    }
    // Reset to general tab when opening a new product
    setActiveTab("general")
  }, [product, isOpen])

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
    return formData.name && formData.sku && formData.sku.startsWith("IDR-") && formData.productType
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] p-0 max-h-[90vh] flex flex-col overflow-hidden bg-background/95 backdrop-blur-sm">
        <DialogHeader className="p-6 border-b">
          <DialogTitle>{product ? t("products.modal.title.edit") : t("products.modal.title.add")}</DialogTitle>
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
                  {t(`products.modal.tabs.${tab}`)}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <div className="flex-1 overflow-auto p-6">
            <TabsContent value="general" className="mt-0 h-full">
              <ProductFormGeneral data={formData} onChange={handleFormChange} />
            </TabsContent>

            <TabsContent value="inventory" className="mt-0 h-full">
              <ProductFormInventory data={formData} onChange={handleFormChange} />
            </TabsContent>

            <TabsContent value="media" className="mt-0 h-full">
              <ProductFormMedia data={formData} onChange={handleFormChange} />
            </TabsContent>

            <TabsContent value="notes" className="mt-0 h-full">
              <ProductFormNotes data={formData} onChange={handleFormChange} />
            </TabsContent>
          </div>
        </Tabs>

        <DialogFooter className="p-6 border-t">
          <div className="flex justify-between w-full">
            <Button variant="outline" onClick={onClose}>
              {t("common.cancel")}
            </Button>
            <Button onClick={handleSave} disabled={!isFormValid()}>
              {t("products.form.save")}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
