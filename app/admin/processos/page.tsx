"use client"

import { useState } from "react"
import { AdminSidebar } from "@/components/admin-sidebar"
import { AdminHeader } from "@/components/admin-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AdminProcessosPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar open={sidebarOpen} />

      <div className="flex-1 flex flex-col">
        <AdminHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        <main className="flex-1 p-6 space-y-6">
          <h1 className="text-[24px] font-bold text-foreground font-[family-name:var(--font-poppins)]">
            Processos e Casos
          </h1>
          <p className="text-muted-foreground">
            Página de gestão de processos. Em breve vamos listar e criar processos consumindo a API.
          </p>

          <Card>
            <CardHeader>
              <CardTitle className="text-[18px] font-medium font-[family-name:var(--font-poppins)]">
                Lista de Processos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                Ainda não implementamos a listagem real. Próximo passo: conectar com <code>/api/processos</code>.
              </p>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
