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

type Cliente = {
  id: number
  nome: string
  cpf_cnpj: string
  telefone?: string | null
  email?: string | null
  cidade?: string | null
  estado?: string | null
}

type ClientesResponse = {
  data: Cliente[]
  current_page: number
  last_page: number
  total: number
}

export default function AdminClientesPage() {
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const [clientes, setClientes] = useState<Cliente[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [lastPage, setLastPage] = useState(1)
  const [total, setTotal] = useState(0)

  const [loading, setLoading] = useState(false)
  const [loadingCreate, setLoadingCreate] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Formulário de novo cliente
  const [nome, setNome] = useState("")
  const [cpfCnpj, setCpfCnpj] = useState("")
  const [telefone, setTelefone] = useState("")
  const [email, setEmail] = useState("")

  // Buscar lista de clientes
  const fetchClientes = async (page = 1) => {
    setLoading(true)
    setError(null)

    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null

      if (!token) {
        router.push("/")
        return
      }

      const res = await fetch(`${API_URL}/api/clientes?page=${page}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      })

      if (res.status === 401) {
        // Token inválido/expirado
        if (typeof window !== "undefined") {
          localStorage.removeItem("auth_token")
          localStorage.removeItem("auth_user")
        }
        router.push("/")
        return
      }

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.message || "Erro ao carregar clientes.")
      }

      const data: ClientesResponse = await res.json()

      setClientes(data.data)
      setCurrentPage(data.current_page)
      setLastPage(data.last_page)
      setTotal(data.total)
    } catch (err: any) {
      console.error(err)
      setError(err.message || "Erro ao carregar clientes.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchClientes(1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleCreateCliente = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoadingCreate(true)

    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null

      if (!token) {
        router.push("/")
        return
      }

      const res = await fetch(`${API_URL}/api/clientes`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          nome,
          cpf_cnpj: cpfCnpj,
          telefone,
          email,
        }),
      })

      if (res.status === 401) {
        if (typeof window !== "undefined") {
          localStorage.removeItem("auth_token")
          localStorage.removeItem("auth_user")
        }
        router.push("/")
        return
      }

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.message || "Erro ao cadastrar cliente.")
      }

      // Se cadastrou, limpa o formulário e recarrega a lista
      setNome("")
      setCpfCnpj("")
      setTelefone("")
      setEmail("")

      // Voltar para página 1 (ou recarregar a atual)
      await fetchClientes(1)
    } catch (err: any) {
      console.error(err)
      setError(err.message || "Erro ao cadastrar cliente.")
    } finally {
      setLoadingCreate(false)
    }
  }

  const handlePageChange = (page: number) => {
    if (page < 1 || page > lastPage || page === currentPage) return
    fetchClientes(page)
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
                Clientes
              </h1>
              <p className="text-muted-foreground text-sm">
                Gerencie os clientes do escritório. Você pode cadastrar novos clientes e visualizar os já existentes.
              </p>
            </div>
          </div>

          {/* Mensagem de erro */}
          {error && (
            <div className="p-3 rounded-md bg-red-50 text-red-700 text-sm border border-red-200">
              {error}
            </div>
          )}

          {/* Formulário de novo cliente */}
          <Card>
            <CardHeader>
              <CardTitle className="text-[18px] font-medium font-[family-name:var(--font-poppins)]">
                Novo Cliente
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateCliente} className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome</Label>
                  <Input
                    id="nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Nome completo"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cpfCnpj">CPF/CNPJ</Label>
                  <Input
                    id="cpfCnpj"
                    value={cpfCnpj}
                    onChange={(e) => setCpfCnpj(e.target.value)}
                    placeholder="Somente números"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telefone">Telefone</Label>
                  <Input
                    id="telefone"
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                    placeholder="(00) 00000-0000"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@cliente.com"
                  />
                </div>

                <div className="md:col-span-2 flex justify-end">
                  <Button
                    type="submit"
                    disabled={loadingCreate}
                    className="font-[family-name:var(--font-poppins)]"
                  >
                    {loadingCreate ? "Salvando..." : "Salvar Cliente"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Lista de clientes */}
          <Card>
            <CardHeader>
              <CardTitle className="text-[18px] font-medium font-[family-name:var(--font-poppins)]">
                Lista de Clientes {loading && <span className="text-xs text-muted-foreground">(carregando...)</span>}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {clientes.length === 0 && !loading && (
                <p className="text-sm text-muted-foreground">
                  Nenhum cliente cadastrado até o momento.
                </p>
              )}

              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {clientes.map((cliente) => (
                  <div
                    key={cliente.id}
                    className="border rounded-lg p-3 bg-card shadow-sm flex flex-col gap-1"
                  >
                    <p className="font-semibold text-[15px] font-[family-name:var(--font-poppins)]">
                      {cliente.nome}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      CPF/CNPJ: {cliente.cpf_cnpj}
                    </p>
                    {cliente.telefone && (
                      <p className="text-xs text-muted-foreground">
                        Telefone: {cliente.telefone}
                      </p>
                    )}
                    {cliente.email && (
                      <p className="text-xs text-muted-foreground">
                        Email: {cliente.email}
                      </p>
                    )}
                    {(cliente.cidade || cliente.estado) && (
                      <p className="text-xs text-muted-foreground">
                        {cliente.cidade} {cliente.estado && `- ${cliente.estado}`}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {/* Paginação */}
              {lastPage > 1 && (
                <div className="flex items-center justify-between mt-4 text-sm">
                  <span className="text-muted-foreground">
                    Página {currentPage} de {lastPage} — Total: {total}
                  </span>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      disabled={currentPage <= 1 || loading}
                      onClick={() => handlePageChange(currentPage - 1)}
                    >
                      Anterior
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      disabled={currentPage >= lastPage || loading}
                      onClick={() => handlePageChange(currentPage + 1)}
                    >
                      Próxima
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
