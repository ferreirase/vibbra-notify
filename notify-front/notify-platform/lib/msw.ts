import { setupWorker, rest } from "msw"

// Tipos
interface Aplicativo {
  id: string
  nome: string
  canais: {
    webPush: boolean
    email: boolean
    sms: boolean
  }
  dataCriacao: string
}

interface Notificacao {
  id: string
  canal: "webpush" | "email" | "sms"
  titulo?: string
  mensagem: string
  destinatarios?: string[]
  status: "enviado" | "entregue" | "lido" | "falha"
  dataEnvio: string
  origem: "api" | "manual"
}

// Dados mockados
const aplicativos: Aplicativo[] = [
  {
    id: "1",
    nome: "Meu Aplicativo",
    canais: {
      webPush: true,
      email: true,
      sms: false,
    },
    dataCriacao: "2025-04-15T10:30:00Z",
  },
]

const notificacoes: Notificacao[] = [
  {
    id: "1",
    canal: "email",
    titulo: "Bem-vindo ao NotifyHub",
    mensagem: "Obrigado por se cadastrar em nossa plataforma!",
    destinatarios: ["usuario@exemplo.com"],
    status: "entregue",
    dataEnvio: "2025-04-20T10:30:00Z",
    origem: "api",
  },
  {
    id: "2",
    canal: "webpush",
    titulo: "Nova funcionalidade disponível",
    mensagem: "Confira nossa nova integração com WhatsApp!",
    status: "lido",
    dataEnvio: "2025-04-20T09:15:00Z",
    origem: "manual",
  },
  {
    id: "3",
    canal: "sms",
    mensagem: "Seu código de verificação é 123456",
    destinatarios: ["+5511999999999"],
    status: "enviado",
    dataEnvio: "2025-04-19T16:45:00Z",
    origem: "api",
  },
]

// Handlers
export const handlers = [
  // Aplicativos
  rest.get("/api/aplicativos", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(aplicativos))
  }),

  rest.post("/api/aplicativos", (req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json({ id: Date.now().toString(), ...(req.body as any), dataCriacao: new Date().toISOString() }),
    )
  }),

  // Notificações
  rest.get("/api/notificacoes", (req, res, ctx) => {
    const canal = req.url.searchParams.get("canal")
    const origem = req.url.searchParams.get("origem")

    let resultado = [...notificacoes]

    if (canal && canal !== "todas") {
      resultado = resultado.filter((n) => n.canal === canal)
    }

    if (origem && origem !== "todas") {
      resultado = resultado.filter((n) => n.origem === origem)
    }

    return res(ctx.status(200), ctx.json(resultado))
  }),

  rest.post("/api/notificacoes", (req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json({ id: Date.now().toString(), ...(req.body as any), dataEnvio: new Date().toISOString() }),
    )
  }),
]

// Configuração do worker
export function setupMSW() {
  if (typeof window !== "undefined" && process.env.NEXT_PUBLIC_USE_API_MOCK === "true") {
    const worker = setupWorker(...handlers)
    worker.start()
    console.log("MSW inicializado")
  }
}
