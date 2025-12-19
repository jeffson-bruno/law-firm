"use client"

import { useEffect, useMemo, useState } from "react"
import { DollarSign, FileText, TrendingUp, Users, UserPlus, BarChart3 } from "lucide-react"
import { StatCard } from "@/components/shared/stat-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { request } from "@/lib/api"

type ApiCard = { key: string; label: string; value: number }
type ApiQuickAction = { key: string; label: string; href: string }
type AdminDashboardResponse = {
  cards: ApiCard[]
  quickActions: ApiQuickAction[]
  me: { id: number; username: string; email: string | null; can_access_finance: boolean; role: string }
}

type UiQuickAction = {
  title: string
  icon: any
  href: string
  color: string
}

export default function AdminDashboard() {
  const [data, setData] = useState<AdminDashboardResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  // Formatação BRL
  const brl = (n: number) =>
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(Number(n ?? 0))

  useEffect(() => {
    ;(async () => {
      try {
        setLoading(true)
        setError(null)

        const res = await request<AdminDashboardResponse>("/api/admin/dashboard")
        setData(res)
      } catch (e: any) {
        setError(e?.message ?? "Erro ao carregar dashboard")
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  const quickActions = useMemo<UiQuickAction[]>(() => {
    const fixed: Record<string, UiQuickAction> = {
      novo_processo: { title: "Gerenciar Processos", icon: FileText, href: "/admin/processos", color: "text-primary" },
      novo_cliente: { title: "Cadastrar Clientes", icon: UserPlus, href: "/recepcao/clientes", color: "text-accent" },
      relatorios: { title: "Gerar Relatório", icon: BarChart3, href: "/admin/relatorios", color: "text-success" },
      financeiro: { title: "Controle Financeiro", icon: DollarSign, href: "/financeiro", color: "text-warning" },
    }

    // Se o backend mandar quickActions, a gente usa apenas para ajustar href/label (sem remover os 4 fixos)
    const backendByKey = new Map((data?.quickActions ?? []).map((a) => [a.key, a]))

    const merged: UiQuickAction[] = (Object.keys(fixed) as Array<keyof typeof fixed>).map((k) => {
      const b = backendByKey.get(k as string)
      const base = fixed[k]

      if (!b) return base

      // Ajustes opcionais vindos do back
      const href = b.href === "/admin/financeiro" ? "/financeiro" : b.href
      const title =
        k === "novo_cliente"
          ? "Cadastrar Clientes"
          : k === "novo_processo"
          ? "Gerenciar Processos"
          : k === "relatorios"
          ? "Gerar Relatório"
          : k === "financeiro"
          ? "Controle Financeiro"
          : b.label || base.title

      return { ...base, href, title }
    })

    // Respeita permissão financeira (mesmo admin tendo, mantém genérico)
    const canFinance = data?.me?.can_access_finance !== false
    return merged.filter((a) => (a.href.startsWith("/financeiro") ? canFinance : true))
  }, [data])

  const recentActivity = [
    { id: 1, action: "Novo processo cadastrado", user: "Dr. Silva", time: "Há 1 hora" },
    { id: 2, action: "Pagamento recebido - R$ 5.000", user: "Sistema", time: "Há 2 horas" },
    { id: 3, action: "Relatório mensal gerado", user: "Admin", time: "Há 4 horas" },
    { id: 4, action: "Novo advogado cadastrado", user: "Admin", time: "Ontem" },
  ]

  if (loading) return <div className="p-6">Carregando...</div>
  if (error) return <div className="p-6 text-red-500">{error}</div>

  const cardsMap = Object.fromEntries((data?.cards ?? []).map((c) => [c.key, c.value])) as Record<string, number>

  return (
    <div className="p-6 space-y-6">
      
      <div>
        {/*<h1 className="text-3xl font-bold text-balance">
          Bem-Vindo{data?.me?.username ? `, ${data.me.username}` : ""}
        </h1>*/}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Receita Mensal"
          value={brl(cardsMap.receitas_mes ?? 0)}
          icon={DollarSign}
          trend={{ value: "15% vs mês anterior", positive: true }}
        />
        <StatCard title="A Receber (Próximo Mês)" value="—" icon={TrendingUp} description="—" />
        <StatCard
          title="Processos Ativos"
          value={cardsMap.processos ?? 0}
          icon={FileText}
          trend={{ value: "—", positive: true }}
        />
        <StatCard title="Total de Clientes" value={cardsMap.clientes ?? 0} icon={Users} description="—" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Ações Rápidas</CardTitle>
          <CardDescription>Acesse rapidamente as principais funcionalidades</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {quickActions.map((action) => {
              const Icon = action.icon
              return (
                <Link key={action.title} href={action.href}>
                  <Card className="hover:shadow-lg transition-all cursor-pointer border-2 hover:border-primary/50">
                    <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                      <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                        <Icon className={`h-8 w-8 ${action.color}`} />
                      </div>
                      <p className="font-semibold text-foreground">{action.title}</p>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Resumo Financeiro</CardTitle>
            <CardDescription>Visão geral das finanças do escritório</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-success/10 rounded-lg">
                <div>
                  <p className="text-sm text-muted-foreground">Receitas do Mês</p>
                  <p className="text-2xl font-bold text-success">{brl(cardsMap.receitas_mes ?? 0)}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-success" />
              </div>
              <div className="flex items-center justify-between p-3 bg-destructive/10 rounded-lg">
                <div>
                  <p className="text-sm text-muted-foreground">Despesas do Mês</p>
                  <p className="text-2xl font-bold text-destructive">{brl(cardsMap.despesas_mes ?? 0)}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-destructive rotate-180" />
              </div>
              <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg border-2 border-primary">
                <div>
                  <p className="text-sm text-muted-foreground">Saldo Líquido</p>
                  <p className="text-2xl font-bold text-primary">{brl(cardsMap.saldo_mes ?? 0)}</p>
                </div>
                <DollarSign className="h-8 w-8 text-primary" />
              </div>

              <Link href="/financeiro">
                <Button variant="outline" className="w-full bg-transparent">
                  Ver Controle Financeiro Completo
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Atividade Recente</CardTitle>
            <CardDescription>Últimas ações no sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((item, index) => (
                <div key={item.id} className="flex gap-3 pb-3 border-b last:border-0">
                  <div className="flex flex-col items-center">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    {index < recentActivity.length - 1 && <div className="w-px flex-1 bg-border mt-1" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{item.action}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.user} • {item.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
