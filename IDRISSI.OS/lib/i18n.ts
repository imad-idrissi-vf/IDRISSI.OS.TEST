// Simple i18n implementation
type TranslationKey = 
  | `common.${string}`
  | `products.${string}`
  | `materials.${string}`

type Translations = {
  [locale: string]: {
    [key: string]: string
  }
}

const translations: Translations = {
  en: {
    "common.cancel": "Cancel",
    "common.add": "Add",
    "common.save": "Save",
    "common.delete": "Delete",
    "common.clear": "Clear",
    "common.send": "Send",

    "products.title": "Products",
    "products.addProduct": "Add Product",
    "products.search.placeholder": "Search by name or SKU...",
    "products.filter.status": "Status",
    "products.filter.collection": "Collection",
    "products.filter.tags": "Tags",
    "products.status.all": "All",
    "products.status.active": "Active",
    "products.status.draft": "Draft",
    "products.status.archived": "Archived",
    "products.bulkActions": "Bulk Actions",
    "products.bulkActions.archive": "Archive",
    "products.bulkActions.duplicate": "Duplicate",
    "products.bulkActions.export": "Export",
    "products.bulkActions.changeCollection": "Change Collection",
    "products.bulkActions.addTags": "Add Tags",
    "products.bulkActions.delete": "Delete",
    "products.bulkActions.confirmDelete": "Are you sure you want to delete the selected products?",
    "products.table.name": "Product Name",
    "products.table.sku": "SKU",
    "products.table.collection": "Collection",
    "products.table.costPrice": "Cost Price (€)",
    "products.table.retailPrice": "Retail Price (€)",
    "products.table.margin": "Margin %",
    "products.table.status": "Status",
    "products.table.actions": "Actions",
    "products.emptyState": "No products found.",
    "products.selected": "products selected",

    "products.modal.title.add": "Add Product",
    "products.modal.title.edit": "Edit Product",
    "products.modal.tabs.general": "General",
    "products.modal.tabs.inventory": "Inventory",
    "products.modal.tabs.media": "Media",
    "products.modal.tabs.notes": "Notes",

    "products.form.name": "Name",
    "products.form.name.placeholder": "Enter product name",
    "products.form.sku": "SKU",
    "products.form.sku.placeholder": "Enter SKU",
    "products.form.sku.prefixError": "SKU must start with IDR-",
    "products.form.sku.formatError": "SKU must contain only uppercase letters, numbers, and hyphens",
    "products.form.sku.uniqueError": "This SKU is already in use",
    "products.form.status": "Status",
    "products.form.description": "Description",
    "products.form.description.placeholder": "Enter product description",
    "products.form.collection": "Collection",
    "products.form.collection.placeholder": "Select collection",
    "products.form.collection.addNew": "Add New Collection",
    "products.form.collection.addNewTitle": "Add New Collection",
    "products.form.collection.name": "Collection Name",
    "products.form.collection.namePlaceholder": "Enter collection name",
    "products.form.productType": "Product Type",
    "products.form.productType.placeholder": "Select product type",
    "products.form.quantity": "Quantity",
    "products.form.warehouse": "Warehouse",
    "products.form.warehouse.placeholder": "Select warehouse",
    "products.form.warehouse.addNew": "Add New Warehouse",
    "products.form.warehouse.addNewTitle": "Add New Warehouse",
    "products.form.warehouse.name": "Warehouse Name",
    "products.form.warehouse.namePlaceholder": "Enter warehouse name",
    "products.form.warehouse.confirmDelete": "Are you sure you want to delete {name} warehouse?",
    "products.form.restockThreshold": "Restock Threshold",
    "products.form.media.dropzone": "Drag and drop images here, or click to select files",
    "products.form.notes": "Internal Notes",
    "products.form.notes.placeholder": "Add internal notes about this product",
    "products.form.notes.addNew": "Add Note",
    "products.form.notes.add": "Add Note",
    "products.form.notes.history": "Notes History",
    "products.form.notes.empty": "No notes yet. Add your first note above.",
    "products.form.costPrice": "Cost Price (€)",
    "products.form.retailPrice": "Retail Price (€)",
    "products.form.tags": "Tags",
    "products.form.tags.placeholder": "Select tags",
    "products.form.tags.inputPlaceholder": "Type #tag and press space to add",
    "products.form.tags.inputHelp": "Type #tag and press space, or select from suggestions",
    "products.form.tags.createNew": "Create new tag",
    "products.form.save": "Save Product",
    "products.form.cancel": "Cancel",
    "products.form.delete": "Delete Product",
    "products.form.archive": "Archive Product",
    "products.form.duplicate": "Duplicate Product",
    "products.notification.saved": "Product saved successfully",
    "products.notification.archived": "Product archived successfully",
    "products.notification.deleted": "Product deleted successfully",
    "products.notification.duplicated": "Product duplicated successfully",
    "products.showing": "Showing",
    "products.of": "of",
    "products.products": "products",

    "materials.title": "Materials",
    "materials.addMaterial": "Add Material",
    "materials.search.placeholder": "Search materials...",
    "materials.search.tags": "Search tags...",
    "materials.search.noTags": "No tags found",
    "materials.table.title": "Title",
    "materials.table.type": "Type",
    "materials.table.campaign": "Campaign",
    "materials.table.tags": "Tags",
    "materials.table.status": "Status",
    "materials.table.noResults": "No materials found",
    "materials.type.packaging": "Packaging",
    "materials.type.visual": "Visual",
    "materials.type.print": "Print",
    "materials.type.digital": "Digital",
    "materials.status.all": "All",
    "materials.status.active": "Active",
    "materials.status.draft": "Draft",
    "materials.status.archived": "Archived",
    "materials.campaign.all": "All Campaigns",
    "materials.campaign.summer": "Summer Collection",
    "materials.campaign.winter": "Winter Collection",
    "materials.campaign.spring": "Spring Collection",
    "materials.campaign.fall": "Fall Collection",
    "materials.tags.seasonal": "Seasonal",
    "materials.tags.limited": "Limited Edition",
    "materials.tags.exclusive": "Exclusive",
    "materials.tags.promotional": "Promotional",
    "materials.form.title": "Title",
    "materials.form.type": "Type",
    "materials.form.selectType": "Select type",
    "materials.form.status": "Status",
    "materials.form.selectStatus": "Select status",
    "materials.form.campaign": "Campaign",
    "materials.form.selectCampaign": "Select campaign",
    "materials.form.tags": "Tags",
    "materials.form.selectTags": "Select tags",
    "materials.form.save": "Save Material",
    "materials.form.cancel": "Cancel",
    "materials.form.delete": "Delete Material",
    "materials.form.archive": "Archive Material",
    "materials.form.duplicate": "Duplicate Material",
    "materials.notification.saved": "Material saved successfully",
    "materials.notification.archived": "Material archived successfully",
    "materials.notification.deleted": "Material deleted successfully",
    "materials.notification.duplicated": "Material duplicated successfully",
    "materials.showing": "Showing",
    "materials.of": "of",
    "materials.materials": "materials",
    "materials.emptyState": "No materials found.",
    "materials.selected": "materials selected",
    "materials.bulkActions": "Bulk Actions",
    "materials.bulkActions.archive": "Archive",
    "materials.bulkActions.duplicate": "Duplicate",
    "materials.bulkActions.export": "Export",
    "materials.bulkActions.changeCampaign": "Change Campaign",
    "materials.bulkActions.addTags": "Add Tags",
    "materials.bulkActions.delete": "Delete",
    "materials.bulkActions.confirmDelete": "Are you sure you want to delete the selected materials?",
    "materials.filter.status": "Status",
    "materials.filter.campaign": "Campaign",
    "materials.filter.tags": "Tags",
    "materials.filter.clear": "Clear filters",
    "materials.actions.edit": "Edit",
    "materials.actions.archive": "Archive",
    "materials.actions.delete": "Delete",
    "materials.actions.duplicate": "Duplicate",
    "materials.selectAll": "Select all",
    "materials.selectRow": "Select row",
    "materials.form.image": "Image",
    "materials.form.materialImage": "Material Image",
    "materials.form.uploadImage": "Upload Image",
    "materials.form.attachments": "Attachments",
  },
  fr: {
    // French translations would go here
  },
}

export function useTranslation(namespace?: string) {
  const t = (key: string, params?: Record<string, string>): string => {
    // If namespace is provided, prepend it to the key
    const fullKey = namespace ? `${namespace}.${key}` : key
    
    // Get the translation from the current locale (defaulting to 'en')
    const text = translations['en'][fullKey] || key

    // Replace parameters if provided
    if (params) {
      return Object.entries(params).reduce((result, [key, value]) => {
        return result.replace(`{${key}}`, value)
      }, text)
    }

    return text
  }

  return { t }
}
