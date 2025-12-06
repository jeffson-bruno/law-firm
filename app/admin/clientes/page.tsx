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
  rg?: string | null
  telefone?: string | null
  email?: string | null
  endereco?: string | null
  cidade?: string | null
  estado?: string | null
  cep?: string | null
}

type ClientesResponse = {
  data: Cliente[]
  current_page: number
  last_page: number
  total: number
}

// Funções de máscara
function maskCpfCnpj(value: string) {
  const digits = value.replace(/\D/g, "")

  if (digits.length <= 11) {
    // CPF: 000.000.000-00
    return digits
      .replace(/^(\d{3})(\d)/, "$1.$2")
      .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d{1,2})/, "$1.$2.$3-$4")
      .slice(0, 14)
  }

  // CNPJ: 00.000.000/0000-00
  return digits
    .replace(/^(\d{2})(\d)/, "$1.$2")
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/^(\d{2})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3/$4")
    .replace(/^(\d{2})\.(\d{3})\.(\d{3})\/(\d{4})(\d{1,2})/, "$1.$2.$3/$4-$5")
    .slice(0, 18)
}

function maskPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11)

  if (digits.length <= 10) {
    // (00) 0000-0000
    return digits
      .replace(/^(\d{2})(\d)/, "($1) $2")
      .replace(/^(\(\d{2}\)\s)(\d{4})(\d)/, "$1$2-$3")
  }

  // (00) 00000-0000
  return digits
    .replace(/^(\d{2})(\d)/, "($1) $2")
    .replace(/^(\(\d{2}\)\s)(\d{5})(\d)/, "$1$2-$3")
}

function maskCep(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 8)
  return digits.replace(/^(\d{5})(\d)/, "$1-$2")
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
  const [rg, setRg] = useState("")
  const [endereco, setEndereco] = useState("")
  const [cidade, setCidade] = useState("")
  const [cep, setCep] = useState("")
  const [telefoneWhatsapp, setTelefoneWhatsapp] = useState("")
  const [telefoneLigacao, setTelefoneLigacao] = useState("")
  const [email, setEmail] = useState("")

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

      // Remover máscaras para salvar "limpo" no banco, se desejar
      const rawCpfCnpj = cpfCnpj.replace(/\D/g, "")
      const rawTelefoneWhatsapp = telefoneWhatsapp.replace(/\D/g, "")
      const rawTelefoneLigacao = telefoneLigacao.replace(/\D/g, "")
      const rawCep = cep.replace(/\D/g, "")

      const res = await fetch(`${API_URL}/api/clientes`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          nome,
          cpf_cnpj: rawCpfCnpj,
          rg: rg || null,
          endereco,
          cidade,
          cep: rawCep,
          telefone: rawTelefoneWhatsapp, // vamos usar telefone como WhatsApp principal
          email: email || null,
          // telefoneLigacao por enquanto não temos campo separado no back;
          // mais pra frente podemos criar um campo específico ou usar 'observacoes'.
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
      setRg("")
      setEndereco("")
      setCidade("")
      setCep("")
      setTelefoneWhatsapp("")
      setTelefoneLigacao("")
      setEmail("")

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
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="nome">Nome *</Label>
                  <Input
                    id="nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Nome completo"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cpfCnpj">CPF/CNPJ *</Label>
                  <Input
                    id="cpfCnpj"
                    value={cpfCnpj}
                    onChange={(e) => setCpfCnpj(maskCpfCnpj(e.target.value))}
                    placeholder="000.000.000-00 ou 00.000.000/0000-00"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rg">RG</Label>
                  <Input
                    id="rg"
                    value={rg}
                    onChange={(e) => setRg(e.target.value)}
                    placeholder="RG (opcional)"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="endereco">Endereço *</Label>
                  <Input
                    id="endereco"
                    value={endereco}
                    onChange={(e) => setEndereco(e.target.value)}
                    placeholder="Rua, número, complemento"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cidade">Cidade *</Label>
                  <Input
                    id="cidade"
                    value={cidade}
                    onChange={(e) => setCidade(e.target.value)}
                    placeholder="Cidade"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cep">CEP *</Label>
                  <Input
                    id="cep"
                    value={cep}
                    onChange={(e) => setCep(maskCep(e.target.value))}
                    placeholder="00000-000"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telefoneWhatsapp">Telefone / WhatsApp *</Label>
                  <Input
                    id="telefoneWhatsapp"
                    value={telefoneWhatsapp}
                    onChange={(e) => setTelefoneWhatsapp(maskPhone(e.target.value))}
                    placeholder="(00) 00000-0000"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telefoneLigacao">Telefone (somente ligação)</Label>
                  <Input
                    id="telefoneLigacao"
                    value={telefoneLigacao}
                    onChange={(e) => setTelefoneLigacao(maskPhone(e.target.value))}
                    placeholder="(00) 00000-0000"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
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
                        Telefone/WhatsApp: {cliente.telefone}
                      </p>
                    )}
                    {cliente.email && (
                      <p className="text-xs text-muted-foreground">
                        Email: {cliente.email}
                      </p>
                    )}
                    {cliente.endereco && (
                      <p className="text-xs text-muted-foreground">
                        Endereço: {cliente.endereco}
                      </p>
                    )}
                    {(cliente.cidade || cliente.estado || cliente.cep) && (
                      <p className="text-xs text-muted-foreground">
                        {cliente.cidade}
                        {cliente.estado && ` - ${cliente.estado}`}
                        {cliente.cep && ` • CEP: ${cliente.cep}`}
                      </p>
                    )}
                  </div>
                ))}
              </div>

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
