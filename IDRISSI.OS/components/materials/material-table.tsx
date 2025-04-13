"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, Archive, RotateCcw } from "lucide-react"
import type { Material } from "@/types/materials"

interface MaterialTableProps {
  materials: Material[]
  selectedRows: string[]
  onRowClick: (material: Material) => void
  onToggleSelect: (id: string) => void
  onSelectAll: () => void
  onClearSelection: () => void
  onArchive: (id: string) => void
  onRestore: (id: string) => void
  onBulkArchive: (ids: string[]) => void
  onBulkRestore: (ids: string[]) => void
  onBulkAddCertification: (ids: string[], certification: string) => void
}

export function MaterialTable({
  materials,
  selectedRows,
  onRowClick,
  onToggleSelect,
  onSelectAll,
  onClearSelection,
  onArchive,
  onRestore,
  onBulkArchive,
  onBulkRestore,
  onBulkAddCertification,
}: MaterialTableProps) {
  const allSelected = materials.length > 0 && selectedRows.length === materials.length
  const someSelected = selectedRows.length > 0 && selectedRows.length < materials.length

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "draft":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "archived":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  if (!materials) {
    return null
  }

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox
                checked={allSelected}
                data-state={someSelected ? "indeterminate" : allSelected ? "checked" : "unchecked"}
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
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Supplier</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead className="w-24">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {materials.map((material) => (
            <TableRow
              key={material.id}
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => onRowClick(material)}
            >
              <TableCell onClick={(e) => e.stopPropagation()}>
                <Checkbox
                  checked={selectedRows.includes(material.id)}
                  onCheckedChange={() => onToggleSelect(material.id)}
                />
              </TableCell>
              <TableCell>{material.name}</TableCell>
              <TableCell>{material.type}</TableCell>
              <TableCell>
                <Badge className={`rounded-[20px] ${getStatusColor(material.status)}`}>
                  {material.status}
                </Badge>
              </TableCell>
              <TableCell>{material.supplier}</TableCell>
              <TableCell>${material.price}</TableCell>
              <TableCell>{material.quantity} {material.unit}</TableCell>
              <TableCell onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onRowClick(material)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  {material.status === "archived" ? (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onRestore(material.id)}
                    >
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onArchive(material.id)}
                    >
                      <Archive className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
} 