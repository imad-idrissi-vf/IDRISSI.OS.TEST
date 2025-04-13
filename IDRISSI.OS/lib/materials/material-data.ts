import type { Material, MaterialType, MaterialStatus, MaterialCampaign, MaterialTag } from "@/types/materials"

export const materialTypes: MaterialType[] = ["raw", "processed", "packaging"]
export const materialStatuses: MaterialStatus[] = ["active", "draft", "archived"]
export const materialCampaigns: MaterialCampaign[] = ["none", "summer", "winter", "spring", "fall"]
export const materialTags: MaterialTag[] = ["new", "seasonal", "discontinued", "premium"]

export const mockMaterials: Material[] = [
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
  },
  {
    id: "2",
    name: "Sugar",
    type: "raw",
    status: "active",
    description: "Refined white sugar",
    price: 1.8,
    quantity: 500,
    unit: "kg",
    supplier: "Sugar Refinery Ltd",
    contactPerson: "Jane Doe",
    email: "jane@sugarrefinery.com",
    phone: "+1987654321",
    website: "www.sugarrefinery.com",
    notes: ["Standard grade"],
    certifications: ["Food Safety"],
    isArchived: false,
    createdAt: "2024-01-02T00:00:00Z",
    updatedAt: "2024-01-02T00:00:00Z"
  },
  {
    id: "3",
    name: "Cookie Dough",
    type: "processed",
    status: "draft",
    description: "Pre-made chocolate chip cookie dough",
    price: 5.0,
    quantity: 200,
    unit: "kg",
    supplier: "Dough Makers Inc",
    contactPerson: "Mike Wilson",
    email: "mike@doughmakers.com",
    phone: "+1122334455",
    website: "www.doughmakers.com",
    notes: ["Ready to bake", "Frozen"],
    certifications: ["HACCP", "Food Safety"],
    isArchived: false,
    createdAt: "2024-01-03T00:00:00Z",
    updatedAt: "2024-01-03T00:00:00Z"
  }
]