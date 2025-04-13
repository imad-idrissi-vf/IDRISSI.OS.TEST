import type React from "react"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Sidebar } from "@/components/sidebar"
import { Topbar } from "@/components/topbar"
import { SettingsProvider } from "@/contexts/settings-context"

export const metadata = {
  title: "IDRISSI.OS - Brand Management System",
  description: "Comprehensive brand management system for IDRISSI",
    generator: 'v0.dev'
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
          <SettingsProvider>
            <div className="flex h-screen overflow-hidden">
              <Sidebar />
              <div className="flex flex-col flex-1 overflow-hidden">
                <Topbar />
                <main className="flex-1 overflow-auto p-8 bg-background">{children}</main>
              </div>
            </div>
          </SettingsProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}


import './globals.css'