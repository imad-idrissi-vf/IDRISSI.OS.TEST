import { Manufacturer, ManufacturerCategory, ContactStatus } from '@/types/manufacturers'

export const mockManufacturers: Manufacturer[] = [
  {
    id: 'mfr_1',
    name: 'Flour Mill Co.',
    category: 'raw_material',
    contactStatus: 'active',
    moq: 1000,
    certifications: ['iso_9001', 'halal'],
    location: {
      country: 'France',
      city: 'Paris',
      address: '123 Flour Street'
    },
    contactPerson: 'Jean Dupont',
    email: 'jean@flourmill.com',
    phone: '+33 1 23 45 67 89',
    website: 'https://flourmill.com',
    notes: [
      {
        id: 'note_1',
        content: 'High quality organic flour',
        author: 'John Smith',
        timestamp: '2024-03-15T10:00:00Z'
      }
    ],
    files: [
      {
        id: 'file_1',
        name: 'Quality Report.pdf',
        type: 'pdf',
        size: 1024,
        uploadedAt: '2024-03-15T10:00:00Z'
      }
    ],
    isArchived: false,
    createdAt: '2024-03-15T10:00:00Z',
    updatedAt: '2024-03-15T10:00:00Z'
  },
  {
    id: 'mfr_2',
    name: 'Sugar Refinery Ltd',
    category: 'raw_material',
    contactStatus: 'active',
    moq: 2000,
    certifications: ['iso_9001', 'kosher'],
    location: {
      country: 'Germany',
      city: 'Berlin',
      address: '456 Sugar Avenue'
    },
    contactPerson: 'Hans Schmidt',
    email: 'hans@sugarrefinery.com',
    phone: '+49 30 12 34 56 78',
    website: 'https://sugarrefinery.com',
    notes: [],
    files: [],
    isArchived: false,
    createdAt: '2024-03-15T11:00:00Z',
    updatedAt: '2024-03-15T11:00:00Z'
  },
  {
    id: 'mfr_3',
    name: 'Packaging Solutions Inc',
    category: 'packaging',
    contactStatus: 'pending',
    moq: 500,
    certifications: ['iso_9001', 'fsc'],
    location: {
      country: 'USA',
      city: 'New York',
      address: '789 Packaging Blvd'
    },
    contactPerson: 'Sarah Johnson',
    email: 'sarah@packagingsolutions.com',
    phone: '+1 212 555 1234',
    website: 'https://packagingsolutions.com',
    notes: [
      {
        id: 'note_2',
        content: 'New packaging design samples received',
        author: 'John Smith',
        timestamp: '2024-03-15T12:00:00Z'
      }
    ],
    files: [
      {
        id: 'file_2',
        name: 'Design Samples.pdf',
        type: 'pdf',
        size: 2048,
        uploadedAt: '2024-03-15T12:00:00Z'
      }
    ],
    isArchived: false,
    createdAt: '2024-03-15T12:00:00Z',
    updatedAt: '2024-03-15T12:00:00Z'
  }
]

export const manufacturerCategories: ManufacturerCategory[] = [
  'raw_material',
  'packaging',
  'equipment',
  'service'
]

export const contactStatuses: ContactStatus[] = [
  'active',
  'pending',
  'inactive',
  'blacklisted'
]

export const certifications = [
  'iso_9001',
  'iso_22000',
  'halal',
  'kosher',
  'fsc',
  'organic'
] 