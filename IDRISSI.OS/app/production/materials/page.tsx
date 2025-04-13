"use client"

import { useState } from "react"
import { MaterialTable } from "@/components/materials/material-table"
import { MaterialControlBar } from "@/components/materials/material-control-bar"
import { MaterialForm } from "@/components/materials/material-form"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useMaterialStore } from "@/lib/materials/material-store"
import type { Material } from "@/types/materials"

export default function MaterialsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null)
  const [selectedRows, setSelectedRows] = useState<string[]>([])
  const {
    materials,
    filteredMaterials,
    searchQuery,
    filters,
    setSearchQuery,
    setFilters,
    addMaterial,
    updateMaterial,
    archiveMaterial,
    restoreMaterial,
    bulkArchive,
    bulkRestore,
    bulkAddCertification,
  } = useMaterialStore()

  const handleAddMaterial = () => {
    setSelectedMaterial(null)
    setIsModalOpen(true)
  }

  const handleEditMaterial = (material: Material) => {
    setSelectedMaterial(material)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedMaterial(null)
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Materials</h1>
        <Button onClick={handleAddMaterial}>
          <Plus className="mr-2 h-4 w-4" />Add Material
        </Button>
      </div>

      <MaterialControlBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        filters={filters}
        onFiltersChange={setFilters}
        selectedRows={selectedRows}
        onBulkArchive={bulkArchive}
        onBulkRestore={bulkRestore}
        onBulkAddCertification={bulkAddCertification}
      />

      <MaterialTable
        materials={filteredMaterials}
        selectedRows={selectedRows}
        onRowClick={handleEditMaterial}
        onToggleSelect={(id: string) => {
          setSelectedRows(prev =>
            prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
          )
        }}
        onSelectAll={() => setSelectedRows(filteredMaterials.map(m => m.id))}
        onClearSelection={() => setSelectedRows([])}
        onArchive={archiveMaterial}
        onRestore={restoreMaterial}
        onBulkArchive={bulkArchive}
        onBulkRestore={bulkRestore}
        onBulkAddCertification={bulkAddCertification}
      />

      <Dialog open={isModalOpen} onOpenChange={handleCloseModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedMaterial ? "Edit Material" : "Add Material"}</DialogTitle>
          </DialogHeader>
          <MaterialForm
            material={selectedMaterial}
            onSubmit={(data: Partial<Material>) => {
              if (selectedMaterial) {
                updateMaterial(selectedMaterial.id, data)
              } else {
                addMaterial(data as Omit<Material, "id" | "createdAt" | "updatedAt">)
              }
              handleCloseModal()
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}
