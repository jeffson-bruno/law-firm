import { AlertCircle, Clock, FileText, CheckCircle2, TrendingUp } from "lucide-react"
import { StatCard } from "@/components/shared/stat-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Link from "next/link"

export default function AdvogadoDashboard() {
  const urgentDeadlines = [
    { id: 1, process: "1234/2024", client: "Maria Silva", deadline: "Hoje, 17:00", type: "Contestação" },
    { id: 2, process: "5678/2024", client: "João Santos", deadline: "Amanhã, 14:00", type: "Recurso" },
  ]

  const myCases = [
    {
      id: 1,
      title: "Processo 1234/2024 - Ação Trabalhista",
      client: "Maria Silva",
      phase: "Contestação",
      nextDeadline: "Hoje",
      status: "urgent",
    },
    {
      id: 2,
      title: "Processo 5678/2024 - Ação Civil",
      client: "João Santos",
      phase: "Instrução Probatória",
      nextDeadline: "3 dias",
      status: "active",
    },
    {
      id: 3,
      title: "Processo 9012/2024 - Ação de Família",
      client: "Ana Costa",
      phase: "Audiência de Conciliação",
      nextDeadline: "1 semana",
      status: "waiting",
    },
  ]

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-balance">Dashboard - Advogado</h1>
        <p className="text-muted-foreground text-pretty">Gerencie seus casos e prazos processuais</p>
      </div>

      {urgentDeadlines.length > 0 && (
        <Alert variant="destructive" className="border-2">
          <AlertCircle className="h-5 w-5" />
          <AlertTitle className="text-lg font-semibold">Prazos Críticos!</AlertTitle>
          <AlertDescription>
            Você tem {urgentDeadlines.length} prazo(s) vencendo nas próximas 48 horas. Ação imediata necessária.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Casos Ativos"
          value={12}
          icon={FileText}
          description="Em andamento"
          trend={{ value: "2 novos este mês", positive: true }}
        />
        <StatCard title="Prazos Vencidos" value={2} icon={AlertCircle} className="border-destructive/50" />
        <StatCard title="Prazos em 48h" value={3} icon={Clock} className="border-warning/50" />
        <StatCard
          title="Concluídos no Mês"
          value={5}
          icon={CheckCircle2}
          trend={{ value: "25% acima", positive: true }}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-destructive/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <AlertCircle className="h-5 w-5" />
              Prazos Urgentes
            </CardTitle>
            <CardDescription>Vencendo nas próximas 48 horas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {urgentDeadlines.map((item) => (
                <div key={item.id} className="border-l-4 border-destructive bg-destructive/5 p-3 rounded-r">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-semibold text-foreground">{item.process}</p>
                      <p className="text-sm text-muted-foreground">{item.client}</p>
                    </div>
                    <Badge variant="destructive">{item.type}</Badge>
                  </div>
                  <p className="text-sm font-medium text-destructive">{item.deadline}</p>
                </div>
              ))}
              <Button variant="destructive" className="w-full">
                Ver Todos os Prazos
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Atividade Recente
            </CardTitle>
            <CardDescription>Últimas atualizações nos processos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                <div>
                  <p className="text-sm font-medium text-foreground">Petição enviada</p>
                  <p className="text-sm text-muted-foreground">Processo 1234/2024 - Há 2 horas</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="h-2 w-2 rounded-full bg-success mt-2" />
                <div>
                  <p className="text-sm font-medium text-foreground">Documento assinado</p>
                  <p className="text-sm text-muted-foreground">Contrato de honorários - Há 5 horas</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="h-2 w-2 rounded-full bg-accent mt-2" />
                <div>
                  <p className="text-sm font-medium text-foreground">Audiência agendada</p>
                  <p className="text-sm text-muted-foreground">Processo 9012/2024 - Ontem</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Meus Casos</CardTitle>
              <CardDescription>Processos sob sua responsabilidade</CardDescription>
            </div>
            <Link href="/advogado/casos">
              <Button variant="outline" size="sm">
                Ver Todos
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {myCases.map((case_) => (
              <div key={case_.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-foreground">{case_.title}</h3>
                    <p className="text-sm text-muted-foreground">Cliente: {case_.client}</p>
                  </div>
                  <Badge
                    variant={
                      case_.status === "urgent" ? "destructive" : case_.status === "active" ? "default" : "secondary"
                    }
                  >
                    {case_.status === "urgent" ? "Urgente" : case_.status === "active" ? "Em andamento" : "Aguardando"}
                  </Badge>
                </div>
                <div className="grid gap-2 md:grid-cols-2 mb-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Fase Atual</p>
                    <p className="text-sm font-medium text-foreground">{case_.phase}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Próximo Prazo</p>
                    <p className="text-sm font-medium text-foreground">{case_.nextDeadline}</p>
                  </div>
                </div>
                <Link href={`/advogado/caso/${case_.id}`}>
                  <Button size="sm" variant="outline" className="w-full bg-transparent">
                    Ver Detalhes do Caso
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
