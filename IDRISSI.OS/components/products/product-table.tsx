"use client"

import { useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit, Archive, Activity } from "lucide-react"
import type { Product, ProductStatus } from "@/lib/products/product-store"
import { useTranslation } from "@/lib/i18n"
import { Skeleton } from "@/components/ui/skeleton"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ProductTableProps {
  products: Product[]
  isLoading: boolean
  onEditProduct: (product: Product) => void
  selectedRows: string[]
  setSelectedRows: (ids: string[]) => void
  filters: {
    status?: ProductStatus | 'all'
  }
  handleStatusChange: (value: ProductStatus | 'all') => void
}

export function ProductTable({ products, isLoading, onEditProduct, selectedRows, setSelectedRows, filters, handleStatusChange }: ProductTableProps) {
  const { t } = useTranslation()

  useEffect(() => {
    setSelectedRows([])
  }, [products, setSelectedRows])

  const toggleRow = (id: string) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id))
    } else {
      setSelectedRows([...selectedRows, id])
    }
  }

  const toggleAllRows = () => {
    if (selectedRows.length === products.length) {
      setSelectedRows([])
    } else {
      setSelectedRows(products.map((product) => product.id))
    }
  }

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

  if (isLoading) {
    return (
      <div className="rounded-[20px] border">
        <div className="p-4">
          <div className="space-y-3">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </div>
        </div>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="rounded-[20px] border bg-card p-8 flex flex-col items-center justify-center">
        <p className="text-muted-foreground text-center">{t("products.emptyState")}</p>
      </div>
    )
  }

  return (
    <div className="rounded-[20px] border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">
              <Checkbox
                checked={selectedRows.length === products.length && products.length > 0}
                onCheckedChange={toggleAllRows}
                aria-label="Select all"
              />
            </TableHead>
            <TableHead>{t("products.table.name")}</TableHead>
            <TableHead>{t("products.table.sku")}</TableHead>
            <TableHead>{t("products.table.collection")}</TableHead>
            <TableHead className="text-right">{t("products.table.costPrice")}</TableHead>
            <TableHead className="text-right">{t("products.table.retailPrice")}</TableHead>
            <TableHead className="text-right">{t("products.table.margin")}</TableHead>
            <TableHead>{t("products.table.status")}</TableHead>
            <TableHead className="w-[100px]">{t("products.table.actions")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow
              key={product.id}
              className="group cursor-pointer hover:bg-accent/50"
              onClick={() => onEditProduct(product)}
            >
              <TableCell className="p-4" onClick={(e) => e.stopPropagation()}>
                <Checkbox
                  checked={selectedRows.includes(product.id)}
                  onCheckedChange={() => toggleRow(product.id)}
                  aria-label={`Select ${product.name}`}
                />
              </TableCell>
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell className="font-mono text-sm">{product.sku}</TableCell>
              <TableCell>{product.collection || "-"}</TableCell>
              <TableCell className="text-right">€{product.costPrice.toFixed(2)}</TableCell>
              <TableCell className="text-right">€{product.retailPrice.toFixed(2)}</TableCell>
              <TableCell className="text-right">{product.margin}%</TableCell>
              <TableCell>
                <Badge className={`${getStatusColor(product.status)}`}>{t(`products.status.${product.status}`)}</Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-accent hover:text-accent-foreground"
                    onClick={(e) => {
                      e.stopPropagation()
                      onEditProduct(product)
                    }}
                  >
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-accent hover:text-accent-foreground"
                    onClick={(e) => {
                      e.stopPropagation()
                      // Handle archive
                    }}
                  >
                    <Archive className="h-4 w-4" />
                    <span className="sr-only">Archive</span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="p-4 border-t">
        <Select value={filters.status || 'all'} onValueChange={handleStatusChange}>
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
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
