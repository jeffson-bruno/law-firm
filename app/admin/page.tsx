import { DollarSign, FileText, TrendingUp, Users, UserPlus, BarChart3 } from "lucide-react"
import { StatCard } from "@/components/shared/stat-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AdminDashboard() {
  const quickActions = [
    { title: "Gerenciar Processos", icon: FileText, href: "/admin/processos", color: "text-primary" },
    { title: "Cadastrar Cliente", icon: UserPlus, href: "#", color: "text-accent" },
    { title: "Gerar Relatório", icon: BarChart3, href: "/admin/relatorios", color: "text-success" },
    { title: "Controle Financeiro", icon: DollarSign, href: "/admin/financeiro", color: "text-warning" },
  ]

  const recentActivity = [
    { id: 1, action: "Novo processo cadastrado", user: "Dr. Silva", time: "Há 1 hora" },
    { id: 2, action: "Pagamento recebido - R$ 5.000", user: "Sistema", time: "Há 2 horas" },
    { id: 3, action: "Relatório mensal gerado", user: "Admin", time: "Há 4 horas" },
    { id: 4, action: "Novo advogado cadastrado", user: "Admin", time: "Ontem" },
  ]

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-balance">Dashboard - Administrador</h1>
        <p className="text-muted-foreground text-pretty">Visão estratégica e controle completo do escritório</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Receita Mensal"
          value="R$ 45.200"
          icon={DollarSign}
          trend={{ value: "15% vs mês anterior", positive: true }}
        />
        <StatCard title="A Receber (Próximo Mês)" value="R$ 38.500" icon={TrendingUp} description="12 faturas" />
        <StatCard
          title="Processos Ativos"
          value={47}
          icon={FileText}
          trend={{ value: "8 novos este mês", positive: true }}
        />
        <StatCard title="Total de Clientes" value={156} icon={Users} description="23 novos este ano" />
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
                  <p className="text-2xl font-bold text-success">R$ 45.200</p>
                </div>
                <TrendingUp className="h-8 w-8 text-success" />
              </div>
              <div className="flex items-center justify-between p-3 bg-destructive/10 rounded-lg">
                <div>
                  <p className="text-sm text-muted-foreground">Despesas do Mês</p>
                  <p className="text-2xl font-bold text-destructive">R$ 18.500</p>
                </div>
                <TrendingUp className="h-8 w-8 text-destructive rotate-180" />
              </div>
              <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg border-2 border-primary">
                <div>
                  <p className="text-sm text-muted-foreground">Saldo Líquido</p>
                  <p className="text-2xl font-bold text-primary">R$ 26.700</p>
                </div>
                <DollarSign className="h-8 w-8 text-primary" />
              </div>
              <Link href="/admin/financeiro">
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
