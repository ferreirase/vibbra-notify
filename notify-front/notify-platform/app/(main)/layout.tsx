"use client"

import type React from "react"

import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { useAuth } from "@/contexts/auth-context"
import { SidebarProvider, useSidebar } from "@/contexts/sidebar-context"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-r from-[hsl(var(--primary-gradient-from))] to-[hsl(var(--primary-gradient-to))] bg-opacity-10">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <SidebarProvider>
      <MainContent>{children}</MainContent>
    </SidebarProvider>
  )
}

function MainContent({ children }: { children: React.ReactNode }) {
  const { isOpen } = useSidebar()

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Header />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        <main
          className={cn(
            "flex-1 transition-all duration-300 ease-in-out pt-16 relative z-[50] overflow-y-auto",
            isOpen ? "ml-64" : "ml-20",
          )}
        >
          <div className="p-6">{children}</div>
        </main>
      </div>
    </div>
  )
}
