import { Search, Filter, Plus, FileText } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function ProcessosPage() {
  const processes = [
    {
      id: 1,
      number: "1234/2024",
      title: "Ação Trabalhista",
      client: "Maria Silva",
      lawyer: "Dr. Silva",
      phase: "Contestação",
      status: "urgent",
    },
    {
      id: 2,
      number: "5678/2024",
      title: "Ação Civil",
      client: "João Santos",
      lawyer: "Dra. Santos",
      phase: "Instrução",
      status: "active",
    },
    {
      id: 3,
      number: "9012/2024",
      title: "Ação de Família",
      client: "Ana Costa",
      lawyer: "Dr. Costa",
      phase: "Audiência",
      status: "waiting",
    },
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance">Gerenciar Processos</h1>
          <p className="text-muted-foreground text-pretty">Visão geral de todos os processos do escritório</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Novo Processo
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Buscar e Filtrar</CardTitle>
          <CardDescription>Encontre processos por número, cliente ou advogado</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input placeholder="Buscar por número, cliente, advogado..." className="flex-1" />
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filtrar
            </Button>
            <Button>
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {processes.map((process) => (
          <Card key={process.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-foreground">{process.title}</h3>
                    <p className="text-sm text-muted-foreground">Processo: {process.number}</p>
                  </div>
                </div>
                <Badge
                  variant={
                    process.status === "urgent" ? "destructive" : process.status === "active" ? "default" : "secondary"
                  }
                >
                  {process.status === "urgent" ? "Urgente" : process.status === "active" ? "Ativo" : "Aguardando"}
                </Badge>
              </div>

              <div className="grid gap-3 md:grid-cols-3 mb-4">
                <div className="bg-secondary/50 p-3 rounded">
                  <p className="text-xs text-muted-foreground mb-1">Cliente</p>
                  <p className="font-semibold text-foreground">{process.client}</p>
                </div>
                <div className="bg-secondary/50 p-3 rounded">
                  <p className="text-xs text-muted-foreground mb-1">Advogado Responsável</p>
                  <p className="font-semibold text-foreground">{process.lawyer}</p>
                </div>
                <div className="bg-secondary/50 p-3 rounded">
                  <p className="text-xs text-muted-foreground mb-1">Fase Atual</p>
                  <p className="font-semibold text-foreground">{process.phase}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <Link href={`/advogado/caso/${process.id}`} className="flex-1">
                  <Button size="sm" variant="default" className="w-full">
                    Ver Detalhes
                  </Button>
                </Link>
                <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                  Editar
                </Button>
                <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                  Designar Advogado
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
