"use client"

import { useState } from "react"
import { Calculator, TrendingUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function CalculosPage() {
  const [resultado, setResultado] = useState<number | null>(null)

  const calcularTrabalhista = (salario: number, meses: number, tipo: string) => {
    let valor = 0
    if (tipo === "rescisao") {
      valor = salario * meses + salario / 3 // Simplificado
    } else if (tipo === "ferias") {
      valor = salario + salario / 3
    }
    setResultado(valor)
  }

  const calcularCivil = (valorCausa: number, juros: number, meses: number) => {
    const taxaJuros = juros / 100 / 12
    const valorFinal = valorCausa * Math.pow(1 + taxaJuros, meses)
    setResultado(valorFinal)
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-balance flex items-center gap-3">
          <Calculator className="h-8 w-8 text-primary" />
          Cálculos Judiciais
        </h1>
        <p className="text-muted-foreground text-pretty">Simulações de cálculos processuais</p>
      </div>

      <Tabs defaultValue="trabalhista" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="trabalhista">Trabalhista</TabsTrigger>
          <TabsTrigger value="civil">Civil</TabsTrigger>
        </TabsList>

        <TabsContent value="trabalhista">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Cálculo Trabalhista</CardTitle>
                <CardDescription>Calcule verbas rescisórias e trabalhistas</CardDescription>
              </CardHeader>
              <CardContent>
                <form
                  className="space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault()
                    const formData = new FormData(e.currentTarget)
                    const salario = Number.parseFloat(formData.get("salario") as string)
                    const meses = Number.parseFloat(formData.get("meses") as string)
                    const tipo = formData.get("tipo") as string
                    calcularTrabalhista(salario, meses, tipo)
                  }}
                >
                  <div className="space-y-2">
                    <Label htmlFor="tipo">Tipo de Cálculo</Label>
                    <Select name="tipo" defaultValue="rescisao">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="rescisao">Verbas Rescisórias</SelectItem>
                        <SelectItem value="ferias">Férias + 1/3</SelectItem>
                        <SelectItem value="13">13º Salário</SelectItem>
                        <SelectItem value="fgts">FGTS</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="salario">Salário Base (R$)</Label>
                    <Input id="salario" name="salario" type="number" step="0.01" placeholder="0,00" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="meses">Meses Trabalhados</Label>
                    <Input id="meses" name="meses" type="number" placeholder="0" required />
                  </div>

                  <Button type="submit" className="w-full">
                    <Calculator className="h-4 w-4 mr-2" />
                    Calcular
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Resultado
                </CardTitle>
                <CardDescription>Valor calculado baseado nos dados informados</CardDescription>
              </CardHeader>
              <CardContent>
                {resultado !== null ? (
                  <div className="space-y-4">
                    <div className="text-center p-6 bg-background rounded-lg border-2 border-primary">
                      <p className="text-sm text-muted-foreground mb-2">Valor Total</p>
                      <p className="text-4xl font-bold text-primary">
                        {resultado.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                      </p>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between p-2 bg-secondary/50 rounded">
                        <span className="text-muted-foreground">Valor Base</span>
                        <span className="font-medium text-foreground">
                          {(resultado * 0.7).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                        </span>
                      </div>
                      <div className="flex justify-between p-2 bg-secondary/50 rounded">
                        <span className="text-muted-foreground">Acréscimos</span>
                        <span className="font-medium text-foreground">
                          {(resultado * 0.3).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <Calculator className="h-12 w-12 mx-auto mb-3 opacity-20" />
                    <p>Preencha os campos e clique em calcular para ver o resultado</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="civil">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Cálculo Civil</CardTitle>
                <CardDescription>Calcule juros e correções monetárias</CardDescription>
              </CardHeader>
              <CardContent>
                <form
                  className="space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault()
                    const formData = new FormData(e.currentTarget)
                    const valorCausa = Number.parseFloat(formData.get("valorCausa") as string)
                    const juros = Number.parseFloat(formData.get("juros") as string)
                    const meses = Number.parseFloat(formData.get("mesesCivil") as string)
                    calcularCivil(valorCausa, juros, meses)
                  }}
                >
                  <div className="space-y-2">
                    <Label htmlFor="valorCausa">Valor da Causa (R$)</Label>
                    <Input id="valorCausa" name="valorCausa" type="number" step="0.01" placeholder="0,00" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="juros">Taxa de Juros (% ao ano)</Label>
                    <Input id="juros" name="juros" type="number" step="0.01" placeholder="6,00" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mesesCivil">Período (meses)</Label>
                    <Input id="mesesCivil" name="mesesCivil" type="number" placeholder="12" required />
                  </div>

                  <Button type="submit" className="w-full">
                    <Calculator className="h-4 w-4 mr-2" />
                    Calcular
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Resultado
                </CardTitle>
                <CardDescription>Valor atualizado com juros e correção</CardDescription>
              </CardHeader>
              <CardContent>
                {resultado !== null ? (
                  <div className="space-y-4">
                    <div className="text-center p-6 bg-background rounded-lg border-2 border-primary">
                      <p className="text-sm text-muted-foreground mb-2">Valor Atualizado</p>
                      <p className="text-4xl font-bold text-primary">
                        {resultado.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <Calculator className="h-12 w-12 mx-auto mb-3 opacity-20" />
                    <p>Preencha os campos e clique em calcular para ver o resultado</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
