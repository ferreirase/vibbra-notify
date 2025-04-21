"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/contexts/auth-context"
import { useTranslation } from "@/hooks/use-translation"

export default function CadastroPage() {
  const { t } = useTranslation()
  const { register, isLoading } = useAuth()
  const router = useRouter()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string; confirmPassword?: string }>(
    {},
  )

  const validateForm = () => {
    const newErrors: { name?: string; email?: string; password?: string; confirmPassword?: string } = {}

    if (!name) {
      newErrors.name = "O nome é obrigatório"
    }

    if (!email) {
      newErrors.email = "O email é obrigatório"
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email inválido"
    }

    if (!password) {
      newErrors.password = "A senha é obrigatória"
    } else if (password.length < 6) {
      newErrors.password = "A senha deve ter pelo menos 6 caracteres"
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Confirme sua senha"
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "As senhas não coincidem"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    const success = await register(name, email, password)
    if (success) {
      router.push("/dashboard")
    }
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Diagonal gradient background */}
      <div className="absolute inset-0 bg-gradient-diagonal -skew-y-6 transform origin-top-right"></div>

      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md shadow-xl bg-background/95 backdrop-blur-sm">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center bg-gradient-to-r from-[hsl(var(--primary-gradient-from))] to-[hsl(var(--primary-gradient-to))] bg-clip-text text-transparent">
              Criar Conta
            </CardTitle>
            <CardDescription className="text-center">Preencha os dados abaixo para criar sua conta</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  placeholder="Seu nome completo"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isLoading}
                  className="border-primary/20 focus-visible:ring-primary"
                />
                {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
              </div>
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
                <Label htmlFor="password">Senha</Label>
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
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={isLoading}
                  className="border-primary/20 focus-visible:ring-primary"
                />
                {errors.confirmPassword && <p className="text-sm text-destructive">{errors.confirmPassword}</p>}
              </div>
              <Button type="submit" className="w-full" variant="gradient" disabled={isLoading}>
                {isLoading ? "Criando conta..." : "Cadastrar"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col">
            <div className="text-center text-sm">
              Já tem uma conta?{" "}
              <Link href="/login" className="text-primary hover:underline font-medium">
                Faça login
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
