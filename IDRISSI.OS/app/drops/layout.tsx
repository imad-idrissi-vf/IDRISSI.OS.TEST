import type React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { Sidebar } from "@/components/sidebar"
import { Topbar } from "@/components/topbar"

export const metadata = {
  title: "IDRISSI.OS - Business Management Dashboard",
  description: "Luxury AI-powered business management dashboard",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-helvetica antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <div className="flex flex-col flex-1 overflow-hidden">
              <Topbar />
              <main className="flex-1 overflow-auto p-8 bg-background">{children}</main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
