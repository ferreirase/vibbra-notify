import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { I18nProvider } from "@/components/i18n-provider"
import { MSWProvider } from "./providers"
import { AuthProvider } from "@/contexts/auth-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "NotifyHub - Sistema de Notificação",
  description: "Sistema centralizado de notificação de mensagens",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className}>
        <MSWProvider>
          <AuthProvider>
            <I18nProvider>
              <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                {children}
                <Toaster />
              </ThemeProvider>
            </I18nProvider>
          </AuthProvider>
        </MSWProvider>
      </body>
    </html>
  )
}
