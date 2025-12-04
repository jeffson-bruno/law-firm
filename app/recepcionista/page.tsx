"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Users, Calendar, FolderOpen, Plus, User, FileText, CalendarDays, Clock } from "lucide-react"
import { ReceptionistSidebar } from "@/components/receptionist-sidebar"
import { ReceptionistHeader } from "@/components/receptionist-header"

export default function ReceptionistDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [showClientForm, setShowClientForm] = useState(false)

  const todayAppointments = [
    {
      id: 1,
      time: "09:00",
      client: "João Silva",
      type: "Consulta Inicial",
      lawyer: "Dr. Carlos Souza",
    },
    {
      id: 2,
      time: "11:00",
      client: "Maria Santos",
      type: "Acompanhamento",
      lawyer: "Dra. Ana Paula",
    },
    {
      id: 3,
      time: "14:00",
      client: "Pedro Costa",
      type: "Assinatura de Documentos",
      lawyer: "Dr. Roberto Lima",
    },
    {
      id: 4,
      time: "16:00",
      client: "Carla Oliveira",
      type: "Consulta Inicial",
      lawyer: "Dr. Carlos Souza",
    },
  ]

  const recentClients = [
    { id: 1, name: "João Silva", cpf: "123.456.789-00", caseType: "Trabalhista", status: "Ativo" },
    { id: 2, name: "Maria Santos", cpf: "987.654.321-00", caseType: "Cível", status: "Ativo" },
    { id: 3, name: "Pedro Costa", cpf: "456.789.123-00", caseType: "Criminal", status: "Em análise" },
  ]

  const caseProgress = [
    {
      id: "#1543",
      client: "João Silva",
      type: "Trabalhista",
      status: "Documentação pendente",
      statusColor: "bg-yellow-500",
    },
    {
      id: "#1542",
      client: "Maria Santos",
      type: "Cível",
      status: "Em andamento",
      statusColor: "bg-primary",
    },
    {
      id: "#1540",
      client: "Pedro Costa",
      type: "Criminal",
      status: "Aguardando advogado",
      statusColor: "bg-destructive",
    },
  ]

  return (
    <div className="flex min-h-screen bg-background">
      <ReceptionistSidebar open={sidebarOpen} />

      <div className="flex-1 flex flex-col">
        <ReceptionistHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        <main className="flex-1 p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-[20px] font-semibold text-foreground font-[family-name:var(--font-poppins)]">
                Recepção
              </h1>
              <p className="text-muted-foreground mt-1">Cadastro de clientes e agendamentos</p>
            </div>
            <Button
              onClick={() => setShowClientForm(!showClientForm)}
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold font-[family-name:var(--font-poppins)]"
            >
              <Plus className="w-4 h-4 mr-2" />
              Novo Cliente
            </Button>
          </div>

          {/* Client Registration Form */}
          {showClientForm && (
            <Card className="border-primary/50">
              <CardHeader>
                <CardTitle className="text-[18px] font-semibold flex items-center gap-2 font-[family-name:var(--font-poppins)]">
                  <User className="w-5 h-5" />
                  Cadastrar Novo Cliente
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="clientName" className="text-base">
                        Nome Completo
                      </Label>
                      <Input id="clientName" placeholder="Digite o nome completo" className="h-10" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="clientCPF" className="text-base">
                        CPF
                      </Label>
                      <Input id="clientCPF" placeholder="000.000.000-00" className="h-10" />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="clientEmail" className="text-base">
                        Email
                      </Label>
                      <Input id="clientEmail" type="email" placeholder="email@exemplo.com" className="h-10" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="clientPhone" className="text-base">
                        Telefone
                      </Label>
                      <Input id="clientPhone" placeholder="(00) 00000-0000" className="h-10" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="caseType" className="text-base">
                      Tipo de Caso
                    </Label>
                    <Input id="caseType" placeholder="Ex: Trabalhista, Cível, Criminal..." className="h-10" />
                  </div>

                  <div className="flex gap-3 pt-2">
                    <Button
                      type="submit"
                      className="bg-accent hover:bg-accent/90 font-[family-name:var(--font-poppins)]"
                    >
                      Salvar Cliente
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowClientForm(false)}
                      className="font-[family-name:var(--font-poppins)]"
                    >
                      Cancelar
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Today's Appointments */}
            <Card>
              <CardHeader>
                <CardTitle className="text-[18px] font-semibold flex items-center gap-2 font-[family-name:var(--font-poppins)]">
                  <CalendarDays className="w-5 h-5 text-primary" />
                  Agendamentos de Hoje
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {todayAppointments.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="p-3 border border-border rounded-lg hover:bg-secondary/50 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <Clock className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-semibold text-foreground">{appointment.client}</p>
                            <p className="text-sm text-muted-foreground">{appointment.type}</p>
                          </div>
                        </div>
                        <Badge variant="outline" className="font-semibold">
                          {appointment.time}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground ml-[60px]">Com: {appointment.lawyer}</p>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4 font-[family-name:var(--font-poppins)] bg-transparent">
                  <Calendar className="w-4 h-4 mr-2" />
                  Novo Agendamento
                </Button>
              </CardContent>
            </Card>

            {/* Recent Clients */}
            <Card>
              <CardHeader>
                <CardTitle className="text-[18px] font-semibold flex items-center gap-2 font-[family-name:var(--font-poppins)]">
                  <Users className="w-5 h-5 text-accent" />
                  Clientes Recentes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentClients.map((client) => (
                    <div
                      key={client.id}
                      className="p-3 border border-border rounded-lg hover:bg-secondary/50 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-1">
                        <div>
                          <p className="font-semibold text-foreground">{client.name}</p>
                          <p className="text-sm text-muted-foreground">CPF: {client.cpf}</p>
                        </div>
                        <Badge className="bg-accent text-accent-foreground">{client.status}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">Tipo: {client.caseType}</p>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4 font-[family-name:var(--font-poppins)] bg-transparent">
                  Ver Todos os Clientes
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Case Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="text-[18px] font-semibold flex items-center gap-2 font-[family-name:var(--font-poppins)]">
                <FolderOpen className="w-5 h-5 text-primary" />
                Progresso dos Casos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {caseProgress.map((caseItem) => (
                  <div
                    key={caseItem.id}
                    className="p-4 border border-border rounded-lg hover:shadow-sm transition-shadow"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <FileText className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-primary font-[family-name:var(--font-poppins)]">
                              {caseItem.id}
                            </span>
                            <Badge variant="outline" className="text-xs">
                              {caseItem.type}
                            </Badge>
                          </div>
                          <p className="text-sm text-foreground font-medium">{caseItem.client}</p>
                        </div>
                      </div>
                      <Badge className={`${caseItem.statusColor} text-white`}>{caseItem.status}</Badge>
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
