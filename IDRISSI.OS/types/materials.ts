export type MaterialType = "raw" | "processed" | "packaging"
export type MaterialStatus = "active" | "draft" | "archived"
export type MaterialCampaign = "none" | "summer" | "winter" | "spring" | "fall"
export type MaterialTag = "new" | "seasonal" | "discontinued" | "premium"

export interface MaterialAttachment {
  name: string
  size: number
  type: string
  url: string
}

export interface Material {
  id: string
  name: string
  type: MaterialType
  status: MaterialStatus
  description?: string
  price?: number
  quantity?: number
  unit?: string
  supplier?: string
  contactPerson?: string
  email?: string
  phone?: string
  website?: string
  notes?: string[]
  certifications: string[]
  isArchived: boolean
  createdAt: string
  updatedAt: string
  image?: string
  attachments?: {
    name: string
    url: string
    type: string
  }[]
} 