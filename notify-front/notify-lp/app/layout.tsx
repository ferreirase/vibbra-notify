import type React from "react"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata = {
  title: "Vibbra Notify - Sistema Centralizado de Notificações",
  description: "Plataforma unificada para gerenciamento de notificações multi-canal: Web Push, E-mail, SMS e mais.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
