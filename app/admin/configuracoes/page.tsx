"use client"

import { useState } from "react"
import { AdminSidebar } from "@/components/admin-sidebar"
import { AdminHeader } from "@/components/admin-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AdminConfiguracoesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar open={sidebarOpen} />

      <div className="flex-1 flex flex-col">
        <AdminHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        <main className="flex-1 p-6 space-y-6">
          <h1 className="text-[24px] font-bold text-foreground font-[family-name:var(--font-poppins)]">
            Configurações do Escritório
          </h1>
          <p className="text-muted-foreground">
            Aqui vamos configurar tipos de processos, usuários, áreas de atuação, etc.
          </p>

          <Card>
            <CardHeader>
              <CardTitle className="text-[18px] font-medium font-[family-name:var(--font-poppins)]">
                Preferências Gerais
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                Depois conectamos com a API para salvar configurações no banco.
              </p>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
