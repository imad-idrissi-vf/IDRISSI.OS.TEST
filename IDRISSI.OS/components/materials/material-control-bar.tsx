"use client"

import { useState } from "react"
import { Search, Filter, MoreHorizontal, Activity } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import type { MaterialStatus } from "@/types/materials"
import { useTranslation } from "@/lib/i18n"
import { materialCampaigns, materialTags } from "@/lib/materials/material-data"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface MaterialFilters {
  category?: string
  contactStatus?: string
  certifications?: string[]
}

interface MaterialControlBarProps {
  searchQuery: string
  onSearchChange: (value: string) => void
  filters: MaterialFilters
  onFiltersChange: (filters: Partial<MaterialFilters>) => void
  selectedRows: string[]
  onBulkArchive: (ids: string[]) => void
  onBulkRestore: (ids: string[]) => void
  onBulkAddCertification: (ids: string[], certification: string) => void
}

export function MaterialControlBar({
  searchQuery,
  onSearchChange,
  filters,
  onFiltersChange,
  selectedRows,
  onBulkArchive,
  onBulkRestore,
  onBulkAddCertification,
}: MaterialControlBarProps) {
  const { t } = useTranslation()

  const handleClearFilters = () => {
    onFiltersChange({
      category: undefined,
      contactStatus: undefined,
      certifications: [],
    })
    onSearchChange("")
  }

  const isFiltering = searchQuery || filters.category || filters.contactStatus || (filters.certifications?.length ?? 0) > 0

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search materials..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <Select 
            value={filters.category} 
            onValueChange={(value) => onFiltersChange({ ...filters, category: value === "all" ? undefined : value })}
          >
            <SelectTrigger className="w-[130px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Category" defaultValue="Category">
                Category
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="raw">Raw</SelectItem>
              <SelectItem value="processed">Processed</SelectItem>
              <SelectItem value="packaging">Packaging</SelectItem>
            </SelectContent>
          </Select>

          <Select 
            value={filters.contactStatus} 
            onValueChange={(value) => onFiltersChange({ ...filters, contactStatus: value === "all" ? undefined : value })}
          >
            <SelectTrigger className="w-[130px]">
              <Activity className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Status" defaultValue="Status">
                Status
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant={selectedRows.length > 0 ? "default" : "outline"}
                disabled={selectedRows.length === 0}
              >
                <MoreHorizontal className="h-4 w-4 mr-2" />
                <span>
                  {selectedRows.length > 0 ? (
                    `${selectedRows.length} selected`
                  ) : (
                    "Bulk Actions"
                  )}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onBulkAddCertification(selectedRows, "organic")}>
                Add Certification
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onBulkArchive(selectedRows)}>
                Archive Selected
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onBulkRestore(selectedRows)}>
                Restore Selected
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {isFiltering && (
            <Button variant="ghost" onClick={handleClearFilters} className="h-8 px-2">
              Clear filters
            </Button>
          )}
        </div>
      </div>

      <div className="flex justify-between items-center text-sm text-muted-foreground">
        {selectedRows.length > 0 ? (
          <div>{selectedRows.length} items selected</div>
        ) : (
          <div>No items selected</div>
        )}
      </div>
    </div>
  )
} 