"use client"

import { Menu, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface ReceptionistHeaderProps {
  onMenuClick: () => void
}

export function ReceptionistHeader({ onMenuClick }: ReceptionistHeaderProps) {
  return (
    <header className="bg-card border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onMenuClick} className="lg:hidden">
            <Menu className="w-5 h-5" />
          </Button>

          <div>
            <h2 className="text-lg font-semibold text-foreground font-[family-name:var(--font-poppins)]">
              Painel de Recepção
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
          </Button>

          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback className="bg-accent text-accent-foreground font-semibold">RC</AvatarFallback>
            </Avatar>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-foreground">Recepcionista</p>
              <p className="text-xs text-muted-foreground">recepcao@escritorio.com</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
