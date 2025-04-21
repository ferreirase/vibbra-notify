"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { useTranslation } from "@/hooks/use-translation"

export default function EnvioManualPage() {
  const { t } = useTranslation()
  const { toast } = useToast()

  const [canal, setCanal] = useState("")
  const [audiencia, setAudiencia] = useState("todos")
  const [titulo, setTitulo] = useState("")
  const [mensagem, setMensagem] = useState("")
  const [link, setLink] = useState("")
  const [destinatarios, setDestinatarios] = useState("")
  const [template, setTemplate] = useState("")
  const [telefones, setTelefones] = useState("")
  const [mensagemSMS, setMensagemSMS] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!canal) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Selecione um canal de envio.",
      })
      return
    }

    // Validações específicas por canal
    if (canal === "webpush" && !titulo) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "O título da notificação é obrigatório.",
      })
      return
    }

    if (canal === "email" && !destinatarios) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Informe pelo menos um destinatário.",
      })
      return
    }

    if (canal === "sms" && !telefones) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Informe pelo menos um número de telefone.",
      })
      return
    }

    toast({
      title: "Sucesso",
      description: "Notificação enviada com sucesso!",
    })

    // Limpar formulário
    setTitulo("")
    setMensagem("")
    setLink("")
    setDestinatarios("")
    setTemplate("")
    setTelefones("")
    setMensagemSMS("")
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>{t("manual_notification")}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="canal">{t("send_channel")}</Label>
              <Select value={canal} onValueChange={setCanal}>
                <SelectTrigger id="canal">
                  <SelectValue placeholder={t("select_channel")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="webpush">{t("web_push")}</SelectItem>
                  <SelectItem value="email">{t("email")}</SelectItem>
                  <SelectItem value="sms">{t("sms")}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {canal === "webpush" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="audiencia">{t("audience")}</Label>
                  <Select value={audiencia} onValueChange={setAudiencia}>
                    <SelectTrigger id="audiencia">
                      <SelectValue placeholder={t("all_subscribers")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">{t("all_subscribers")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="titulo">{t("message_title")}</Label>
                  <Input
                    id="titulo"
                    placeholder="Digite o título da notificação"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mensagem">{t("message_text")}</Label>
                  <Textarea
                    id="mensagem"
                    placeholder="Digite o texto da notificação"
                    value={mensagem}
                    onChange={(e) => setMensagem(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="link">{t("destination_link")}</Label>
                  <Input id="link" placeholder="https://" value={link} onChange={(e) => setLink(e.target.value)} />
                </div>
              </>
            )}

            {canal === "email" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="destinatarios">{t("recipients")}</Label>
                  <Textarea
                    id="destinatarios"
                    placeholder="Digite os e-mails separados por vírgula"
                    value={destinatarios}
                    onChange={(e) => setDestinatarios(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="template">{t("template")}</Label>
                  <Select value={template} onValueChange={setTemplate}>
                    <SelectTrigger id="template">
                      <SelectValue placeholder={t("select_template")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="padrao">Template Padrão</SelectItem>
                      <SelectItem value="promocional">Template Promocional</SelectItem>
                      <SelectItem value="informativo">Template Informativo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            {canal === "sms" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="telefones">{t("phone_numbers")}</Label>
                  <Textarea
                    id="telefones"
                    placeholder="Digite os números separados por vírgula"
                    value={telefones}
                    onChange={(e) => setTelefones(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mensagemSMS">{t("sms_message")}</Label>
                  <Textarea
                    id="mensagemSMS"
                    placeholder="Digite a mensagem SMS"
                    value={mensagemSMS}
                    onChange={(e) => setMensagemSMS(e.target.value)}
                    maxLength={160}
                  />
                  <div className="text-xs text-right text-muted-foreground">
                    {t("characters")}: {mensagemSMS.length}/160
                  </div>
                </div>
              </>
            )}

            <div className="flex justify-end space-x-2">
              <Button variant="outline" type="button">
                {t("cancel")}
              </Button>
              <Button type="submit">{t("send")}</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
