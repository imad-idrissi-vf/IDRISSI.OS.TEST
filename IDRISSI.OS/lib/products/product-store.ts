import { create, type SetState } from "zustand"
import { mockProducts } from "./product-data"

export type ProductStatus = "active" | "draft" | "archived"

// Update the Product interface to include productType
export interface Product {
  id: string
  name: string
  sku: string
  collection?: string
  productType?: string
  costPrice: number
  retailPrice: number
  margin: number
  status: ProductStatus
  description?: string
  quantity?: number
  warehouse?: string
  restockThreshold?: number
  images?: string[]
  notes?: NoteEntry[]
  tags?: string[]
}

// Add a new interface for note entries
export interface NoteEntry {
  id: string
  text: string
  timestamp: Date
  user: string
}

interface ProductStore {
  products: Product[]
  filteredProducts: Product[]
  searchTerm: string
  statusFilter: ProductStatus | "all"
  collectionFilter: string
  tagFilter: string[]

  setSearchTerm: (term: string) => void
  setStatusFilter: (status: ProductStatus | "all") => void
  setCollectionFilter: (collection: string) => void
  setTagFilter: (tags: string[]) => void

  addProduct: (product: Omit<Product, "id" | "margin">) => void
  updateProduct: (id: string, product: Partial<Product>) => void
  archiveProduct: (id: string) => void
  duplicateProduct: (id: string) => void
  bulkArchive: (ids: string[]) => void
  bulkDuplicate: (ids: string[]) => void
  // Add these functions to the ProductStore interface
  isSkuUnique: (sku: string, currentProductId?: string) => boolean
  getAvailableProductTypes: () => string[]
  addCollection: (collection: string) => void
  addWarehouse: (warehouse: string) => void
  removeWarehouse: (warehouse: string) => void
  bulkChangeCollection: (ids: string[], collection: string) => void
  bulkAddTags: (ids: string[], tags: string[]) => void
  bulkDelete: (ids: string[]) => void
  addNoteToProduct: (id: string, note: string) => void
}

