import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, BellRing, Mail, MessageSquare, Settings, Zap } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="mr-4 flex">
            <Link href="/" className="flex items-center space-x-2">
              <BellRing className="h-6 w-6 text-teal-600" />
              <span className="font-bold text-xl">Vibbra Notify</span>
            </Link>
          </div>
          <nav className="flex flex-1 items-center justify-end space-x-4">
            <Button variant="ghost" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/register">Começar Grátis</Link>
            </Button>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-teal-50 to-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Sistema Centralizado de Notificações para seus Serviços Digitais
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Gerencie e configure notificações em múltiplos canais com uma única plataforma. Integre facilmente com
                  seus sistemas através de nossa API aberta.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" className="bg-teal-600 hover:bg-teal-700">
                    Começar Agora
                  </Button>
                  <Button size="lg" variant="outline">
                    Ver Documentação
                  </Button>
                </div>
              </div>
              <div className="mx-auto lg:mr-0 flex items-center justify-center">
                <div className="relative w-full max-w-[500px] aspect-square">
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-lg opacity-20 blur-xl"></div>
                  <div className="relative bg-white p-6 rounded-lg shadow-lg">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <BellRing className="h-5 w-5 text-teal-600" />
                        <span className="font-medium">Nova Notificação</span>
                      </div>
                      <div className="p-4 border rounded-md">
                        <h3 className="font-medium">Bem-vindo ao Vibbra Notify!</h3>
                        <p className="text-sm text-gray-500 mt-1">
                          Sua plataforma de notificações está pronta para uso.
                        </p>
                      </div>
                      <div className="flex justify-end">
                        <Button size="sm" variant="outline">
                          Configurar
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-teal-100 px-3 py-1 text-sm text-teal-700">Recursos</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Tudo que você precisa para gerenciar notificações
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Uma plataforma unificada para configurar, enviar e monitorar notificações em múltiplos canais.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
              <Card>
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-lg bg-teal-100 flex items-center justify-center mb-4">
                    <BellRing className="h-6 w-6 text-teal-700" />
                  </div>
                  <CardTitle>Web Push</CardTitle>
                  <CardDescription>Configure e envie notificações push para navegadores web</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-500">
                    <li className="flex items-center">
                      <span className="mr-2">✓</span>
                      <span>Personalização de prompts de permissão</span>
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2">✓</span>
                      <span>Notificações de boas-vindas automáticas</span>
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2">✓</span>
                      <span>Links de redirecionamento configuráveis</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-lg bg-teal-100 flex items-center justify-center mb-4">
                    <Mail className="h-6 w-6 text-teal-700" />
                  </div>
                  <CardTitle>E-mail</CardTitle>
                  <CardDescription>Envie e-mails personalizados com templates HTML</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-500">
                    <li className="flex items-center">
                      <span className="mr-2">✓</span>
                      <span>Configuração SMTP simplificada</span>
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2">✓</span>
                      <span>Upload de templates HTML personalizados</span>
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2">✓</span>
                      <span>Rastreamento de abertura e cliques</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-lg bg-teal-100 flex items-center justify-center mb-4">
                    <MessageSquare className="h-6 w-6 text-teal-700" />
                  </div>
                  <CardTitle>SMS</CardTitle>
                  <CardDescription>Envie mensagens de texto para seus usuários</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-500">
                    <li className="flex items-center">
                      <span className="mr-2">✓</span>
                      <span>Integração com provedores de SMS</span>
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2">✓</span>
                      <span>Contador de caracteres e segmentos</span>
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2">✓</span>
                      <span>Envio para múltiplos destinatários</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-lg bg-teal-100 flex items-center justify-center mb-4">
                    <BarChart className="h-6 w-6 text-teal-700" />
                  </div>
                  <CardTitle>Histórico e Análise</CardTitle>
                  <CardDescription>Acompanhe e analise suas notificações enviadas</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-500">
                    <li className="flex items-center">
                      <span className="mr-2">✓</span>
                      <span>Histórico detalhado de envios</span>
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2">✓</span>
                      <span>Filtros por canal, data e origem</span>
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2">✓</span>
                      <span>Exportação para PDF e Excel</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-lg bg-teal-100 flex items-center justify-center mb-4">
                    <Settings className="h-6 w-6 text-teal-700" />
                  </div>
                  <CardTitle>Configuração Simples</CardTitle>
                  <CardDescription>Interface intuitiva para configurar seus canais</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-500">
                    <li className="flex items-center">
                      <span className="mr-2">✓</span>
                      <span>Criação de aplicativos em poucos cliques</span>
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2">✓</span>
                      <span>Configuração específica por canal</span>
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2">✓</span>
                      <span>Gerenciamento centralizado</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-lg bg-teal-100 flex items-center justify-center mb-4">
                    <Zap className="h-6 w-6 text-teal-700" />
                  </div>
                  <CardTitle>API Aberta</CardTitle>
                  <CardDescription>Integre facilmente com seus sistemas existentes</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-500">
                    <li className="flex items-center">
                      <span className="mr-2">✓</span>
                      <span>API RESTful bem documentada</span>
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2">✓</span>
                      <span>Autenticação e segurança robustas</span>
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2">✓</span>
                      <span>Envio de notificações via API</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-teal-100 px-3 py-1 text-sm text-teal-700">Como Funciona</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Simples de configurar, fácil de usar
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Em apenas três passos, você pode começar a enviar notificações para seus usuários.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3 mt-12">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-teal-100 text-teal-900">
                  <span className="text-xl font-bold">1</span>
                </div>
                <h3 className="text-xl font-bold">Crie seu Aplicativo</h3>
                <p className="text-gray-500">
                  Registre seu aplicativo e selecione os canais de notificação que deseja utilizar.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-teal-100 text-teal-900">
                  <span className="text-xl font-bold">2</span>
                </div>
                <h3 className="text-xl font-bold">Configure os Canais</h3>
                <p className="text-gray-500">
                  Personalize cada canal de notificação de acordo com suas necessidades específicas.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-teal-100 text-teal-900">
                  <span className="text-xl font-bold">3</span>
                </div>
                <h3 className="text-xl font-bold">Comece a Enviar</h3>
                <p className="text-gray-500">
                  Envie notificações manualmente pela plataforma ou integre com seus sistemas via API.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-teal-600">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter text-white sm:text-5xl">
                  Pronto para otimizar suas notificações?
                </h2>
                <p className="max-w-[900px] text-teal-100 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Comece a usar o Vibbra Notify hoje mesmo e melhore a comunicação com seus usuários.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg" className="bg-white text-teal-600 hover:bg-teal-50">
                  Criar Conta Grátis
                </Button>
                <Button size="lg" className="bg-white text-teal-600 hover:bg-teal-50">
                  Agendar Demo
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-gray-500 md:text-left">
            © 2025 Vibbra Notify. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/termos" className="text-sm text-gray-500 hover:underline">
              Termos de Serviço
            </Link>
            <Link href="/privacidade" className="text-sm text-gray-500 hover:underline">
              Política de Privacidade
            </Link>
            <Link href="/contato" className="text-sm text-gray-500 hover:underline">
              Contato
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
