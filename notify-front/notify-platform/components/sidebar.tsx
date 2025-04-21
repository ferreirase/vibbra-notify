"use client"

import { useSidebar } from "@/contexts/sidebar-context"
import { useTranslation } from "@/hooks/use-translation"
import { cn } from "@/lib/utils"
import { Bell, History, Home, Send, Settings } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect } from "react"
import { useTheme } from "next-themes"

export function Sidebar() {
  const pathname = usePathname()
  const { t } = useTranslation()
  const { isOpen, setIsOpen, toggleSidebar } = useSidebar()
  const { theme } = useTheme()
  const isDarkTheme = theme === "dark"

  const routes = [
    {
      href: "/dashboard",
      icon: Home,
      label: t("dashboard"),
    },
    {
      href: "/configuracoes",
      icon: Settings,
      label: t("settings"),
    },
    {
      href: "/notificacoes",
      icon: Bell,
      label: t("notifications"),
    },
    {
      href: "/historico",
      icon: History,
      label: t("history"),
    },
    {
      href: "/envio-manual",
      icon: Send,
      label: t("manual_send"),
    },
  ]

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById("sidebar")
      if (sidebar && !sidebar.contains(event.target as Node) && isOpen) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isOpen, setIsOpen])

  return (
    <aside
      id="sidebar"
      className={cn(
        "fixed left-0 top-0 h-full sidebar-youtube z-[90] transition-all duration-300 ease-in-out",
        isOpen ? "w-64" : "w-20",
        isOpen ? "" : "sidebar-collapsed",
      )}
    >
      <div className="flex flex-col h-full pt-16">
        {/* YouTube-style colored dots */}
        <div className="absolute top-4 left-4 flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>

        <nav className="flex flex-col p-3">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "sidebar-item",
                pathname === route.href ? "active" : "",
                pathname === route.href && !isDarkTheme ? "bg-gradient-primary text-black" : "",
              )}
            >
              <div className={cn("sidebar-item-icon", !isDarkTheme ? "text-black" : "text-white")}>
                <route.icon className="h-5 w-5" />
              </div>
              {isOpen && <span className={!isDarkTheme ? "text-black" : "text-white"}>{route.label}</span>}
            </Link>
          ))}

          {/* Keep the divider */}
          <div className="sidebar-divider"></div>
        </nav>
      </div>
    </aside>
  )
}
