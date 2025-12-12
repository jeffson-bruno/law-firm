import { Search, Filter, Plus, FileText } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function CasosPage() {
  const cases = [
    {
      id: 1,
      process: "1234/2024",
      title: "Ação Trabalhista - Rescisão Indireta",
      client: "Maria Silva",
      phase: "Contestação",
      deadline: "Hoje",
      status: "urgent",
      responsible: "Dr. Silva",
    },
    {
      id: 2,
      process: "5678/2024",
      title: "Ação Civil - Indenização por Danos Morais",
      client: "João Santos",
      phase: "Instrução Probatória",
      deadline: "3 dias",
      status: "active",
      responsible: "Dr. Silva",
    },
    {
      id: 3,
      process: "9012/2024",
      title: "Ação de Família - Divórcio Consensual",
      client: "Ana Costa",
      phase: "Audiência de Conciliação",
      deadline: "1 semana",
      status: "waiting",
      responsible: "Dra. Santos",
    },
    {
      id: 4,
      process: "3456/2024",
      title: "Ação Previdenciária - Aposentadoria",
      client: "Pedro Oliveira",
      phase: "Análise de Documentos",
      deadline: "2 semanas",
      status: "active",
      responsible: "Dr. Silva",
    },
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance">Meus Casos</h1>
          <p className="text-muted-foreground text-pretty">Todos os processos sob sua responsabilidade</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Novo Caso
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filtros e Busca</CardTitle>
          <CardDescription>Encontre casos por número, cliente ou status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input placeholder="Buscar por processo, cliente..." className="flex-1" />
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
        {cases.map((case_) => (
          <Card key={case_.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <FileText className="h-5 w-5 text-primary" />
                    <h3 className="font-bold text-xl text-foreground">{case_.title}</h3>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>Processo: {case_.process}</span>
                    <span>•</span>
                    <span>Cliente: {case_.client}</span>
                  </div>
                </div>
                <Badge
                  variant={
                    case_.status === "urgent" ? "destructive" : case_.status === "active" ? "default" : "secondary"
                  }
                  className="text-sm"
                >
                  {case_.status === "urgent" ? "Urgente" : case_.status === "active" ? "Em andamento" : "Aguardando"}
                </Badge>
              </div>

              <div className="grid gap-4 md:grid-cols-3 mb-4">
                <div className="bg-secondary/50 p-3 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">Fase Atual</p>
                  <p className="text-sm font-semibold text-foreground">{case_.phase}</p>
                </div>
                <div className="bg-secondary/50 p-3 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">Próximo Prazo</p>
                  <p
                    className={`text-sm font-semibold ${case_.status === "urgent" ? "text-destructive" : "text-foreground"}`}
                  >
                    {case_.deadline}
                  </p>
                </div>
                <div className="bg-secondary/50 p-3 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">Advogado Responsável</p>
                  <p className="text-sm font-semibold text-foreground">{case_.responsible}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <Link href={`/advogado/caso/${case_.id}`} className="flex-1">
                  <Button variant="default" size="sm" className="w-full">
                    Ver Detalhes
                  </Button>
                </Link>
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  Adicionar Documento
                </Button>
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  Atualizar Status
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
