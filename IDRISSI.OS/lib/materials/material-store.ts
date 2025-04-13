import { create } from "zustand"
import type { Material, MaterialType, MaterialStatus, MaterialCampaign, MaterialTag } from "@/types/materials"

// Mock data until we have a backend
const mockMaterials: Material[] = [
  {
    id: "1",
    name: "Organic Flour",
    type: "raw",
    status: "active",
    description: "High-quality organic wheat flour",
    price: 2.5,
    quantity: 1000,
    unit: "kg",
    supplier: "Flour Mill Co.",
    contactPerson: "John Smith",
    email: "john@flourmill.com",
    phone: "+1234567890",
    website: "www.flourmill.com",
    notes: ["Premium quality", "Certified organic"],
    certifications: ["Organic", "Non-GMO"],
    isArchived: false,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  }
]

interface MaterialFilters {
  category: MaterialType | null
  contactStatus: string | null
  certifications: string[]
}

interface MaterialStore {
  materials: Material[]
  filteredMaterials: Material[]
  searchQuery: string
  filters: MaterialFilters
  setSearchQuery: (query: string) => void
  setFilters: (filters: Partial<MaterialFilters>) => void
  addMaterial: (material: Omit<Material, "id" | "createdAt" | "updatedAt">) => void
  updateMaterial: (id: string, material: Partial<Material>) => void
  archiveMaterial: (id: string) => void
  restoreMaterial: (id: string) => void
  bulkArchive: (ids: string[]) => void
  bulkRestore: (ids: string[]) => void
  bulkAddCertification: (ids: string[], certification: string) => void
}

function filterMaterials(materials: Material[], filters: MaterialFilters & { searchQuery: string }): Material[] {
  return materials.filter((material) => {
    // Search query filter
    if (
      filters.searchQuery &&
      !material.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) &&
      !material.description?.toLowerCase().includes(filters.searchQuery.toLowerCase())
    ) {
      return false
    }

    // Category filter
    if (filters.category && material.type !== filters.category) {
      return false
    }

    // Status filter
    if (filters.contactStatus && material.status !== filters.contactStatus) {
      return false
    }

    // Certifications filter
    if (
      filters.certifications?.length &&
      !filters.certifications.every((cert) => material.certifications?.includes(cert))
    ) {
      return false
    }

    return true
  })
}

export const useMaterialStore = create<MaterialStore>((set, get) => ({
  materials: mockMaterials,
  filteredMaterials: mockMaterials,
  searchQuery: "",
  filters: {
    category: null,
    contactStatus: null,
    certifications: [],
  },

  setSearchQuery: (query) => {
    set({ searchQuery: query })
    const { materials, filters } = get()
    set({ 
      filteredMaterials: filterMaterials(materials, { ...filters, searchQuery: query })
    })
  },

  setFilters: (newFilters) => {
    set((state) => ({ 
      filters: { ...state.filters, ...newFilters }
    }))
    const { materials, searchQuery, filters } = get()
    set({ 
      filteredMaterials: filterMaterials(materials, { ...filters, ...newFilters, searchQuery })
    })
  },

  addMaterial: (material) => {
    const newMaterial: Material = {
      ...material,
      id: Math.random().toString(36).substring(7),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    set((state) => ({ materials: [...state.materials, newMaterial] }))
    const { searchQuery, filters } = get()
    const { materials } = get()
    set({ 
      filteredMaterials: filterMaterials(materials, { ...filters, searchQuery })
    })
  },

  updateMaterial: (id, material) => {
    set((state) => ({
      materials: state.materials.map((m) =>
        m.id === id ? { ...m, ...material, updatedAt: new Date().toISOString() } : m
      ),
    }))
    const { searchQuery, filters } = get()
    const { materials } = get()
    set({ 
      filteredMaterials: filterMaterials(materials, { ...filters, searchQuery })
    })
  },

  archiveMaterial: (id) => {
    set((state) => ({
      materials: state.materials.map((m) =>
        m.id === id ? { ...m, status: "archived", updatedAt: new Date().toISOString() } : m
      ),
    }))
    const { searchQuery, filters } = get()
    const { materials } = get()
    set({ 
      filteredMaterials: filterMaterials(materials, { ...filters, searchQuery })
    })
  },

  restoreMaterial: (id) => {
    set((state) => ({
      materials: state.materials.map((m) =>
        m.id === id ? { ...m, status: "active", updatedAt: new Date().toISOString() } : m
      ),
    }))
    const { searchQuery, filters } = get()
    const { materials } = get()
    set({ 
      filteredMaterials: filterMaterials(materials, { ...filters, searchQuery })
    })
  },

  bulkArchive: (ids) => {
    set((state) => ({
      materials: state.materials.map((m) =>
        ids.includes(m.id) ? { ...m, status: "archived", updatedAt: new Date().toISOString() } : m
      ),
    }))
    const { searchQuery, filters } = get()
    const { materials } = get()
    set({ 
      filteredMaterials: filterMaterials(materials, { ...filters, searchQuery })
    })
  },

  bulkRestore: (ids) => {
    set((state) => ({
      materials: state.materials.map((m) =>
        ids.includes(m.id) ? { ...m, status: "active", updatedAt: new Date().toISOString() } : m
      ),
    }))
    const { searchQuery, filters } = get()
    const { materials } = get()
    set({ 
      filteredMaterials: filterMaterials(materials, { ...filters, searchQuery })
    })
  },

  bulkAddCertification: (ids, certification) => {
    set((state) => ({
      materials: state.materials.map((m) =>
        ids.includes(m.id)
          ? {
              ...m,
              certifications: [...(m.certifications || []), certification],
              updatedAt: new Date().toISOString(),
            }
          : m
      ),
    }))
    const { searchQuery, filters } = get()
    const { materials } = get()
    set({ 
      filteredMaterials: filterMaterials(materials, { ...filters, searchQuery })
    })
  },
})) 