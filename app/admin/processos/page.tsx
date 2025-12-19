"use client"

import { useEffect, useMemo, useState } from "react"
import { Search, Filter, Plus, FileText } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { request } from "@/lib/api"

type CaseItem = {
  id: number
  client_id: number
  title: string
  case_number: string | null
  status: "ativo" | "pausado" | "encerrado"
  created_at: string
  client: {
    id: number
    name: string
    cpf: string
  }
}

type Paginated<T> = {
  data: T[]
  current_page: number
  last_page: number
  per_page: number
  total: number
}

function statusLabel(s: CaseItem["status"]) {
  if (s === "ativo") return "Ativo"
  if (s === "pausado") return "Pausado"
  return "Encerrado"
}

function statusVariant(s: CaseItem["status"]): "default" | "secondary" | "destructive" {
  if (s === "ativo") return "default"
  if (s === "pausado") return "secondary"
  return "destructive"
}

export default function ProcessosPage() {
  const [items, setItems] = useState<CaseItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // filtros
  const [search, setSearch] = useState("")
  const [status, setStatus] = useState<"" | CaseItem["status"]>("")
  const [page, setPage] = useState(1)

  // paginação do backend
  const [meta, setMeta] = useState<{ current_page: number; last_page: number; total: number }>({
    current_page: 1,
    last_page: 1,
    total: 0,
  })

  const queryString = useMemo(() => {
    const qs = new URLSearchParams()
    qs.set("per_page", "10")
    qs.set("page", String(page))
    if (search.trim()) qs.set("search", search.trim())
    if (status) qs.set("status", status)
    return `?${qs.toString()}`
  }, [search, status, page])

  async function load() {
    try {
      setLoading(true)
      setError(null)

      const res = await request<Paginated<CaseItem>>(`/api/cases${queryString}`)

      setItems(res.data || [])
      setMeta({
        current_page: res.current_page,
        last_page: res.last_page,
        total: res.total,
      })
    } catch (e: any) {
      setError(e?.message ?? "Erro ao carregar processos")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryString])

  function onSearchSubmit() {
    setPage(1)
    load()
  }

  function clearFilters() {
    setSearch("")
    setStatus("")
    setPage(1)
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance">Gerenciar Processos</h1>
          <p className="text-muted-foreground text-pretty">
            Visão geral de todos os processos do escritório
          </p>
        </div>

        {/* Por enquanto apontando para a lista/fluxo que você decidir depois */}
        <Button asChild>
          <Link href="/admin/processos/novo">
            <Plus className="h-4 w-4 mr-2" />
            Novo Processo
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Buscar e Filtrar</CardTitle>
          <CardDescription>Encontre processos por título ou número do processo</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <Input
              placeholder="Buscar por número do processo ou título..."
              className="flex-1"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") onSearchSubmit()
              }}
            />

            <div className="flex gap-2">
              {/* filtro simples por status (já existe no backend) */}
              <select
                className="h-10 rounded-md border bg-background px-3 text-sm"
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value as any)
                  setPage(1)
                }}
              >
                <option value="">Todos</option>
                <option value="ativo">Ativo</option>
                <option value="pausado">Pausado</option>
                <option value="encerrado">Encerrado</option>
              </select>

              <Button variant="outline" onClick={clearFilters}>
                <Filter className="h-4 w-4 mr-2" />
                Limpar
              </Button>

              <Button onClick={onSearchSubmit}>
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="mt-3 text-sm text-muted-foreground">
            Total: <span className="font-medium text-foreground">{meta.total}</span>
          </div>
        </CardContent>
      </Card>

      {loading && <div className="text-sm text-muted-foreground">Carregando processos...</div>}
      {error && <div className="text-sm text-red-500">{error}</div>}

      <div className="space-y-4">
        {!loading && !error && items.length === 0 && (
          <Card>
            <CardContent className="p-6 text-sm text-muted-foreground">
              Nenhum processo encontrado com os filtros atuais.
            </CardContent>
          </Card>
        )}

        {items.map((process) => (
          <Card key={process.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-foreground">{process.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      Processo: {process.case_number ?? "—"}
                    </p>
                  </div>
                </div>

                <Badge variant={statusVariant(process.status)}>{statusLabel(process.status)}</Badge>
              </div>

              <div className="grid gap-3 md:grid-cols-3 mb-4">
                <div className="bg-secondary/50 p-3 rounded">
                  <p className="text-xs text-muted-foreground mb-1">Cliente</p>
                  <p className="font-semibold text-foreground">{process.client?.name ?? "—"}</p>
                </div>

                <div className="bg-secondary/50 p-3 rounded">
                  <p className="text-xs text-muted-foreground mb-1">CPF</p>
                  <p className="font-semibold text-foreground">{process.client?.cpf ?? "—"}</p>
                </div>

                <div className="bg-secondary/50 p-3 rounded">
                  <p className="text-xs text-muted-foreground mb-1">Criado em</p>
                  <p className="font-semibold text-foreground">
                    {process.created_at ? new Date(process.created_at).toLocaleDateString("pt-BR") : "—"}
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-2">
                {/* ✅ rota correta no admin (vamos criar depois a página de detalhes) */}
                <Link href={`/admin/processos/${process.id}`} className="flex-1">
                  <Button size="sm" variant="default" className="w-full">
                    Ver Detalhes
                  </Button>
                </Link>

                <Button size="sm" variant="outline" className="flex-1 bg-transparent" disabled>
                  Editar
                </Button>

                <Button size="sm" variant="outline" className="flex-1 bg-transparent" disabled>
                  Designar Advogado
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Paginação simples */}
      <div className="flex items-center justify-between pt-2">
        <Button
          variant="outline"
          className="bg-transparent"
          disabled={meta.current_page <= 1 || loading}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
        >
          Anterior
        </Button>

        <div className="text-sm text-muted-foreground">
          Página <span className="text-foreground font-medium">{meta.current_page}</span> de{" "}
          <span className="text-foreground font-medium">{meta.last_page}</span>
        </div>

        <Button
          variant="outline"
          className="bg-transparent"
          disabled={meta.current_page >= meta.last_page || loading}
          onClick={() => setPage((p) => p + 1)}
        >
          Próxima
        </Button>
      </div>
    </div>
  )
}

