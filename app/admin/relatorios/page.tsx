"use client"

import { useState } from "react"
import { AdminSidebar } from "@/components/admin-sidebar"
import { AdminHeader } from "@/components/admin-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AdminRelatoriosPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar open={sidebarOpen} />

      <div className="flex-1 flex flex-col">
        <AdminHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        <main className="flex-1 p-6 space-y-6">
          <h1 className="text-[24px] font-bold text-foreground font-[family-name:var(--font-poppins)]">
            Relatórios
          </h1>
          <p className="text-muted-foreground">
            Aqui ficarão os relatórios gerenciais do escritório (processos, clientes, financeiro).
          </p>

          <Card>
            <CardHeader>
              <CardTitle className="text-[18px] font-medium font-[family-name:var(--font-poppins)]">
                Relatórios Disponíveis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                Em breve vamos listar e exportar relatórios em PDF/Excel.
              </p>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
