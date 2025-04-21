"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/contexts/auth-context"
import { useTranslation } from "@/hooks/use-translation"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function LoginPage() {
  const { t } = useTranslation()
  const { login, isLoading } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {}

    if (!email) {
      newErrors.email = "O email é obrigatório"
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email inválido"
    }

    if (!password) {
      newErrors.password = "A senha é obrigatória"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setErrors({}) // Limpa erros anteriores
    const success = await login(email, password)

    if (success) {
      router.push("/dashboard")
    }
    // Removido o toast daqui pois já está sendo tratado no auth-context
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Diagonal gradient background */}
      <div className="absolute inset-0 bg-gradient-diagonal -skew-y-6 transform origin-top-right"></div>

      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md shadow-xl bg-background/95 backdrop-blur-sm">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center bg-gradient-to-r from-[hsl(var(--primary-gradient-from))] to-[hsl(var(--primary-gradient-to))] bg-clip-text text-transparent">
              NotifyHub
            </CardTitle>
            <CardDescription className="text-center">Entre com sua conta para acessar o sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  className="border-primary/20 focus-visible:ring-primary"
                />
                {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Senha</Label>
                  <Link href="/esqueci-senha" className="text-sm text-primary hover:underline">
                    Esqueceu a senha?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  className="border-primary/20 focus-visible:ring-primary"
                />
                {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
              </div>
              <Button type="submit" className="w-full" variant="gradient" disabled={isLoading}>
                {isLoading ? "Entrando..." : "Entrar"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col">
            <div className="text-center text-sm">
              Não tem uma conta?{" "}
              <Link href="/cadastro" className="text-primary hover:underline font-medium">
                Cadastre-se
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
