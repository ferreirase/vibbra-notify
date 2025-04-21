"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { useTranslation } from "@/hooks/use-translation"
import { Copy, Plus, Settings } from "lucide-react"

export default function ConfiguracoesPage() {
  const { t } = useTranslation()
  const { toast } = useToast()

  const [senhaAtual, setSenhaAtual] = useState("")
  const [novaSenha, setNovaSenha] = useState("")
  const [confirmarSenha, setConfirmarSenha] = useState("")
  const [receberAlertas, setReceberAlertas] = useState(false)

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copiado!",
      description: "Texto copiado para a área de transferência.",
    })
  }

  const handleAtualizarSenha = (e: React.FormEvent) => {
    e.preventDefault()

    if (!senhaAtual) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "A senha atual é obrigatória.",
      })
      return
    }

    if (novaSenha !== confirmarSenha) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "As senhas não coincidem.",
      })
      return
    }

    toast({
      title: "Sucesso",
      description: "Senha atualizada com sucesso!",
    })

    setSenhaAtual("")
    setNovaSenha("")
    setConfirmarSenha("")
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{t("settings")}</h1>
        <Link href="/configuracoes/novo-aplicativo">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            {t("create_app")}
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t("general_settings")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>{t("interface_theme")}</Label>
              <p className="text-sm text-muted-foreground">{t("choose_theme")}</p>
            </div>
            <div className="flex justify-end">
              <Button variant="outline" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>{t("language")}</Label>
              <p className="text-sm text-muted-foreground">{t("select_language")}</p>
            </div>
            <div className="flex justify-end">
              <Select defaultValue="pt-BR">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Selecione o idioma" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pt-BR">Português (BR)</SelectItem>
                  <SelectItem value="en-US">English (US)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>{t("system_notifications")}</Label>
              <p className="text-sm text-muted-foreground">{t("receive_alerts")}</p>
            </div>
            <div className="flex justify-end">
              <Switch checked={receberAlertas} onCheckedChange={setReceberAlertas} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t("security")}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAtualizarSenha} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="senhaAtual">{t("current_password")}</Label>
              <Input
                id="senhaAtual"
                type="password"
                value={senhaAtual}
                onChange={(e) => setSenhaAtual(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="novaSenha">{t("new_password")}</Label>
              <Input id="novaSenha" type="password" value={novaSenha} onChange={(e) => setNovaSenha(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmarSenha">{t("confirm_password")}</Label>
              <Input
                id="confirmarSenha"
                type="password"
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
              />
            </div>

            <Button type="submit">{t("update_password")}</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t("api_settings")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="apiKey">{t("api_key")}</Label>
            <div className="flex">
              <Input id="apiKey" value="sk_live_xxxxxxxxxxxxxxxx" readOnly className="rounded-r-none" />
              <Button
                variant="outline"
                className="rounded-l-none"
                onClick={() => handleCopy("sk_live_xxxxxxxxxxxxxxxx")}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="webhookUrl">{t("webhook_url")}</Label>
            <div className="flex">
              <Input
                id="webhookUrl"
                value="https://api.notifyhub.com/webhook/xxx"
                readOnly
                className="rounded-r-none"
              />
              <Button
                variant="outline"
                className="rounded-l-none"
                onClick={() => handleCopy("https://api.notifyhub.com/webhook/xxx")}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Button variant="outline">{t("generate_new_key")}</Button>
        </CardContent>
      </Card>
    </div>
  )
}
