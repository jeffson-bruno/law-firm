import { ArrowLeft, Calendar, DollarSign, FileText, Users, Clock, Plus } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

export default function CaseDetailPage({ params }: { params: { id: string } }) {
  const caseData = {
    id: params.id,
    process: "1234/2024",
    title: "Ação Trabalhista - Rescisão Indireta",
    client: "Maria Silva",
    phase: "Contestação",
    status: "urgent",
    responsible: "Dr. João Silva",
    createdAt: "15/11/2024",
  }

  const deadlines = [
    { id: 1, title: "Contestação", date: "20/12/2024", status: "urgent", description: "Apresentar defesa" },
    { id: 2, title: "Réplica", date: "05/01/2025", status: "pending", description: "Responder à contestação" },
    { id: 3, title: "Audiência", date: "20/01/2025", status: "scheduled", description: "Audiência de instrução" },
  ]

  const documents = [
    { id: 1, name: "Petição Inicial", type: "pdf", date: "15/11/2024", size: "2.4 MB" },
    { id: 2, name: "Procuração", type: "pdf", date: "15/11/2024", size: "856 KB" },
    { id: 3, name: "Documentos Pessoais", type: "pdf", date: "16/11/2024", size: "1.2 MB" },
  ]

  const financial = [
    { id: 1, description: "Honorários Contratuais", value: 5000, status: "paid", date: "15/11/2024" },
    { id: 2, description: "Custas Processuais", value: 450, status: "pending", date: "20/11/2024" },
    { id: 3, description: "Honorários de Êxito (30%)", value: 0, status: "pending", date: "A definir" },
  ]

  const parties = [
    { id: 1, name: "Maria Silva", role: "Autora", type: "cliente" },
    { id: 2, name: "Empresa XYZ Ltda", role: "Ré", type: "parte" },
  ]

  const history = [
    { id: 1, date: "20/11/2024", event: "Petição inicial protocolada", user: "Dr. Silva" },
    { id: 2, date: "19/11/2024", event: "Documentos anexados ao processo", user: "Recepção" },
    { id: 3, date: "15/11/2024", event: "Caso criado no sistema", user: "Recepção" },
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/advogado/casos">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-3xl font-bold text-balance">{caseData.title}</h1>
            <Badge variant="destructive">Urgente</Badge>
          </div>
          <p className="text-muted-foreground">
            Processo {caseData.process} • Cliente: {caseData.client}
          </p>
        </div>
        <Link href={`/advogado/caso/${params.id}/documento/novo`}>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Novo Documento
          </Button>
        </Link>
      </div>

      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Advogado Responsável</p>
              <p className="text-lg font-bold text-primary">{caseData.responsible}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Fase Atual</p>
              <p className="text-lg font-semibold text-foreground">{caseData.phase}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Data de Criação</p>
              <p className="text-lg font-semibold text-foreground">{caseData.createdAt}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="prazos" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="prazos">Prazos</TabsTrigger>
          <TabsTrigger value="documentos">Documentos</TabsTrigger>
          <TabsTrigger value="financeiro">Financeiro</TabsTrigger>
          <TabsTrigger value="partes">Partes</TabsTrigger>
          <TabsTrigger value="historico">Histórico</TabsTrigger>
        </TabsList>

        <TabsContent value="prazos">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Prazos Processuais
              </CardTitle>
              <CardDescription>Acompanhe todos os prazos e datas importantes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {deadlines.map((deadline) => (
                  <div key={deadline.id} className="border-l-4 border-primary p-4 bg-secondary/30 rounded-r-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-foreground">{deadline.title}</h4>
                        <p className="text-sm text-muted-foreground">{deadline.description}</p>
                      </div>
                      <Badge
                        variant={
                          deadline.status === "urgent"
                            ? "destructive"
                            : deadline.status === "scheduled"
                              ? "default"
                              : "secondary"
                        }
                      >
                        {deadline.status === "urgent"
                          ? "Urgente"
                          : deadline.status === "scheduled"
                            ? "Agendado"
                            : "Pendente"}
                      </Badge>
                    </div>
                    <p className="text-sm font-medium text-foreground flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {deadline.date}
                    </p>
                  </div>
                ))}
                <Button variant="outline" className="w-full bg-transparent">
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Prazo
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documentos">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Documentos do Processo
              </CardTitle>
              <CardDescription>Todos os documentos relacionados ao caso</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{doc.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {doc.date} • {doc.size}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="bg-transparent">
                        Visualizar
                      </Button>
                      <Button size="sm" variant="outline" className="bg-transparent">
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full bg-transparent">
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Documento
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financeiro">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Controle Financeiro
              </CardTitle>
              <CardDescription>Honorários e despesas do processo</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {financial.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium text-foreground">{item.description}</p>
                      <p className="text-sm text-muted-foreground">{item.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-foreground">
                        {item.value > 0 ? `R$ ${item.value.toLocaleString("pt-BR")}` : "A definir"}
                      </p>
                      <Badge variant={item.status === "paid" ? "default" : "secondary"}>
                        {item.status === "paid" ? "Pago" : "Pendente"}
                      </Badge>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full bg-transparent">
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Item Financeiro
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="partes">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Partes do Processo
              </CardTitle>
              <CardDescription>Todas as partes envolvidas no processo</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {parties.map((party) => (
                  <div key={party.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Users className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{party.name}</p>
                        <p className="text-sm text-muted-foreground">{party.role}</p>
                      </div>
                    </div>
                    <Badge variant={party.type === "cliente" ? "default" : "outline"}>
                      {party.type === "cliente" ? "Cliente" : "Parte"}
                    </Badge>
                  </div>
                ))}
                <Button variant="outline" className="w-full bg-transparent">
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Parte
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="historico">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Atividades</CardTitle>
              <CardDescription>Todas as ações realizadas neste processo</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {history.map((item, index) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="h-3 w-3 rounded-full bg-primary" />
                      {index < history.length - 1 && <div className="w-px flex-1 bg-border mt-1" />}
                    </div>
                    <div className="flex-1 pb-4">
                      <p className="font-medium text-foreground">{item.event}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.date} • por {item.user}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
