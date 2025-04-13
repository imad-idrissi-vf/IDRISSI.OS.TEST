"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useTranslation } from "@/lib/i18n"
import type { Material } from "@/types/materials"

interface MaterialFormInventoryProps {
  data: Partial<Material>
  onChange: (field: string, value: any) => void
}

export function MaterialFormInventory({ data, onChange }: MaterialFormInventoryProps) {
  const { t } = useTranslation()

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="quantity">{t("materials.form.quantity")}</Label>
          <Input
            id="quantity"
            type="number"
            min="0"
            value={data.quantity || ""}
            onChange={(e) => onChange("quantity", parseInt(e.target.value) || 0)}
            placeholder="0"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="unit">{t("materials.form.unit")}</Label>
          <Input
            id="unit"
            value={data.unit || ""}
            onChange={(e) => onChange("unit", e.target.value)}
            placeholder={t("materials.form.unitPlaceholder")}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="minQuantity">{t("materials.form.minQuantity")}</Label>
          <Input
            id="minQuantity"
            type="number"
            min="0"
            value={data.minQuantity || ""}
            onChange={(e) => onChange("minQuantity", parseInt(e.target.value) || 0)}
            placeholder="0"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="maxQuantity">{t("materials.form.maxQuantity")}</Label>
          <Input
            id="maxQuantity"
            type="number"
            min="0"
            value={data.maxQuantity || ""}
            onChange={(e) => onChange("maxQuantity", parseInt(e.target.value) || 0)}
            placeholder="0"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="location">{t("materials.form.location")}</Label>
          <Input
            id="location"
            value={data.location || ""}
            onChange={(e) => onChange("location", e.target.value)}
            placeholder={t("materials.form.locationPlaceholder")}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="supplier">{t("materials.form.supplier")}</Label>
          <Input
            id="supplier"
            value={data.supplier || ""}
            onChange={(e) => onChange("supplier", e.target.value)}
            placeholder={t("materials.form.supplierPlaceholder")}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="cost">{t("materials.form.cost")}</Label>
          <Input
            id="cost"
            type="number"
            min="0"
            step="0.01"
            value={data.cost || ""}
            onChange={(e) => onChange("cost", parseFloat(e.target.value) || 0)}
            placeholder="0.00"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="currency">{t("materials.form.currency")}</Label>
          <Input
            id="currency"
            value={data.currency || ""}
            onChange={(e) => onChange("currency", e.target.value)}
            placeholder={t("materials.form.currencyPlaceholder")}
          />
        </div>
      </div>
    </div>
  )
} 