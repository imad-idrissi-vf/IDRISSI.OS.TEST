import { redirect } from "next/navigation"

export default function ProductionPage() {
  // Redirect to the products page by default
  redirect("/production/products")
}
