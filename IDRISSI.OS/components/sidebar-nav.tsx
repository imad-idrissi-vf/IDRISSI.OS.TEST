"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import { useTranslation } from "@/lib/i18n"

interface NavItem {
  title: string
  href?: string
  icon?: React.ReactNode
  items?: NavItem[]
}

interface SidebarNavProps extends React.HTMLAttributes<HTMLDivElement> {
  items: NavItem[]
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const pathname = usePathname()
  const { t } = useTranslation()
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const toggleItem = (title: string) => {
    setExpandedItems(prev => 
      prev.includes(title) 
        ? prev.filter(item => item !== title)
        : [...prev, title]
    )
  }

  const isItemActive = (item: NavItem) => {
    if (item.href) {
      return pathname === item.href
    }
    if (item.items) {
      return item.items.some(subItem => pathname === subItem.href)
    }
    return false
  }

  const renderNavItem = (item: NavItem, level: number = 0) => {
    const hasSubItems = item.items && item.items.length > 0
    const isExpanded = expandedItems.includes(item.title)
    const isActive = isItemActive(item)

    return (
      <div key={item.title} className="space-y-1">
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start",
            level > 0 && "pl-4",
            isActive && "bg-accent text-accent-foreground",
            "hover:bg-accent/50"
          )}
          onClick={() => {
            if (hasSubItems) {
              toggleItem(item.title)
            }
          }}
        >
          {item.icon && <span className="mr-2">{item.icon}</span>}
          <span className="flex-1 text-left">{t(item.title)}</span>
          {hasSubItems && (
            isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />
          )}
        </Button>
        {hasSubItems && isExpanded && (
          <div className="ml-4 space-y-1">
            {item.items?.map((subItem) => renderNavItem(subItem, level + 1))}
          </div>
        )}
      </div>
    )
  }

  return (
    <nav className={cn("flex flex-col space-y-1", className)} {...props}>
      {items.map((item) => renderNavItem(item))}
    </nav>
  )
} 