"use client"

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
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
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
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex">
        <Sidebar />
        <main 
          className={cn(
            "flex-1 transition-all duration-200 ease-in-out pt-16",
            isOpen ? "ml-[var(--sidebar-width)]" : "ml-0"
          )}
          style={{ "--sidebar-width": isOpen ? "fit-content" : "0px" } as React.CSSProperties}
        >
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
