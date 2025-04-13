"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useTranslation } from "@/lib/i18n"
import { Archive, Tag, FolderInput, Trash2, X } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { materialCampaigns } from "@/lib/materials/material-data"
import { Badge } from "@/components/ui/badge"

interface MaterialBulkMenuProps {
  selectedCount: number
  onClearSelection: () => void
  onBulkAction: (action: string, data?: any) => void
  selectedMaterials: string[]
  materialNames: string[]
}

export function MaterialBulkMenu({
  selectedCount,
  onClearSelection,
  onBulkAction,
  selectedMaterials,
  materialNames,
}: MaterialBulkMenuProps) {
  const { t } = useTranslation()
  const [showCampaignDialog, setShowCampaignDialog] = useState(false)
  const [showTagsDialog, setShowTagsDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [selectedCampaign, setSelectedCampaign] = useState("")
  const [tagInput, setTagInput] = useState("")
  const [tagsToAdd, setTagsToAdd] = useState<string[]>([])

  const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === "Enter" || e.key === " ") && tagInput.trim()) {
      e.preventDefault()

      // Extract tag (remove # if present)
      let newTag = tagInput.trim()
      if (newTag.startsWith("#")) {
        newTag = newTag.substring(1)
      }

      if (newTag && !tagsToAdd.includes(newTag)) {
        setTagsToAdd([...tagsToAdd, newTag])
        setTagInput("")
      }
    }
  }

  const removeTag = (tag: string) => {
    setTagsToAdd(tagsToAdd.filter((t) => t !== tag))
  }

  const handleCampaignChange = () => {
    if (selectedCampaign) {
      onBulkAction("changeCampaign", selectedCampaign)
      setShowCampaignDialog(false)
      setSelectedCampaign("")
    }
  }

  const handleTagsAdd = () => {
    if (tagsToAdd.length > 0) {
      onBulkAction("addTags", tagsToAdd)
      setShowTagsDialog(false)
      setTagsToAdd([])
    }
  }

  const handleDelete = () => {
    onBulkAction("delete")
    setShowDeleteDialog(false)
  }

  const bulkActions = [
    {
      icon: Archive,
      label: t("materials.bulkActions.archive"),
      onClick: () => onBulkAction("archive"),
    },
    {
      icon: FolderInput,
      label: t("materials.bulkActions.changeCampaign"),
      onClick: () => setShowCampaignDialog(true),
    },
    {
      icon: Tag,
      label: t("materials.bulkActions.addTags"),
      onClick: () => setShowTagsDialog(true),
    },
    {
      icon: Trash2,
      label: t("materials.bulkActions.delete"),
      onClick: () => setShowDeleteDialog(true),
    },
  ]

  if (selectedCount === 0) return null

  return (
    <>
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
        <div className="h-12 px-4 bg-primary rounded-full shadow-lg flex items-center gap-2">
          <div className="flex items-center gap-2 text-primary-foreground">
            <span className="font-medium hover:bg-black hover:text-white px-2 py-1 rounded transition-colors">
              {selectedCount} {t("materials.selected")}
            </span>
          </div>

          <div className="h-6 w-px bg-primary-foreground/20 mx-2" />

          <div className="flex items-center gap-1">
            {bulkActions.map((action, index) => (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                onClick={action.onClick}
                className="rounded-[20px] px-3 h-8 text-primary-foreground hover:text-primary-foreground/80 hover:bg-primary-foreground/10"
              >
                <action.icon className="h-4 w-4 mr-1" />
                {action.label}
              </Button>
            ))}
          </div>

          <div className="h-6 w-px bg-primary-foreground/20 mx-2" />

          <Button
            variant="ghost"
            size="sm"
            onClick={onClearSelection}
            className="rounded-[20px] px-3 h-7 text-primary-foreground hover:text-primary-foreground/80 hover:bg-primary-foreground/10"
          >
            <X className="h-4 w-4 mr-1" />
            {t("common.clear")}
          </Button>
        </div>
      </div>

      {/* Campaign Dialog */}
      <Dialog open={showCampaignDialog} onOpenChange={setShowCampaignDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("materials.bulkActions.changeCampaign")}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Label htmlFor="campaign">{t("materials.form.campaign")}</Label>
            <Select value={selectedCampaign} onValueChange={setSelectedCampaign}>
              <SelectTrigger id="campaign">
                <SelectValue placeholder={t("materials.form.campaign.placeholder")} />
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
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCampaignDialog(false)}>
              {t("common.cancel")}
            </Button>
            <Button onClick={handleCampaignChange} disabled={!selectedCampaign}>
              {t("common.save")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Tags Dialog */}
      <Dialog open={showTagsDialog} onOpenChange={setShowTagsDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("materials.bulkActions.addTags")}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Label htmlFor="tags">{t("materials.form.tags")}</Label>
            <Input
              id="tags"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagInputKeyDown}
              placeholder={t("materials.form.tags.inputPlaceholder")}
            />

            {tagsToAdd.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {tagsToAdd.map((tag) => (
                  <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                    {tag}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => removeTag(tag)} />
                  </Badge>
                ))}
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowTagsDialog(false)}>
              {t("common.cancel")}
            </Button>
            <Button onClick={handleTagsAdd} disabled={tagsToAdd.length === 0}>
              {t("common.add")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("materials.bulkActions.delete")}</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>{t("materials.bulkActions.confirmDelete")}</p>
            <p className="mt-2 text-sm text-muted-foreground">
              {selectedCount} {t("materials.selected")}
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              {t("common.cancel")}
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              {t("common.delete")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
} 