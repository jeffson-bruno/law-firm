"use client"

import { Scale, LayoutDashboard, FolderOpen, CalendarClock, FileText, BarChart3, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"

interface LawyerSidebarProps {
  open: boolean
}

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/advogado" },
  { icon: FolderOpen, label: "Meus Casos", href: "/advogado/casos" },
  { icon: CalendarClock, label: "Tarefas e Prazos", href: "/advogado/tarefas" },
  { icon: FileText, label: "Documentos", href: "/advogado/documentos" },
  { icon: BarChart3, label: "Relatórios", href: "/advogado/relatorios" },
]

export function LawyerSidebar({ open }: LawyerSidebarProps) {
  return (
    <aside
      className={cn(
        "bg-sidebar text-sidebar-foreground transition-all duration-300 flex flex-col",
        open ? "w-64" : "w-0 overflow-hidden",
      )}
    >
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-sidebar-primary flex items-center justify-center">
            <Scale className="w-6 h-6 text-sidebar-primary-foreground" />
          </div>
          <div>
            <h2 className="font-semibold text-base font-[family-name:var(--font-poppins)]">Advocacia</h2>
            <p className="text-xs text-sidebar-foreground/70">Painel do Advogado</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item, index) => (
          <a
            key={index}
            href={item.href}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-all group"
          >
            <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium font-[family-name:var(--font-poppins)]">{item.label}</span>
          </a>
        ))}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground hover:bg-destructive/10 hover:text-destructive transition-all w-full group">
          <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span className="text-sm font-medium font-[family-name:var(--font-poppins)]">Sair</span>
        </button>
      </div>
    </aside>
  )
}
