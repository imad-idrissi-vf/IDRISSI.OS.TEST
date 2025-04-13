"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useTranslation } from "@/lib/i18n"
import type { Material } from "@/types/materials"
import { materialTypes, materialStatuses, materialCampaigns } from "@/lib/materials/material-data"
import { Badge } from "@/components/ui/badge"

interface MaterialFormGeneralProps {
  data: Partial<Material>
  onChange: (field: string, value: any) => void
}

export function MaterialFormGeneral({ data, onChange }: MaterialFormGeneralProps) {
  const { t } = useTranslation()

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">{t("materials.form.title")}</Label>
          <Input
            id="title"
            value={data.title || ""}
            onChange={(e) => onChange("title", e.target.value)}
            placeholder={t("materials.form.titlePlaceholder")}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="type">{t("materials.form.type")}</Label>
          <Select value={data.type} onValueChange={(value) => onChange("type", value)}>
            <SelectTrigger>
              <SelectValue placeholder={t("materials.form.typePlaceholder")} />
            </SelectTrigger>
            <SelectContent>
              {materialTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {t(`materials.type.${type}`)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="status">{t("materials.form.status")}</Label>
          <Select value={data.status} onValueChange={(value) => onChange("status", value)}>
            <SelectTrigger>
              <SelectValue placeholder={t("materials.form.statusPlaceholder")} />
            </SelectTrigger>
            <SelectContent>
              {materialStatuses.map((status) => (
                <SelectItem key={status} value={status}>
                  {t(`materials.status.${status}`)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="campaign">{t("materials.form.campaign")}</Label>
          <Select value={data.campaign} onValueChange={(value) => onChange("campaign", value)}>
            <SelectTrigger>
              <SelectValue placeholder={t("materials.form.campaignPlaceholder")} />
            </SelectTrigger>
            <SelectContent>
              {materialCampaigns.map((campaign) => (
                <SelectItem key={campaign} value={campaign}>
                  {t(`materials.campaign.${campaign}`)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label>{t("materials.form.tags")}</Label>
        <div className="flex flex-wrap gap-2">
          {data.tags?.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="cursor-pointer hover:bg-destructive/20"
              onClick={() => onChange("tags", data.tags?.filter((t) => t !== tag))}
            >
              {t(`materials.tag.${tag}`)}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  )
} 