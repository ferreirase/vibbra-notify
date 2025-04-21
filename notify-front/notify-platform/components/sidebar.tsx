"use client"

import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet"
import { useSidebar } from "@/contexts/sidebar-context"
import { useTranslation } from "@/hooks/use-translation"
import { cn } from "@/lib/utils"
import { Bell, History, Home, Send, Settings } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

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

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent 
        side="left" 
        className="w-64 p-0 fixed top-16 left-0 h-[calc(100vh-4rem)] bg-background border-r z-50" 
        style={{ 
          position: 'fixed',
          top: '4rem',
          left: '0',
          height: 'calc(100vh - 4rem)',
          width: '16rem',
          padding: '0',
          borderRight: '1px solid hsl(var(--border))',
          backgroundColor: 'hsl(var(--background))',
          transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.2s ease-in-out',
          zIndex: 50,
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
        }}
      >
        <SheetTitle className="sr-only">Menu de Navegação</SheetTitle>
        <div className="flex flex-col justify-center h-full">
          <div className="flex flex-col space-y-1 p-2">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center gap-2 p-3 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground",
                  pathname === route.href ? "bg-accent text-accent-foreground" : "text-muted-foreground",
                )}
              >
                <route.icon className="h-5 w-5" />
                {route.label}
              </Link>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
