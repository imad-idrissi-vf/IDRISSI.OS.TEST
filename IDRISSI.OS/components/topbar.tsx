"use client"

import { useState } from "react"
import { Search, Bell } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function Topbar() {
  const [searchValue, setSearchValue] = useState("")
  const [notifications, setNotifications] = useState([
    { id: 1, title: "New order received", time: "2 minutes ago", read: false },
    { id: 2, title: "Product inventory low", time: "1 hour ago", read: false },
    { id: 3, title: "Invoice #1234 paid", time: "3 hours ago", read: true },
  ])
  const [showNotifications, setShowNotifications] = useState(false)

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
  }

  return (
    <header className="bg-background py-4 px-8 flex items-center justify-between border-b">
      <div className="relative w-full max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-[20px] bg-secondary text-foreground placeholder:text-muted-foreground focus:outline-none"
        />
      </div>

      <div className="flex items-center space-x-6">
        <ThemeToggle />

        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            aria-label="Notifications"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-white">
                {unreadCount}
              </Badge>
            )}
          </Button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-card rounded-[20px] shadow-lg z-50 border overflow-hidden">
              <div className="p-4 border-b flex justify-between items-center">
                <h3 className="font-medium">Notifications</h3>
                <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                  Mark all as read
                </Button>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border-b hover:bg-secondary transition-colors ${notification.read ? "" : "bg-secondary/50"}`}
                  >
                    <div className="flex justify-between">
                      <p className="font-medium">{notification.title}</p>
                      {!notification.read && <div className="h-2 w-2 rounded-full bg-blue-500"></div>}
                    </div>
                    <p className="text-sm text-muted-foreground">{notification.time}</p>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t">
                <Button variant="outline" className="w-full" size="sm">
                  View all notifications
                </Button>
              </div>
            </div>
          )}
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                <AvatarFallback>KI</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 rounded-[20px]" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">Khadija Idrissi</p>
                <p className="text-xs leading-none text-muted-foreground">khadija@idrissi.com</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="rounded-[20px] cursor-pointer">Profile</DropdownMenuItem>
            <DropdownMenuItem className="rounded-[20px] cursor-pointer">Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="rounded-[20px] cursor-pointer">Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
