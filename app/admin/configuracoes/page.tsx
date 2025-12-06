"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { AdminSidebar } from "@/components/admin-sidebar"
import { AdminHeader } from "@/components/admin-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8001"

type CidadeAtuacao = {
  id: number
  nome: string
  estado?: string | null
  cep_padrao?: string | null
}

type TipoProcesso = {
  id: number
  nome: string
  descricao?: string | null
}

type PaginatedResponse<T> = {
  data: T[]
  current_page: number
  last_page: number
  total: number
}

export default function AdminConfiguracoesPage() {
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  // CIDADES
  const [cidades, setCidades] = useState<CidadeAtuacao[]>([])
  const [cidadeNome, setCidadeNome] = useState("")
  const [cidadeEstado, setCidadeEstado] = useState("")
  const [cidadeCepPadrao, setCidadeCepPadrao] = useState("")

  // TIPOS DE PROCESSO (Áreas)
  const [tiposProcesso, setTiposProcesso] = useState<TipoProcesso[]>([]) // <- SEMPRE array

  const [tipoNome, setTipoNome] = useState("")
  const [tipoDescricao, setTipoDescricao] = useState("")

  const getToken = () =>
    typeof window !== "undefined" ? localStorage.getItem("auth_token") : null

  const handleUnauthorized = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth_token")
      localStorage.removeItem("auth_user")
    }
    router.push("/")
  }

  // Buscar CIDADES
  const fetchCidades = async () => {
    try {
      const token = getToken()
      if (!token) return handleUnauthorized()

      const res = await fetch(`${API_URL}/api/cidades-atuacao`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      })

      if (res.status === 401) return handleUnauthorized()
      if (!res.ok) throw new Error("Erro ao carregar cidades de atuação.")

      const data: PaginatedResponse<CidadeAtuacao> = await res.json()
      setCidades(data.data || [])
    } catch (err: any) {
      console.error(err)
      setError(err.message || "Erro ao carregar cidades.")
    }
  }

  // Buscar TIPOS DE PROCESSO
  const fetchTiposProcesso = async () => {
    try {
      const token = getToken()
      if (!token) return handleUnauthorized()

      const res = await fetch(`${API_URL}/api/tipos-processos`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      })

      if (res.status === 401) return handleUnauthorized()
      if (!res.ok) throw new Error("Erro ao carregar tipos de processo.")

      const data: PaginatedResponse<TipoProcesso> = await res.json()
      setTiposProcesso(data.data || [])
    } catch (err: any) {
      console.error(err)
      setError(err.message || "Erro ao carregar tipos de processo.")
    }
  }

  useEffect(() => {
    setLoading(true)
    Promise.all([fetchCidades(), fetchTiposProcesso()])
      .catch(() => {
        // erros já tratados
      })
      .finally(() => setLoading(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Criar nova CIDADE
  const handleCreateCidade = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    try {
      const token = getToken()
      if (!token) return handleUnauthorized()

      const res = await fetch(`${API_URL}/api/cidades-atuacao`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          nome: cidadeNome,
          estado: cidadeEstado || null,
          cep_padrao: cidadeCepPadrao.replace(/\D/g, "") || null,
        }),
      })

      if (res.status === 401) return handleUnauthorized()
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.message || "Erro ao cadastrar cidade.")
      }

      setCidadeNome("")
      setCidadeEstado("")
      setCidadeCepPadrao("")

      await fetchCidades()
    } catch (err: any) {
      console.error(err)
      setError(err.message || "Erro ao cadastrar cidade.")
    }
  }

  // Criar novo TIPO DE PROCESSO
  const handleCreateTipoProcesso = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    try {
      const token = getToken()
      if (!token) return handleUnauthorized()

      const res = await fetch(`${API_URL}/api/tipos-processos`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          nome: tipoNome,
          descricao: tipoDescricao || null,
        }),
      })

      if (res.status === 401) return handleUnauthorized()
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.message || "Erro ao cadastrar tipo de processo.")
      }

      setTipoNome("")
      setTipoDescricao("")

      await fetchTiposProcesso()
    } catch (err: any) {
      console.error(err)
      setError(err.message || "Erro ao cadastrar tipo de processo.")
    }
  }

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar open={sidebarOpen} />

      <div className="flex-1 flex flex-col">
        <AdminHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        <main className="flex-1 p-6 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <h1 className="text-[24px] font-bold text-foreground font-[family-name:var(--font-poppins)]">
                Configurações do Escritório
              </h1>
              <p className="text-muted-foreground text-sm">
                Cadastre as cidades de atuação e as áreas/tipos de processo do escritório.
              </p>
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-md bg-red-50 text-red-700 text-sm border border-red-200">
              {error}
            </div>
          )}

          {loading && (
            <p className="text-sm text-muted-foreground">
              Carregando configurações...
            </p>
          )}

          <div className="grid gap-6 lg:grid-cols-2">
            {/* CIDADES DE ATUAÇÃO */}
            <Card>
              <CardHeader>
                <CardTitle className="text-[18px] font-medium font-[family-name:var(--font-poppins)]">
                  Cidades de Atuação
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <form onSubmit={handleCreateCidade} className="grid gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="cidadeNome">Nome da Cidade *</Label>
                    <Input
                      id="cidadeNome"
                      value={cidadeNome}
                      onChange={(e) => setCidadeNome(e.target.value)}
                      placeholder="Ex: São Paulo"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cidadeEstado">Estado (UF)</Label>
                    <Input
                      id="cidadeEstado"
                      value={cidadeEstado}
                      onChange={(e) => setCidadeEstado(e.target.value.toUpperCase())}
                      placeholder="Ex: SP"
                      maxLength={2}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cidadeCepPadrao">CEP padrão da cidade</Label>
                    <Input
                      id="cidadeCepPadrao"
                      value={cidadeCepPadrao}
                      onChange={(e) => {
                        const digits = e.target.value.replace(/\D/g, "").slice(0, 8)
                        setCidadeCepPadrao(digits)
                      }}
                      placeholder="Ex: 01001000"
                    />
                  </div>

                  <div className="flex justify-end">
                    <Button type="submit" className="font-[family-name:var(--font-poppins)]">
                      Salvar Cidade
                    </Button>
                  </div>
                </form>

                <div className="space-y-2">
                  <p className="text-sm font-semibold font-[family-name:var(--font-poppins)]">
                    Cidades cadastradas
                  </p>
                  {(!cidades || cidades.length === 0) ? (
                    <p className="text-xs text-muted-foreground">
                      Nenhuma cidade cadastrada ainda.
                    </p>
                  ) : (
                    <ul className="space-y-1 max-h-64 overflow-y-auto text-sm">
                      {cidades.map((cidade) => (
                        <li
                          key={cidade.id}
                          className="border rounded-md px-2 py-1 flex flex-col"
                        >
                          <span className="font-[family-name:var(--font-poppins)]">
                            {cidade.nome}
                            {cidade.estado && ` - ${cidade.estado}`}
                          </span>
                          {cidade.cep_padrao && (
                            <span className="text-xs text-muted-foreground">
                              CEP padrão: {cidade.cep_padrao}
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* TIPOS DE PROCESSO / ÁREAS */}
            <Card>
              <CardHeader>
                <CardTitle className="text-[18px] font-medium font-[family-name:var(--font-poppins)]">
                  Áreas / Tipos de Processo
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <form onSubmit={handleCreateTipoProcesso} className="grid gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="tipoNome">Nome *</Label>
                    <Input
                      id="tipoNome"
                      value={tipoNome}
                      onChange={(e) => setTipoNome(e.target.value.toUpperCase())}
                      placeholder="Ex: PREVIDENCIÁRIO, CIVIL, TRABALHISTA..."
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tipoDescricao">Descrição (opcional)</Label>
                    <Input
                      id="tipoDescricao"
                      value={tipoDescricao}
                      onChange={(e) => setTipoDescricao(e.target.value)}
                      placeholder="Ex: Benefícios do INSS, causas cíveis em geral..."
                    />
                  </div>

                  <div className="flex justify-end">
                    <Button type="submit" className="font-[family-name:var(--font-poppins)]">
                      Salvar Tipo / Área
                    </Button>
                  </div>
                </form>

                <div className="space-y-2">
                  <p className="text-sm font-semibold font-[family-name:var(--font-poppins)]">
                    Tipos / Áreas cadastradas
                  </p>
                  {(!tiposProcesso || tiposProcesso.length === 0) ? (
                    <p className="text-xs text-muted-foreground">
                      Nenhum tipo de processo cadastrado ainda.
                    </p>
                  ) : (
                    <ul className="space-y-1 max-h-64 overflow-y-auto text-sm">
                      {tiposProcesso.map((tipo) => (
                        <li
                          key={tipo.id}
                          className="border rounded-md px-2 py-1 flex flex-col"
                        >
                          <span className="font-[family-name:var(--font-poppins)]">
                            {tipo.nome}
                          </span>
                          {tipo.descricao && (
                            <span className="text-xs text-muted-foreground">
                              {tipo.descricao}
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
