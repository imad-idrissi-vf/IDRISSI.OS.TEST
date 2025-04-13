import { create } from "zustand"
import { v4 as uuidv4 } from "uuid"
import type { Manufacturer, ManufacturerCategory, ContactStatus, ManufacturerFilters } from "@/types/manufacturers"
import { mockManufacturers } from "./manufacturer-data"

interface ManufacturerStore {
  // State
  manufacturers: Manufacturer[]
  filteredManufacturers: Manufacturer[]
  selectedRows: string[]
  isAddModalOpen: boolean
  isDetailOpen: boolean
  selectedManufacturerId: string | null
  filters: ManufacturerFilters

  // Actions
  setSearchFilter: (query: string) => void
  setCategoryFilter: (category: ManufacturerCategory | null) => void
  setContactStatusFilter: (status: ContactStatus | null) => void
  setCertificationFilter: (certifications: string[]) => void
  toggleShowArchived: () => void
  clearFilters: () => void
  openAddModal: () => void
  closeAddModal: () => void
  openDetail: () => void
  closeDetail: () => void
  selectManufacturer: (id: string) => void
  addManufacturer: (data: Omit<Manufacturer, "id" | "createdAt" | "updatedAt">) => void
  updateManufacturer: (id: string, data: Partial<Manufacturer>) => void
  archiveManufacturer: (id: string) => void
  restoreManufacturer: (id: string) => void
  toggleRowSelection: (id: string) => void
  selectAllRows: () => void
  clearSelectedRows: () => void
  bulkArchive: () => void
  bulkRestore: () => void
  bulkAddCertification: (certification: string) => void
  addNote: (manufacturerId: string, note: Omit<ManufacturerNote, "id" | "timestamp">) => void
  addFile: (manufacturerId: string, file: Omit<ManufacturerFile, "id">) => void
  removeFile: (manufacturerId: string, fileId: string) => void
}

const applyFilters = (manufacturers: Manufacturer[], filters: ManufacturerFilters): Manufacturer[] => {
  return manufacturers.filter((manufacturer) => {
    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      const matchesSearch =
        manufacturer.name.toLowerCase().includes(searchLower) ||
        manufacturer.contactPerson.toLowerCase().includes(searchLower) ||
        manufacturer.email.toLowerCase().includes(searchLower)
      if (!matchesSearch) return false
    }

    // Category filter
    if (filters.category && manufacturer.category !== filters.category) {
      return false
    }

    // Contact status filter
    if (filters.contactStatus && manufacturer.contactStatus !== filters.contactStatus) {
      return false
    }

    // Certification filter
    if (filters.certifications.length > 0) {
      const hasCertification = manufacturer.certifications.some(cert =>
        filters.certifications.includes(cert)
      )
      if (!hasCertification) return false
    }

    // Show archived filter
    if (!filters.showArchived && manufacturer.isArchived) {
      return false
    }

    return true
  })
}

