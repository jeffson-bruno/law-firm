"use client"

import { useState } from "react"
import { BarChart3, FileText, Printer, Download } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function RelatoriosPage() {
  const [period, setPeriod] = useState("mensal")

  const financialData = {
    receitas: 45200,
    despesas: 18500,
    lucro: 26700,
    honorarios: 38000,
    custas: 3200,
  }

  const processData = {
    total: 47,
    novos: 8,
    concluidos: 5,
    ativos: 34,
    trabalhista: 15,
    civil: 12,
    familia: 8,
    outros: 12,
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-balance flex items-center gap-3">
          <BarChart3 className="h-8 w-8 text-primary" />
          Relatórios
        </h1>
        <p className="text-muted-foreground text-pretty">Análises e relatórios gerenciais do escritório</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Configuração de Período</CardTitle>
              <CardDescription>Selecione o período para os relatórios</CardDescription>
            </div>
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="semanal">Semanal</SelectItem>
                <SelectItem value="mensal">Mensal</SelectItem>
                <SelectItem value="anual">Anual</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="financeiro" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="financeiro">Relatórios Financeiros</TabsTrigger>
          <TabsTrigger value="processos">Relatórios de Processos</TabsTrigger>
        </TabsList>

        <TabsContent value="financeiro">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Relatório Financeiro -{" "}
                {period === "mensal" ? "Dezembro 2024" : period === "semanal" ? "Semana 50" : "2024"}
              </CardTitle>
              <CardDescription>Resumo das movimentações financeiras do período</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="bg-success/10 border border-success/20 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">Total de Receitas</p>
                  <p className="text-3xl font-bold text-success">
                    {financialData.receitas.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                  </p>
                </div>
                <div className="bg-destructive/10 border border-destructive/20 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">Total de Despesas</p>
                  <p className="text-3xl font-bold text-destructive">
                    {financialData.despesas.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                  </p>
                </div>
                <div className="bg-primary/10 border-2 border-primary p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">Lucro Líquido</p>
                  <p className="text-3xl font-bold text-primary">
                    {financialData.lucro.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-lg text-foreground">Detalhamento por Categoria</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                    <span className="text-foreground">Honorários Advocatícios</span>
                    <span className="font-bold text-foreground">
                      {financialData.honorarios.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                    <span className="text-foreground">Custas Processuais</span>
                    <span className="font-bold text-foreground">
                      {financialData.custas.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                    <span className="text-foreground">Serviços de Consultoria</span>
                    <span className="font-bold text-foreground">
                      {(financialData.receitas - financialData.honorarios - financialData.custas).toLocaleString(
                        "pt-BR",
                        { style: "currency", currency: "BRL" },
                      )}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button className="flex-1" onClick={() => window.print()}>
                  <Printer className="h-4 w-4 mr-2" />
                  Imprimir Relatório
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent">
                  <Download className="h-4 w-4 mr-2" />
                  Exportar PDF
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="processos">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Relatório de Processos -{" "}
                {period === "mensal" ? "Dezembro 2024" : period === "semanal" ? "Semana 50" : "2024"}
              </CardTitle>
              <CardDescription>Estatísticas e análise dos processos do período</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-4">
                <div className="bg-primary/10 border border-primary/20 p-4 rounded-lg text-center">
                  <p className="text-sm text-muted-foreground mb-2">Total de Processos</p>
                  <p className="text-4xl font-bold text-primary">{processData.total}</p>
                </div>
                <div className="bg-accent/10 border border-accent/20 p-4 rounded-lg text-center">
                  <p className="text-sm text-muted-foreground mb-2">Novos</p>
                  <p className="text-4xl font-bold text-accent">{processData.novos}</p>
                </div>
                <div className="bg-success/10 border border-success/20 p-4 rounded-lg text-center">
                  <p className="text-sm text-muted-foreground mb-2">Concluídos</p>
                  <p className="text-4xl font-bold text-success">{processData.concluidos}</p>
                </div>
                <div className="bg-secondary p-4 rounded-lg text-center">
                  <p className="text-sm text-muted-foreground mb-2">Em Andamento</p>
                  <p className="text-4xl font-bold text-foreground">{processData.ativos}</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-lg text-foreground">Processos por Área</h3>
                <div className="space-y-3">
                  {[
                    { name: "Trabalhista", value: processData.trabalhista, color: "primary" },
                    { name: "Civil", value: processData.civil, color: "accent" },
                    { name: "Família", value: processData.familia, color: "success" },
                    { name: "Outros", value: processData.outros, color: "secondary" },
                  ].map((area) => (
                    <div key={area.name} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-foreground">{area.name}</span>
                        <span className="font-bold text-foreground">{area.value} processos</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-${area.color}`}
                          style={{ width: `${(area.value / processData.total) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <Button className="flex-1" onClick={() => window.print()}>
                  <Printer className="h-4 w-4 mr-2" />
                  Imprimir Relatório
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent">
                  <Download className="h-4 w-4 mr-2" />
                  Exportar PDF
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
