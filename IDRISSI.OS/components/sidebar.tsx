"use client"

import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { Home, Package, Users, DollarSign, Lock, Settings, ChevronLeft, ChevronRight, Briefcase } from "lucide-react"

export function Sidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    console.log('Current theme:', theme)
  }, [theme])

  const logoSrc = theme === "dark" ? "/logos/idrissi-logo-white.svg" : "/logos/idrissi-logo-black.svg"

  const menuItems = [
    { name: "Dashboard", icon: Home, path: "/" },
    {
      name: "Production",
      icon: Package,
      path: "/production",
      subItems: [
        { name: "Products", path: "/production/products" },
        { name: "Materials", path: "/production/materials" },
        { name: "Manufacturers", path: "/production/manufacturers" },
      ],
    },
    {
      name: "Capital Control",
      icon: DollarSign,
      path: "/capital-control",
      subItems: [
        { name: "Overview", path: "/capital-control/overview" },
        { name: "Orders", path: "/capital-control/orders" },
        { name: "Invoices", path: "/capital-control/invoices" },
        { name: "Expenses", path: "/capital-control/expenses" },
        { name: "Analytics", path: "/capital-control/analytics" },
      ],
    },
    { name: "Projects", icon: Briefcase, path: "/projects" },
    { name: "Customers", icon: Users, path: "/customers" },
    {
      name: "Vision Lock",
      icon: Lock,
      path: "/vision-lock",
      subItems: [
        { name: "Principles", path: "/vision-lock/principles" },
        { name: "Drops", path: "/vision-lock/drops" },
        { name: "No List", path: "/vision-lock/no-list" },
      ],
    },
    {
      name: "Settings",
      icon: Settings,
      path: "/settings",
      subItems: [
        { name: "API Keys", path: "/settings/api-keys" },
        { name: "Roles", path: "/settings/roles" },
        { name: "Logs", path: "/settings/logs" },
      ],
    },
  ]

  if (!mounted) {
    return (
      <aside className={`bg-background transition-all duration-300 flex flex-col ${collapsed ? "w-20" : "w-64"}`}>
        <div className="p-6 flex items-center justify-between">
          <div className="h-10 w-32 bg-muted animate-pulse rounded"></div>
          <div className="h-8 w-8 bg-muted animate-pulse rounded-full"></div>
        </div>
        <div className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {Array(7)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="h-10 bg-muted animate-pulse rounded-[20px] mb-2"></div>
            ))}
        </div>
      </aside>
    )
  }

  return (
    <aside
      className={`bg-background transition-all duration-300 flex flex-col border-r ${collapsed ? "w-20" : "w-64"}`}
    >
      <div className="p-6 flex items-center justify-between">
        {!collapsed && (
          <Link href="/">
            <img 
              src={logoSrc} 
              alt="IDRISSI" 
              className="h-[42px] w-auto object-contain"
              style={{ minWidth: '134px' }}
              onError={(e) => {
                console.error('Failed to load logo:', logoSrc)
                e.currentTarget.src = '/placeholder.svg'
              }}
            />
          </Link>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-full bg-secondary text-foreground"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto custom-scrollbar">
        {menuItems.map((item) => {
          const isActive =
            pathname === item.path ||
            (pathname.startsWith(item.path + "/") && item.path !== "/") ||
            (item.subItems && item.subItems.some((subItem) => pathname === subItem.path))

          const isExpanded = !collapsed && isActive && item.subItems

          return (
            <div key={item.name} className="space-y-1">
              <Link
                href={item.path}
                className={`flex items-center rounded-[20px] px-4 py-3 text-sm transition-colors hover:bg-secondary ${
                  isActive ? "bg-secondary" : ""
                }`}
              >
                <div className={`${collapsed ? "mx-auto" : ""}`}>
                  <item.icon className="h-5 w-5" />
                </div>
                {!collapsed && <span className="ml-3 font-semibold">{item.name}</span>}
              </Link>

              {isExpanded && (
                <div className="pl-9 space-y-1">
                  {item.subItems.map((subItem) => {
                    const isSubActive = pathname === subItem.path

                    return (
                      <Link
                        key={subItem.name}
                        href={subItem.path}
                        className={`block rounded-[20px] px-4 py-2 text-sm transition-colors hover:bg-secondary ${
                          isSubActive ? "bg-secondary font-medium" : "text-muted-foreground"
                        }`}
                      >
                        {subItem.name}
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </nav>
    </aside>
  )
}
