"use client"

import { useSidebar } from "@/contexts/sidebar-context"
import { useTranslation } from "@/hooks/use-translation"
import { cn } from "@/lib/utils"
import { Bell, History, Home, Send, Settings } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect } from "react"

export function Sidebar() {
  const pathname = usePathname()
  const { t } = useTranslation()
  const { isOpen, setIsOpen } = useSidebar()

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
      const sidebar = document.getElementById('sidebar')
      if (sidebar && !sidebar.contains(event.target as Node) && isOpen) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen, setIsOpen])

  return (
    <aside 
      id="sidebar"
      className={cn(
        "fixed left-0 top-0 h-full bg-background border-r transition-all duration-200 ease-in-out",
        "min-w-fit max-w-fit whitespace-nowrap",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="flex flex-col h-full pt-16">
        <nav className="flex flex-col space-y-1 p-4">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground",
                pathname === route.href ? "bg-accent text-accent-foreground" : "text-muted-foreground",
              )}
            >
              <route.icon className="h-5 w-5 flex-shrink-0" />
              {route.label}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  )
}
