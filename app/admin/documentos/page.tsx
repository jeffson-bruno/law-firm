"use client"

import { useState } from "react"
import { AdminSidebar } from "@/components/admin-sidebar"
import { AdminHeader } from "@/components/admin-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AdminDocumentosPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar open={sidebarOpen} />

      <div className="flex-1 flex flex-col">
        <AdminHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        <main className="flex-1 p-6 space-y-6">
          <h1 className="text-[24px] font-bold text-foreground font-[family-name:var(--font-poppins)]">
            Documentos
          </h1>
          <p className="text-muted-foreground">
            Área para gerenciar petições, contratos e recibos gerados pelo sistema.
          </p>

          <Card>
            <CardHeader>
              <CardTitle className="text-[18px] font-medium font-[family-name:var(--font-poppins)]">
                Gerenciamento de Documentos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                Depois vamos integrar com <code>/api/documentos-juridicos</code> e <code>/api/recibos</code>.
              </p>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
