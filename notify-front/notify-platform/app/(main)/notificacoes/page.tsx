"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useTranslation } from "@/hooks/use-translation"
import { BellRing, AlertCircle, CheckCircle } from "lucide-react"

export default function NotificacoesPage() {
  const { t } = useTranslation()
  const [filtro, setFiltro] = useState("todas")

  const notificacoes = [
    {
      id: 1,
      tipo: "info",
      titulo: t("new_integration"),
      descricao: "Uma nova integração com WhatsApp está disponível para seu aplicativo.",
      tempo: "há 5 minutos",
      lida: false,
    },
    {
      id: 2,
      tipo: "warning",
      titulo: t("quota_alert"),
      descricao: "Você atingiu 80% da sua quota mensal de SMS.",
      tempo: "há 2 horas",
      lida: false,
    },
    {
      id: 3,
      tipo: "success",
      titulo: t("setup_complete"),
      descricao: "Configuração do canal de e-mail finalizada com sucesso.",
      tempo: "há 1 dia",
      lida: true,
    },
  ]

  const getIconByType = (type: string) => {
    switch (type) {
      case "info":
        return <BellRing className="h-5 w-5 text-blue-500" />
      case "warning":
        return <AlertCircle className="h-5 w-5 text-amber-500" />
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      default:
        return <BellRing className="h-5 w-5" />
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{t("notifications")}</CardTitle>
          <div className="flex items-center gap-4">
            <Select value={filtro} onValueChange={setFiltro}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder={t("all")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">{t("all")}</SelectItem>
                <SelectItem value="nao-lidas">Não lidas</SelectItem>
                <SelectItem value="lidas">Lidas</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">{t("mark_all_read")}</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notificacoes
              .filter(
                (n) => filtro === "todas" || (filtro === "nao-lidas" && !n.lida) || (filtro === "lidas" && n.lida),
              )
              .map((notificacao) => (
                <div
                  key={notificacao.id}
                  className={`p-4 border rounded-lg ${notificacao.lida ? "bg-muted/50" : "bg-background"}`}
                >
                  <div className="flex items-start gap-4">
                    <div className="mt-1">{getIconByType(notificacao.tipo)}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{notificacao.titulo}</h3>
                        <Button variant="ghost" size="sm">
                          <span className="sr-only">Marcar como lida</span>
                          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{notificacao.descricao}</p>
                      <p className="text-xs text-muted-foreground mt-2">{notificacao.tempo}</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          <div className="mt-6">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
