export type ManufacturerCategory = 'Raw Material' | 'Packaging' | 'Equipment' | 'Services'
export type ContactStatus = 'Active' | 'Pending' | 'Inactive' | 'Archived'

export interface ManufacturerLocation {
  address: string
  city: string
  state: string
  country: string
  postalCode: string
}

export interface ManufacturerFile {
  id: string
  name: string
  url: string
  type: string
  size: number
  uploadedAt: string
}

export interface ManufacturerNote {
  id: string
  text: string
  author: string
  timestamp: string
}

export interface Manufacturer {
  id: string
  name: string
  category: ManufacturerCategory
  contactStatus: ContactStatus
  moq: number
  certifications: string[]
  location: ManufacturerLocation
  contactPerson: string
  email: string
  phone: string
  website: string
  notes: ManufacturerNote[]
  files: ManufacturerFile[]
  isArchived: boolean
  createdAt: string
  updatedAt: string
}

export interface ManufacturerFilters {
  search: string
  category: ManufacturerCategory | null
  contactStatus: ContactStatus | null
  certifications: string[]
  showArchived: boolean
} 