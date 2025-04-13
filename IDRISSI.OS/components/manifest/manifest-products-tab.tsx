"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Switch } from "@/components/ui/switch"
import { PlusIcon } from "lucide-react"

interface Product {
  id: string
  skuId: string
  name: string
  sampleStatus: string
  cost: number
  margin: number
  approved: boolean
}

interface ManifestProductsTabProps {
  manifestId: string
}

export function ManifestProductsTab({ manifestId }: ManifestProductsTabProps) {
  // Sample data - in a real app, this would come from an API or database
  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      skuId: "FC-001",
      name: "Organic Cotton Shirt",
      sampleStatus: "Received",
      cost: 45,
      margin: 72,
      approved: true,
    },
    {
      id: "2",
      skuId: "FC-002",
      name: "Recycled Cashmere Sweater",
      sampleStatus: "In Transit",
      cost: 120,
      margin: 68,
      approved: false,
    },
    {
      id: "3",
      skuId: "FC-003",
      name: "Vegetable-Tanned Leather Belt",
      sampleStatus: "Pending",
      cost: 65,
      margin: 70,
      approved: false,
    },
    {
      id: "4",
      skuId: "FC-004",
      name: "Organic Denim Jeans",
      sampleStatus: "Received",
      cost: 85,
      margin: 65,
      approved: true,
    },
  ])

  const toggleApproval = (productId: string) => {
    setProducts(
      products.map((product) => (product.id === productId ? { ...product, approved: !product.approved } : product)),
    )
  }

  const getSampleStatusColor = (status: string) => {
    switch (status) {
      case "Received":
        return "text-green-500"
      case "In Transit":
        return "text-yellow-500"
      case "Pending":
        return "text-gray-500"
      default:
        return ""
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-medium">Products</h2>
        <Button className="font-roboto uppercase tracking-wider">
          <PlusIcon className="mr-2 h-4 w-4" /> Add SKU
        </Button>
      </div>

      <div className="rounded-[20px] overflow-hidden">
        <Table>
          <TableHeader className="bg-secondary">
            <TableRow>
              <TableHead>SKU ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Sample Status</TableHead>
              <TableHead>Cost</TableHead>
              <TableHead>Margin</TableHead>
              <TableHead>Approve</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-mono">{product.skuId}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell className={getSampleStatusColor(product.sampleStatus)}>{product.sampleStatus}</TableCell>
                <TableCell>${product.cost}</TableCell>
                <TableCell>{product.margin}%</TableCell>
                <TableCell>
                  <Switch checked={product.approved} onCheckedChange={() => toggleApproval(product.id)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
