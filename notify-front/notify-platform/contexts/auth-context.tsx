"use client"

import type React from "react"

import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { createContext, useContext, useEffect, useState } from "react"

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  company?: string
  role?: string
  phone?: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
  updateUser: (userData: Partial<User>) => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    // Verificar se o usuário está logado ao carregar a página
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error("Erro ao carregar usuário:", error)
        localStorage.removeItem("user")
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true)

      // Simulando uma chamada de API
      const response = await new Promise<{ success: boolean; user?: User; message?: string }>((resolve) => {
        setTimeout(() => {
          // Verificar se o usuário existe no localStorage
          const users = JSON.parse(localStorage.getItem("users") || "[]")
          const foundUser = users.find((u: any) => u.email === email)

          if (foundUser && foundUser.password === password) {
            // Remover a senha antes de armazenar no estado
            const { password, ...userWithoutPassword } = foundUser
            resolve({ success: true, user: userWithoutPassword })
          } else {
            resolve({ success: false, message: "Credenciais inválidas" })
          }
        }, 1000)
      })

      if (response.success && response.user) {
        setUser(response.user)
        localStorage.setItem("user", JSON.stringify(response.user))
        // Set the authentication cookie
        document.cookie = "auth=true; path=/; max-age=86400" // Expires in 1 day
        toast({
          title: "Login realizado com sucesso",
          description: `Bem-vindo, ${response.user.name}!`,
        })
        // No need to redirect here, middleware will handle it after cookie is set
        // router.push('/dashboard'); // Remove or comment out this line if present elsewhere
        return true
      } else {
        toast({
          variant: "destructive",
          title: "Falha na autenticação",
          description: "Senha incorreta. Por favor, verifique suas credenciais e tente novamente.",
        })
        return false
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error)
      toast({
        variant: "destructive",
        title: "Erro no sistema",
        description: "Ocorreu um erro ao tentar fazer login. Por favor, tente novamente.",
      })
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true)

      // Simulando uma chamada de API
      const response = await new Promise<{ success: boolean; user?: User; message?: string }>((resolve) => {
        setTimeout(() => {
          // Verificar se o email já está em uso
          const users = JSON.parse(localStorage.getItem("users") || "[]")
          const existingUser = users.find((u: any) => u.email === email)

          if (existingUser) {
            resolve({ success: false, message: "Este email já está em uso" })
          } else {
            const newUser = {
              id: Date.now().toString(),
              name,
              email,
              password, // Em uma aplicação real, a senha seria hasheada
              avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`,
            }

            // Adicionar o novo usuário à lista
            users.push(newUser)
            localStorage.setItem("users", JSON.stringify(users))

            // Remover a senha antes de retornar
            const { password: _, ...userWithoutPassword } = newUser
            resolve({ success: true, user: userWithoutPassword })
          }
        }, 1000)
      })

      if (response.success && response.user) {
        setUser(response.user)
        localStorage.setItem("user", JSON.stringify(response.user))
        toast({
          title: "Cadastro realizado com sucesso",
          description: `Bem-vindo, ${response.user.name}!`,
        })
        return true
      } else {
        toast({
          variant: "destructive",
          title: "Erro ao criar conta",
          description: response.message || "Não foi possível criar sua conta",
        })
        return false
      }
    } catch (error) {
      console.error("Erro ao registrar:", error)
      toast({
        variant: "destructive",
        title: "Erro ao criar conta",
        description: "Ocorreu um erro ao processar sua solicitação",
      })
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    // Remove the authentication cookie
    document.cookie = "auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
    router.push("/login")
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso",
    })
  }

  const updateUser = async (userData: Partial<User>): Promise<boolean> => {
    try {
      if (!user) return false

      setIsLoading(true)

      // Simulando uma chamada de API
      const response = await new Promise<{ success: boolean; user?: User; message?: string }>((resolve) => {
        setTimeout(() => {
          // Atualizar o usuário no localStorage
          const users = JSON.parse(localStorage.getItem("users") || "[]")
          const userIndex = users.findIndex((u: any) => u.id === user.id)

          if (userIndex >= 0) {
            // Atualizar os dados do usuário
            const updatedUser = { ...users[userIndex], ...userData }
            users[userIndex] = updatedUser
            localStorage.setItem("users", JSON.stringify(users))

            // Remover a senha antes de retornar
            const { password, ...userWithoutPassword } = updatedUser
            resolve({ success: true, user: userWithoutPassword })
          } else {
            resolve({ success: false, message: "Usuário não encontrado" })
          }
        }, 1000)
      })

      if (response.success && response.user) {
        setUser(response.user)
        localStorage.setItem("user", JSON.stringify(response.user))
        toast({
          title: "Perfil atualizado",
          description: "Suas informações foram atualizadas com sucesso",
        })
        return true
      } else {
        toast({
          variant: "destructive",
          title: "Erro ao atualizar perfil",
          description: response.message || "Não foi possível atualizar suas informações",
        })
        return false
      }
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error)
      toast({
        variant: "destructive",
        title: "Erro ao atualizar perfil",
        description: "Ocorreu um erro ao processar sua solicitação",
      })
      return false
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
