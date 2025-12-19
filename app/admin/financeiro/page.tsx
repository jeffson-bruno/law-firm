"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  DollarSign,
  Plus,
  TrendingUp,
  TrendingDown,
  Calendar,
  Send,
  ArrowUpRight,
  ArrowDownRight,
  Settings,
} from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/hooks/use-auth"

type Role = "admin" | "advogado" | "recepcao"

export default function FinanceiroPage() {
  const router = useRouter()
  const { toast } = useToast()

  const [selectedMonth, setSelectedMonth] = useState("12/2024")
  const [role, setRole] = useState<Role | null>(null)

  const { flags, loading } = useAuth()

  useEffect(() => {
    // role vem do seu login-form (localStorage.setItem("userRole", role))
    const stored = (typeof window !== "undefined" && localStorage.getItem("userRole")) as Role | null
    setRole(stored)
  }, [])

  const basePath = useMemo(() => {
    if (role === "admin") return "/admin"
    if (role === "advogado") return "/advogado"
    if (role === "recepcao") return "/recepcao"
    return "/"
  }, [role])

  // 🔒 Se não tiver permissão pro financeiro, sai da página
  useEffect(() => {
    if (loading) return
    if (!flags?.show_finance) {
      // manda pra home do perfil (ex: /advogado)
      router.replace(basePath)
    }
  }, [loading, flags?.show_finance, router, basePath])

  // enquanto carrega auth/flags, evita “piscar” conteúdo
  if (loading) return null

  // se não tem finance, o effect acima redireciona
  if (!flags?.show_finance) return null

  const cashFlow = [
    {
      id: 1,
      type: "entrada",
      description: "Honorários - Processo 1234/2024",
      value: 5000,
      date: "15/12/2024",
      category: "Honorários",
    },
    {
      id: 2,
      type: "saida",
      description: "Aluguel do escritório",
      value: 3500,
      date: "10/12/2024",
      category: "Despesas Fixas",
    },
    {
      id: 3,
      type: "entrada",
      description: "Consultoria jurídica",
      value: 2000,
      date: "08/12/2024",
      category: "Serviços",
    },
    { id: 4, type: "saida", description: "Energia elétrica", value: 450, date: "05/12/2024", category: "Utilidades" },
  ]

  const clientPayments = [
    {
      id: 1,
      client: "Maria Silva",
      process: "1234/2024",
      value: 5000,
      paid: 5000,
      status: "paid",
      dueDate: "15/12/2024",
    },
    {
      id: 2,
      client: "João Santos",
      process: "5678/2024",
      value: 8000,
      paid: 4000,
      status: "partial",
      dueDate: "20/12/2024",
    },
    {
      id: 3,
      client: "Ana Costa",
      process: "9012/2024",
      value: 3000,
      paid: 0,
      status: "pending",
      dueDate: "22/12/2024",
    },
  ]

  const handleAddTransaction = () => {
    toast({
      title: "Transação adicionada",
      description: "A transação foi registrada no caixa.",
    })
  }

  const canSeeMarketingActions = !!flags?.show_marketing && role === "recepcao"

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance">Controle Financeiro</h1>
          <p className="text-muted-foreground text-pretty">Gestão completa das finanças do escritório</p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Nova Transação
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar Transação</DialogTitle>
              <DialogDescription>Registre uma nova entrada ou saída no caixa</DialogDescription>
            </DialogHeader>

            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault()
                handleAddTransaction()
              }}
            >
              <div className="space-y-2">
                <Label htmlFor="type">Tipo</Label>
                <Select required>
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="entrada">Entrada</SelectItem>
                    <SelectItem value="saida">Saída</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Input id="description" placeholder="Descrição da transação" required />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="value">Valor (R$)</Label>
                  <Input id="value" type="number" step="0.01" placeholder="0,00" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Data</Label>
                  <Input id="date" type="date" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Categoria</Label>
                <Select required>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Selecione a categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="honorarios">Honorários</SelectItem>
                    <SelectItem value="servicos">Serviços</SelectItem>
                    <SelectItem value="despesas">Despesas Fixas</SelectItem>
                    <SelectItem value="utilidades">Utilidades</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end gap-3">
                <Button type="button" variant="outline">
                  Cancelar
                </Button>
                <Button type="submit">Adicionar</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Usuário Responsável pelo Caixa</p>
              <p className="text-xl font-bold text-primary">Admin Principal</p>
              <p className="text-xs text-muted-foreground mt-1">Definido nas configurações do sistema</p>
            </div>

            {/* 🔐 Só admin pode ir em configurações */}
            {role === "admin" ? (
              <Link href="/admin/configuracoes">
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  Alterar
                </Button>
              </Link>
            ) : (
              <Button variant="outline" size="sm" disabled title="Apenas admin pode alterar isso.">
                <Settings className="h-4 w-4 mr-2" />
                Alterar
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-success/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2 text-muted-foreground">
              <ArrowUpRight className="h-4 w-4 text-success" />
              Total de Entradas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-success">R$ 45.200</p>
            <p className="text-xs text-muted-foreground mt-1">Este mês</p>
          </CardContent>
        </Card>

        <Card className="border-destructive/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2 text-muted-foreground">
              <ArrowDownRight className="h-4 w-4 text-destructive" />
              Total de Saídas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-destructive">R$ 18.500</p>
            <p className="text-xs text-muted-foreground mt-1">Este mês</p>
          </CardContent>
        </Card>

        <Card className="border-primary border-2">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2 text-muted-foreground">
              <DollarSign className="h-4 w-4 text-primary" />
              Saldo do Período
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-primary">R$ 26.700</p>
            <p className="text-xs text-success mt-1 font-medium">↑ 15% vs mês anterior</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="caixa" className="space-y-6">
        <TabsList>
          <TabsTrigger value="caixa">Fluxo de Caixa</TabsTrigger>
          <TabsTrigger value="pagamentos">Pagamentos de Clientes</TabsTrigger>
        </TabsList>

        <TabsContent value="caixa">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Movimentações do Caixa</CardTitle>
                  <CardDescription>Todas as entradas e saídas registradas</CardDescription>
                </div>
                <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="12/2024">Dez/2024</SelectItem>
                    <SelectItem value="11/2024">Nov/2024</SelectItem>
                    <SelectItem value="10/2024">Out/2024</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>

            <CardContent>
              <div className="space-y-3">
                {cashFlow.map((item) => (
                  <div
                    key={item.id}
                    className={`flex items-center justify-between p-4 border-l-4 rounded-r-lg ${
                      item.type === "entrada" ? "border-success bg-success/5" : "border-destructive bg-destructive/5"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-12 w-12 rounded-lg flex items-center justify-center ${
                          item.type === "entrada" ? "bg-success/20" : "bg-destructive/20"
                        }`}
                      >
                        {item.type === "entrada" ? (
                          <TrendingUp className="h-6 w-6 text-success" />
                        ) : (
                          <TrendingDown className="h-6 w-6 text-destructive" />
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{item.description}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {item.category}
                          </Badge>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {item.date}
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className={`text-xl font-bold ${item.type === "entrada" ? "text-success" : "text-destructive"}`}>
                      {item.type === "entrada" ? "+" : "-"}R$ {item.value.toLocaleString("pt-BR")}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pagamentos">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Controle de Pagamentos</CardTitle>
                  <CardDescription>Pagamentos pendentes e realizados por clientes</CardDescription>
                </div>

                {/* ✅ Só quem tem marketing (recepção) vê ações de cobrança */}
                {canSeeMarketingActions ? (
                  <Link href="/recepcao/marketing">
                    <Button variant="outline" size="sm">
                      <Send className="h-4 w-4 mr-2" />
                      Enviar Cobrança
                    </Button>
                  </Link>
                ) : null}
              </div>
            </CardHeader>

            <CardContent>
              <div className="space-y-4">
                {clientPayments.map((payment) => (
                  <div key={payment.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-semibold text-lg text-foreground">{payment.client}</p>
                        <p className="text-sm text-muted-foreground">Processo: {payment.process}</p>
                      </div>
                      <Badge
                        variant={
                          payment.status === "paid" ? "default" : payment.status === "partial" ? "secondary" : "outline"
                        }
                      >
                        {payment.status === "paid" ? "Pago" : payment.status === "partial" ? "Parcial" : "Pendente"}
                      </Badge>
                    </div>

                    <div className="grid gap-3 md:grid-cols-3 mb-3">
                      <div className="bg-secondary/50 p-3 rounded">
                        <p className="text-xs text-muted-foreground mb-1">Valor Total</p>
                        <p className="text-lg font-bold text-foreground">R$ {payment.value.toLocaleString("pt-BR")}</p>
                      </div>
                      <div className="bg-secondary/50 p-3 rounded">
                        <p className="text-xs text-muted-foreground mb-1">Valor Pago</p>
                        <p className="text-lg font-bold text-success">R$ {payment.paid.toLocaleString("pt-BR")}</p>
                      </div>
                      <div className="bg-secondary/50 p-3 rounded">
                        <p className="text-xs text-muted-foreground mb-1">Vencimento</p>
                        <p className="text-lg font-bold text-foreground">{payment.dueDate}</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                        Registrar Pagamento
                      </Button>

                      {canSeeMarketingActions ? (
                        <Link href="/recepcao/marketing" className="flex-1">
                          <Button size="sm" variant="outline" className="w-full bg-transparent">
                            Enviar Lembrete
                          </Button>
                        </Link>
                      ) : null}
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
