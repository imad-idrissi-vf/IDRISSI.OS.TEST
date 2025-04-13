'use client'

import { useState } from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Pencil, Archive, MoreHorizontal, Trash2 } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import type { Manufacturer } from '@/types/manufacturers'
import { cn } from '@/lib/utils'

interface ManufacturerTableProps {
  manufacturers: Manufacturer[]
  selectedRows: string[]
  onRowClick: (id: string) => void
  onToggleSelect: (id: string) => void
  onSelectAll: () => void
  onClearSelection: () => void
  onArchive: (id: string) => void
  onRestore: (id: string) => void
  onBulkArchive: () => void
  onBulkRestore: () => void
  onBulkAddCertification: (certification: string) => void
}

export function ManufacturerTable({
  manufacturers,
  selectedRows,
  onRowClick,
  onToggleSelect,
  onSelectAll,
  onClearSelection,
  onArchive,
  onRestore,
  onBulkArchive,
  onBulkRestore,
  onBulkAddCertification
}: ManufacturerTableProps) {
  const [hoveredRow, setHoveredRow] = useState<string | null>(null)
  const allSelected = manufacturers.length > 0 && selectedRows.length === manufacturers.length
  const someSelected = selectedRows.length > 0 && selectedRows.length < manufacturers.length

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
      case 'inactive':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
    }
  }

  if (manufacturers.length === 0) {
    return (
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={allSelected}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      onSelectAll()
                    } else {
                      onClearSelection()
                    }
                  }}
                />
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>MOQ</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell colSpan={8} className="h-24 text-center">
                No manufacturers found
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    )
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox
                checked={allSelected}
                onCheckedChange={(checked) => {
                  if (checked) {
                    onSelectAll()
                  } else {
                    onClearSelection()
                  }
                }}
              />
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>MOQ</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {manufacturers.map((manufacturer) => (
            <TableRow
              key={manufacturer.id}
              className="cursor-pointer"
              onClick={() => onRowClick(manufacturer.id)}
            >
              <TableCell className="w-12" onClick={(e) => e.stopPropagation()}>
                <Checkbox
                  checked={selectedRows.includes(manufacturer.id)}
                  onCheckedChange={(checked) => onToggleSelect(manufacturer.id)}
                />
              </TableCell>
              <TableCell>{manufacturer.name}</TableCell>
              <TableCell>{manufacturer.category}</TableCell>
              <TableCell>
                <Badge className={cn("rounded-[20px]", getStatusColor(manufacturer.contactStatus))}>
                  {manufacturer.contactStatus}
                </Badge>
              </TableCell>
              <TableCell>{manufacturer.moq}</TableCell>
              <TableCell>{manufacturer.location.country}</TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span>{manufacturer.contactPerson}</span>
                  <span className="text-sm text-gray-500">{manufacturer.email}</span>
                </div>
              </TableCell>
              <TableCell className="w-12" onClick={(e) => e.stopPropagation()}>
                {manufacturer.isArchived ? (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onRestore(manufacturer.id)}
                  >
                    <Archive className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onArchive(manufacturer.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
} 