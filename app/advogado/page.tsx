"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FolderOpen, Upload, Eye, Edit, CheckCircle2, Clock, AlertTriangle } from "lucide-react"
import { LawyerSidebar } from "@/components/lawyer-sidebar"
import { LawyerHeader } from "@/components/lawyer-header"

export default function LawyerDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const stats = [
    {
      title: "Meus Casos",
      value: "18",
      icon: FolderOpen,
      color: "text-primary",
    },
    {
      title: "Pendências",
      value: "7",
      icon: AlertTriangle,
      color: "text-destructive",
    },
    {
      title: "Tarefas Hoje",
      value: "5",
      icon: CheckCircle2,
      color: "text-accent",
    },
  ]

  const cases = [
    {
      id: "#1543",
      name: "Silva vs. Empresa ABC",
      type: "Trabalhista",
      status: "Em andamento",
      statusColor: "bg-primary",
      lastUpdate: "2 dias atrás",
    },
    {
      id: "#1542",
      name: "Processo Criminal - João Santos",
      type: "Criminal",
      status: "Aguardando",
      statusColor: "bg-yellow-500",
      lastUpdate: "5 dias atrás",
    },
    {
      id: "#1540",
      name: "Recurso Tributário",
      type: "Tributário",
      status: "Prazo próximo",
      statusColor: "bg-destructive",
      lastUpdate: "1 dia atrás",
    },
    {
      id: "#1538",
      name: "Divórcio - Maria Costa",
      type: "Família",
      status: "Em andamento",
      statusColor: "bg-primary",
      lastUpdate: "3 dias atrás",
    },
  ]

  const recentMovements = [
    {
      id: 1,
      case: "Processo #1543",
      action: "Audiência marcada para 15/12/2024",
      time: "2 horas atrás",
    },
    {
      id: 2,
      case: "Processo #1542",
      action: "Novo documento anexado ao processo",
      time: "5 horas atrás",
    },
    {
      id: 3,
      case: "Processo #1540",
      action: "Prazo atualizado - Vence em 2 dias",
      time: "1 dia atrás",
    },
  ]

  const todayTasks = [
    { id: 1, task: "Revisar petição inicial - Processo #1543", time: "09:00" },
    { id: 2, task: "Reunião com cliente - João Santos", time: "11:00" },
    { id: 3, task: "Preparar documentos para audiência", time: "14:00" },
    { id: 4, task: "Protocolar recurso tributário", time: "16:00" },
    { id: 5, task: "Análise de jurisprudência", time: "17:00" },
  ]

  return (
    <div className="flex min-h-screen bg-background">
      <LawyerSidebar open={sidebarOpen} />

      <div className="flex-1 flex flex-col">
        <LawyerHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        <main className="flex-1 p-6 space-y-6">
          <div>
            <h1 className="text-[22px] font-bold text-foreground font-[family-name:var(--font-poppins)]">
              Painel do Advogado
            </h1>
            <p className="text-muted-foreground mt-1">Gerencie seus casos e tarefas</p>
          </div>

          {/* Stats */}
          <div className="grid gap-6 md:grid-cols-3">
            {stats.map((stat, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-foreground font-[family-name:var(--font-poppins)]">
                    {stat.value}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* My Cases */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-[18px] font-medium flex items-center justify-between font-[family-name:var(--font-poppins)]">
                  <span>Meus Casos</span>
                  <Button size="sm" className="bg-primary hover:bg-primary/90 font-[family-name:var(--font-poppins)]">
                    Ver Todos
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cases.map((caseItem) => (
                    <div
                      key={caseItem.id}
                      className="p-4 border border-border rounded-lg hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-semibold text-primary font-[family-name:var(--font-poppins)]">
                              {caseItem.id}
                            </span>
                            <Badge variant="outline" className="text-xs">
                              {caseItem.type}
                            </Badge>
                          </div>
                          <h3 className="font-medium text-foreground">{caseItem.name}</h3>
                        </div>
                        <Badge className={`${caseItem.statusColor} text-white`}>{caseItem.status}</Badge>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-xs text-muted-foreground">Atualizado {caseItem.lastUpdate}</span>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 font-[family-name:var(--font-poppins)] bg-transparent"
                          >
                            <Eye className="w-3 h-3 mr-1" />
                            Ver
                          </Button>
                          <Button
                            size="sm"
                            className="h-8 bg-accent hover:bg-accent/90 font-[family-name:var(--font-poppins)]"
                          >
                            <Edit className="w-3 h-3 mr-1" />
                            Editar
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Today's Tasks */}
            <Card>
              <CardHeader>
                <CardTitle className="text-[18px] font-medium font-[family-name:var(--font-poppins)]">
                  Tarefas de Hoje
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {todayTasks.map((task) => (
                    <div
                      key={task.id}
                      className="flex items-start gap-3 pb-3 border-b border-border last:border-0 last:pb-0"
                    >
                      <Clock className="w-4 h-4 text-muted-foreground mt-1 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground leading-snug">{task.task}</p>
                        <p className="text-xs text-muted-foreground mt-1">{task.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Case Movements */}
          <Card>
            <CardHeader>
              <CardTitle className="text-[18px] font-medium flex items-center justify-between font-[family-name:var(--font-poppins)]">
                <span>Movimentações Recentes</span>
                <Button variant="outline" size="sm" className="font-[family-name:var(--font-poppins)] bg-transparent">
                  <Upload className="w-4 h-4 mr-2" />
                  Anexar Documento
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentMovements.map((movement) => (
                  <div
                    key={movement.id}
                    className="flex items-start gap-4 pb-4 border-b border-border last:border-0 last:pb-0"
                  >
                    <div className="w-2 h-2 mt-2 rounded-full bg-primary flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{movement.case}</p>
                      <p className="text-sm text-muted-foreground mt-1">{movement.action}</p>
                      <p className="text-xs text-muted-foreground mt-1">{movement.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
