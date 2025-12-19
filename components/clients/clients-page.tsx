"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { Search, Filter, Users, Pencil, Eye } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

import { clients, getMeCached } from "@/lib/api"
import { AddClientDialog } from "@/components/recepcao/add-client-dialog"

type Client = {
  id: number
  name: string
  cpf: string
  email?: string | null
  phone?: string | null
  created_at?: string
}

type Paginated<T> = {
  data: T[]
  current_page: number
  last_page: number
  per_page: number
  total: number
}

export default function ClientsPage({ basePath }: { basePath: "/admin" | "/advogado" | "/recepcao" }) {
  const [meRole, setMeRole] = useState<string | null>(null)

  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [page, setPage] = useState(1)
  const [perPage] = useState(15)

  const [payload, setPayload] = useState<Paginated<Client> | null>(null)

  // ✅ Regra: admin/advogado/recepção podem ver/cadastrar/editar cliente (universal)
  // ✅ Regra extra que você comentou: só admin e advogado ligam cliente a processo (vamos usar depois)
  const canLinkProcess = useMemo(() => meRole === "admin" || meRole === "advogado", [meRole])

  useEffect(() => {
    ;(async () => {
      try {
        const me = await getMeCached()
        setMeRole(me?.user?.role ?? null)
      } catch {
        setMeRole(null)
      }
    })()
  }, [])

  async function load() {
    try {
      setLoading(true)
      setError(null)
      const res = await clients.list({ per_page: perPage, search: search.trim() || undefined })
      // seu backend retorna paginate padrão do Laravel -> res já deve vir nesse formato
      setPayload(res as Paginated<Client>)
    } catch (e: any) {
      setError(e?.message ?? "Erro ao carregar clientes")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const rows = payload?.data ?? []

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-balance">Clientes</h1>
          <p className="text-muted-foreground text-pretty">
            Cadastre, consulte e edite os clientes do escritório
          </p>
        </div>

        {/* ✅ Reaproveita sua modal */}
        <AddClientDialog />
      </div>

      {/* Busca / filtros */}
      <Card>
        <CardHeader>
          <CardTitle>Buscar e Filtrar</CardTitle>
          <CardDescription>Busque por nome, CPF, e-mail ou telefone</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por nome, CPF, e-mail, telefone..."
              className="flex-1"
            />
            <Button variant="outline" onClick={() => load()}>
              <Filter className="h-4 w-4 mr-2" />
              Filtrar
            </Button>
            <Button onClick={() => load()}>
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Conteúdo */}
      {loading && <div className="p-2 text-muted-foreground">Carregando...</div>}
      {error && <div className="p-2 text-red-500">{error}</div>}

      {!loading && !error && (
        <div className="space-y-4">
          {rows.length === 0 ? (
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Users className="h-5 w-5" />
                  <p>Nenhum cliente encontrado.</p>
                </div>
              </CardContent>
            </Card>
          ) : (
            rows.map((c) => (
              <Card key={c.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <h3 className="font-bold text-xl text-foreground">{c.name}</h3>
                      <p className="text-sm text-muted-foreground">CPF: {c.cpf}</p>
                      {(c.email || c.phone) && (
                        <p className="text-xs text-muted-foreground mt-1">
                          {c.email ? c.email : ""}{c.email && c.phone ? " • " : ""}{c.phone ? c.phone : ""}
                        </p>
                      )}
                    </div>

                    <Badge variant="secondary">Ativo</Badge>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {/* Detalhes do cliente (rota por role) */}
                    <Link href={`${basePath}/clientes/${c.id}`} className="flex-1 min-w-[180px]">
                      <Button size="sm" className="w-full">
                        <Eye className="h-4 w-4 mr-2" />
                        Ver Cliente
                      </Button>
                    </Link>

                    <Link href={`${basePath}/clientes/${c.id}/editar`} className="flex-1 min-w-[180px]">
                      <Button size="sm" variant="outline" className="w-full bg-transparent">
                        <Pencil className="h-4 w-4 mr-2" />
                        Editar
                      </Button>
                    </Link>

                    {/*Só admin/advogado vão ver (vamos implementar depois) */}
                    {canLinkProcess && (
                      <Link href={`${basePath}/clientes/${c.id}/processos`} className="flex-1 min-w-[180px]">
                        <Button size="sm" variant="outline" className="w-full bg-transparent">
                          Vincular Processo
                        </Button>
                      </Link>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  )
}
