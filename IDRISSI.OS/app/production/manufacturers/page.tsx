'use client'

import { useState } from 'react'
import { useManufacturerStore } from '@/lib/manufacturers/manufacturer-store'
import { ManufacturerTable } from '@/components/manufacturers/manufacturer-table'
import { ManufacturerControlBar } from '@/components/manufacturers/manufacturer-control-bar'
import { ManufacturerForm } from '@/components/manufacturers/manufacturer-form'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Plus } from 'lucide-react'
import type { Manufacturer } from '@/types/manufacturers'

export default function ManufacturersPage() {
  const {
    manufacturers,
    filteredManufacturers,
    selectedRows,
    isAddModalOpen,
    isDetailOpen,
    selectedManufacturerId,
    filters,
    setSearchFilter,
    setCategoryFilter,
    setContactStatusFilter,
    setCountryFilter,
    setCertificationFilter,
    toggleShowArchived,
    clearFilters,
    openAddModal,
    closeAddModal,
    openDetail,
    closeDetail,
    selectManufacturer,
    addManufacturer,
    updateManufacturer,
    archiveManufacturer,
    restoreManufacturer,
    toggleRowSelection,
    selectAllRows,
    clearSelectedRows,
    bulkArchive,
    bulkRestore,
    bulkAddCertification,
  } = useManufacturerStore()

  const selectedManufacturer = selectedManufacturerId
    ? manufacturers.find((m) => m.id === selectedManufacturerId)
    : null

  const handleAddManufacturer = (data: Omit<Manufacturer, "id" | "createdAt" | "updatedAt">) => {
    addManufacturer(data)
    closeAddModal()
  }

  const handleUpdateManufacturer = (data: Partial<Manufacturer>) => {
    if (selectedManufacturerId) {
      updateManufacturer(selectedManufacturerId, data)
      closeDetail()
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Manufacturers</h1>
        <Button onClick={openAddModal}>
          <Plus className="mr-2 h-4 w-4" />
          Add Manufacturer
        </Button>
      </div>

      <ManufacturerControlBar
        searchQuery={filters.search || ''}
        onSearchChange={setSearchFilter}
        filters={{
          category: filters.category,
          contactStatus: filters.contactStatus,
          certifications: filters.certifications || []
        }}
        onFiltersChange={(newFilters) => {
          if ('category' in newFilters) setCategoryFilter(newFilters.category || null)
          if ('contactStatus' in newFilters) setContactStatusFilter(newFilters.contactStatus || null)
          if ('certifications' in newFilters) setCertificationFilter(newFilters.certifications || [])
        }}
        selectedRows={selectedRows}
        onBulkArchive={bulkArchive}
        onBulkRestore={bulkRestore}
        onBulkAddCertification={bulkAddCertification}
      />

      <ManufacturerTable
        manufacturers={filteredManufacturers}
        selectedRows={selectedRows}
        onRowClick={(id) => {
          selectManufacturer(id)
          openDetail()
        }}
        onToggleSelect={toggleRowSelection}
        onSelectAll={selectAllRows}
        onClearSelection={clearSelectedRows}
        onArchive={archiveManufacturer}
        onRestore={restoreManufacturer}
        onBulkArchive={bulkArchive}
        onBulkRestore={bulkRestore}
        onBulkAddCertification={bulkAddCertification}
      />

      <Dialog open={isAddModalOpen} onOpenChange={closeAddModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add Manufacturer</DialogTitle>
          </DialogHeader>
          <ManufacturerForm onSubmit={handleAddManufacturer} />
        </DialogContent>
      </Dialog>

      <Dialog open={isDetailOpen} onOpenChange={closeDetail}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Manufacturer</DialogTitle>
          </DialogHeader>
          {selectedManufacturer && (
            <ManufacturerForm
              manufacturer={selectedManufacturer}
              onSubmit={handleUpdateManufacturer}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
