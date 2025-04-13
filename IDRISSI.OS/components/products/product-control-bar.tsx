"use client"

import { useState } from "react"
import { Search, Filter, MoreHorizontal, Activity } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import type { ProductStatus } from "@/lib/products/product-store"
import { useTranslation } from "@/lib/i18n"
import { availableTags, collections } from "@/lib/products/product-data"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

interface ProductControlBarProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  statusFilter: ProductStatus | "all"
  onStatusFilterChange: (value: ProductStatus | "all") => void
  collectionFilter: string
  onCollectionFilterChange: (value: string) => void
  tagFilter: string[]
  onTagFilterChange: (value: string[]) => void
  totalProducts: number
  filteredCount: number
  selectedRows: string[]
  onBulkAction: (action: string, data?: any) => void
}

export function ProductControlBar({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  collectionFilter,
  onCollectionFilterChange,
  tagFilter,
  onTagFilterChange,
  totalProducts,
  filteredCount,
  selectedRows,
  onBulkAction,
}: ProductControlBarProps) {
  const { t } = useTranslation()
  const [tagsOpen, setTagsOpen] = useState(false)

  const [showCollectionModal, setShowCollectionModal] = useState(false)
  const [showTagsModal, setShowTagsModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [bulkCollection, setBulkCollection] = useState("")
  const [bulkTags, setBulkTags] = useState("")

  const handleTagSelect = (tag: string) => {
    if (tagFilter.includes(tag)) {
      onTagFilterChange(tagFilter.filter((t) => t !== tag))
    } else {
      onTagFilterChange([...tagFilter, tag])
    }
  }

  const handleClearFilters = () => {
    onSearchChange("")
    onStatusFilterChange("all")
    onCollectionFilterChange("")
    onTagFilterChange([])
  }

  const isFiltering = searchTerm || statusFilter !== "all" || collectionFilter || tagFilter.length > 0

  const handleBulkChangeCollection = () => {
    onBulkAction("changeCollection", bulkCollection)
    setShowCollectionModal(false)
    setBulkCollection("")
  }

  const handleBulkAddTags = () => {
    const tags = bulkTags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean)
    onBulkAction("addTags", tags)
    setShowTagsModal(false)
    setBulkTags("")
  }

  const handleBulkDelete = () => {
    onBulkAction("delete")
    setShowDeleteModal(false)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t("products.search.placeholder")}
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <Select value={statusFilter} onValueChange={(value) => onStatusFilterChange(value as ProductStatus | "all")}>
            <SelectTrigger className="w-[130px]">
              <SelectValue>
                <div className="flex items-center">
                  <Activity className="h-4 w-4 mr-2" />
                  Status
                </div>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("products.status.all")}</SelectItem>
              <SelectItem value="active">{t("products.status.active")}</SelectItem>
              <SelectItem value="draft">{t("products.status.draft")}</SelectItem>
              <SelectItem value="archived">{t("products.status.archived")}</SelectItem>
            </SelectContent>
          </Select>

          <Select value={collectionFilter} onValueChange={onCollectionFilterChange}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder={t("products.filter.collection")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("products.status.all")}</SelectItem>
              {collections.map((collection) => (
                <SelectItem key={collection} value={collection}>
                  {collection}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Popover open={tagsOpen} onOpenChange={setTagsOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex items-center gap-1">
                <Filter className="h-4 w-4" />
                <span>{t("products.filter.tags")}</span>
                {tagFilter.length > 0 && (
                  <Badge variant="secondary" className="ml-1 rounded-full">
                    {tagFilter.length}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0" align="start">
              <Command>
                <CommandInput placeholder="Search tags..." />
                <CommandList>
                  <CommandEmpty>No tags found</CommandEmpty>
                  <CommandGroup>
                    {availableTags.map((tag) => (
                      <CommandItem key={tag} onSelect={() => handleTagSelect(tag)} className="flex items-center gap-2">
                        <div
                          className={`w-4 h-4 rounded-sm border ${tagFilter.includes(tag) ? "bg-primary border-primary" : "border-input"}`}
                        >
                          {tagFilter.includes(tag) && (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="w-3 h-3 text-primary-foreground"
                            >
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                          )}
                        </div>
                        <span>{tag}</span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant={selectedRows.length > 0 ? "default" : "outline"}
                disabled={selectedRows.length === 0}
              >
                <MoreHorizontal className="h-4 w-4 mr-2" />
                <span>
                  {selectedRows.length > 0 ? (
                    <>{selectedRows.length} {t("products.selected")}</>
                  ) : (
                    t("products.bulkActions")
                  )}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setShowCollectionModal(true)}>
                {t("products.bulkActions.changeCollection")}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setShowTagsModal(true)}>
                {t("products.bulkActions.addTags")}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onBulkAction("archive")}>
                {t("products.bulkActions.archive")}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setShowDeleteModal(true)} className="text-red-500">
                {t("products.bulkActions.delete")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="flex justify-between items-center text-sm">
        <div>
          {isFiltering && (
            <Button variant="link" className="p-0 h-auto text-sm" onClick={handleClearFilters}>
              Clear filters
            </Button>
          )}
        </div>
        <div className="text-muted-foreground">
          {t("products.showing")} <span className="font-medium">{filteredCount}</span> {t("products.of")}{" "}
          <span className="font-medium">{totalProducts}</span> {t("products.products")}
        </div>
      </div>

      {showCollectionModal && (
        <Dialog open={showCollectionModal} onOpenChange={setShowCollectionModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t("products.bulkActions.changeCollection")}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <Select value={bulkCollection} onValueChange={setBulkCollection}>
                <SelectTrigger>
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
              <Button variant="outline" onClick={() => setShowCollectionModal(false)}>
                {t("common.cancel")}
              </Button>
              <Button onClick={handleBulkChangeCollection} disabled={!bulkCollection}>
                {t("common.apply")}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {showTagsModal && (
        <Dialog open={showTagsModal} onOpenChange={setShowTagsModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t("products.bulkActions.addTags")}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <Label htmlFor="bulkTags">{t("products.form.tags")}</Label>
              <Input
                id="bulkTags"
                placeholder={t("products.form.tags.bulkPlaceholder")}
                value={bulkTags}
                onChange={(e) => setBulkTags(e.target.value)}
              />
              <p className="text-sm text-muted-foreground">{t("products.form.tags.bulkHelp")}</p>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowTagsModal(false)}>
                {t("common.cancel")}
              </Button>
              <Button onClick={handleBulkAddTags} disabled={!bulkTags}>
                {t("common.apply")}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {showDeleteModal && (
        <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t("products.bulkActions.deleteConfirmTitle")}</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <p>{t("products.bulkActions.deleteConfirmMessage", { count: selectedRows.length })}</p>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowDeleteModal(false)}>
                {t("common.cancel")}
              </Button>
              <Button variant="destructive" onClick={handleBulkDelete}>
                {t("common.delete")}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
