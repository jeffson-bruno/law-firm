import { Calendar, Users, FileText, Clock, UserPlus, Filter } from "lucide-react"
import { StatCard } from "@/components/shared/stat-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AddClientDialog } from "@/components/recepcao/add-client-dialog"

export default function RecepcaoDashboard() {
  const recentClients = [
    { id: 1, name: "Maria Silva", date: "Hoje, 14:30", type: "Trabalhista" },
    { id: 2, name: "João Santos", date: "Hoje, 11:00", type: "Civil" },
    { id: 3, name: "Ana Costa", date: "Ontem, 16:00", type: "Família" },
  ]

  const appointments = [
    { id: 1, client: "Pedro Oliveira", time: "09:00", lawyer: "Dr. Silva" },
    { id: 2, client: "Carla Mendes", time: "11:30", lawyer: "Dra. Santos" },
    { id: 3, client: "Roberto Lima", time: "14:00", lawyer: "Dr. Costa" },
  ]

  const caseProgress = [
    { id: 1, process: "1234/2024", client: "Maria Silva", status: "pending", note: "Aguardando documentação" },
    { id: 2, process: "5678/2024", client: "João Santos", status: "active", note: "Em análise" },
    { id: 3, process: "9012/2024", client: "Ana Costa", status: "complete", note: "Documentação completa" },
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance">Dashboard - Recepção</h1>
          <p className="text-muted-foreground text-pretty">Visão geral do atendimento e clientes</p>
        </div>
        <AddClientDialog />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Agendamentos Hoje" value={3} icon={Calendar} description="3 consultas marcadas" />
        <StatCard title="Clientes Ativos" value={47} icon={Users} trend={{ value: "12% este mês", positive: true }} />
        <StatCard title="Novos Clientes" value={8} icon={UserPlus} description="Últimos 7 dias" />
        <StatCard title="Casos em Andamento" value={23} icon={FileText} />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Agendamentos do Dia</CardTitle>
            <CardDescription>Consultas agendadas para hoje</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <div key={appointment.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{appointment.client}</p>
                      <p className="text-sm text-muted-foreground">{appointment.lawyer}</p>
                    </div>
                  </div>
                  <Badge variant="outline">{appointment.time}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Clientes Recentes</CardTitle>
            <CardDescription>Últimos clientes atendidos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentClients.map((client) => (
                <div key={client.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                  <div>
                    <p className="font-medium text-foreground">{client.name}</p>
                    <p className="text-sm text-muted-foreground">{client.date}</p>
                  </div>
                  <Badge>{client.type}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Progresso de Casos</CardTitle>
            <CardDescription>Acompanhe o status da documentação dos processos</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filtrar
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {caseProgress.map((item) => (
              <div key={item.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <p className="font-medium text-foreground">{item.process}</p>
                    <Badge
                      variant={
                        item.status === "complete" ? "default" : item.status === "active" ? "secondary" : "outline"
                      }
                    >
                      {item.status === "complete" ? "Completo" : item.status === "active" ? "Em andamento" : "Pendente"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.client}</p>
                  <p className="text-sm text-muted-foreground mt-1">{item.note}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
