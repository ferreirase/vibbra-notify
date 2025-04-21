"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { BellRing, Mail, MessageSquare, Plus, Send, BarChart2, Settings } from "lucide-react"
import { useTranslation } from "@/hooks/use-translation"
import Link from "next/link"

export default function DashboardPage() {
  const { t } = useTranslation()

  const channelStats = [
    { name: t("web_push"), value: 75, icon: BellRing },
    { name: t("email"), value: 92, icon: Mail },
    { name: t("sms"), value: 50, icon: MessageSquare },
  ]

  const recentActivity = [
    {
      id: 1,
      title: t("new_integration"),
      description: "há 5 minutos",
      icon: BellRing,
    },
    {
      id: 2,
      title: "Campanha de e-mail concluída",
      description: "há 2 horas",
      icon: Mail,
    },
    {
      id: 3,
      title: "Lote de SMS processado",
      description: "há 4 horas",
      icon: MessageSquare,
    },
  ]

  const quickActions = [
    {
      name: t("new_channel"),
      icon: Plus,
      href: "/configuracoes",
    },
    {
      name: t("send_notification"),
      icon: Send,
      href: "/envio-manual",
    },
    {
      name: t("view_reports"),
      icon: BarChart2,
      href: "/historico",
    },
    {
      name: t("configuration"),
      icon: Settings,
      href: "/configuracoes",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              <BellRing className="h-4 w-4 inline mr-2" />
              {t("web_push")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,453</div>
            <p className="text-xs text-muted-foreground">{t("active_subscribers")}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              <Mail className="h-4 w-4 inline mr-2" />
              {t("email")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98.2%</div>
            <p className="text-xs text-muted-foreground">{t("delivery_rate")}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              <MessageSquare className="h-4 w-4 inline mr-2" />
              {t("sms")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5,234</div>
            <p className="text-xs text-muted-foreground">{t("sent_today")}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>{t("recent_activity")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-4">
                <div className="bg-primary/10 p-2 rounded-full">
                  <activity.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">{activity.title}</p>
                  <p className="text-sm text-muted-foreground">{activity.description}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("channel_stats")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {channelStats.map((stat) => (
              <div key={stat.name} className="space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <stat.icon className="h-4 w-4 mr-2" />
                    <span className="text-sm font-medium">{stat.name}</span>
                  </div>
                  <span className="text-sm">{stat.value}%</span>
                </div>
                <Progress value={stat.value} />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t("quick_actions")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <Link href={action.href} key={action.name}>
                <Button variant="outline" className="w-full h-24 flex flex-col items-center justify-center gap-2">
                  <action.icon className="h-6 w-6" />
                  <span>{action.name}</span>
                </Button>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
