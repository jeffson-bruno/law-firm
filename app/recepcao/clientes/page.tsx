import { Search, Phone, Mail } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { AddClientDialog } from "@/components/recepcao/add-client-dialog"

export default function ClientesPage() {
  const clients = [
    {
      id: 1,
      name: "Maria Silva",
      cpf: "123.456.789-00",
      phone: "(11) 98888-8888",
      email: "maria@email.com",
      caseType: "Trabalhista",
      status: "active",
    },
    {
      id: 2,
      name: "João Santos",
      cpf: "234.567.890-11",
      phone: "(11) 97777-7777",
      email: "joao@email.com",
      caseType: "Civil",
      status: "active",
    },
    {
      id: 3,
      name: "Ana Costa",
      cpf: "345.678.901-22",
      phone: "(11) 96666-6666",
      email: "ana@email.com",
      caseType: "Família",
      status: "pending",
    },
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance">Clientes</h1>
          <p className="text-muted-foreground text-pretty">Gerencie o cadastro de clientes</p>
        </div>
        <AddClientDialog />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Buscar Clientes</CardTitle>
          <CardDescription>Encontre clientes por nome, CPF ou telefone</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input placeholder="Digite nome, CPF ou telefone..." className="flex-1" />
            <Button>
              <Search className="h-4 w-4 mr-2" />
              Buscar
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Clientes</CardTitle>
          <CardDescription>{clients.length} clientes cadastrados</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {clients.map((client) => (
              <div key={client.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-lg text-foreground">{client.name}</h3>
                    <p className="text-sm text-muted-foreground">{client.cpf}</p>
                  </div>
                  <Badge variant={client.status === "active" ? "default" : "secondary"}>
                    {client.status === "active" ? "Ativo" : "Pendente"}
                  </Badge>
                </div>
                <div className="grid gap-2 md:grid-cols-3 mb-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{client.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{client.email}</span>
                  </div>
                  <Badge variant="outline">{client.caseType}</Badge>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                    Ver Detalhes
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                    Editar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