export const useManufacturerStore = create<ManufacturerStore>((set, get) => ({
  // Initial state
  manufacturers: mockManufacturers,
  filteredManufacturers: mockManufacturers,
  selectedRows: [],
  isAddModalOpen: false,
  isDetailOpen: false,
  selectedManufacturerId: null,
  filters: {
    search: "",
    category: null,
    contactStatus: null,
    certifications: [],
    showArchived: false,
  },

  // Filter actions
  setSearchFilter: (query) => {
    set((state) => {
      const newFilters = { ...state.filters, search: query }
      return {
        filters: newFilters,
        filteredManufacturers: applyFilters(state.manufacturers, newFilters),
      }
    })
  },

  setCategoryFilter: (category) => {
    set((state) => {
      const newFilters = { ...state.filters, category }
      return {
        filters: newFilters,
        filteredManufacturers: applyFilters(state.manufacturers, newFilters),
      }
    })
  },

  setContactStatusFilter: (status) => {
    set((state) => {
      const newFilters = { ...state.filters, contactStatus: status }
      return {
        filters: newFilters,
        filteredManufacturers: applyFilters(state.manufacturers, newFilters),
      }
    })
  },

  setCertificationFilter: (certifications) => {
    set((state) => {
      const newFilters = { ...state.filters, certifications }
      return {
        filters: newFilters,
        filteredManufacturers: applyFilters(state.manufacturers, newFilters),
      }
    })
  },

  toggleShowArchived: () => {
    set((state) => {
      const newFilters = { ...state.filters, showArchived: !state.filters.showArchived }
      return {
        filters: newFilters,
        filteredManufacturers: applyFilters(state.manufacturers, newFilters),
      }
    })
  },

  clearFilters: () => {
    set((state) => {
      const newFilters = {
        search: "",
        category: null,
        contactStatus: null,
        certifications: [],
        showArchived: false,
      }
      return {
        filters: newFilters,
        filteredManufacturers: applyFilters(state.manufacturers, newFilters),
      }
    })
  },

  // Modal actions
  openAddModal: () => set({ isAddModalOpen: true }),
  closeAddModal: () => set({ isAddModalOpen: false }),
  openDetail: () => set({ isDetailOpen: true }),
  closeDetail: () => set({ isDetailOpen: false, selectedManufacturerId: null }),
  selectManufacturer: (id) => set({ selectedManufacturerId: id }),

  // Manufacturer actions
  addManufacturer: (data) => {
    const newManufacturer: Manufacturer = {
      ...data,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    set((state) => {
      const newManufacturers = [...state.manufacturers, newManufacturer]
      return {
        manufacturers: newManufacturers,
        filteredManufacturers: applyFilters(newManufacturers, state.filters),
      }
    })
  },

  updateManufacturer: (id, data) => {
    set((state) => {
      const newManufacturers = state.manufacturers.map((manufacturer) =>
        manufacturer.id === id
          ? { ...manufacturer, ...data, updatedAt: new Date().toISOString() }
          : manufacturer
      )
      return {
        manufacturers: newManufacturers,
        filteredManufacturers: applyFilters(newManufacturers, state.filters),
      }
    })
  },

  archiveManufacturer: (id) => {
    set((state) => {
      const newManufacturers = state.manufacturers.map((manufacturer) =>
        manufacturer.id === id ? { ...manufacturer, isArchived: true, updatedAt: new Date().toISOString() } : manufacturer
      )
      return {
        manufacturers: newManufacturers,
        filteredManufacturers: applyFilters(newManufacturers, state.filters),
      }
    })
  },

  restoreManufacturer: (id) => {
    set((state) => {
      const newManufacturers = state.manufacturers.map((manufacturer) =>
        manufacturer.id === id ? { ...manufacturer, isArchived: false, updatedAt: new Date().toISOString() } : manufacturer
      )
      return {
        manufacturers: newManufacturers,
        filteredManufacturers: applyFilters(newManufacturers, state.filters),
      }
    })
  },

  // Selection actions
  toggleRowSelection: (id) => {
    set((state) => {
      const newSelectedRows = state.selectedRows.includes(id)
        ? state.selectedRows.filter((rowId) => rowId !== id)
        : [...state.selectedRows, id]
      return { selectedRows: newSelectedRows }
    })
  },

  selectAllRows: () => {
    set((state) => ({ selectedRows: state.filteredManufacturers.map((m) => m.id) }))
  },

  clearSelectedRows: () => set({ selectedRows: [] }),

  // Bulk actions
  bulkArchive: () => {
    set((state) => {
      const newManufacturers = state.manufacturers.map((manufacturer) =>
        state.selectedRows.includes(manufacturer.id) ? { ...manufacturer, isArchived: true, updatedAt: new Date().toISOString() } : manufacturer
      )
      return {
        manufacturers: newManufacturers,
        filteredManufacturers: applyFilters(newManufacturers, state.filters),
        selectedRows: [],
      }
    })
  },

  bulkRestore: () => {
    set((state) => {
      const newManufacturers = state.manufacturers.map((manufacturer) =>
        state.selectedRows.includes(manufacturer.id) ? { ...manufacturer, isArchived: false, updatedAt: new Date().toISOString() } : manufacturer
      )
      return {
        manufacturers: newManufacturers,
        filteredManufacturers: applyFilters(newManufacturers, state.filters),
        selectedRows: [],
      }
    })
  },

  bulkAddCertification: (certification) => {
    set((state) => {
      const newManufacturers = state.manufacturers.map((manufacturer) =>
        state.selectedRows.includes(manufacturer.id)
          ? {
              ...manufacturer,
              certifications: manufacturer.certifications.includes(certification)
                ? manufacturer.certifications
                : [...manufacturer.certifications, certification],
              updatedAt: new Date().toISOString(),
            }
          : manufacturer
      )
      return {
        manufacturers: newManufacturers,
        filteredManufacturers: applyFilters(newManufacturers, state.filters),
        selectedRows: [],
      }
    })
  },

  // Notes and files actions
  addNote: (manufacturerId, note) => {
    const newNote = {
      ...note,
      id: uuidv4(),
      timestamp: new Date().toISOString(),
    }

    set((state) => {
      const newManufacturers = state.manufacturers.map((manufacturer) =>
        manufacturer.id === manufacturerId
          ? {
              ...manufacturer,
              notes: [...manufacturer.notes, newNote],
              updatedAt: new Date().toISOString(),
            }
          : manufacturer
      )
      return {
        manufacturers: newManufacturers,
        filteredManufacturers: applyFilters(newManufacturers, state.filters),
      }
    })
  },

  addFile: (manufacturerId, file) => {
    const newFile = {
      ...file,
      id: uuidv4(),
    }

    set((state) => {
      const newManufacturers = state.manufacturers.map((manufacturer) =>
        manufacturer.id === manufacturerId
          ? {
              ...manufacturer,
              files: [...manufacturer.files, newFile],
              updatedAt: new Date().toISOString(),
            }
          : manufacturer
      )
      return {
        manufacturers: newManufacturers,
        filteredManufacturers: applyFilters(newManufacturers, state.filters),
      }
    })
  },

  removeFile: (manufacturerId, fileId) => {
    set((state) => {
      const newManufacturers = state.manufacturers.map((manufacturer) =>
        manufacturer.id === manufacturerId
          ? {
              ...manufacturer,
              files: manufacturer.files.filter((file) => file.id !== fileId),
              updatedAt: new Date().toISOString(),
            }
          : manufacturer
      )
      return {
        manufacturers: newManufacturers,
        filteredManufacturers: applyFilters(newManufacturers, state.filters),
      }
    })
  },
})) 