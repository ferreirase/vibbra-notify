"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { useTranslation } from "@/hooks/use-translation"

export default function NovoAplicativoPage() {
  const { t } = useTranslation()
  const router = useRouter()
  const { toast } = useToast()

  const [nome, setNome] = useState("")
  const [canais, setCanais] = useState({
    webPush: false,
    email: false,
    sms: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!nome) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "O nome do aplicativo é obrigatório.",
      })
      return
    }

    if (!canais.webPush && !canais.email && !canais.sms) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Selecione pelo menos um canal de notificação.",
      })
      return
    }

    // Simulação de criação de aplicativo
    toast({
      title: "Sucesso",
      description: `Aplicativo "${nome}" criado com sucesso!`,
    })

    router.push("/configuracoes")
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>{t("create_app")}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="nome">{t("app_name")}</Label>
              <Input
                id="nome"
                placeholder="Digite o nome do aplicativo"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>{t("notification_channels")}</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="webPush"
                    checked={canais.webPush}
                    onCheckedChange={(checked) => setCanais((prev) => ({ ...prev, webPush: checked === true }))}
                  />
                  <Label htmlFor="webPush">{t("web_push")}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="email"
                    checked={canais.email}
                    onCheckedChange={(checked) => setCanais((prev) => ({ ...prev, email: checked === true }))}
                  />
                  <Label htmlFor="email">{t("email")}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="sms"
                    checked={canais.sms}
                    onCheckedChange={(checked) => setCanais((prev) => ({ ...prev, sms: checked === true }))}
                  />
                  <Label htmlFor="sms">{t("sms")}</Label>
                </div>
              </div>
            </div>

            <Button type="submit">{t("create")}</Button>
          </form>
        </CardContent>
      </Card>

      {/* Cards de configuração de canais */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <Card className={!canais.webPush ? "opacity-50" : ""}>
          <CardHeader>
            <CardTitle>{t("web_push")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="siteName">{t("site_name")}</Label>
              <Input id="siteName" disabled={!canais.webPush} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="siteUrl">{t("site_url")}</Label>
              <Input id="siteUrl" disabled={!canais.webPush} />
            </div>
            <Button disabled={!canais.webPush}>{t("configure")}</Button>
          </CardContent>
        </Card>

        <Card className={!canais.email ? "opacity-50" : ""}>
          <CardHeader>
            <CardTitle>{t("email")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="smtpServer">{t("smtp_server")}</Label>
              <Input id="smtpServer" disabled={!canais.email} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="porta">{t("port")}</Label>
              <Input id="porta" disabled={!canais.email} />
            </div>
            <Button disabled={!canais.email}>{t("configure")}</Button>
          </CardContent>
        </Card>

        <Card className={!canais.sms ? "opacity-50" : ""}>
          <CardHeader>
            <CardTitle>{t("sms")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="smsProvider">{t("sms_provider")}</Label>
              <select
                id="smsProvider"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={!canais.sms}
              >
                <option value="">{t("select_provider")}</option>
                <option value="twilio">Twilio</option>
                <option value="vonage">Vonage</option>
                <option value="aws">AWS SNS</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="apiKey">{t("api_key")}</Label>
              <Input id="apiKey" disabled={!canais.sms} />
            </div>
            <Button disabled={!canais.sms}>{t("configure")}</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