export const useProductStore = create<ProductStore>((set, get) => ({
  products: mockProducts,
  filteredProducts: mockProducts,
  searchTerm: "",
  statusFilter: "all",
  collectionFilter: "",
  tagFilter: [],

  setSearchTerm: (term) => {
    set({ searchTerm: term })
    applyFilters(get, set)
  },

  setStatusFilter: (status) => {
    set({ statusFilter: status })
    applyFilters(get, set)
  },

  setCollectionFilter: (collection) => {
    set({ collectionFilter: collection })
    applyFilters(get, set)
  },

  setTagFilter: (tags) => {
    set({ tagFilter: tags })
    applyFilters(get, set)
  },

  addProduct: (productData) => {
    const id = `PRD-${Math.floor(Math.random() * 10000)}`
    const margin = calculateMargin(productData.costPrice, productData.retailPrice)

    const newProduct = {
      ...productData,
      id,
      margin,
    }

    set((state) => ({
      products: [...state.products, newProduct],
    }))

    applyFilters(get, set)
  },

  updateProduct: (id, productData) => {
    set((state) => {
      const updatedProducts = state.products.map((product) => {
        if (product.id === id) {
          // Recalculate margin if prices changed
          let margin = product.margin
          if (productData.costPrice !== undefined && productData.retailPrice !== undefined) {
            margin = calculateMargin(productData.costPrice, productData.retailPrice)
          } else if (productData.costPrice !== undefined) {
            margin = calculateMargin(productData.costPrice, product.retailPrice)
          } else if (productData.retailPrice !== undefined) {
            margin = calculateMargin(product.costPrice, productData.retailPrice)
          }

          return { ...product, ...productData, margin }
        }
        return product
      })

      return { products: updatedProducts }
    })

    applyFilters(get, set)
  },

  archiveProduct: (id) => {
    set((state) => ({
      products: state.products.map((product) => (product.id === id ? { ...product, status: "archived" } : product)),
    }))

    applyFilters(get, set)
  },

  duplicateProduct: (id) => {
    set((state) => {
      const productToDuplicate = state.products.find((p) => p.id === id)
      if (!productToDuplicate) return state

      const newId = `PRD-${Math.floor(Math.random() * 10000)}`
      const duplicatedProduct = {
        ...productToDuplicate,
        id: newId,
        name: `${productToDuplicate.name} (Copy)`,
        sku: `${productToDuplicate.sku}-COPY`,
        status: "draft" as ProductStatus,
      }

      return {
        products: [...state.products, duplicatedProduct],
      }
    })

    applyFilters(get, set)
  },

  bulkArchive: (ids) => {
    set((state) => ({
      products: state.products.map((product) =>
        ids.includes(product.id) ? { ...product, status: "archived" } : product,
      ),
    }))

    applyFilters(get, set)
  },

  bulkDuplicate: (ids) => {
    set((state) => {
      const productsToDuplicate = state.products.filter((p) => ids.includes(p.id))
      const duplicatedProducts = productsToDuplicate.map((product) => ({
        ...product,
        id: `PRD-${Math.floor(Math.random() * 10000)}`,
        name: `${product.name} (Copy)`,
        sku: `${product.sku}-COPY`,
        status: "draft" as ProductStatus,
      }))

      return {
        products: [...state.products, ...duplicatedProducts],
      }
    })

    applyFilters(get, set)
  },
  // Add these implementations to the store creation
  isSkuUnique: (sku, currentProductId) => {
    const products = get().products
    return !products.some((product) => product.sku === sku && product.id !== currentProductId)
  },

  getAvailableProductTypes: () => [
    "T-shirt",
    "Hoodie",
    "Sweatshirt",
    "Jacket",
    "Pants",
    "Shorts",
    "Hat",
    "Accessory",
    "Footwear",
    "Other",
  ],

  addCollection: (collection) => {
    // In a real app, this would add to a database
    // For this demo, we don't need to do anything as we'll just use the value directly
  },

  addWarehouse: (warehouse) => {
    // In a real app, this would add to a database
    // For this demo, we don't need to do anything as we'll just use the value directly
  },

  removeWarehouse: (warehouse) => {
    // In a real app, this would remove from a database and update products
    set((state) => ({
      products: state.products.map((product) =>
        product.warehouse === warehouse ? { ...product, warehouse: "" } : product,
      ),
    }))
  },

  bulkChangeCollection: (ids, collection) => {
    set((state) => ({
      products: state.products.map((product) => (ids.includes(product.id) ? { ...product, collection } : product)),
    }))
    applyFilters(get, set)
  },

  bulkAddTags: (ids, tags) => {
    set((state) => ({
      products: state.products.map((product) => {
        if (ids.includes(product.id)) {
          const currentTags = product.tags || []
          const newTags = [...new Set([...currentTags, ...tags])]
          return { ...product, tags: newTags }
        }
        return product
      }),
    }))
    applyFilters(get, set)
  },

  bulkDelete: (ids) => {
    set((state) => ({
      products: state.products.filter((product) => !ids.includes(product.id)),
    }))
    applyFilters(get, set)
  },

  addNoteToProduct: (id, note) => {
    set((state) => ({
      products: state.products.map((product) => {
        if (product.id === id) {
          const noteEntry: NoteEntry = {
            id: `note-${Date.now()}`,
            text: note,
            timestamp: new Date(),
            user: "Current User", // In a real app, get from auth context
          }
          const currentNotes = product.notes || []
          return { ...product, notes: [noteEntry, ...currentNotes] }
        }
        return product
      }),
    }))
  },
}))

// Helper function to calculate margin
function calculateMargin(costPrice: number, retailPrice: number): number {
  if (costPrice === 0) return 0
  return Math.round(((retailPrice - costPrice) / retailPrice) * 100)
}

// Helper function to apply all filters
function applyFilters(get: any, set: any) {
  const { products, searchTerm, statusFilter, collectionFilter, tagFilter } = get()

  let filtered = [...products]

  // Apply search filter
  if (searchTerm) {
    const term = searchTerm.toLowerCase()
    filtered = filtered.filter(
      (product) => product.name.toLowerCase().includes(term) || product.sku.toLowerCase().includes(term),
    )
  }

  // Apply status filter
  if (statusFilter !== "all") {
    filtered = filtered.filter((product) => product.status === statusFilter)
  }

  // Apply collection filter
  if (collectionFilter) {
    filtered = filtered.filter((product) => product.collection === collectionFilter)
  }

  // Apply tag filter
  if (tagFilter.length > 0) {
    filtered = filtered.filter((product) => product.tags?.some((tag) => tagFilter.includes(tag)))
  }

  set({ filteredProducts: filtered })
}
