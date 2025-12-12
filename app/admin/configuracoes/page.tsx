"use client"

import { Settings, Users, Building, MessageSquare, DollarSign, Plus } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"

export default function ConfiguracoesPage() {
  const { toast } = useToast()

  const lawyers = [
    { id: 1, name: "Dr. João Silva", oab: "OAB/SP 123.456", email: "joao@escritorio.com", status: "ativo" },
    { id: 2, name: "Dra. Maria Santos", oab: "OAB/SP 234.567", email: "maria@escritorio.com", status: "ativo" },
    { id: 3, name: "Dr. Pedro Costa", oab: "OAB/SP 345.678", email: "pedro@escritorio.com", status: "ativo" },
  ]

  const handleSave = () => {
    toast({
      title: "Configurações salvas",
      description: "As alterações foram salvas com sucesso.",
    })
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-balance flex items-center gap-3">
          <Settings className="h-8 w-8 text-primary" />
          Configurações
        </h1>
        <p className="text-muted-foreground text-pretty">Gerencie as configurações do sistema e do escritório</p>
      </div>

      <Tabs defaultValue="advogados" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="advogados">Advogados</TabsTrigger>
          <TabsTrigger value="escritorio">Escritório</TabsTrigger>
          <TabsTrigger value="marketing">Marketing</TabsTrigger>
        </TabsList>

        <TabsContent value="advogados">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Gestão de Advogados
                  </CardTitle>
                  <CardDescription>Adicione, edite ou remova advogados do sistema</CardDescription>
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Advogado
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {lawyers.map((lawyer) => (
                <div key={lawyer.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-lg text-foreground">{lawyer.name}</h3>
                      <p className="text-sm text-muted-foreground">{lawyer.oab}</p>
                      <p className="text-sm text-muted-foreground">{lawyer.email}</p>
                    </div>
                    <Badge variant="default">Ativo</Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="bg-transparent">
                      Editar Dados
                    </Button>
                    <Button size="sm" variant="outline" className="bg-transparent">
                      Redefinir Senha
                    </Button>
                    <Button size="sm" variant="outline" className="bg-transparent text-destructive">
                      Desativar
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Adicionar Novo Advogado</CardTitle>
              <CardDescription>Preencha os dados para cadastrar um novo advogado</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome Completo</Label>
                    <Input id="name" placeholder="Dr. Nome Sobrenome" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="oab">Número OAB</Label>
                    <Input id="oab" placeholder="OAB/UF 000.000" />
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail</Label>
                    <Input id="email" type="email" placeholder="advogado@escritorio.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone</Label>
                    <Input id="phone" placeholder="(00) 00000-0000" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Senha de Acesso</Label>
                  <Input id="password" type="password" placeholder="Criar senha de acesso" />
                </div>
                <Button type="button" onClick={handleSave}>
                  Cadastrar Advogado
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="escritorio">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Configurações do Escritório
              </CardTitle>
              <CardDescription>Configure informações gerais do escritório</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="watermark">Marca D'água (Documentos)</Label>
                  <Input id="watermark" placeholder="Nome do Escritório ou Slogan" />
                  <p className="text-xs text-muted-foreground">Será exibida em documentos gerados pelo sistema</p>
                </div>

                <div className="space-y-2">
                  <Label>Horários de Funcionamento</Label>
                  <div className="grid gap-3 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="openTime" className="text-sm">
                        Abertura
                      </Label>
                      <Input id="openTime" type="time" defaultValue="08:00" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="closeTime" className="text-sm">
                        Fechamento
                      </Label>
                      <Input id="closeTime" type="time" defaultValue="18:00" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cashierUser">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4" />
                      Usuário Responsável pelo Caixa
                    </div>
                  </Label>
                  <Select defaultValue="admin">
                    <SelectTrigger id="cashierUser">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin Principal</SelectItem>
                      <SelectItem value="admin2">Admin Financeiro</SelectItem>
                      <SelectItem value="recepcao">Recepção</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Este usuário será exibido como responsável nas telas de controle financeiro
                  </p>
                </div>

                <Button type="button" onClick={handleSave}>
                  Salvar Configurações
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="marketing">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Mensagens de Marketing
              </CardTitle>
              <CardDescription>Gerencie os textos prontos para comunicação com clientes</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="payment">Lembrete de Pagamento</Label>
                    <Textarea
                      id="payment"
                      className="min-h-24"
                      defaultValue="Olá! Este é um lembrete sobre o vencimento do pagamento do seu processo. Entre em contato para mais informações."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="status">Atualização de Status</Label>
                    <Textarea
                      id="status"
                      className="min-h-24"
                      defaultValue="Seu processo teve atualização recente. Entre em contato com nosso escritório para mais detalhes sobre o andamento."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cancel">Aviso de Cancelamento</Label>
                    <Textarea
                      id="cancel"
                      className="min-h-24"
                      defaultValue="Informamos que sua consulta agendada foi cancelada. Por favor, entre em contato para reagendar."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="birthday">Mensagem de Aniversário</Label>
                    <Textarea
                      id="birthday"
                      className="min-h-24"
                      defaultValue="Parabéns pelo seu aniversário! O escritório [Nome] deseja um dia maravilhoso e um ano repleto de realizações!"
                    />
                  </div>
                </div>

                <Button type="button" onClick={handleSave}>
                  Salvar Mensagens
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
