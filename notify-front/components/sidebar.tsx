"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Settings, Bell, History, Send } from "lucide-react"
import { useTranslation } from "@/hooks/use-translation"
import { SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar"

export function Sidebar() {
  const pathname = usePathname()
  const { t } = useTranslation()

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
    {
      href: "/perfil",
      icon: () => "👤",
      label: t("profile"),
    },
  ]

  return (
    <div className="h-full flex flex-col">
      <SidebarContent className="p-2">
        <SidebarMenu>
          {routes.map((route) => (
            <SidebarMenuItem key={route.href}>
              <SidebarMenuButton asChild isActive={pathname === route.href}>
                <Link href={route.href} className="flex items-center gap-2">
                  {typeof route.icon === "function" ? route.icon() : <route.icon className="h-5 w-5" />}
                  <span>{route.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </div>
  )
}
