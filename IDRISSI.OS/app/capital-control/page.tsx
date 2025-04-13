import { redirect } from "next/navigation"

export default function CapitalControlPage() {
  // Redirect to the overview page by default
  redirect("/capital-control/overview")
}
