"use client"

import { useState, useEffect } from "react"
import { ProductControlBar } from "@/components/products/product-control-bar"
import { ProductTable } from "@/components/products/product-table"
import { ProductDetailModal } from "@/components/products/product-detail-modal"
import { ProductBulkMenu } from "@/components/products/product-bulk-menu"
import { useProductStore } from "@/lib/products/product-store"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useTranslation } from "@/lib/i18n"
import { useToast } from "@/components/ui/use-toast"
import type { Product } from "@/lib/products/product-store"

export default function ProductsPage() {
  const { t } = useTranslation()
  const { toast } = useToast()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [selectedRows, setSelectedRows] = useState<string[]>([])
  const {
    products,
    filteredProducts,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    collectionFilter,
    setCollectionFilter,
    tagFilter,
    setTagFilter,
    bulkArchive,
    bulkChangeCollection,
    bulkAddTags,
    bulkDelete,
  } = useProductStore()
  const [isLoading, setIsLoading] = useState(true)

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const handleAddProduct = () => {
    setSelectedProduct(null)
    setIsModalOpen(true)
  }

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedProduct(null)
  }

  const handleBulkAction = (action: string, data?: any) => {
    switch (action) {
      case "archive":
        bulkArchive(selectedRows)
        toast({
          title: "Products Archived",
          description: `${selectedRows.length} products have been archived.`,
        })
        setSelectedRows([])
        break
      case "changeCollection":
        bulkChangeCollection(selectedRows, data)
        toast({
          title: "Collection Updated",
          description: `${selectedRows.length} products moved to ${data}.`,
        })
        setSelectedRows([])
        break
      case "addTags":
        bulkAddTags(selectedRows, data)
        toast({
          title: "Tags Added",
          description: `Added ${data.length} tags to ${selectedRows.length} products.`,
        })
        setSelectedRows([])
        break
      case "delete":
        bulkDelete(selectedRows)
        toast({
          title: "Products Deleted",
          description: `${selectedRows.length} products have been deleted.`,
        })
        setSelectedRows([])
        break
    }
  }

  // Get names of selected products for display in bulk menu
  const selectedProductNames = selectedRows
    .map((id) => {
      const product = products.find((p) => p.id === id)
      return product ? product.name : ""
    })
    .filter(Boolean)

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{t("products.title")}</h1>
        <Button onClick={handleAddProduct}>
          <Plus className="mr-2 h-4 w-4" /> {t("products.addProduct")}
        </Button>
      </div>

      <ProductControlBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        collectionFilter={collectionFilter}
        onCollectionFilterChange={setCollectionFilter}
        tagFilter={tagFilter}
        onTagFilterChange={setTagFilter}
        totalProducts={products.length}
        filteredCount={filteredProducts.length}
        selectedRows={selectedRows}
        onBulkAction={handleBulkAction}
      />

      <ProductTable
        products={filteredProducts}
        isLoading={isLoading}
        onEditProduct={handleEditProduct}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        filters={{ status: statusFilter }}
        handleStatusChange={setStatusFilter}
      />

      <ProductDetailModal isOpen={isModalOpen} onClose={handleCloseModal} product={selectedProduct} />

      <ProductBulkMenu
        selectedCount={selectedRows.length}
        onClearSelection={() => setSelectedRows([])}
        onBulkAction={handleBulkAction}
        selectedProducts={selectedRows}
        productNames={selectedProductNames}
      />
    </div>
  )
}
