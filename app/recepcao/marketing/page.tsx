"use client"
import { Send, Search, Cake, MessageSquare } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

export default function MarketingPage() {
  const { toast } = useToast()

  const birthdayClients = [
    { id: 1, name: "Maria Silva", birthday: "15/12", phone: "(11) 98888-8888" },
    { id: 2, name: "João Santos", birthday: "22/12", phone: "(11) 97777-7777" },
    { id: 3, name: "Ana Costa", birthday: "28/12", phone: "(11) 96666-6666" },
  ]

  const templates = [
    {
      id: 1,
      title: "Lembrete de Pagamento",
      message:
        "Olá! Este é um lembrete sobre o vencimento do pagamento do seu processo. Entre em contato para mais informações.",
    },
    {
      id: 2,
      title: "Status Processual",
      message:
        "Seu processo teve atualização recente. Entre em contato com nosso escritório para mais detalhes sobre o andamento.",
    },
    {
      id: 3,
      title: "Aviso de Cancelamento",
      message: "Informamos que sua consulta agendada foi cancelada. Por favor, entre em contato para reagendar.",
    },
    {
      id: 4,
      title: "Parabéns - Aniversário",
      message:
        "Parabéns pelo seu aniversário! O escritório [Nome] deseja um dia maravilhoso e um ano repleto de realizações!",
    },
  ]

  const handleSendMessage = (clientName: string, phone: string, message: string) => {
    toast({
      title: "Mensagem enviada",
      description: `Mensagem enviada para ${clientName} via WhatsApp`,
    })
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-balance">Comunicação e Marketing</h1>
        <p className="text-muted-foreground text-pretty">Gerencie comunicações com clientes</p>
      </div>

      <Tabs defaultValue="clientes" className="space-y-6">
        <TabsList>
          <TabsTrigger value="clientes">Lista de Clientes</TabsTrigger>
          <TabsTrigger value="templates">Mensagens Prontas</TabsTrigger>
        </TabsList>

        <TabsContent value="clientes" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Cake className="h-5 w-5 text-primary" />
                    Aniversariantes do Mês
                  </CardTitle>
                  <CardDescription>Clientes fazendo aniversário em dezembro</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <Search className="h-4 w-4 mr-2" />
                  Filtrar
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {birthdayClients.map((client) => (
                  <div key={client.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                    <div>
                      <p className="font-medium text-foreground">{client.name}</p>
                      <p className="text-sm text-muted-foreground">{client.phone}</p>
                      <Badge variant="secondary" className="mt-1">
                        {client.birthday}
                      </Badge>
                    </div>
                    <Button
                      size="sm"
                      onClick={() =>
                        handleSendMessage(
                          client.name,
                          client.phone,
                          templates.find((t) => t.title === "Parabéns - Aniversário")?.message || "",
                        )
                      }
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Enviar Parabéns
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Buscar Clientes</CardTitle>
              <CardDescription>Encontre clientes para enviar mensagens personalizadas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input placeholder="Buscar por nome, CPF ou telefone..." className="flex-1" />
                  <Button>
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            {templates.map((template) => (
              <Card key={template.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    {template.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{template.message}</p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      Editar
                    </Button>
                    <Button size="sm" className="flex-1">
                      <Send className="h-4 w-4 mr-2" />
                      Usar Template
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Criar Novo Template</CardTitle>
              <CardDescription>Adicione uma nova mensagem padrão para uso frequente</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="templateTitle">Título do Template</Label>
                  <Input id="templateTitle" placeholder="Ex: Confirmação de Consulta" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="templateMessage">Mensagem</Label>
                  <Textarea
                    id="templateMessage"
                    placeholder="Digite a mensagem que será enviada..."
                    className="min-h-32"
                  />
                </div>
                <Button type="submit">Salvar Template</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
