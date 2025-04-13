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
import { collections } from "@/lib/products/product-data"
import { Badge } from "@/components/ui/badge"

interface ProductBulkMenuProps {
  selectedCount: number
  onClearSelection: () => void
  onBulkAction: (action: string, data?: any) => void
  selectedProducts: string[]
  productNames: string[]
}

export function ProductBulkMenu({
  selectedCount,
  onClearSelection,
  onBulkAction,
  selectedProducts,
  productNames,
}: ProductBulkMenuProps) {
  const { t } = useTranslation()
  const [showCollectionDialog, setShowCollectionDialog] = useState(false)
  const [showTagsDialog, setShowTagsDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [selectedCollection, setSelectedCollection] = useState("")
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

  const handleCollectionChange = () => {
    if (selectedCollection) {
      onBulkAction("changeCollection", selectedCollection)
      setShowCollectionDialog(false)
      setSelectedCollection("")
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
      label: t("products.bulkActions.archive"),
      onClick: () => onBulkAction("archive"),
    },
    {
      icon: FolderInput,
      label: t("products.bulkActions.changeCollection"),
      onClick: () => setShowCollectionDialog(true),
    },
    {
      icon: Tag,
      label: t("products.bulkActions.addTags"),
      onClick: () => setShowTagsDialog(true),
    },
    {
      icon: Trash2,
      label: t("products.bulkActions.delete"),
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
              {selectedCount} selected
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
                className="h-8 text-primary-foreground hover:text-primary-foreground/80 hover:bg-primary-foreground/10"
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
            className="h-7 text-primary-foreground hover:text-primary-foreground/80 hover:bg-primary-foreground/10"
          >
            <X className="h-4 w-4 mr-1" />
            {t("common.clear")}
          </Button>
        </div>
      </div>

      {/* Collection Dialog */}
      <Dialog open={showCollectionDialog} onOpenChange={setShowCollectionDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("products.bulkActions.changeCollection")}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Label htmlFor="collection">{t("products.form.collection")}</Label>
            <Select value={selectedCollection} onValueChange={setSelectedCollection}>
              <SelectTrigger id="collection">
                <SelectValue placeholder={t("products.form.collection.placeholder")} />
              </SelectTrigger>
              <SelectContent>
                {collections.map((collection) => (
                  <SelectItem key={collection} value={collection}>
                    {collection}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCollectionDialog(false)}>
              {t("common.cancel")}
            </Button>
            <Button onClick={handleCollectionChange} disabled={!selectedCollection}>
              {t("common.save")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Tags Dialog */}
      <Dialog open={showTagsDialog} onOpenChange={setShowTagsDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("products.bulkActions.addTags")}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Label htmlFor="tags">{t("products.form.tags")}</Label>
            <Input
              id="tags"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagInputKeyDown}
              placeholder={t("products.form.tags.inputPlaceholder")}
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
            <DialogTitle>{t("products.bulkActions.delete")}</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>{t("products.bulkActions.confirmDelete")}</p>
            <p className="mt-2 text-sm text-muted-foreground">
              {selectedCount} {t("products.selected")}
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
