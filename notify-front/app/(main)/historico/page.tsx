"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { useTranslation } from "@/hooks/use-translation"
import { BellRing, Mail, MessageSquare, FileText, FileSpreadsheet, Eye } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

// Tipo para as notificações
interface Notificacao {
  id: number
  data: string
  canal: string
  origem: string
  status: string
  titulo?: string
  mensagem?: string
  destinatarios?: string[]
}

export default function HistoricoPage() {
  const { t } = useTranslation()
  const { toast } = useToast()
  const [canal, setCanal] = useState("todas")
  const [origem, setOrigem] = useState("todas")
  const [dataInicio, setDataInicio] = useState("")
  const [dataFim, setDataFim] = useState("")

  // Estado para paginação
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(5)
  const itemsPerPage = 5

  // Estado para as notificações
  const [notificacoes, setNotificacoes] = useState<Notificacao[]>([])
  const [notificacoesFiltradas, setNotificacoesFiltradas] = useState<Notificacao[]>([])
  const [notificacoesPaginadas, setNotificacoesPaginadas] = useState<Notificacao[]>([])
  const [carregando, setCarregando] = useState(true)

  // Dados mockados para exemplo
  const notificacoesMock: Notificacao[] = [
    {
      id: 1,
      data: "20/04/2025 10:30",
      canal: "email",
      origem: "api",
      status: "entregue",
      titulo: "Confirmação de cadastro",
      mensagem: "Seu cadastro foi confirmado com sucesso!",
      destinatarios: ["usuario@exemplo.com"],
    },
    {
      id: 2,
      data: "20/04/2025 09:15",
      canal: "webpush",
      origem: "manual",
      status: "lido",
      titulo: "Nova funcionalidade disponível",
      mensagem: "Confira nossa nova integração com WhatsApp!",
    },
    {
      id: 3,
      data: "19/04/2025 16:45",
      canal: "sms",
      origem: "api",
      status: "enviado",
      mensagem: "Seu código de verificação é 123456",
      destinatarios: ["+5511999999999"],
    },
    {
      id: 4,
      data: "19/04/2025 14:20",
      canal: "email",
      origem: "api",
      status: "entregue",
      titulo: "Fatura disponível",
      mensagem: "Sua fatura de abril está disponível para pagamento.",
      destinatarios: ["usuario@exemplo.com"],
    },
    {
      id: 5,
      data: "18/04/2025 11:05",
      canal: "webpush",
      origem: "manual",
      status: "lido",
      titulo: "Promoção especial",
      mensagem: "Aproveite 20% de desconto em todos os produtos!",
    },
    {
      id: 6,
      data: "18/04/2025 09:30",
      canal: "sms",
      origem: "api",
      status: "enviado",
      mensagem: "Sua entrega será realizada hoje entre 14h e 16h.",
      destinatarios: ["+5511999999999"],
    },
    {
      id: 7,
      data: "17/04/2025 16:40",
      canal: "email",
      origem: "manual",
      status: "entregue",
      titulo: "Novidades da semana",
      mensagem: "Confira as novidades desta semana em nossa plataforma!",
      destinatarios: ["usuario@exemplo.com", "outro@exemplo.com"],
    },
    {
      id: 8,
      data: "17/04/2025 13:15",
      canal: "webpush",
      origem: "api",
      status: "lido",
      titulo: "Lembrete de reunião",
      mensagem: "Sua reunião começa em 15 minutos.",
    },
    {
      id: 9,
      data: "16/04/2025 10:20",
      canal: "sms",
      origem: "manual",
      status: "enviado",
      mensagem: "Aproveite nossa promoção relâmpago! Válido apenas hoje.",
      destinatarios: ["+5511999999999", "+5511888888888"],
    },
    {
      id: 10,
      data: "16/04/2025 08:45",
      canal: "email",
      origem: "api",
      status: "entregue",
      titulo: "Confirmação de pagamento",
      mensagem: "Seu pagamento foi processado com sucesso!",
      destinatarios: ["usuario@exemplo.com"],
    },
    {
      id: 11,
      data: "15/04/2025 17:30",
      canal: "webpush",
      origem: "manual",
      status: "lido",
      titulo: "Atualização de sistema",
      mensagem: "Nosso sistema será atualizado hoje às 22h. Pode haver instabilidade.",
    },
    {
      id: 12,
      data: "15/04/2025 14:10",
      canal: "sms",
      origem: "api",
      status: "enviado",
      mensagem: "Seu pedido #12345 foi enviado e chegará em breve.",
      destinatarios: ["+5511999999999"],
    },
  ]

  // Carregar notificações
  useEffect(() => {
    // Simulando uma chamada de API
    setTimeout(() => {
      setNotificacoes(notificacoesMock)
      setCarregando(false)
    }, 500)
  }, [])

  // Aplicar filtros
  useEffect(() => {
    let resultado = [...notificacoes]

    // Filtro por canal
    if (canal !== "todas") {
      resultado = resultado.filter((n) => n.canal === canal)
    }

    // Filtro por origem
    if (origem !== "todas") {
      resultado = resultado.filter((n) => n.origem === origem)
    }

    // Filtro por data de início
    if (dataInicio) {
      const dataInicioObj = new Date(dataInicio)
      resultado = resultado.filter((n) => {
        const dataParts = n.data.split(" ")[0].split("/")
        const notificacaoData = new Date(`${dataParts[2]}-${dataParts[1]}-${dataParts[0]}`)
        return notificacaoData >= dataInicioObj
      })
    }

    // Filtro por data de fim
    if (dataFim) {
      const dataFimObj = new Date(dataFim)
      dataFimObj.setHours(23, 59, 59)
      resultado = resultado.filter((n) => {
        const dataParts = n.data.split(" ")[0].split("/")
        const notificacaoData = new Date(`${dataParts[2]}-${dataParts[1]}-${dataParts[0]}`)
        return notificacaoData <= dataFimObj
      })
    }

    setNotificacoesFiltradas(resultado)
    setTotalPages(Math.ceil(resultado.length / itemsPerPage))
    setCurrentPage(1) // Resetar para a primeira página quando os filtros mudam
  }, [canal, origem, dataInicio, dataFim, notificacoes])

  // Aplicar paginação
  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    setNotificacoesPaginadas(notificacoesFiltradas.slice(startIndex, endIndex))
  }, [notificacoesFiltradas, currentPage])

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return
    setCurrentPage(page)
  }

  const handleExport = (format: "excel" | "pdf") => {
    toast({
      title: "Exportação iniciada",
      description: `Exportando dados para ${format.toUpperCase()}...`,
    })

    // Simulação de download
    setTimeout(() => {
      toast({
        title: "Exportação concluída",
        description: `Os dados foram exportados com sucesso para ${format.toUpperCase()}.`,
      })
    }, 1500)
  }

  const getIconByChannel = (channel: string) => {
    switch (channel) {
      case "webpush":
        return <BellRing className="h-4 w-4" />
      case "email":
        return <Mail className="h-4 w-4" />
      case "sms":
        return <MessageSquare className="h-4 w-4" />
      default:
        return null
    }
  }

  const handleViewDetails = (notificacao: Notificacao) => {
    toast({
      title: `${t(notificacao.canal)} - ${notificacao.data}`,
      description: notificacao.mensagem,
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t("notification_history")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">{t("period")}</label>
              <div className="flex space-x-2">
                <Input
                  type="date"
                  className="w-full"
                  value={dataInicio}
                  onChange={(e) => setDataInicio(e.target.value)}
                />
                <Input type="date" className="w-full" value={dataFim} onChange={(e) => setDataFim(e.target.value)} />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">{t("channel")}</label>
              <Select value={canal} onValueChange={setCanal}>
                <SelectTrigger>
                  <SelectValue placeholder={t("all")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas">{t("all")}</SelectItem>
                  <SelectItem value="webpush">{t("web_push")}</SelectItem>
                  <SelectItem value="email">{t("email")}</SelectItem>
                  <SelectItem value="sms">{t("sms")}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">{t("origin")}</label>
              <Select value={origem} onValueChange={setOrigem}>
                <SelectTrigger>
                  <SelectValue placeholder={t("all")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas">{t("all")}</SelectItem>
                  <SelectItem value="api">API</SelectItem>
                  <SelectItem value="manual">{t("manual_send")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end space-x-2 mb-4">
            <Button variant="outline" size="sm" onClick={() => handleExport("excel")}>
              <FileSpreadsheet className="h-4 w-4 mr-2" />
              Excel
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleExport("pdf")}>
              <FileText className="h-4 w-4 mr-2" />
              PDF
            </Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("date_time")}</TableHead>
                  <TableHead>{t("channel")}</TableHead>
                  <TableHead>{t("origin")}</TableHead>
                  <TableHead>{t("status")}</TableHead>
                  <TableHead>{t("actions")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {carregando ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-4">
                      Carregando...
                    </TableCell>
                  </TableRow>
                ) : notificacoesPaginadas.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-4">
                      Nenhuma notificação encontrada.
                    </TableCell>
                  </TableRow>
                ) : (
                  notificacoesPaginadas.map((notificacao) => (
                    <TableRow key={notificacao.id}>
                      <TableCell>{notificacao.data}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          {getIconByChannel(notificacao.canal)}
                          <span className="ml-2">{t(notificacao.canal)}</span>
                        </div>
                      </TableCell>
                      <TableCell>{notificacao.origem === "api" ? "API" : t("manual_send")}</TableCell>
                      <TableCell>{t(notificacao.status)}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" onClick={() => handleViewDetails(notificacao)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {totalPages > 0 && (
            <div className="mt-4">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => handlePageChange(currentPage - 1)}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>

                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    // Lógica para mostrar páginas ao redor da página atual
                    let pageToShow: number

                    if (totalPages <= 5) {
                      // Se temos 5 ou menos páginas, mostramos todas
                      pageToShow = i + 1
                    } else if (currentPage <= 3) {
                      // Se estamos nas primeiras páginas
                      pageToShow = i + 1
                    } else if (currentPage >= totalPages - 2) {
                      // Se estamos nas últimas páginas
                      pageToShow = totalPages - 4 + i
                    } else {
                      // Se estamos no meio
                      pageToShow = currentPage - 2 + i
                    }

                    return (
                      <PaginationItem key={pageToShow}>
                        <PaginationLink
                          onClick={() => handlePageChange(pageToShow)}
                          isActive={currentPage === pageToShow}
                        >
                          {pageToShow}
                        </PaginationLink>
                      </PaginationItem>
                    )
                  })}

                  <PaginationItem>
                    <PaginationNext
                      onClick={() => handlePageChange(currentPage + 1)}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
