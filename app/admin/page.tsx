"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FolderOpen, Users, CalendarClock, DollarSign, FileText, Plus, TrendingUp, AlertCircle } from "lucide-react"
import { AdminSidebar } from "@/components/admin-sidebar"
import { AdminHeader } from "@/components/admin-header"

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const stats = [
    {
      title: "Total de Processos",
      value: "142",
      change: "+12%",
      icon: FolderOpen,
      color: "text-primary",
    },
    {
      title: "Clientes Ativos",
      value: "89",
      change: "+5%",
      icon: Users,
      color: "text-accent",
    },
    {
      title: "Tarefas Pendentes",
      value: "23",
      change: "-8%",
      icon: CalendarClock,
      color: "text-destructive",
    },
    {
      title: "Receita Mensal",
      value: "R$ 125.500",
      change: "+18%",
      icon: DollarSign,
      color: "text-accent",
    },
  ]

  const recentActivities = [
    { id: 1, action: "Novo processo cadastrado", case: "Processo #1543 - Trabalhista", time: "5 min atrás" },
    { id: 2, action: "Cliente adicionado", case: "João Silva - Cível", time: "1 hora atrás" },
    { id: 3, action: "Documento anexado", case: "Processo #1542 - Criminal", time: "2 horas atrás" },
    { id: 4, action: "Prazo atualizado", case: "Processo #1540 - Tributário", time: "3 horas atrás" },
  ]

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar open={sidebarOpen} />

      <div className="flex-1 flex flex-col">
        <AdminHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        <main className="flex-1 p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-[24px] font-bold text-foreground font-[family-name:var(--font-poppins)]">
                Dashboard
              </h1>
              <p className="text-muted-foreground mt-1">Visão geral do escritório</p>
            </div>
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold font-[family-name:var(--font-poppins)]">
              <Plus className="w-4 h-4 mr-2" />
              Novo Processo
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground font-[family-name:var(--font-poppins)]">
                    {stat.value}
                  </div>
                  <p className="text-xs text-muted-foreground flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {stat.change} em relação ao mês anterior
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Charts and Activity */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="text-[18px] font-medium font-[family-name:var(--font-poppins)]">
                  Atividades Recentes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-start gap-4 pb-4 border-b border-border last:border-0 last:pb-0"
                    >
                      <div className="w-2 h-2 mt-2 rounded-full bg-primary" />
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium text-foreground">{activity.action}</p>
                        <p className="text-sm text-muted-foreground">{activity.case}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-[18px] font-medium font-[family-name:var(--font-poppins)]">
                  Ações Rápidas
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3">
                <Button
                  variant="outline"
                  className="justify-start h-12 font-[family-name:var(--font-poppins)] bg-transparent"
                >
                  <FolderOpen className="w-4 h-4 mr-3" />
                  Gerenciar Processos
                </Button>
                <Button
                  variant="outline"
                  className="justify-start h-12 font-[family-name:var(--font-poppins)] bg-transparent"
                >
                  <Users className="w-4 h-4 mr-3" />
                  Cadastrar Cliente
                </Button>
                <Button
                  variant="outline"
                  className="justify-start h-12 font-[family-name:var(--font-poppins)] bg-transparent"
                >
                  <FileText className="w-4 h-4 mr-3" />
                  Gerar Relatório
                </Button>
                <Button
                  variant="outline"
                  className="justify-start h-12 font-[family-name:var(--font-poppins)] bg-transparent"
                >
                  <DollarSign className="w-4 h-4 mr-3" />
                  Controle Financeiro
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Alerts */}
          <Card className="border-destructive/50 bg-destructive/5">
            <CardHeader>
              <CardTitle className="text-[18px] font-medium flex items-center gap-2 text-destructive font-[family-name:var(--font-poppins)]">
                <AlertCircle className="w-5 h-5" />
                Prazos Próximos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Processo #1543 - Trabalhista</p>
                    <p className="text-sm text-muted-foreground">Prazo: 2 dias</p>
                  </div>
                  <Button size="sm" className="bg-primary hover:bg-primary/90 font-[family-name:var(--font-poppins)]">
                    Ver Detalhes
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Processo #1540 - Tributário</p>
                    <p className="text-sm text-muted-foreground">Prazo: 5 dias</p>
                  </div>
                  <Button size="sm" className="bg-primary hover:bg-primary/90 font-[family-name:var(--font-poppins)]">
                    Ver Detalhes
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
