"use client"

import { Button } from "@/components/ui/button"
import type React from "react"
import { useState, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import type { Product } from "@/lib/products/product-store"
import { useTranslation } from "@/lib/i18n"
import { collections, availableTags } from "@/lib/products/product-data"
import { Badge } from "@/components/ui/badge"
import { X, PlusCircle, Hash } from "lucide-react"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useProductStore } from "@/lib/products/product-store"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface ProductFormGeneralProps {
  data: Partial<Product>
  onChange: (field: string, value: any) => void
}

export function ProductFormGeneral({ data, onChange }: ProductFormGeneralProps) {
  const { t } = useTranslation()
  const [skuError, setSkuError] = useState("")
  const [tagInput, setTagInput] = useState("")
  const [tagsPopoverOpen, setTagsPopoverOpen] = useState(false)
  const [showNewCollectionDialog, setShowNewCollectionDialog] = useState(false)
  const [newCollection, setNewCollection] = useState("")
  const { isSkuUnique, getAvailableProductTypes, addCollection } = useProductStore()
  const tagInputRef = useRef<HTMLInputElement>(null)

  const validateSku = (sku: string) => {
    // Check if SKU starts with IDR-
    if (!sku.startsWith("IDR-")) {
      setSkuError(t("products.form.sku.prefixError"))
      return false
    }

    // Check if SKU contains only uppercase letters, numbers, and hyphens
    const skuRegex = /^IDR-[A-Z0-9-]+$/
    if (!skuRegex.test(sku)) {
      setSkuError(t("products.form.sku.formatError"))
      return false
    }

    // Check if SKU is unique
    if (!isSkuUnique(sku, data.id)) {
      setSkuError(t("products.form.sku.uniqueError"))
      return false
    }

    setSkuError("")
    return true
  }

  const handleSkuChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.toUpperCase()

    // Automatically add IDR- prefix if not present
    if (value && !value.startsWith("IDR-")) {
      value = "IDR-" + value
    }

    onChange("sku", value)
    validateSku(value)
  }

  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setTagInput(value)
  }

  const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === "Enter" || e.key === " ") && tagInput.trim()) {
      e.preventDefault()

      // Extract tag (remove # if present)
      let newTag = tagInput.trim()
      if (newTag.startsWith("#")) {
        newTag = newTag.substring(1)
      }

      if (newTag) {
        const currentTags = data.tags || []
        if (!currentTags.includes(newTag)) {
          onChange("tags", [...currentTags, newTag])
        }
        setTagInput("")
      }
    }
  }

  const handleTagSelect = (tag: string) => {
    const currentTags = data.tags || []
    if (!currentTags.includes(tag)) {
      onChange("tags", [...currentTags, tag])
    }
    setTagInput("")
    setTagsPopoverOpen(false)
    tagInputRef.current?.focus()
  }

  const handleAddNewCollection = () => {
    if (newCollection) {
      addCollection(newCollection)
      onChange("collection", newCollection)
      setNewCollection("")
      setShowNewCollectionDialog(false)
    }
  }

  const removeTag = (tagToRemove: string) => {
    const updatedTags = data.tags ? data.tags.filter((tag) => tag !== tagToRemove) : []
    onChange("tags", updatedTags)
  }

  // Filter tags based on input
  const filteredTags = availableTags.filter(
    (tag) => (!tagInput || tag === tagInput.toLowerCase()) && !(data.tags || []).includes(tag),
  )

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name" className="flex items-center">
          {t("products.form.name")}
          <span className="ml-1 text-foreground">*</span>
        </Label>
        <Input
          id="name"
          value={data.name || ""}
          onChange={(e) => onChange("name", e.target.value)}
          placeholder={t("products.form.name.placeholder")}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="sku" className="flex items-center">
          {t("products.form.sku")}
          <span className="ml-1 text-foreground">*</span>
        </Label>
        <Input
          id="sku"
          value={data.sku || ""}
          onChange={handleSkuChange}
          placeholder={t("products.form.sku.placeholder")}
          className={skuError ? "border-red-500" : ""}
          required
        />
        {skuError && <p className="text-sm text-red-500">{skuError}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="status" className="flex items-center">
          {t("products.form.status")}
          <span className="ml-1 text-foreground">*</span>
        </Label>
        <Select value={data.status || "draft"} onValueChange={(value) => onChange("status", value)} required>
          <SelectTrigger id="status">
            <SelectValue placeholder={t("products.form.status")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active">{t("products.status.active")}</SelectItem>
            <SelectItem value="draft">{t("products.status.draft")}</SelectItem>
            <SelectItem value="archived">{t("products.status.archived")}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="collection" className="flex items-center">
          {t("products.form.collection")}
        </Label>
        <div className="flex gap-2">
          <Select value={data.collection || "default"} onValueChange={(value) => onChange("collection", value)}>
            <SelectTrigger id="collection" className="flex-1">
              <SelectValue placeholder={t("products.form.collection.placeholder")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">{t("products.form.collection.placeholder")}</SelectItem>
              {collections.map((collection) => (
                <SelectItem key={collection} value={collection}>
                  {collection}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => setShowNewCollectionDialog(true)}
            title={t("products.form.collection.addNew")}
          >
            <PlusCircle className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="productType" className="flex items-center">
          {t("products.form.productType")}
          <span className="ml-1 text-foreground">*</span>
        </Label>
        <Select value={data.productType || ""} onValueChange={(value) => onChange("productType", value)} required>
          <SelectTrigger id="productType">
            <SelectValue placeholder={t("products.form.productType.placeholder")} />
          </SelectTrigger>
          <SelectContent>
            {getAvailableProductTypes().map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="costPrice" className="flex items-center">
            {t("products.form.costPrice")}
            <span className="ml-1 text-foreground">*</span>
          </Label>
          <Input
            id="costPrice"
            type="number"
            min="0"
            step="0.01"
            value={data.costPrice || ""}
            onChange={(e) => onChange("costPrice", Number.parseFloat(e.target.value) || 0)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="retailPrice" className="flex items-center">
            {t("products.form.retailPrice")}
            <span className="ml-1 text-foreground">*</span>
          </Label>
          <Input
            id="retailPrice"
            type="number"
            min="0"
            step="0.01"
            value={data.retailPrice || ""}
            onChange={(e) => onChange("retailPrice", Number.parseFloat(e.target.value) || 0)}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="tags">{t("products.form.tags")}</Label>
        <Popover open={tagsPopoverOpen} onOpenChange={setTagsPopoverOpen}>
          <PopoverTrigger asChild>
            <div className="flex items-center border rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
              <div className="flex-1 flex flex-wrap gap-1 p-2">
                {data.tags && data.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {data.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                        {tag}
                        <X
                          className="h-3 w-3 cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation()
                            removeTag(tag)
                          }}
                        />
                      </Badge>
                    ))}
                  </div>
                )}
                <Input
                  ref={tagInputRef}
                  id="tagInput"
                  value={tagInput}
                  onChange={handleTagInputChange}
                  onKeyDown={handleTagInputKeyDown}
                  onClick={() => setTagsPopoverOpen(true)}
                  placeholder={data.tags && data.tags.length > 0 ? "" : t("products.form.tags.inputPlaceholder")}
                  className="flex-1 min-w-[120px] border-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 p-0 h-7"
                />
              </div>
              <div className="pr-2">
                <Hash className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-[300px] p-0" align="start">
            <Command>
              <CommandInput placeholder="Search tags..." />
              <CommandList>
                <CommandEmpty>
                  {tagInput ? (
                    <CommandItem
                      onSelect={() => {
                        const newTag = tagInput.startsWith("#") ? tagInput.substring(1) : tagInput
                        handleTagSelect(newTag)
                      }}
                      className="flex items-center gap-2"
                    >
                      <PlusCircle className="h-4 w-4" />
                      <span>
                        {t("products.form.tags.createNew")}: {tagInput.startsWith("#") ? tagInput : `#${tagInput}`}
                      </span>
                    </CommandItem>
                  ) : (
                    <p className="p-2 text-sm text-muted-foreground">No tags found</p>
                  )}
                </CommandEmpty>
                <CommandGroup>
                  {filteredTags.map((tag) => (
                    <CommandItem key={tag} onSelect={() => handleTagSelect(tag)}>
                      #{tag}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <p className="text-xs text-muted-foreground">{t("products.form.tags.inputHelp")}</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">{t("products.form.description")}</Label>
        <Textarea
          id="description"
          value={data.description || ""}
          onChange={(e) => onChange("description", e.target.value)}
          placeholder={t("products.form.description.placeholder")}
          rows={5}
        />
      </div>

      <Dialog open={showNewCollectionDialog} onOpenChange={setShowNewCollectionDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("products.form.collection.addNewTitle")}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Label htmlFor="newCollection">{t("products.form.collection.name")}</Label>
            <Input
              id="newCollection"
              value={newCollection}
              onChange={(e) => setNewCollection(e.target.value)}
              placeholder={t("products.form.collection.namePlaceholder")}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewCollectionDialog(false)}>
              {t("common.cancel")}
            </Button>
            <Button onClick={handleAddNewCollection} disabled={!newCollection}>
              {t("common.add")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
