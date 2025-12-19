"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Calendar,
  MessageSquare,
  Users,
  FileText,
  Calculator,
  Settings,
  LogOut,
  FolderKanban,
  DollarSign,
  BarChart3,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { CalculatorPopover } from "@/components/shared/calculator-popover"

import { useAuth } from "@/hooks/use-auth"


type NavItem = {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

type AppSidebarProps = {
  role: "recepcao" | "advogado" | "admin"
}


const navigationByRole: Record<string, NavItem[]> = {
  recepcao: [
    { title: "Dashboard", href: "/recepcao", icon: LayoutDashboard },
    { title: "Financeiro", href: "/financeiro", icon: DollarSign },
    { title: "Agendamentos", href: "/recepcao/agendamentos", icon: Calendar },
    { title: "Marketing", href: "/recepcao/marketing", icon: MessageSquare },
    { title: "Clientes", href: "/recepcao/clientes", icon: Users },
  ],
  advogado: [
    { title: "Dashboard", href: "/advogado", icon: LayoutDashboard },
    { title: "Financeiro", href: "/financeiro", icon: DollarSign },
    { title: "Meus Casos", href: "/advogado/casos", icon: FileText },
    { title: "Cálculos", href: "/advogado/calculos", icon: Calculator },
    { title: "Kanban", href: "/advogado/kanban", icon: FolderKanban },
  ],
  admin: [
    { title: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { title: "Financeiro", href: "/financeiro", icon: DollarSign },
    { title: "Relatórios", href: "/admin/relatorios", icon: BarChart3 },
    { title: "Kanban", href: "/admin/kanban", icon: FolderKanban },
    { title: "Processos", href: "/admin/processos", icon: FileText },
    { title: "Configurações", href: "/admin/configuracoes", icon: Settings },
  ],
}


export function AppSidebar({ role }: AppSidebarProps) {
  const pathname = usePathname()

  const { flags, loading } = useAuth()

  if (loading) return null

  const baseNavigation = navigationByRole[role] || []

  const navigation = baseNavigation.filter((item) => {
    if (item.href.includes("/admin/financeiro")) return !!flags.show_finance
    if (item.href.includes("/admin/relatorios")) return !!flags.show_reports
    if (item.href.includes("/recepcao/marketing")) return !!flags.show_marketing
    return true
  })


  const handleLogout = () => {
    localStorage.clear()

    document.cookie = "auth_token=; Max-Age=0; path=/"
    document.cookie = "userRole=; Max-Age=0; path=/"
    document.cookie = "show_finance=; Max-Age=0; path=/"
    document.cookie = "show_reports=; Max-Age=0; path=/"
    document.cookie = "show_marketing=; Max-Age=0; path=/"

    window.location.href = "/"
  }



  return (
    <div className="flex h-full flex-col border-r bg-sidebar">
      <div className="p-6">
        <h2 className="text-lg font-bold text-sidebar-foreground">Sistema Jurídico</h2>
        <p className="text-sm text-sidebar-foreground/60 capitalize">{role}</p>
      </div>

      <Separator />

      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="flex flex-col gap-1">
          {navigation.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3",
                    isActive && "bg-sidebar-accent text-sidebar-accent-foreground",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.title}
                </Button>
              </Link>
            )
          })}
        </nav>
      </ScrollArea>

      <Separator />

      <div className="p-3 space-y-1">
        <CalculatorPopover />
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          Sair
        </Button>
      </div>
    </div>
  )
}
