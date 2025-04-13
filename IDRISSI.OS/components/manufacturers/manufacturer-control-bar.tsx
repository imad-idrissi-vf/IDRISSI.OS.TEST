'use client'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Filter, Tag, Activity, Search, X, Archive, FolderInput, Trash2 } from 'lucide-react'
import type { ManufacturerCategory, ContactStatus } from '@/types/manufacturers'

interface ManufacturerControlBarProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  filters: {
    category: ManufacturerCategory | null
    contactStatus: ContactStatus | null
    certifications: string[]
  }
  onFiltersChange: (filters: Partial<ManufacturerControlBarProps['filters']>) => void
  selectedRows: string[]
  onBulkArchive: () => void
  onBulkRestore: () => void
  onBulkAddCertification: (certification: string) => void
}

export function ManufacturerControlBar({
  searchQuery,
  onSearchChange,
  filters,
  onFiltersChange,
  selectedRows,
  onBulkArchive,
  onBulkRestore,
  onBulkAddCertification
}: ManufacturerControlBarProps) {
  const handleCategoryChange = (value: string) => {
    onFiltersChange({ category: value === 'all' ? null : value as ManufacturerCategory })
  }

  const handleContactStatusChange = (value: string) => {
    onFiltersChange({ contactStatus: value === 'all' ? null : value as ContactStatus })
  }

  const handleClearFilters = () => {
    onSearchChange('')
    onFiltersChange({ category: null, contactStatus: null, certifications: [] })
  }

  return (
    <div className="flex items-center gap-4">
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search manufacturers..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      <Select value={filters.category || 'all'} onValueChange={handleCategoryChange}>
        <SelectTrigger className="w-[130px]">
          <SelectValue>
            <div className="flex items-center">
              <Filter className="h-4 w-4 mr-2" />
              Status
            </div>
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          <SelectItem value="Raw Material">Raw Material</SelectItem>
          <SelectItem value="Packaging">Packaging</SelectItem>
          <SelectItem value="Equipment">Equipment</SelectItem>
          <SelectItem value="Services">Services</SelectItem>
        </SelectContent>
      </Select>

      <Select value={filters.contactStatus || 'all'} onValueChange={handleContactStatusChange}>
        <SelectTrigger className="w-[130px]">
          <SelectValue>
            <div className="flex items-center">
              <Activity className="h-4 w-4 mr-2" />
              Status
            </div>
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Statuses</SelectItem>
          <SelectItem value="Active">Active</SelectItem>
          <SelectItem value="Pending">Pending</SelectItem>
          <SelectItem value="Inactive">Inactive</SelectItem>
          <SelectItem value="Archived">Archived</SelectItem>
        </SelectContent>
      </Select>

      {(searchQuery || filters.category || filters.contactStatus) && (
        <button
          onClick={handleClearFilters}
          className="inline-flex h-7 items-center justify-center whitespace-nowrap rounded-[20px] px-3 text-sm font-medium bg-black text-white dark:bg-white dark:text-black"
        >
          <X className="h-4 w-4 mr-1" />
          Clear
        </button>
      )}

      {selectedRows.length > 0 && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
          <div className="h-12 px-4 bg-primary rounded-full shadow-lg flex items-center">
            <div className="flex items-center gap-2 text-primary-foreground">
              <span className="font-medium hover:bg-black hover:text-white px-2 py-1 rounded transition-colors">
                {selectedRows.length} selected
              </span>
            </div>
            <div className="h-6 w-px bg-primary-foreground/20 mx-2"></div>
            <div className="flex items-center gap-1">
              <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 rounded-[20px] px-3 h-8 text-primary-foreground hover:text-primary-foreground/80 hover:bg-primary-foreground/10" onClick={onBulkArchive}>
                <Archive className="h-4 w-4 mr-1" />
                Archive
              </button>
              <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 rounded-[20px] px-3 h-8 text-primary-foreground hover:text-primary-foreground/80 hover:bg-primary-foreground/10" onClick={onBulkRestore}>
                <FolderInput className="h-4 w-4 mr-1" />
                Change Collection
              </button>
              <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 rounded-[20px] px-3 h-8 text-primary-foreground hover:text-primary-foreground/80 hover:bg-primary-foreground/10" onClick={() => onBulkAddCertification('ISO 9001')}>
                <Tag className="h-4 w-4 mr-1" />
                Add Tags
              </button>
              <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 rounded-[20px] px-3 h-8 text-primary-foreground hover:text-primary-foreground/80 hover:bg-primary-foreground/10">
                <Trash2 className="h-4 w-4 mr-1" />
                Delete
              </button>
            </div>
            <div className="h-6 w-px bg-primary-foreground/20 mx-2"></div>
            <button
              onClick={handleClearFilters}
              className="inline-flex h-7 items-center justify-center whitespace-nowrap rounded-[20px] px-3 text-sm font-medium bg-black text-white dark:bg-white dark:text-black"
            >
              <X className="h-4 w-4 mr-1" />
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  )
} 