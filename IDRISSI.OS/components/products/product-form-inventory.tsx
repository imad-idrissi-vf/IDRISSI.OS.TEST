"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Product } from "@/lib/products/product-store"
import { useTranslation } from "@/lib/i18n"
import { warehouses } from "@/lib/products/product-data"
import { PlusCircle, Trash2 } from "lucide-react"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useProductStore } from "@/lib/products/product-store"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface ProductFormInventoryProps {
  data: Partial<Product>
  onChange: (field: string, value: any) => void
}

export function ProductFormInventory({ data, onChange }: ProductFormInventoryProps) {
  const { t } = useTranslation()
  const [showNewWarehouseDialog, setShowNewWarehouseDialog] = useState(false)
  const [newWarehouse, setNewWarehouse] = useState("")
  const { addWarehouse, removeWarehouse } = useProductStore()
  const [selectedWarehouses, setSelectedWarehouses] = useState<string[]>(data.warehouses ? [...data.warehouses] : [])

  const handleAddNewWarehouse = () => {
    if (newWarehouse) {
      addWarehouse(newWarehouse)

      // Add to selected warehouses
      const updatedWarehouses = [...selectedWarehouses, newWarehouse]
      setSelectedWarehouses(updatedWarehouses)
      onChange("warehouses", updatedWarehouses)

      setNewWarehouse("")
      setShowNewWarehouseDialog(false)
    }
  }

  const handleRemoveWarehouse = (warehouse: string) => {
    if (confirm(t("products.form.warehouse.confirmDelete", { name: warehouse }))) {
      removeWarehouse(warehouse)

      // Remove from selected warehouses if present
      const updatedWarehouses = selectedWarehouses.filter((w) => w !== warehouse)
      setSelectedWarehouses(updatedWarehouses)
      onChange("warehouses", updatedWarehouses)
    }
  }

  const handleWarehouseSelect = (warehouse: string) => {
    if (warehouse === "default") return

    if (!selectedWarehouses.includes(warehouse)) {
      const updatedWarehouses = [...selectedWarehouses, warehouse]
      setSelectedWarehouses(updatedWarehouses)
      onChange("warehouses", updatedWarehouses)
    }
  }

  const handleRemoveSelectedWarehouse = (warehouse: string) => {
    const updatedWarehouses = selectedWarehouses.filter((w) => w !== warehouse)
    setSelectedWarehouses(updatedWarehouses)
    onChange("warehouses", updatedWarehouses)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="quantity" className="flex items-center">
          {t("products.form.quantity")}
          <span className="text-red-500 ml-1">*</span>
        </Label>
        <Input
          id="quantity"
          type="number"
          min="0"
          value={data.quantity || 0}
          onChange={(e) => onChange("quantity", Number.parseInt(e.target.value) || 0)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="warehouse">{t("products.form.warehouse")}</Label>
        <div className="flex gap-2">
          <Select onValueChange={handleWarehouseSelect}>
            <SelectTrigger id="warehouse" className="flex-1">
              <SelectValue placeholder={t("products.form.warehouse.placeholder")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">{t("products.form.warehouse.placeholder")}</SelectItem>
              {warehouses.map((warehouse) => (
                <SelectItem key={warehouse} value={warehouse} className="flex justify-between items-center">
                  {warehouse}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => setShowNewWarehouseDialog(true)}
            title={t("products.form.warehouse.addNew")}
          >
            <PlusCircle className="h-4 w-4" />
          </Button>
        </div>

        {selectedWarehouses.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {selectedWarehouses.map((warehouse) => (
              <Badge key={warehouse} variant="secondary" className="flex items-center gap-1">
                {warehouse}
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 p-0 ml-1"
                  onClick={() => handleRemoveSelectedWarehouse(warehouse)}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="restockThreshold">{t("products.form.restockThreshold")}</Label>
        <Input
          id="restockThreshold"
          type="number"
          min="0"
          value={data.restockThreshold || 0}
          onChange={(e) => onChange("restockThreshold", Number.parseInt(e.target.value) || 0)}
        />
      </div>

      <Dialog open={showNewWarehouseDialog} onOpenChange={setShowNewWarehouseDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("products.form.warehouse.addNewTitle")}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Label htmlFor="newWarehouse">{t("products.form.warehouse.name")}</Label>
            <Input
              id="newWarehouse"
              value={newWarehouse}
              onChange={(e) => setNewWarehouse(e.target.value)}
              placeholder={t("products.form.warehouse.namePlaceholder")}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewWarehouseDialog(false)}>
              {t("common.cancel")}
            </Button>
            <Button onClick={handleAddNewWarehouse} disabled={!newWarehouse}>
              {t("common.add")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
