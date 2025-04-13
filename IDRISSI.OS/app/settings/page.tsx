import { redirect } from "next/navigation"

export default function SettingsPage() {
  // Redirect to the API keys page by default
  redirect("/settings/api-keys")
}
